## Date/time representation
### 22 Apr 2020

Avoid date/time representations that correspond to
a **local date/time**. Examples include Java's `LocalDateTime`
and SQL's `TIMESTAMP` aka `TIMESTAMP WITHOUT TIME ZONE` ![](stop-sign)

The problem is that they give an **impression of pointing
to a specific point in time** while in fact, they don't ![](bangbang)

What specific instant they point to depends on what
time zone happens to be assumed for them further down
the application code...<br/>
You might come across advice to always treat local date/
time as UTC, but that's hard to enforce in practice ![](niby-czlowiek-wiedzial)

For instance, in a JVM-based app, a single call to
`LocalDateTime.now()` will pollute the domain with a
value that's implicitly timezoned to **default** TZ of
the machine &mdash; which is typically **different from UTC**! ![a](pepepanic)

As a rule of thumb, always use `java.time.ZonedDateTime` (on JVM),
`TIMESTAMP WITH TIME ZONE` (in SQL) or generally: the timestamp types
for the given platform/DB that actually represent a specific point in time. ![](spurdo-thumbs-up)


## Compression (zip vs tar.gz)
### 28 Apr 2020

You might have the impression that **zip** and
**tar.gz** are basically kinda-equivalent archive
formats, just differing in technicalities like
compression algorithms... but there's actually
an important conceptual difference ![](goncern)

**zip** is an **uncompressed archive** of **compressed
files**. Extracting a single file (`unzip <archive>
<path/to/file>`) is quick; overall compression
is weaker because zip doesn't take advantage
of content similarities between files ![](windows)

**tar.gz** is a **compressed archive** of **uncompressed
files**. Extracting a single file is generally impossible
without decompressing the entire archive;
overall compression is better because tar.gz takes
advantage of content similarities between files ![](linux)

This trade-off starts to be meaningful for large
archives with many files inside; unless you need
to be Windows-compatible or need to quickly extract
a selected file from the archive, you likely
want to use tar.gz ![a](head-banging-parrot)


## Listing Java processes
### 30 Apr 2020

To list running `java` processes,
instead of brittle constructs like
`ps aux | grep java`, use Oracle
JDK's/OpenJDK's `jps -ml` ![](java)

> $ jps -ml <br/>
> 2102755 /usr/share/sbt/bin/sbt-launch.jar <br/>
> 2101064 com.intellij.idea.Main <br/>
> 2107882 jdk.jcmd/sun.tools.jps.Jps -ml <br/>

As opposed to `ps aux | grep java`, this only
lists the PIDs of actual `java` processes and
not the ones that just happen to contain
`java` in their args; also, JVM params (that
are typically less important) are skipped
unless `-v` option is provided; only main
class names (`-l` for FQCN) and invocation
params (`-m`) are listed ![a](shell-party)


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


## YAML vs JSON
### 17 Jul 2020

It's a relatively unknown fact that YAML is designed as a **strict superset** of JSON... so every valid JSON is also a valid YAML ![a](cooo) <br/>
Just try pasting any JSON as an input to a YAML->JSON (not the other way round!)
[converter like this one](http://onlineyamltools.com/convert-yaml-to-json) ![](wrench) <br/>
In particular, the below is a valid YAML
(although not a valid JSON, since quotation around multi-word strings is missing):

> { <br/>
> &nbsp;&nbsp; hello world: foo bar, <br/>
> &nbsp;&nbsp; lorem ipsum: [dolor, sit, amet] <br/>
> } <br/>


## Binding address and port
### 3 Sep 2020

Be careful when binding a **server socket** to a port - the address you're binding to is also relevant ![](goncern)

Listening on 127.0.0.1:<port> means listening on <port> **on loopback (lo, local-only) interface** ![](loop)![](back) <br/>
Note that `localhost` is just a DNS alias for `127.0.0.1`, as defined in `/etc/hosts` on Linuxes - see `dig +short localhost` ![](shovel)

Listening on 0.0.0.0:<port> means listening on <port> **on every available network interface**,
incl. loopback (see `ip addr` to list all interfaces) ![](all-the-things) <br/>
Try `nc -l 0.0.0.0 8080` (_netcat listen_, server socket) and then from another terminal
`nc 127.0.0.1 8080 <<< hello` (client socket) ![](cat)

Listening on 0.0.0.0 instead of 127.0.0.1 is important if the port needs to be **exposed for other hosts** ![](exhibitionist) <br/>
For instance, in Kubernetes, if a Dockerized app binds to a port on 127.0.0.1 instead of 0.0.0.0,
it'll end up **not** reachable via a Service (even if the port is correctly exposed from
the container & correctly bound in the Service) ![a](party-k8s)


## Terminating SSH connection
### 7 Sep 2020

Got a hanging ssh session? ![](confounded) Don't have the time to wait for `broken pipe` closing error? ![](cry) Don't want to kill the terminal window? ![](gun)

Press `[Enter]`, `[~]`, `[.]` in that order to terminate SSH connection only. Check out other possible options by typing `[Enter]`, `[~]` and `[?]` while the shell connection is open.


## Bikeshedding
### 21 Sep 2020

One of the common traps in any discussions, tech and non-tech alike (including code review) is **bikeshedding** ![](goncern)

The term is derived from a hypothetical committee debating a **nuclear power plant design**,
which instead of spending the time on the hard&important matters (the **reactor**),
prefers to focus on trivilialites like a place for employees to store their bikes
(aka **bike sheds**) - in other words, the committee is _bikeshedding_ ![](atom_symbol)

This is unfortunately a natural tendency - the human **need to be useful** often ends up
taking over the need to achieve the goal (esp. if the situation doesn't give a chance
to be personally useful towards that goal) ![](sad_pepe)

In the nuclear plant example, committee members are more willing to discuss a trivial topic
(bike sheds) where they're more likely to have a useful insight, than the incomparably
more important topic (reactor) where they're less likely to have any valuable input ![](care)


## Database versioning
### 1 Oct 2020

Most strategies of app/service deployment require **both the old and new version**
of the given software to run **simultaneously** for a short window of time during the deployment ![](ship) <br/>
Since both versions need to use the same database, the problem begins
when a deployment entails a DB schema migration ![](goncern)

Always ensure that the schema changes are **backwards-compatible** wrt.
parts of the schema that are still used by the app ![](back) <br/>
For a relational DB, e.g. removing a column that's used by the old version
can potentially crash the old instances while the new version is still being deployed ![](azure-on-fire) <br/>
Even regardless of the window of time around the deployment, in case the new version
needs to be **rolled back** after the DB is already migrated, the old version must be able
to cooperate with the new schema ![](arrow_right_hook)

Non-backward-compatible changes should be performed as cleanup migrations,
only when the affected columns/tables/etc. aren't used by any deployment anymore ![](trashbin)

It's actually a good idea to version the migrations semantically
(e.g. `V${major}_${minor}_${patch}__${description}.sql` in Flyway) ![](stonks)


## Blurring background on Google Meet
### 6 Oct 2020

Google Meet allows for blurring the background (everything but face and hands)
during the video calls ![](hushed)

Open three-dot (aka _kebab menu_) icon in the bottom-right corner
and select `Turn on background blur` ![a](halalparrot)


## During presentation
### 19 Oct 2020

To avoid embarassing situations when sharing screen, **turn off desktop notifications**
from IMs like Slack completely, or install a dedicated notification silencer app
(MacOS: possibly [muzzle](https://muzzleapp.com) ?) ![a](this_is_fine)

You should also take into account that the person on the receiving end of the communication
might have their desktop notifications enabled... as a paranoid measure, it's better not to
communicate anything confidential until the other person starts responding to you
(at which point they're less likely to accidentally leak the message via a screenshare) ![a](pepepanic)

Along the same lines, it's always best to share as little screen as possible
(single browser tab or application window instead of the entire desktop). <br/>
Note that depending on OS/desktop env, sharing a single window might prevent dialogs displayed
by this window from getting shared as well ![](frown)


## Download a single artifact into the Ivy cache
### 23 Oct 2020

(e. g. when IntelliJ complains about missing libraries)

1. Get a distribution JAR of Apache Ivy (if you have Fedora,
   `dnf install ivy` will place it at `/usr/share/java/apache-ivy/ivy.jar`)
2. Use the -dependency flag, e. g.:
   
   > java -jar ivy.jar -dependency org.scala-lang scala-compiler 2.12.8 

Ivy will complain about missing parts of project definition (duh),
but the artifact will be downloaded and stored in the cache!


## Pull requests good practices
### 9 Nov 2020

Keep your pull requests small. As a (relatively) old saying goes,
_10 lines changed = 10 issues on review; 500 lines changed = mmm'kay,
looks fine to me_ ![](xd-thinking)

Of course trimming PRs down to 10 lines is almost always impossible.
Nevertheless, keeping their scope limited makes the job easier for reviewers:
smaller PR means the reviewer needs to keep less context in the "brain cache"
and is less likely to miss an important change ![](brain)

Especially, **refactors should NOT be mixed** with bugfixes or new features.
Naming the branches `refactor/...`, `bugfix/...`, `feature/...`, `chore/...` etc.
helps keep the focus ![a](party-bug)

_But... but... won't small PRs cause that I'll have more git branches
(sometimes stacked on each other), which will make my local repo unmanagable?_
Ha! nope, coz you've got [git-machete-intellij-plugin](https://github.com/VirtusLab/git-machete-intellij-plugin#git-machete-intellij-plugin)
or [git-machete CLI](https://github.com/VirtusLab/git-machete#git-machete) ![a](git-machete-fading)


## Communication good practices
### 26 nov 2020

In business/technical communication, regardless of language (English, Polish, ...)
and whether it's written or spoken:

![](one) Beware of relying too much on the pronouns like `that`, `this`, `those`, `its` etc. ![](goncern) <br/>
They quickly become confusing in complex sentences
(_does this "its" refer to the 1st, 2nd or 3rd thing you've mentioned?_) ![a](async-parrot) <br/>
It's better to repeat explicitly what you're referring to(it's not a high school essay, repetitions are okay),
or at least use more unambiguous constructs like `the former` / `the latter` ![](male-teacher)

![](two) Beware that negations (`not`, `...n't`) can easily go unnoticed by the reader/listener...
thus completely inverting the sense of the sentence ![](stop-sign) <br/>
It's a good practice to stress the `NOT` word and `UN-`/`IN-`/`IM-`/...
prefixes both in written and spoken language ![](writing_hand) <br/>
**Side note**: probably the most notorious English word in this regard is `can't`,
which sounds very similar to `can` ![](dramat) <br/>
Trick: pronounce a different vowel in `can` (`/kæn/`) and in `can't` (`/kɑːnt/`),
that's easier to notice than just the `t` at the end or lack thereof ![](spurdo-phone)


## Safe initialization
### 11 Dec 2020

In Java/Scala, avoid **calling instance methods from constructors**.
This heavily increases the risk of a `NullPointerException`,
since some final fields (Java)/vals (Scala) might still be **UN**initialized yet,
while the methods might implicitly rely on them already being initialized ![a](this_is_fine)

Note that even if all fields/vals of the given class `X` are already initialized
when calling method `foo` from `X`'s constructor... it still isn't enough ![](poorly-renovated-spurdo) <br/>
**If class `X` isn't final**, then the invocation of `X` c'tor might still be followed
by an invocation of **subclass** (say, `Y`) **c'tor**. <br/>
If method `foo` is overridden in `Y`, and `Y#foo` **accesses some fields/vals
defined in `Y`** (rather than in `X`), then an access to an uninitialized field
can still happen ![](sad_pepe)

Fun fact: a complete (zero-NPE) compile-time solution of this problem for Java
is provided by [Nullness Checker](https://checkerframework.org/manual/#nullness-checker),
at the expense of adding a significant (mental) overhead to the type system.
You'll be especially surprised how non-intuitive it is to
[null-safely initialize cyclic structures](https://checkerframework.org/manual/#circular-initialization) ![](hushed)
