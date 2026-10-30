---

name: arturo-states
description: Model Arturo finite state machines using the States DSL, explicit initial states, event transitions, and current-state inspection.
---

# States finite state machines

Use [States documentation](https://states.pkgr.art/) and [v0.1.0 source](https://github.com/RickBarretto/states.art/tree/v0.1.0). Package imports may download and execute code.

Construct `:states` from an initial-state literal and a transition block. Each transition is ordered **event, source, destination**. Separators such as `/` and `~>` are DSL decoration; do not interpret them as ordinary division or language operators here.

Documentation-based bounded example; not run in the library's offline smoke suite:

```arturo
import {states}!

door: to :states ['closed [
    open  / closed ~> opened
    close / opened ~> closed
]]

print door\state
door\open
print door\state
door\changeFrom 'close
print door\state
```

Read the current state through `machine\state`. Calling an event method or `machine\changeFrom 'event` transitions that existing machine; subsequent reads observe its changed state.

Enumerate transitions for every supported event/source pair, including intentional self-transitions. Test event sequences and expected states. The overview does not specify handling of missing transitions, duplicate definitions, callbacks, or persistence: inspect source before relying on those behaviors or adding such capabilities.
