## Don't blow a docker image
### 12 May 2020

Docker images tend to get bloated (1GB+) very quickly after
installing extra software... even if the base image is
a lightweight `alpine` ![](blowfish)

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
in instruction (2), it's already stored in layer (1)! ![](fuggg) <br/>
To avoid image bloat, remove the no longer
necessary packages in **the same layer where
they're installed** ![](general-spurdo)

> RUN apk add foo bar moar-packages \ <br/>
> &nbsp;&nbsp;&nbsp;&nbsp; && do-some-stuff-using-installed packages ... \ <br/>
> &nbsp;&nbsp;&nbsp;&nbsp; && apk del foo bar moar-packages <br/>


## Docker prune
### 1 Jul 2020

Run `docker images` and `docker ps -a` on your machine.
There's a good chance that there's quite a few images and/or containers
that are no longer used at this point... and that they consume a significant amount of disk space ![](ups)

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
> FROM ubuntu:latest <br/>
> COPY --from=cloned-repo /repo /repo <br/>
> WORKDIR /repo <br/>
> RUN <build command for my-awesome-repo> <br/>
> .... <br/>

`alpine/git` provides a lightweight image (<30MB) with basically just git inside ![](snow_capped_mountain) <br/>
Note that usually just the latest commit (`--depth=1`) is really needed when cloning ![a](meld-parrot)
