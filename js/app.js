/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js 
 */

const game = new Game();
const startButton = document.querySelector('#btn__reset');

startButton.addEventListener('click', e => {
    game.startGame();
});

const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', game.handleInteraction);