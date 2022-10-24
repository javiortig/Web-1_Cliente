let firstCard
let secondCard
let cardsId = [undefined, undefined]

function loadGame() {
    firstCard = undefined
    secondCard = undefined
    cardsId = [undefined, undefined]
    let randomNumber;
    let board = document.getElementById("game");
    let randomArray = [];
    let colourArray = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white", "gray"]
    let usedArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 18; i++) {
        randomNumber = Math.floor(Math.random() * 9);
        if (usedArray[randomNumber] !== 2) {
            usedArray[randomNumber] += 1;
            randomArray.push(colourArray[randomNumber]);
        } else {
            i--;
        }
    }
    board.innerHTML = `
    <table>
    <tr>
        <td class="${randomArray[0]}" onclick="cardClick('${randomArray[0]}', 0)" id="0"></td>
        <td class="${randomArray[1]}" onclick="cardClick('${randomArray[1]}', 1)" id="1"></td>
        <td class="${randomArray[2]}" onclick="cardClick('${randomArray[2]}', 2)" id="2"></td>
        <td class="${randomArray[3]}" onclick="cardClick('${randomArray[3]}', 3)" id="3"></td>
        <td class="${randomArray[4]}" onclick="cardClick('${randomArray[4]}', 4)" id="4"></td>
        <td class="${randomArray[5]}" onclick="cardClick('${randomArray[5]}', 5)" id="5"></td>
    </tr>
    <tr>
        <td class="${randomArray[6]}" onclick="cardClick('${randomArray[6]}', 6)" id="6"></td>
        <td class="${randomArray[7]}" onclick="cardClick('${randomArray[7]}', 7)" id="7"></td>
        <td class="${randomArray[8]}" onclick="cardClick('${randomArray[8]}', 8)" id="8"></td>
        <td class="${randomArray[9]}" onclick="cardClick('${randomArray[9]}', 9)" id="9"></td>
        <td class="${randomArray[10]}" onclick="cardClick('${randomArray[10]}', 10)" id="10"></td>
        <td class="${randomArray[11]}" onclick="cardClick('${randomArray[11]}', 11)" id="11"></td>
    </tr>
    <tr>
        <td class="${randomArray[12]}" onclick="cardClick('${randomArray[12]}', 12)" id="12"></td>
        <td class="${randomArray[13]}" onclick="cardClick('${randomArray[13]}', 13)" id="13"></td>
        <td class="${randomArray[14]}" onclick="cardClick('${randomArray[14]}', 14)" id="14"></td>
        <td class="${randomArray[15]}" onclick="cardClick('${randomArray[15]}', 15)" id="15"></td>
        <td class="${randomArray[16]}" onclick="cardClick('${randomArray[16]}', 16)" id="16"></td>
        <td class="${randomArray[17]}" onclick="cardClick('${randomArray[17]}', 17)" id="17"></td>
    </tr>
    </table>
    `;
}

function cardClick(cardClass, cardId) {
    let card = document.getElementById(cardId);
    card.style.backgroundColor = `${cardClass}`;
    console.log("Card clicked: " + cardClass);
    if (firstCard === undefined) {
        firstCard = cardClass;
        cardsId[0] = cardId;
    } else if (cardId !== cardsId[0]) {
        secondCard = cardClass;
        cardsId[1] = cardId;
        cardCheck();
    }
}

function cardCheck() {
    if (firstCard === secondCard)
        console.log("They are the same");
    else {
        console.log("They are different");
        sleep(1000).then(() => {
            let firstCardId = document.getElementById(cardsId[0]);
            let secondCardId = document.getElementById(cardsId[1]);
            firstCardId.style.backgroundColor = "";
            secondCardId.style.backgroundColor = "";
        });
    }
    firstCard = undefined;
    secondCard = undefined;
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}