function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('hidden');
}

function showElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove('hidden');
}

function setBackgroundColorById(elementId){
    const element = document.getElementById(elementId);
    element.classList.add('bg-orange-400');
}

function removeBackgroundColorById(elementId){
    const element = document.getElementById(elementId);
    element.classList.remove('bg-orange-400');
}

function getTextElementValueById(elementId){
    const element = document.getElementById(elementId);
    const elementText = element.innerText;
    const value = parseInt(elementText);
    return value;
}

function setTextValueById(elementId, value){
    const element = document.getElementById(elementId);
    element.innerText = value;
}

function getElementTextById(elementId){
    const element = document.getElementById(elementId);
    const elementText = element.innerText;
    return elementText;
}

function getARandomAlphabet(){
    const alphabetString = 'abcdefghijklmnopqrstuvwxyz';
    const alphabets = alphabetString.split('');

    const randomNumber = Math.random()*25;
    const index = Math.round(randomNumber);

    const alphabet = alphabets[index];
    return alphabet;
}

// function getARandomAlphabet() {
//     // get or create an alphabet array
//     const alphabetString = 'abcdefghijklmnopqrstuvwxyz';
//     const alphabets = alphabetString.split('');
//     // console.log(alphabets);

//     // get a random index between 0 -25
//     const randomNumber = Math.random() * 25;
//     const index = Math.round(randomNumber);
    
//     const alphabet = alphabets[index];
//     // console.log(index, alphabet);
//     return alphabet;
// }

function handleKeyboardPress(event){
    const playerPressed = event.key;
    // console.log(playerPressed);
    // if user pressed ESC game stop 
    if(playerPressed === 'Escape'){
        gameOver();
    }
    const currentAlphabetElement = document.getElementById('current-alphabet');
    const currentAlphabet = currentAlphabetElement.innerText;
    const expectedAlphabet = currentAlphabet.toLowerCase();
    // console.log(playerPressed, expectedAlphabet);
    if(playerPressed === expectedAlphabet){
        // console.log('You win a point.');
        // // update score 
        // const currentScoreElement = document.getElementById('live-score');
        // const currentScoreText = currentScoreElement.innerText;
        // const currentScore = parseInt(currentScoreText);
        const currentScore = getTextElementValueById('live-score');
        const newScore = currentScore + 1;
        setTextValueById('live-score', newScore);
        // currentScoreElement.innerText = newScore;
        // // console.log(currentScoreText)
        // // start new round 
        removeBackgroundColorById(expectedAlphabet);
        continueGame();
    }
    else{
        // console.log('You lose a point.');
        currentLife = getTextElementValueById('total-life');
        // const currentLifeElement = document.getElementById('total-life');
        // const currentLifeText = currentLifeElement.innerText;
        // const currentLife = parseInt(currentLifeText);
        const newLife = currentLife - 1;
        setTextValueById('total-life', newLife);
        // currentLifeElement.innerText = newLife;
        if(newLife === 0){
            console.log('Game Over...')
            gameOver();
        }
    }
}
// capture keyboard press key 
document.addEventListener('keyup', handleKeyboardPress);

function continueGame(){
    // step -1: generate a random alphabet
    const alphabet = getARandomAlphabet();
    // console.log('your random alphabet', alphabet);

    // set randomly generated alphabet to the screen (show it)
    const currentAlphabetElement = document.getElementById('current-alphabet');
    currentAlphabetElement.innerText = alphabet;

    // set background color
    setBackgroundColorById(alphabet);
}

function play(){
    hideElementById('home-screen');
    hideElementById('final-score');
    showElementById('play-ground');
    // reset score and life 
    setTextValueById('total-life', 3);
    setTextValueById('live-score', 0);
    continueGame();
}

function gameOver(){
    hideElementById('play-ground');
    showElementById('final-score');
    // update final score 
    const lastScore = getTextElementValueById('live-score');
    setTextValueById('final-score-text', lastScore);
    // clear the last selected alphabet highlight
    const currentAlphabet = getElementTextById('current-alphabet');
    removeBackgroundColorById(currentAlphabet);

}