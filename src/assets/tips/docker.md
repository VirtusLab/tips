## Don't blow a docker image
### 12 May 2020

Docker images tend to get bloated (1GB+) very quickly after
installing extra software... even if the base image is
a lightweight `alpine` or `debian:slim` ![](blowfish)

Make sure the software that's **only necessary during the image
build** doesn't make it to the final image ![](building_construction) <br/>
Note that the following pattern of Dockerfile instructions does
NOT help and even makes the overall situation worse:

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
