# The Game of Life

### Rules:
Neighbor: A square that is up, down, left, right or corner adjacent.

1. 0 or 1 neighbor === death
2. 2 or 3 neighbors === survival
3. 4+ neighbors === death
4. 3 neighbors bordering an empty cell brings it to life

### The Program:
**Nouns:**
- Cells
  - 10px x 10px
  - class set to "alive" or "dead"
- Row
  - N x 1 cells
- Grid
  - width
	- height
	- rows
  - 100 cells x 100 cells
- Rules
  - Count neighbors for a cell, run switch statement to alter cell's state
  - Extra: Rules Array of functions that are iterated over and applied for each space

Create grid:
1. Retrieve grid div
2. Height times, grab
Updating The Board:
1. Iterate across each space
  - Count the neighbors
  - Run rules
  - If space changes to dead, add coords to "killList"
  - "                 " alive, add coords to "liveList"
2.  Iterate across killList and liveList and change state of cells


### TODO:
- Fix the "click events not being properly received" issue
- Merge colors branch to main
- Deploy to droplet and figure out socket.io issue
- Create CD pipeline with Github Actions

###Reach Goals:
- Templates
- Ability to "export" current state
- Ability to save states
