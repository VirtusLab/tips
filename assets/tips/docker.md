## Don't bloat a docker image
### 12 May 2020

Docker images tend to get bloated (1GB+) very quickly after
installing extra software... even if the base image is
a lightweight `alpine` ![](feather)

Make sure the software that's **only necessary during the image
build** doesn't make it to the final image ![](building_construction) <br/>
Note that the following pattern of Dockerfile instructions **does
not** help and even makes the overall situation worse:

> &#35; assuming alpine here, would be `apt-get install` for Debian ofc <br/>
> RUN apk add foo bar moar-packages \ <br/>
> &nbsp;&nbsp;&nbsp;&nbsp; && do-some-stuff-using-installed packages ... # (1) <br/>
> ... <br/>
> RUN apk del foo bar moar-packages # (2) <br/>

Docker images are stored in layers corresponding to
Dockerfile instructions. Even if software is removed
in instruction (2), it's already stored in layer (1)! ![](no_good) <br/>
To avoid image bloat, remove the no longer
necessary packages in **the same layer where
they're installed** ![](blowfish)

> RUN apk add foo bar moar-packages \ <br/>
> &nbsp;&nbsp;&nbsp;&nbsp; && do-some-stuff-using-installed packages ... \ <br/>
> &nbsp;&nbsp;&nbsp;&nbsp; && apk del foo bar moar-packages <br/>


## Docker prune
### 1 Jul 2020

Run `docker images` and `docker ps -a` on your machine.
There's a good chance that there's quite a few images and/or containers
that are no longer used at this point... and that they consume a significant amount of disk space ![a](this_is_fine)

To clean up images that are neither tagged nor used by any container, use `docker image prune`.
To additionally remove all stopped containers before pruning the images, use `docker system prune` ![](spurdo-thumbs-up)

Along these lines: how many times have you actually needed to `docker restart` a stopped container?
Most of the time, the container can be discarded right after `docker run` is completed.
To ensure automatic removal after completion, use `--rm` flag: `docker run --rm <image> [<command>]` ![](wastebasket)


## Multi-stage builds
### 15 Jul 2020

If you need a certain piece of software (like `git`) only during the image build
but not in the resulting image, you can use the **multi-stage builds** in your Dockerfile:

> FROM alpine/git:latest as cloned-repo <br/>
> RUN git clone --depth=1 https://github.com/VirtusLab/my-awesome-repo.git /repo <br/>
> &#35;&#35;&#35; Everything from the first stage will be discarded unless explicitly `COPY`-ed in a subsequent stage <br/>
> <br/>
> FROM ubuntu:latest <br/>
> COPY --from=cloned-repo /repo /repo <br/>
> WORKDIR /repo <br/>
> RUN &lt;build command for my-awesome-repo&gt; <br/>
> .... <br/>

`alpine/git` provides a lightweight image (<30MB) with basically just git inside ![](snow_capped_mountain) <br/>
Note that usually just the latest commit (`--depth=1`) is really needed when cloning ![a](meld-parrot)


## Keeping secrets secure
### 18 Jan 2021

Beware of leaving credentials/access tokens etc. in a Docker image after the build &mdash;
they can easily fall into unauthorized hands ![](scream)

If any secret needs to be available during the image build (e.g. to download private packages),
**do not** `COPY` it into the image, even if it's later `rm`ed ![](stop-sign) <br/>
It will still remain in the image layer generated for the `COPY` instruction ![](copy)

Also, **do not** pass the secret's content via `ARG foo`/`docker build --build-arg foo=...`,
even if it isn't going to be recorded in any layer's filesystem ![](secret) <br/>
It can still be retrieved from layer metadata, see `docker history --no-trunc ...` &#10140; `CREATED BY` ![](goncern)

As of 2021, one of the best solutions (leaving no trace in any layer's filesystem or metadata)
is `RUN --mount`, here shown for `.npmrc` file:

> &#35; syntax=docker/dockerfile:experimental <br/>
> FROM node:.... <br/>
> .... <br/>
> RUN --mount=type=secret,id=npmrc,dst=$HOME/.npmrc   npm install <br/>
> ... <br/>

With this `Dockerfile`, to build the image with your local `.npmrc` file mounted just to the `RUN` step, <br/>
run  `DOCKER_BUILDKIT=1 docker build --secret id=npmrc,src=$HOME/.npmrc .` ![](bodybuilder)


## Run command inside stopped container
### 30 Mar 2021

Docker does not allow running `docker exec` on stopped containers... even though it's
sometimes pretty useful, e.g. for diagnosing the cause of the container's failure ![](frown)

Instead, first commit the container's state as a new image:
> docker commit &lt;container-id-or-name&gt; debug/my-image

and then run this image, overriding the entrypoint to a shell:
> docker run -it --rm --entrypoint=/bin/sh debug/my-image
