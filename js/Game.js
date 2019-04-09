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
     * Starts the game by removing the overlay and displays a (hidden) random phrase.
     */
    startGame(){
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        // console.log(this.activePhrase);
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
     * 
     * @param {object} e - the event object coming from the addEventListener
     */
    handleInteraction(e){
        if(game.missed < 5) {
            if(e.type === 'click'){
                if(e.target.tagName === 'BUTTON') {
                    const button = e.target;
                    game.activePhrase.checkLetter(button.textContent);
                    e.target.disabled = true;
                    e.target.classList.add('disabled');
                    game.checkForWin();
                }
            } else {
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
     * 
     * @return - doesn't return a value, but simply quits out of the method when the user lost
     */
    checkForWin(){
        const list = document.querySelector('#phrase ul').children;
        // checks if there are unrevealed letters, if there are it quits the function
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
     * 
     * @param {boolean} state - returned from checkForWin()
     */
    gameOver(state){
        this.missed = 0;
        const overlay = document.getElementById('overlay');
        overlay.style.display = '';
        const gameOverMessage = document.getElementById('game-over-message');
        window.removeEventListener('keyup', game.handleInteraction);

        if(state){
            gameOverMessage.textContent = 'You won!';
            overlay.className = 'won';
        } else {
            gameOverMessage.textContent = 'You lost!';
            overlay.className = 'lost';
        }

        const qwerty = document.querySelectorAll('#qwerty button');
        document.querySelector('#phrase ul').innerHTML = '';
        for(let i = 0; i < qwerty.length; i++) {
            if(qwerty[i].classList.contains('disabled')){
                qwerty[i].disabled = false;
                qwerty[i].classList.remove('disabled');
            }
        }

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