
import { expect, test } from "bun:test";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Event } from "./host";
import { subscriptionResponse } from "./subscription";

test("subscription transport forces isolated configuration, denies traversal and removes copied auth", async () => {
  const root = await mkdtemp("/tmp/arturo-subscription-test-");
  const oldPath = process.env.PATH;
  const oldHome = process.env.CODEX_HOME;
  try {
    await writeFile(
      resolve(root, "auth.json"),
      '{"test":"credential-sentinel"}',
    );
    const marker = resolve(root, "home.txt");
    await writeFile(
      resolve(root, "codex"),
      `#!${process.execPath}
import {readFileSync,writeFileSync} from "node:fs";
const config=readFileSync("config.toml","utf8");
if(!config.includes('forced_login_method = "chatgpt"') || !config.includes('shell_tool = false') || !config.includes('skip_host_skill_discovery = true')) process.exit(3);
writeFileSync(${JSON.stringify(marker)},process.cwd());
const send=x=>process.stdout.write(JSON.stringify(x)+"\\n");
let buffer="";
for await(const chunk of process.stdin){buffer+=chunk.toString();while(buffer.includes("\\n")){const end=buffer.indexOf("\\n");const msg=JSON.parse(buffer.slice(0,end));buffer=buffer.slice(end+1);
if(msg.id===91){send({method:"thread/tokenUsage/updated",params:{tokenUsage:{total:{inputTokens:12,outputTokens:3,cachedInputTokens:0,reasoningOutputTokens:0}}}});send({method:"turn/completed",params:{turn:{status:"completed",items:[{type:"agentMessage",text:msg.result.success?"LEAKED":"DENIED"}]}}});continue;}
if(msg.id===undefined)continue;
let result={};
if(msg.method==="account/read")result={account:{type:JSON.parse(readFileSync("auth.json","utf8")).authmode ?? "chatgpt"}};
if(msg.method==="thread/start")result={thread:{id:"test"},model:"gpt-6.1-sol"};
send({id:msg.id,result});
if(msg.method==="turn/start")send({id:91,method:"item/tool/call",params:{tool:"read_file",arguments:{path:"../auth.json"}}});
}}
`,
    );
    await chmod(resolve(root, "codex"), 0o700);
    process.env.PATH = `${root}:${oldPath}`;
    process.env.CODEX_HOME = root;
    const events: Event[] = [];
    const result = await subscriptionResponse(
      [{ content: "Evaluation instructions" }, { content: "Test" }],
      { root, workspace: root, mode: "none", executable: "arturo" },
      events,
    );
    expect(result.output[0].content[0].text).toBe("DENIED");
    expect(result.usage.input_tokens).toBe(12);
    expect(events.some((e) => e.kind === "tool" && e.ok === false)).toBe(true);
    expect(JSON.stringify(events)).not.toContain("credential-sentinel");
    const temporaryHome = await readFile(marker, "utf8");
    expect(await Bun.file(resolve(temporaryHome, "auth.json")).exists()).toBe(
      false,
    );
    await writeFile(resolve(root, "auth.json"), '{"authmode":"api"}');
    await expect(
      subscriptionResponse(
        [{ content: "Instructions" }, { content: "Test" }],
        { root, workspace: root, mode: "none", executable: "arturo" },
        [],
      ),
    ).rejects.toThrow("ChatGPT subscription authentication required");
    const rejectedHome = await readFile(marker, "utf8");
    expect(await Bun.file(resolve(rejectedHome, "auth.json")).exists()).toBe(
      false,
    );
  } finally {
    if (oldPath === undefined) delete process.env.PATH;
    else process.env.PATH = oldPath;
    if (oldHome === undefined) delete process.env.CODEX_HOME;
    else process.env.CODEX_HOME = oldHome;
    await rm(root, { recursive: true, force: true });
  }
});
