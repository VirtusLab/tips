## Listing Java processes
### 30 Apr 2020

To list running `java` processes,
instead of brittle constructs like
`ps aux | grep java`, use Oracle
JDK's/OpenJDK's `jps -ml` ![](java)

> $ jps -ml <br/>
> 2102755 /usr/share/sbt/bin/sbt-launch.jar <br/>
> 2101064 com.intellij.idea.Main <br/>
> 2107882 jdk.jcmd/sun.tools.jps.Jps -ml <br/>

As opposed to `ps aux | grep java`, this only
lists the PIDs of actual `java` processes and
not the ones that just happen to contain
`java` in their args; also, JVM params (that
are typically less important) are skipped
unless `-v` option is provided; only main
class names (`-l` for FQCN) and invocation
params (`-m`) are listed ![a](shell-party)


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
In general (although not in this example), lazy vals are tricky enough to cause a `NullPointerException` &mdash;
e.g. when their evaluation indirectly leads to referencing a not-yet-initialized `val` ![a](this_is_fine) <br/>
Using them for purposes other than simple caching is questionable (unless you really understand how the directed acyclic graph of initializations of vals/lazy vals in the given class looks like) ![](goncern)


## Safe initialization
### 11 Dec 2020

In Java/Scala, avoid **calling instance methods from constructors**.
This heavily increases the risk of a `NullPointerException`,
since some final fields (Java)/vals (Scala) might still be **UN**initialized yet,
while the methods might implicitly rely on them already being initialized ![a](this_is_fine)

Note that even if all fields/vals of the given class `X` are already initialized
when calling method `foo` from `X`'s constructor... it still isn't enough ![](poorly-renovated-spurdo) <br/>
**If class `X` isn't final**, then the invocation of `X` c'tor might still be followed
by an invocation of **subclass** (say, `Y`) **c'tor**. <br/>
If method `foo` is overridden in `Y`, and `Y#foo` **accesses some fields/vals
defined in `Y`** (rather than in `X`), then an access to an uninitialized field
can still happen ![](sad)

Fun fact: a complete (zero-NPE) compile-time solution of this problem for Java
is provided by [Nullness Checker](https://checkerframework.org/manual/#nullness-checker),
at the expense of adding a significant (mental) overhead to the type system.
You'll be especially surprised how non-intuitive it is to
[null-safely initialize cyclic structures](https://checkerframework.org/manual/#circular-initialization) ![](hushed)


## Dangling Futures
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
you might want to turn it off for `Test` scope, though ![](gear)


## Objects insights in scala
### 4 Mar 2021

Regardless of whether `class Foo` has been explicitly declared, if you declare `object Foo`,
then the methods of this object will NOT be _instance_ methods of the resulting class `Foo` ![](stop-sign)

Instead, a new class `Foo$` will be generated, containing all the methods
originally declared in `object Foo`. <br/>
`Foo.getClass` will return a handle to this very `Foo$` class. <br/>
The actual `Foo$`-typed singleton instance corresponding to `object Foo` will be stored in
`MODULE$` static field of class `Foo$` ![](java) <br/> 
Btw, "module" is a term used internally in Scala for objects (e.g. in Scala Reflection APIs),
probably to discern the Scala-specific "singleton" meaning of the word "object" from the regular
OOP meaning (as in, "object" = "instance of a class") ![](mirror)

For each method in `object Foo`, however, Scala compiler will still generate a _static_ method
in class `Foo` that simply delegates the call to `Foo$.MODULE$` ![a](portal-parrot)
