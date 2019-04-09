/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js 
 */

const game = new Game();
const startButton = document.querySelector('#btn__reset');
const keyboard = document.getElementById('qwerty');

// When the start button is clicked, the game will start and user interaction with the gameboard becomes active.
startButton.addEventListener('click', e => {
    game.startGame();
    keyboard.addEventListener('click', game.handleInteraction);
    window.addEventListener('keypress', game.handleInteraction);
});