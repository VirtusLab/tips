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
### 19 May 2020

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


## Multiplatform sed
### 12 Jun 2020

To replace a regex pattern in a file **in place**,
use `sed -i.bak 's/<regex-from>/<string-to>/' <file>` ![a](regex-party)

`sed -i` is notorious for non-portability between
Linux/Docker containers and OS X ![](apple-logo) <br/>
Neither of `sed -i <expr> <file>` or `sed -i '' <expr> <file>`
will work on both systems ![](fuggg) <br/>
To guarantee portability between GNU (Linux) and BSD (OS X) sed,
you should use the `-i<suffix>`, e.g. `-i.bak` as above ![](gnu) <br/>
This will also save the original `<file>` under `<file><suffix>` (unlike `-i` or `-i ''`),
while still modifying `<file>` in place (just like `-i` or `-i ''`) ![](spurdo-thumbs-up)

In a common scenario, however, where the aim is to substitute `$FOO`, `${BAR}` etc. occurrences
in a file with the values of `FOO`, `BAR` etc. env vars, using `sed` might be an overkill ![](cannon) <br/>
A better suited (and less error-prone) tool for this specific job is called `envsubst`.
Most Linux distros have it available out of the box; OS X and some Docker containers
require installing `gettext` package first ![](macbook)


## Shell brace extension
### 26 Jun 2020

Instead of typing file path twice in commands like `mv` or `cp` (e.g. `mv my/file/with/a/very/long/name.xd my/file/with/a/very/long/name.xd.bak`)
you can use shell brace expansion: `mv my/file/with/a/very/long/name.xd{,.bak}` ![](professor-spurdo)

To make sure `mv` and `cp` don't overwrite existing destinations with no warning,
replace them with an alias that adds `-i`/`--interactive` option: `alias cp='cp -i'`.
Same point applies to `rm`: `-i` makes `rm` ask about whether to delete a file
(unless `-f` is provided) ![](fuggg)

As a last-resort protection against catastrophic file removal in `-rf` mode,
it's also worth passing `-v`/`--verbose` option to `rm` so that the files are listed
while getting removed; this way a removal can be Ctrl+C-interrupted midway
if it goes wrong (e.g. in case of a superfluous space like in `rm -rfv ~ /.local/bin`) ![a](pepepanic)
