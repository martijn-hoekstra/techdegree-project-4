/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js 
 */

const game = new Game();
const startButton = document.querySelector('#btn__reset');
const keyboard = document.getElementById('qwerty');

startButton.addEventListener('click', e => {
    game.startGame();
    keyboard.addEventListener('click', game.handleInteraction);
    window.addEventListener('keyup', game.handleInteraction);
});