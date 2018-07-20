var winsCount = 0;
var lossCount = 0;
var remGuesses = 10;
var guessedLetters = [];
var wordToGuess = getNewWordToGuess();
var dashArray = [];
var winFlag = false;

document.getElementById("resetButton").addEventListener("click", resetScreen);

function resetScreen(){
    winsCount = 0;
    lossCount = 0;
    initialize();
}

function initialize() {
    dashArray = [];
    guessedLetters = [];
    winFlag = false;
    remGuesses = 10;
    document.getElementById("winStatus").style = "display: none";
    document.getElementById("winstatusrow").style = "display: none";
    document.getElementById("winsCount").innerHTML = winsCount;
    document.getElementById("lossCount").innerHTML = lossCount;
    document.getElementById("charGuessed").innerHTML = "";

    for (var i = 0; i < wordToGuess.length; i++) {
        dashArray.push("-");
    }
    document.getElementById("currentWord").innerHTML = dashArray.join(" ");
    document.getElementById("remGuess").innerHTML = remGuesses;
    var elm = document.getElementById("resetButton");
    // if(elm != null){
    //     console.log("Button element found");
    // }
}

function getNewWordToGuess() {
    var wordsArray = ["apple", "banana", "mango", "orange", "pineapple", "peach", "strawberry", "grapes", 
    "blueberry", "guava", "mulberry", "watermellon", "papaya", "cranberry", "pomegranate", "pear", 
    "apricot", "plum", "gooseberry", "jackfruit", "honeydew"];

    var randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
}

document.onkeydown = function (event) {
    var x = event.keycode || event.which;
    var letter;

    if(checkIfKeyIsAlphabet(x))
        letter = event.key;
    else
        return;

    if (winFlag) {
        initialize();
        return;
    }


    var indexArray = findCharIndex(letter);

    if (indexArray.length > 0) {
        for (var i = 0; i < indexArray.length; i++) {
            dashArray[indexArray[i]] = letter;
        }
        document.getElementById("currentWord").innerHTML = dashArray.join(" ");
    } else {
        if (!guessedLetters.includes(letter, 0)) {
            guessedLetters.push(letter);
            remGuesses = remGuesses - 1;
            document.getElementById("charGuessed").innerHTML = guessedLetters;
            document.getElementById("remGuess").innerHTML = remGuesses;
        }
    }

    if (didWeWin()) {
        winsCount = winsCount + 1;
        document.getElementById("winStatus").innerHTML = "YOU WIN";
        document.getElementById("winstatusrow").style = "display: block";
        document.getElementById("winstatusrow").style.color = "yellow";
        document.getElementById("winStatus").style = "display: inline";
        
        winFlag = true;
    }

    if (!winFlag && didWeLose()) {
        lossCount = lossCount + 1;
        document.getElementById("winStatus").innerHTML = "YOU LOSE";
        document.getElementById("winstatusrow").style = "display: block";
        document.getElementById("winstatusrow").style.color = "red";
        document.getElementById("winStatus").style = "display: inline";
        winFlag = true;
    }
}

function checkIfKeyIsAlphabet(x){
    if((x >= 65 && x <= 90 ) || (x >= 97 && x <= 122))
        return true;
    else
        return false;
}

function findCharIndex(letter) {
    var indexArray = [];
    for (var i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess.charAt(i) == letter) {
            indexArray.push(i);
        }
    }

    return indexArray;
}

function didWeWin() {
    if (wordToGuess == dashArray.join(""))
        return true;
    else
        return false;
}

function didWeLose() {
    if (remGuesses <= 0)
        return true;
    else
        return false;
}