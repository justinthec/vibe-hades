# vibe-hades 
can we make a hades roguelike with the power of ✨vibes✨

[![Play](https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/play.svg)](https://www.jchan.me/vibe-hades/)


## TODO
 - Add some form of testing, unit tests? Some sort of functional tests?
 - Refactor the ever living shit out of this Gemini forsaken code.
 - Stop relying on enemy index to identify an enemy since that can change during slice. Add a generated ID instead and use those for checks
 - Increase the visuals of the static field to be further out by the average enemy radius since it looks like an enemy is inside the aura but they dont take damage beacuse their center point isnt in the circle
 - Change the colors of the aura and bullets etc based off the increased damage power ups
 - Fix bug where canvas size shrinks when taking power up. Reproduced by selecting 10 powerups in debug mode starting from bottom most and moving snake wise up.
