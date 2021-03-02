## Binding address and port
### 3 Sep 2020

Be careful when binding a **server socket** to a port &mdash; the address you're binding to is also relevant ![](goncern)

Listening on 127.0.0.1:<port> means listening on <port> **on loopback (lo, local-only) interface** ![](loop)![](back) <br/>
Note that `localhost` is just a DNS alias for `127.0.0.1`, as defined in `/etc/hosts` on Linuxes &mdash; see `dig +short localhost` ![](shovel)

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
