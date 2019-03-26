/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor(){
         this.missed = 0;
         this.phrases = [new Phrase("Hello there"), new Phrase("Good morning")];
         this.activePhrase = null;
     }

     startGame(){
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        console.log(this.activePhrase);
     }

     getRandomPhrase(){
        const randNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randNum];
     }

     handleInteraction(e){
        if(e.target.tagName === 'BUTTON') {
            const button = e.target;
            this.activePhrase.checkLetter(button.textContent);
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
        
     }

     gameOver(){

     }
 }