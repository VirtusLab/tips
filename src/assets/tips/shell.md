## Output comparing
### 10 Apr 2020

Very often there's a need to compare the outputs of two shell commands ![](scales)<br/>
Of course one might simply save each output separately into a file and `diff` the files...
but in bash/zsh there's an easier way called _process substitution_:

> diff -u <(./command1 --option args) <(./command2 --option args)

If you run `set -x` (shell debug mode on) beforehand, you'll see how the actual params passed
to the `diff` executable look like ![](sleuth_or_spy)

> diff -u /dev/fd/63 /dev/fd/62

The shell created two _[named pipes](https://en.wikipedia.org/wiki/Named_pipe)_, and `diff` simply
treats them as files to compare ![](pipe)

Btw, the `-u` (aka `--unified`) option isn't related to the substitution mechanism &mdash;
it's just making the `diff` output more palatable/more git-like with differing lines
marked by `+` and `-` ![](git)<br/>
Also, check [colordiff](https://www.colordiff.org/) for green/red output ![](art)


## Strict mode
### 14 Apr 2020

For production/CI-related shell (sh/bash) scripts, you pretty much always want to use
so-called _strict mode_ ![](grammar-nazi)

> set -e -o pipefail -u

By default, nothing special happens after a command in a script ends up with
**a non-zero exit status** ![](shrug)<br/>
`set -e` makes sure the entire script **exits with an error** instead ![](stackoverflow)

The exit code of a pipeline `a | b | c | d` is by default just the result of the last command `d`,
even in case of `set -e` mode ![](pipe)<br/>
If any of `a`, `b`, `c` fails but `d` exits with zero, the entire pipeline silently exits
with zero as well ![](zipper_mouth_face)<br/>
`set -o pipefail` changes this behavior: if **any of the constituent commands**
(not necessarily the last one) exits with non-zero, then the **entire pipeline**
exits with non-zero as well.

`set -u` makes sure that an attempt to reference an **unassigned variable** `$foo`
causes the script to immediately exit with an error (rather than resolve `$foo` to an empty string)  ![a](shell-party)<br/>
Tip: `${foo-}` will simulate the default behavior in the `set -u` mode.


## Input/output redirections
### 19 May 20202

To pass a string verbatim as stdin to
a shell (bash/zsh) command, use `<<<`: `./my-command <<< "Hello world"` <br/>
Note that this will include a trailing
newline, which might sometimes be
undesired (e.g. in the input to `base64`) ![a](shell-party)

To redirect both stdout and stderr
to the same file, use `&>`: `./my-command &>/dev/null` ![](and)

To slurp file contents into a var,
use `$(<...)`:`foo=$(<foo.txt)`; in particular,
use `$(</dev/stdin)` to read the entire stdin ![a](pacman)

To put verbatim tab/newline etc. characters
into a shell string, use `$'....'`-style
strings instead of regular `'...'` or `"..."`: <br/>

> ./my-command "this is " $'my string \t\n'
 
![](money_mouth_face)
