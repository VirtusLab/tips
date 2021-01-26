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
of content similarities between files ![](microsoft)

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

