## Force push and hard reset
### 25 March 2020

**Do not** use `git push --force`. Use `git push --force-with-lease` ![](muscle) <br/>
This will prevent you from accidentally overwriting the history pushed to the same branch by someone else in the meantime.

**Do not** use `git reset --hard`. Use `git reset --keep` ![a](hard-hat-parrot) <br/>
This will prevent you from accidentally losing uncommitted files.

For more details, see [slide 3](http://slides.com/plipski/git-linear-history#/3) and [slide 7](http://slides.com/plipski/git-linear-history#/7)
from Paweł Lipski's `Painless Linear History in Git` presentation


## Previous branch shortcut
### 27 March 2020

Use `git checkout -` or `git switch -` to check out the **previously checked-out branch** ![](leftwards_arrow_with_hook) <br/>
The same also works with `git merge -`, `git rebase -` and `git cherry-pick -` ![](cherries) ![](pick)

Btw, `cd -` goes into the previous directory in many shells ![](bash)


## Upstream
### 6 Apr 2020

Next time you do `git push`, add `-u`/`--set-upstream` (or enhance your favorite `gp`/`ggpush`/... alias).<br/>
The perks include:

![](one)  Remote tracking branch info in `git status`:

> $ git status<br/>
> On branch feature/ABC-123<br/>
> Your branch is behind 'origin/feature/ABC-123' by 1 commit, and can be fast-forwarded.

![](two)  `@{upstream}` (`@{u}` for short) resolves to the remote counterpart of the current branch in many contexts, like:
* `git diff @{u}`, much more convenient than `git diff origin/feature/ABC-123`
* `git reset --keep @{u}`, pretty convenient way to (safely! `--keep` FTW) reset the state of branch to whatever is in the remote tracking branch.


## Git rebase
### 24 Apr 2020

To cut-and-paste an arbitrary segment of git history into
another place, use the most general form of `git rebase` ![](scissors):

> git rebase --onto <A=new-base> <B=commits-until> <C=branch-to-rebase>

This means take the _commits from branch C (inclusive) back until
commit B (exclusive) and reapply it onto  the commit A_ ![](krakow) <br/>
Assuming you're on a branch `feature/foo` that has 3 commits
and that's built upon branch `feature/base`, a typical
invocation will look like:

> git rebase --onto feature/base feature/foo~3 feature/foo

Note that the common form `git rebase feature/base`
is just a special case of the `--onto A B C`
invocation that assumes certain (often incorrect)
default values ![](fuggg)

Also, it's almost always a good idea to also
pass `-i`/`--interactive` option to rebase (or select
`Interactive mode` in IntelliJ); this way you can
preview what is going to happen or even cancel
the rebase if the range of commits turns out
incorrect ![a](worg-brom-gome)


## Commits storage mechanism
### 7 May 2020

Contrary to the popular belief, git does not store
commits as **diffs** (well known from `git diff`,
`git log -p`, `git show` or GitHub/Bitbucket commit/PR view). <br/>
Instead, commits are stored as **full snapshots**
of the entire repository ![](camera_with_flash)

This would lead to a massive disk space waste if
approached naively... but git optimizes the storage
by identifying the files (_blobs_ in gitspeak) and
directories (_trees_ in gitspeak) by SHA-1 hash of
their contents, thus never storing two copies of
an identical file/directory ![](fashtag)

See `git cat-file -p HEAD` for the internal representation
of the current commit; `tree <hash>` points to the
directory snapshot recorded in `HEAD`. <br/>
`git cat-file -p HEAD^{tree}`, in turn, shows the
representation of this directory snapshot, which
keeps pointers to snapshots of its subdirectories etc ![a](nyan-cat)

This approach is excellent for source code since it's
typically consisted of small files; storage of large
files that are often changed and/or removed over the
course of git history is in turn inefficient (hence
the need for e.g. [Git LFS](https://git-lfs.github.com/)) ![a](github-parrot)


## Remove unnecessary remote branches
### 28 May 2020

`git fetch` by default does not remove
local "mirrors" (`origin/...`) of the
branches that have been removed in the
remote repository ![](wastebasket) <br/>
It only adds/updates the mirrors for the
branches that have been created/updated
in the remote since the last fetch ![](arrow_down) <br/>
The side effect is that local git repositories
usually accumulate a massive number of useless
mirrors even after their counterparts are long
gone from the remote repository
(see `git branch -r` in your repo now) ![](fuggg)

To make sure `git fetch` also removes your local
`origin/...` branches corresponding to the branches
already removed in the remote, pass `-p`/`--prune` flag: <br/>
`git fetch -p` ![a](rhytmical-parrot)
