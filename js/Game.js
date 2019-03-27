/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor(phrases){
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
     }

     createPhrases() {
        const phrases = [];
        phrases.push(new Phrase('Believe in yourself'));
        phrases.push(new Phrase('Nobody is perfect'));
        phrases.push(new Phrase('Winners never quit'));
        phrases.push(new Phrase('Stop underestimating yourself'));
        return phrases;
    };

     startGame(){
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        console.log(this.activePhrase);
     }

     getRandomPhrase(){
        const randNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randNum];
     }

     handleInteraction(e){
        if(e.target.tagName === 'BUTTON') {
            const button = e.target;
            game.activePhrase.checkLetter(button.textContent);
            e.target.disabled = true;
            e.target.classList.add('disabled');
            game.checkForWin();
        }
     }

     removeLife(){
        const lifes = document.querySelectorAll('#scoreboard .tries img[src*="liveHeart"]');
        if(lifes.length){
            lifes[lifes.length - 1].src = 'images/lostHeart.png';
        }
        this.missed++;
     }

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

     gameOver(state){
        this.missed = 0;
        const overlay = document.getElementById('overlay');
        overlay.style.display = '';
        const gameOverMessage = document.getElementById('game-over-message');

        if(state){
            gameOverMessage.textContent = 'You won!';
        } else {
            gameOverMessage.textContent = 'You lost!';
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
 }