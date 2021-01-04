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
