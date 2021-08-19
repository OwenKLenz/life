# Conway's Game of Life

My take on [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

Play here: https://oklenz.com/life/

## Features:
- **"Multiplayer" via websockets**
  - Adding/removing cells by clicking on the grid and starting/stopping the life cycle is viewable by all connected clients
  - Speed and rule changes are currently shared between clients
- **Play with different colors and watch them evolve**
  - Select from a variety of different colors to manually create differently colored cells.
  - Newly "birthed" cells derive their color from their neighbors, leading to an interesting gradient effect as the cells evolve
- **Change the length of each generation to speed up or slow down the simulation**
- **Adjust the rules governing when new cells are born and when cells die and watch the cell behavior change in real time.**
