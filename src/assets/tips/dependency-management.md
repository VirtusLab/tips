## The great divide
### 22 May 2020

Modern dependency management systems can be (roughly, many shades in-between exist)
divided into 2 major groups based on the answer to the question: <br/>
**Should all dependencies of package X be provided to/shipped with package X in the
exact versions required by X**? ![](package) <br/>
This is in fact pretty similar to: **can any package Y live in the runtime environment
in 2+ different versions**? ![a](twins-parrot)

Common OS package managers (`apt`, `yum`/`dnf`) and dependency resolution tools for
programming languages (Maven, Gradle, sbt; pip) generally answer **no** to both questions ![](stop-sign) <br/>
The resulting platform (OS, JVM etc.) has exactly one version of each dependency. <br/>
This enables easy updates (esp. in case of bugs/security problems): each dependency needs
to be updated in just one place (`*`), but at the cost of possibly not being able
to find a combination of (dependency, version) pairs so that each dependency's compatibility
constraints are satisfied (`**`), hence the hell ![](exploding_head)

[Snap(py)](https://snapcraft.io/) package manager for Linuxes; Docker;
[OSGi](https://www.osgi.org/) for JVM generally answer
**yes** to both questions ![](spurdo-thumbs-up) <br/>
Each snap/Docker image/OSGi bundle has all its transitive dependencies baked in;
(`**`) is pretty much non-existent, but each dependency needs to be separately
updated in every place it's referenced (as opposed to `*`) ![](docker)


## JVM artifact from git repository
### 8 Jul 2020

To quickly make the given GitHub repository available as a Maven artifact
(and use as a binary dependency from Gradle/sbt/etc.), use **[jitpack.io](https://jitpack.io/)** ![](git) <br/>
For instance, to add a dependency on the artifacts of `VirtusLab/our-awesome-project`
GH repository on the commit `12ab34cd56`, just add:

> repositories { maven { url "https://jitpack.io" } } <br/>
> dependencies { compile group: 'com.github.VirtusLab', name: 'our-awesome-project', version: '12ab34cd56' } <br/>

Jitpack handles building (with `gradle build publishToMavenLocal` or `sbt publishM2`)
and caching the artifacts automatically ![](robot_face) <br/>
No account on [jitpack.io](https://jitpack.io/) and/or activating
any integration on GitHub is required for public repos ![](relieved) <br/>
This is a very handy approach, esp. if your project needs to depend on the changes
in a fork of an open-source project that have not been merged&published
in the upstream yet ![](arrow_up)


## Download a single artifact into the Ivy cache
### 23 Oct 2020

(e. g. when IntelliJ complains about missing libraries)

1. Get a distribution JAR of Apache Ivy (if you have Fedora,
   `dnf install ivy` will place it at `/usr/share/java/apache-ivy/ivy.jar`)
2. Use the `-dependency` flag, e. g.:

   > java -jar ivy.jar -dependency org.scala-lang scala-compiler 2.12.8

Ivy will complain about missing parts of project definition (duh),
but the artifact will be downloaded and stored in the cache!
