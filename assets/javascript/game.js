var winsCount = 0;
var lossCount = 0;
var remGuesses = 10;
var guessedLetters = [];
var wordToGuess = getNewWordToGuess();
var dashArray = [];
var winFlag = false;

function initialize() {
    dashArray = [];
    guessedLetters = [];
    winFlag = false;
    document.getElementById("winStatus").style = "display: none";
    document.getElementById("winsCount").innerHTML = winsCount;
    document.getElementById("lossCount").innerHTML = lossCount;

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

    if(winFlag){
        initialize();
        return;
    }
        

    var indexArray = findCharIndex(letter);

    if(indexArray.length > 0){
        for(var i = 0; i < indexArray.length; i++){
            dashArray[indexArray[i]] = letter;
        }
        document.getElementById("currentWord").innerHTML = dashArray.join(" ");
    } else{
        if(!guessedLetters.includes(letter, 0)){
            guessedLetters.push(letter);
            remGuesses = remGuesses - 1;
            document.getElementById("charGuessed").innerHTML = guessedLetters;
            document.getElementById("remGuess").innerHTML = remGuesses;
        } 
    }

    if(didWeWin()){
        winsCount = winsCount + 1;
        document.getElementById("winStatus").innerHTML = "YOU WIN";
        document.getElementById("winStatus").style = "display: block";
        winFlag = true;
    }
}

function findCharIndex(letter){
    var indexArray = [];
    for(var i = 0; i < wordToGuess.length; i++){
        if(wordToGuess.charAt(i) == letter){
            indexArray.push(i);
        }
    }

    return indexArray;
}

function didWeWin(){
    if(wordToGuess == dashArray.join(""))
        return true;
    else
        return false;
}