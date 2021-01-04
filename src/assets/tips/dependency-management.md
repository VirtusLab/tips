## Dependency (Hell) Management
### 22 May 2020

Modern dependency management systems can be (roughly, many shades in-between exist)
divided into 2 major groups based on the answer to the question: <br/>
**Should dependency of package X be provided to/shipped with package X in the
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
