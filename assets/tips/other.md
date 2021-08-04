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
(although not a valid JSON, since quotations around strings are missing):

> { <br/>
> &nbsp;&nbsp; hello world: foo bar, <br/>
> &nbsp;&nbsp; lorem ipsum: [dolor, sit, amet] <br/>
> } <br/>


## Birthday paradox
### 19 Apr 2021

How many students there need to be in a class so that there's a 50% chance of _**any**_
(not a _given one_!) birth date to repeat, assuming each of 365 days has an equal chance
of being a birth date? ![](birthday) <br/>
The answer is counterintuitively low &mdash; only **23** (while people often say sth around 90 or 180)...
hence the birthday paradox ![](surprised_pikachu)

This insight is useful in many contexts where values from a limited set are considered...
e.g. how many [objects (commits/trees/blobs)](#git/commit-storage) there needs to be in git repository
so that there's a 50% chance that any two 7-hex-digit hash prefixes clash? ![](git)

The general approximate formula for N possible values is **1.2 × sqrt(N)**,
so since there's 16<sup>7</sup> = 2<sup>28</sup> possible values of 7-hex-digit hash prefix, <br/>
then if a repo has 1.2 × sqrt(2<sup>28</sup>) = 1.2 × 2<sup>14</sup> = ~20k objects (see [git-sizer](https://github.com/github/git-sizer)),
there's a 50% chance of a prefix clash ![](crossed_swords)


## Physical meaning of RGB scale
### 31 May 2021

Contrary to the popular belief, the 0-255 scale for each R/G/B color in RGB standard does NOT correspond to the **linear** changes
in physical brightness (~number of emitted photons) ![](stop-sign)

In fact, **50%** in a given color (`88` in hex) typically means only **~22%** of absolute physical brightness compared to `ff` ![](hushed) <br/>
Even more surprisingly, **25%** (`44` in hex) corresponds to just **~5%** of photons of `ff` ![](not-stonks)

This is related to how human vision works &mdash; we react strongly to changes in number of photons when there are few of them,
but the same (absolute) change in number of photons doesn't make much difference to us when there are many of them ![](eye)

In order to encode each R/G/B dimension effectively, the 0-255 scale corresponds to the 2.2-th root of brightness
(i.e. its value to the power of ~0.45): 0.5<sup>2.2</sup> = 0.217... ~= 22%, 0.25<sup>2.2</sup> = 0.047... ~= 5% ![](sqrt) <br/>
This way, the R/G/B values yield "denser" brightness values around zero, and sparser around 255 ![](chart_with_upwards_trend) <br/>
This gives an impression of nearly-linear progression to the human eye, while saving at least one byte on each R/G/B value ![](spurdo-thumbs-up)


## Linux desktop in a browser
### 23 Jun 2021

Have you ever wanted to have a working Linux with GUI (e.g. for testing) but you didn't want to setup a VM? ![](linux) <br/>
Here is a quick and very interesting solution: a full Linux desktop inside a docker container accessible by a web browser ![](docker) ![](web) <br/>
Images are maintained by [linuxserver.io](http://linuxserver.io/). The instruction can be found on [dockerhub page](https://hub.docker.com/r/linuxserver/webtop).
If you only want to see this in action, [this YouTube video](https://www.youtube.com/watch?v=Gd9bvdkIXOQ) is a sample overview of this solution


## YAML traps
### 23 Jul 2021

Be careful about **unquoted strings** in YAML. An innocuously looking character sequence like this one:
> gitCommitHash: 2837e65

will be interpreted as a floating point **number** (2837 × 10<sup>65</sup>) rather than a string `'2837e65'` ![](no_good)

Depending on how the parsed data is further processed, this might lead to cryptic errors down the line.
This is especially important when the value is substituted via some templating mechanism (like [Helm](https://helm.sh/)),
since then the errors can randomly come to the surface after months or years &mdash; once an ambiguous value is fed to the template ![a](this_is_fine)

Similarly, `foo: 'true'` is distinct from `foo: true`, and `bar: 2021-07-23` is distinct `from bar: '2021-07-23'`
(unlike JSON, YAML has a built-in support for dates) ![](calendar)
