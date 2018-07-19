var winsCount = 0;
var lossCount = 0;
var remGuesses = 10;
var guessedLetters = [];

function initialize() {
    
    var wordToGuess = getNewWordToGuess();
    
    document.getElementById("winsCount").innerHTML = winsCount;
    document.getElementById("lossCount").innerHTML = lossCount;
    var dashArray = [];

    for(var i = 0; i < wordToGuess.length; i++){
        dashArray.push("-");
    }
    document.getElementById("currentWord").innerHTML = dashArray.join(" ");
    document.getElementById("remGuess").innerHTML = remGuesses;
}

function getNewWordToGuess(){
    var wordsArray = ["apple", "banana", "mango", "orange", "pineapple"];
    var randomIndex = Math.floor(Math.random() * 5);
    return wordsArray[randomIndex];
}

document.onkeydown = function(event){
    var letter = event.key;
    if(!guessedLetters.includes(letter, 0)){
        guessedLetters.push(letter);
    }
    document.getElementById("charGuessed").innerHTML = guessedLetters;
}