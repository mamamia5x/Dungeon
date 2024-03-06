# Dungeon
A Javascript Dungeon Game to run in the command line. This is based off the same idea of an  old project of mine called "Terminal-Dungeon" and can be found [here](https://github.com/mamamia5x/Terminal-Dungeon). 

This project has nothing to do with the old one, just the same premise. I have done numerous similar projects on this idea, and Terminal Dungeon is one of the surviving versions, along with an old battle simulator I made a while back.

`node index.js`

## Changes
* #### V.0.1.0 IP
  * ###### Build 030624.1
    * Now type `node index.js dev` to run dev mode
    * Added coins to game and spots on map
    * Coins can be a set number or a random amount in a range
  * ###### Build 030524
    * A working level editor, and a previewer
    * Dev mode. Run `node dev/liveEdit.js`
    * Working UI and a player manager system
    * Colors added somewhat
    * Better level system
    * LIVE EDITOR!
    * Dev tools, pretty nice stuff
  * ###### Build 030424
    * Created a map and file handler, which can create a linked dungeon.
    * Currently a working level editor and a working walker
    * User can exit to next level, and that is it.

## Ideas
- [ ] Terminal level editor
  - [ ] Edit last line, remove last line, Exit command
  - [ ] Runnable as well
- [ ] Maybe a UI File?
- [ ] Maybe if armor is a thing, different colors?
- [ ] Coin message?
- [ ] Messages in general?
- [ ] Coins or currency of some sort
  - [X] A coin spot on map, which will give the user x amount of $
- [ ] Main manager
  - [X] A file that sets the starting level
  - [X] Maybe has user health?
  - [ ] Custom items (or should I have default items or both?)
- [ ] Battles of some sort
  - [X] Health Bar
  - [ ] Enemy states
  - [ ] Attacking
  - [ ] Items of some sort
- [X] Game editor
  - [ ] Documentation
- [ ] Stat Levels
- [ ] Finishing game?
- [X] Colored UI and stuff
- [ ] Game handler
  - [ ] Not sure if it should be index.js or somewhere else


#### Quick .lvl doc
First line is width, second is height  
third is the spacing of each box (usually should be 3)  
The rest is just points, with it being in the format `X,Y,~`, with ~ being any character.  
It is important to have a point with the value "X", because that is the players starting point for the level.  
Anything that has the value "E" are exits. These are important, because they'll link the player to the next level. To link them, after E, put `->` and the next level name.  
Anything else, the player will not walk into. All lines that start with # are comments.  
Coins can now be added, set the character value to $. Then, after the #, put `->`, which tells the program how the player will get.  
After the `->`, you can put a solid number, or 2 numbers seperated by `:`. If a colon is in between two numbers, it'll pick a random number between the two values.  
I.e. `1,1,$->5:10` will pick a random number from 5-10, and `1,2,$->5` will just be 5.