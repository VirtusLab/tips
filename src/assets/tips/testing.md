## Dummy Linux display
### 1 Jun 2020

To run **any** desktop-GUI application in a Linux environment that lacks
physical screen (including Docker containers & most CI contexts),
use _X Virtual Framebuffer_ ![](nerd_face)

> xvfb-run -a &lt;my-command-to-run&gt;

This will substitute the typical display/X server (`Xorg`) with a dummy,
in-memory display server, `Xvfb` ![](linux)

Note that this is distinct from running Chrome with `--headless`
or JVM with `-Djava.awt.headless`; these use the explicit support
for a headless mode implemented in Chrome 59+/AWT,
while `xvfb-run` just attaches a different display server to the process
(and hence the process doesn't even need to know that it's being run headlessly,
let alone provide any explicit support for a headless mode) ![](executioner)


## Static code analyzers
### 19 Jun 2020

**Tests** generally require a **linear** amount of work (wrt. production codebase size)
to maintain constant percentage-wise coverage of codebase ![](sisyphus)

**Static code analyzers**  generally require a **constant** amount of work to maintain
constant percentage-wise coverage of codebase ![](vaultboy)

Static analyzers by no means provide a way to test domain-specific scenarios,
but can eliminate most non-domain/technical issues in the codebase
that slipped under the compiler's radar.
A prime example for Java is **[Checker Framework](https://checkerframework.org/manual/)**,
which provides extensible checkers for more obvious issues like `null` or `Optional#get()` misuse,
down to verifying format strings, regexes, lock discipline or UI thread access in Swing/Android ![](sleuth_or_spy)
