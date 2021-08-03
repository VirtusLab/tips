## JetBrains products management
### 23 Mar 2021

To easily manage what JetBrains products are installed on your machine (as well as manage their updates),
use [JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/):

![jetbrains toolbox](jetbrains_toolbox.png)


## Linking issues in JB IDEs
### 7 May 2021

If you want to reference issues in your code from JetBrains IDE, you can add a regex pattern
to the settings and go directly to the issue by just clicking on it in the comment.
1. `Preferences` -> `Issue Navigation`
2. ![](heavy_plus_sign)
3. A simple regex:

> Issue ID: #(\d+) <br/>
> Issue link: https://github.com/VirtuslabRnD/&lt;project&gt;/issues/$1

4. Now you can just click on the link in the comment (with Command on Mac), and you go directly to the issue on GitHub!

This setting is kept on a per-project basis, so you don't need to worry about overwriting the settings.


## Permanent functional keys
### 17 May 2021

On MacBook with Touch Bar you can enable permanent functional keys in PyCharm (or other Jetbrains IDE)
by enabling the setting `Preferences > Keymap > Show F1, F2, etc. keys on the Touch Bar`
