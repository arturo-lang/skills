# Coverage baseline

[coverage.json](coverage.json) maps all existing skills and modules to evidence. Partial means guidance exists, not task completeness. Backlog entries need investigation and ownership. The symbol inventory remains authoritative in [stdlib.json](stdlib.json).

Verification dimensions are independent: documented; metadata inspected; executed; results asserted; edge cases tested. Sources and verification notes in each linked reference establish these dimensions; absence of evidence means unverified. Historical 418-fragment execution does not establish output correctness. The smoke suite asserts representative behavior, not every symbol.

Package guidance is source-reviewed; package execution remains unverified by default. Upstream example classification and task-level evidence remain backlog work. Update this catalog whenever ownership or coverage changes.

[Verification records](verification.json) track specific claims independently from coverage status. Historical fragment execution remains a reported execution result with no retained exact command, not an assertion of correct outputs. The local smoke record covers only its named representative cases. `bun run scripts/verification.ts` checks record structure and repository-local evidence; it does not rerun the recorded commands or prove their claims.
