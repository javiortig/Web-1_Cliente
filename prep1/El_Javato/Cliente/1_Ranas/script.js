let body = document.body;
let victoryCondition = [];
let current = [];
let next = [];
let messageBox;
let frogSound;
let errorSound;

function initializeBoard(numberGreen, numberRed) {
    let numberTotal = numberGreen + numberRed + 1;
    let upDecoration = document.getElementById("upDecoration");
    let lowDecoration = document.getElementById("lowDecoration");
    let frogSwamp = document.getElementById("frogSwamp");
    let emptySky = `<td class="emptyBox"><img src="./img/sky.png"></td>`;
    let emptyWater = `<td class="emptyBox"><img src="./img/water.png"></td>`;
    let i;
    for (i = 0; i < numberTotal; i++) {
        upDecoration.innerHTML += emptySky;
        lowDecoration.innerHTML += emptyWater;
        frogSwamp.innerHTML += `<td class="frogBox" id="${i}" onclick='update("${i}")'></td>`;
        if (i < numberGreen)
            next.push("L");
        else if (i === numberGreen)
            next.push("rock");
        else
            next.push("R");
        document.getElementById(`${i}`).innerHTML = `<img src="./img/${next[i]}.png"></td>`;
    }
    current = next;
}

function update(boxId) {
    boxId = parseInt(boxId);
    let thisBox = current[boxId];
    switch (thisBox) {
        case "L":
            if (boxId + 1 < current.length && current[boxId + 1] === "rock")
                replace(boxId, boxId + 1);
            else if (boxId + 2 < current.length && current[boxId + 2] === "rock")
                replace(boxId, boxId + 2);
            else {
                messageBox.innerHTML = "No puede saltar";
                errorSound.play();
            }
            break;
        case "R":
            if (boxId - 1 >= 0 && current[boxId - 1] === "rock")
                replace(boxId, boxId - 1);
            else if (boxId - 2 >= 0 && current[boxId - 2] === "rock")
                replace(boxId, boxId - 2);
            else {
                messageBox.innerHTML = "No puede saltar";
                errorSound.play();
            }
            break;
        case "rock":
            messageBox.innerHTML = "Las piedras no saltan";
            errorSound.play();
            break;
        default:
            messageBox.innerHTML = "Tremendo error";
            errorSound.play();
            break;
    }
    checkVictory();
}

function replace(originId, destinationId) {
    current[destinationId] = current[originId];
    current[originId] = "rock";
    document.getElementById(`${originId}`).innerHTML = `<img src="./img/${current[originId]}.png"></td>`;
    document.getElementById(`${destinationId}`).innerHTML = `<img src="./img/${current[destinationId]}.png"></td>`;
    frogSound.play();
    messageBox.innerHTML = "Boing";
}

function checkVictory() {
    let victoryFlag = true;
    for (let i = 0; i < current.length; i++) {
        if (current[i] !== victoryCondition[i]) {
            victoryFlag = false;
            break;
        }
    }
    if (victoryFlag)
        messageBox.innerHTML = "Tu ganas";
}

function generateGame() {
    let numberGreen = parseInt(document.getElementById("numberGreenFrogs").value);
    let numberRed = parseInt(document.getElementById("numberRedFrogs").value);
    document.body.innerHTML = `<table>
        <tr id="upDecoration"></tr>
        <tr id="frogSwamp"></tr>
        <tr id="lowDecoration"></tr>
    </table id="frogSwamp">
    <div id="messageBox">Press any box to start</div>
    <audio id="frogAudio">
      <source src="./frogSoundEffect.ogg" type="audio/ogg">
    </audio>
    <audio id="errorAudio">
        <source src="./WinXPError%20SoundEffect.ogg" type="audio/ogg">
    </audio>`;
    messageBox = document.getElementById("messageBox");
    frogSound = document.getElementById("frogAudio");
    errorSound = document.getElementById("errorAudio");
    for (i = 0; i < numberRed; i++) {
        victoryCondition.push("R");
    }
    victoryCondition.push("rock");
    for (i = 0; i < numberGreen; i++) {
        victoryCondition.push("L");
    }
    initializeBoard(numberGreen, numberRed);
}

function showSliderUpdate(which, x) {
    switch (which) {
        case 1:
            document.getElementById("redSliderValue").innerHTML = x;
            break;
        case 2:
            document.getElementById("greenSliderValue").innerHTML = x;
            break;
        default:
            body.innerText = "Error 418: I'm a teapot";
            errorSound.play();
            break;
    }
}

/*
<table id="frogGame">
        <tr></tr>
        <tr></tr>
        <tr></tr>
    </table>
 */