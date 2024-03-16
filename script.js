var fruits = [
    "apple",
    "mango",
    "grape",
    "banana",
    "strawberry",
    "pineapple",
    "orange",
    "watermelon",
    "peach",
    "pear",
    "cherry",
    "kiwi",
    "plum",
    "grapefruit"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = fruits[Math.floor(Math.random() * fruits.length)];
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button
         class="btn btn-lg btn-primary m-2"
         id='` + letter + `'
         onClick="handleGuess('` + letter + `')"
        >
        ` + letter + `
        </button>
        `).join('');

        document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
document.getElementById(chosenLetter).setAttribute('disabled', true);


if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
} else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
}
}



function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'You lost!';
    }
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'You won!';
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;


randomWord();
generateButtons();
guessedWord();