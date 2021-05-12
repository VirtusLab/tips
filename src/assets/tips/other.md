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
the machine &mdash; which is typically **different from UTC**! ![](scream)

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


## YAML vs JSON
### 17 Jul 2020

It's a relatively unknown fact that YAML is designed as a **strict superset** of JSON... so every valid JSON is also a valid YAML ![a](cooo) <br/>
Just try pasting any JSON as an input to a YAML&#10140;JSON (not the other way round!)
[converter like this one](http://onlineyamltools.com/convert-yaml-to-json) ![](wrench) <br/>
In particular, the below is a valid YAML
(although not a valid JSON, since quotation around multi-word strings is missing):

> { <br/>
> &nbsp;&nbsp; hello world: foo bar, <br/>
> &nbsp;&nbsp; lorem ipsum: [dolor, sit, amet] <br/>
> } <br/>


## JetBrains products management
### 23 Mar 2021

To easily manage what JetBrains products are installed on your machine (as well as manage their updates),
use [JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/):

![jetbrains toolbox](jetbrains_toolbox.png)


## Birthday paradox
### 19 Apr 2021

How many students there need to be in a class so that there's a 50% chance of _any_ 
(not a _given one_!) birth date to repeat, assuming each of 365 days has an equal chance
of being a birth date? ![](birthday) <br/>
The answer is counterintuitively low – only **23** (while people often say sth around 90 or 180)...
hence the birthday paradox ![](surprised_pikachu)

This insight is useful in many contexts where values from a limited set are considered...
e.g. how many [objects (commits/trees/blobs)](#git/commit-storage) there needs to be in git repository
so that there's a 50% chance that any two 7-hex-digit hash prefixes clash? ![](git)

The general approximate formula for N possible values is **1.2 × sqrt(N)**,
so since there's 16^7 = 2^28 possible values of 7-hex-digit hash prefix, <br/>
then if a repo has 1.2 × sqrt(2^28) = 1.2 × 2^14 = ~20k objects (see [git-sizer](https://github.com/github/git-sizer)),
there's 50% chance of a prefix clash ![](crossed_swords)


## Issues link in JB products
### 7 May 2021

If you want to reference issues in your code from JetBrains IDE, you can add a regex pattern
to the settings and go directly to the issue by just clicking on it in the comment.
1. `Preferences` -> `Issue Navigation`
2. ![](heavy_plus_sign)
3. A simple regex:

> Issue ID: #(\d+) <br/>
> Issue link: https://github.com/VirtuslabRnD/&lt;project&gt;/issues/$1

4. Now you can just click on the link in the comment (with command on Mac)
   and you go directly to the issue on github!
   
This is saved per project, so you don’t need to worry about overwriting the settings.
