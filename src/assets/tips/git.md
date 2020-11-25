## Force push and hard reset
### 25 March 2020

**Do not** use `git push --force`. Use `git push --force-with-lease` ![](muscle) <br/>
This will prevent you from accidentally overwriting the history pushed to the same branch by someone else in the meantime.

**Do not** use `git reset --hard`. Use `git reset --keep` ![a](hard-hat-parrot) <br/>
This will prevent you from accidentally losing uncommitted files.

For more details, see http://slides.com/plipski/git-linear-history#/3 and http://slides.com/plipski/git-linear-history#/7


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
