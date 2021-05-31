## Local Kubernetes cluster
### 5 Aug 2020

To spin up a development Kubernetes cluster locally (or from a VM in a CI)
as easily as possible, use **kind** ([Kubernetes in Docker](https://kind.sigs.k8s.io)) ![](heavy_check_mark)
Just run `kind create cluster` and the new cluster's data should be automatically added into `~/.kube/config` ![](gear)

Kind uses Docker containers (by default, `kindest/node` image) as cluster's nodes.
This is much lighter & more CI-suitable approach than what `minikube` offers
(cluster within a dedicated VM); also, typically less troubleshooting is needed ![](sleuth_or_spy)


## Switching context/namespace with ease
### 8 Oct 2020

To easily switch between k8s contexts, use [kubectx](https://github.com/ahmetb/kubectx) ![](github)

`kubectx` lists the contexts, `kubectx <context>` switches to the given context, `kubectx -`
switches to the previously chosen context, which is useful when shuttling between local
Kind/minikube and a remote development cluster ![](arrows_counterclockwise)

`kubens` is a similar tool but for moving between Kubernetes namespaces ![](space_invader)


## Custom Kubernetes commands
### 26 Oct 2020

Just as with git subcommands, if `kubectl-X` executable is available on `PATH`,
then `kubectl X` is a valid subcommand ![](hushed)

This makes creating pseudo-aliases possible: <br/>
if a script `kubectl-g` doing just `kubectl get -o yaml "$@"` lives under `/usr/local/bin/`, <br/>
and `kubectl` itself is aliased in the shell as `k`, <br/>
then e.g. `k g ing` is enough to get the ingresses in the current namespace in YAML format ![](hacker)

Other useful pseudo-aliases might include `k pf` for `kubectl port-forward`, `k desc` for `kubectl describe`,
`k del` for `kubectl delete` etc. ![a](party-k8s)
