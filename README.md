[Website can be accessed here](https://gentle-brushlands-37339.herokuapp.com/)  

[hour tracking](https://github.com/eeropu/note-game/blob/master/docs/hours.md)  

[back end code here](https://github.com/eeropu/note-game-backend)

# Note game

This is a game for guitarists to practice reading musical notation and improve their knowledge of where each note is on the fretboard.
More detailed info is found on [the frontpage](https://gentle-brushlands-37339.herokuapp.com/)

## Instructions  

On the front page you'll find basic info about the program and how to use it. On [tuner](https://gentle-brushlands-37339.herokuapp.com/tuner) page
you can tune you instrument and on the [game](https://gentle-brushlands-37339.herokuapp.com/game) page you can play.

### Playing  

The basic idea of the game is to play random notes that the game selects for the player. This makes the player more familiar with where each note is located on the fretboard.

### Game modes

You can select game mode from the game tabs settings by pressign the settings button. The possibilities are text, musical notation or test mode.
In the text mode, the notes will be shown as text, for example C#4 and on the musical notation mode, they will be shown as notes on a staff.
In the test mode, notes are shown in musical notation and the playing is timed. Player needs to play 20 randomly selected notes as fast as
possible and the game shows how much time it took. If the user is signed in, the result can be saved. Later user can check his or her best times in each
key and position from the [my progress page](https://gentle-brushlands-37339.herokuapp.com/my-progress).

### Selecting key and position  

On the game page user can select the [key](https://en.wikipedia.org/wiki/Key_(music)) that is going to be played, this will determine what notes can be randomly picked.
The position is more guitar related as this limits the range of that specific key. For instance the first position contains notes that can be played with open strings
and each string's first four frets. The second position is frets 2 to 5, third is 3 to 6 and so on.

### Using the tuner  

Tuner starts when user clicks the start button. Then, when a note is played the tuner will show what note it was. If the tuner picks up a lot of 
background noices or does not react to the played note, user can adjust the clarity threshold slider which makes the note detection more or less sensitive.

### Results

The results can be accessed from the top navigation bar's right end, when the user is logged in. Clicking the users name will open a dropdown menu and the 
results are on the My progress page. Results are displayed as a table with each cell representing particular key and position combination. If there are no results
for that combination, there will be a "-". When there is a result, if the user hovers mouse above it, it shows the date when that record was made.