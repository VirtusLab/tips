## Early evaluation of lazy val
### 24 Aug 2020

Contrary to the popular misconception, a `lazy val` in Scala can be evaluated **earlier**
than it would be if it was a regular non-lazy `val` ![](hushed) <br/>
Consider the following example:

> class Foo { <br/>
> &nbsp;&nbsp; val bar = f(qux) <br/>
> &nbsp;&nbsp; lazy val qux = somePostponedOperation() <br/>
> &nbsp;&nbsp; // .... <br/>
> } <br/>

`qux`, despite being lazy, will be evaluated quicker than it would if it wasn't lazy ![](sloth) <br/>
In general (although not in this example), lazy vals are tricky enough to cause a `NullPointerException`
- e.g. when their evaluation indirectly leads to referencing a not-yet-initialized `val` ![a](this_is_fine) <br/>
Using them for purposes other than simple caching is questionable (unless you really understand how the directed acyclic graph of initializations of vals/lazy vals in the given class looks like) ![](goncern)


## Futures
### 9 Feb 2021

When using Futures in Scala, beware of leaving them **dangling**
(i.e. not assigned to any val and not returned from the method):

> def foo(...): Future[...] = { <br/>
> &nbsp;&nbsp; myService.doSideEffectingAction() // returns a Future <br/>
> &nbsp;&nbsp; anotherService.doAnotherAction() // returns another Future... but WHOOPS where's a `for` or `flatMap`? <br/>
> } <br/>

Since Futures are **eager** (executed as soon as they're created), `doSideEffectingAction`
will unintentionally run in parallel with `doAnotherAction`... which may lead to **race conditions**
and spurious failures in tests (or even in production env) ![a](async-parrot)

To systematically prevent it from ever happening, add both `-Ywarn-value-discard`
(expressions returning non-Unit value cannot be used as statements) and
`-Xfatal-warnings` (each warning is an error) to `scalacOptions`;
you might want to turn it off for Test scope, though ![](gear)
