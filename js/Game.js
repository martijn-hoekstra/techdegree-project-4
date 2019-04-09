/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor(){
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
    }

    /**
     * Starts the game by removing the overlay and display a (hidden) random phrase.
     */
    startGame(){
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Returns a random Phrase object from the phrases array
     * @return {object} - returns a random Phrase object
     */
    getRandomPhrase(){
        const randNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randNum];
    }

    /**
     * Handles player interaction with the gameboard. Both mouse clicks and keypresses disables
     * the selected letters and calls relevant functions to check if the active phrase contains that letter.
     * @param {object} e - the event object coming from the addEventListener
     */
    handleInteraction(e){
        if(game.missed < 5) {
            // mouse interaction
            if(e.type === 'click'){
                if(e.target.tagName === 'BUTTON') {
                    const button = e.target;
                    game.activePhrase.checkLetter(button.textContent);
                    e.target.disabled = true;
                    e.target.classList.add('disabled');
                    game.checkForWin();
                }
            } else {
                // physical keyboard interaction
                const key = e.key.toLowerCase();
                if(/^[a-z]{1}$/.test(key)){
                    const qwerty = document.querySelectorAll('#qwerty .key');
                    for(let i = 0; i < qwerty.length; i++){
                        const button = qwerty[i];
                        if(button.textContent === key && !(button.classList.contains('disabled'))){
                            game.activePhrase.checkLetter(key);
                            button.disabled = true;
                            button.classList.add('disabled');
                            game.checkForWin();
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * Removes a heart on the screen and adds 1 to the 'missed' property.
     */
    removeLife(){
        const lifes = document.querySelectorAll('#scoreboard .tries img[src*="liveHeart"]');
        if(lifes.length){
            lifes[lifes.length - 1].src = 'images/lostHeart.png';
        }
        this.missed++;
    }

    /**
     * Checks if the player has revealed all of the letters in the active phrase
     * @return - doesn't return a value, but simply quits out of the method when the player lost
     */
    checkForWin(){
        const list = document.querySelector('#phrase ul').children;
        // checks if there are unrevealed letters, if there are it quits out of the method
        for(let i = 0; i < list.length; i++) {
            if(list[i].classList.contains('hide')){
                if(this.missed > 4) {
                    this.gameOver(false);
                }
                return;
            }
        }
        // if game has been won
        this.gameOver(true);
    }

    /**
     * Resets the gameboard and changes the overlay based on the
     * value returned from the checkForWin() method.
     * @param {boolean} state - returned from the checkForWin() method
     */
    gameOver(state){
        this.missed = 0;
        const overlay = document.getElementById('overlay');
        overlay.style.display = '';
        const gameOverMessage = document.getElementById('game-over-message');
        window.removeEventListener('keypress', game.handleInteraction);

        // change overlay based on if the player won or lost
        if(state){
            gameOverMessage.textContent = 'You won!';
            overlay.className = 'won';
        } else {
            gameOverMessage.textContent = 'You lost!';
            overlay.className = 'lost';
        }

        // reset all the keys to become active again
        const qwerty = document.querySelectorAll('#qwerty button');
        document.querySelector('#phrase ul').innerHTML = '';
        for(let i = 0; i < qwerty.length; i++) {
            if(qwerty[i].classList.contains('disabled')){
                qwerty[i].disabled = false;
                qwerty[i].classList.remove('disabled');
            }
        }

        // reset the heart images
        const lifes = document.querySelectorAll('#scoreboard .tries img[src*="lostHeart"]');
        for(let i = 0; i < lifes.length; i++){
            lifes[i].src = 'images/liveHeart.png';
        }
    }

    /**
     * Creates a new Phrase object for every phrase and returns them as an array
     * @return {array} phrases - an array of new Phrase objects
     */
    createPhrases() {
        const phrases = [
            new Phrase('Believe in yourself'),
            new Phrase('Nobody is perfect'),
            new Phrase('Winners never quit'),
            new Phrase('Stop underestimating yourself'),
            new Phrase('Coding is great')
        ];
        return phrases;
    };
 }