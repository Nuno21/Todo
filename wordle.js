let words = ["CARRO", "CASAS", "ANDAR", "LENTE", "PEIXE"];
let word = chooseRandomWord();
let currentRow = 0;
let validationCompleted = false;
let correctGuesses = new Array(word.length * word.length).fill(false);

function chooseRandomWord() 
{
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function fillLetter(letter) 
{
    if (document.getElementById("box").style.display !== "flex") 
    {
        var row = document.getElementById(`row${currentRow}`);
        var inputs = row.getElementsByClassName("input");

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].innerText === "") {
                inputs[i].innerText = letter;
                break;
            }
        }
    }
}

function moveToNextRow() 
{
    currentRow++;
    console.log(`Moving to row ${currentRow}`);
    const nextElement = document.getElementById(`myLetters${currentRow}`);
    if (nextElement) 
    {
        nextElement.focus();
    } 
    else 
    {
        console.log("Todas as linhas foram preenchidas!");
    }
}

function checkLetter(input, index) 
{
    if (!validationCompleted) 
    {
        const inputValue = input.textContent.toUpperCase();
        const row = currentRow;
        

        if (inputValue === word[index]) 
        {
            input.style.backgroundColor = "green";
            correctGuesses[row * word.length + index] = true;
        } 
        else if (word.includes(inputValue))
        {
            const correctIndex = word.indexOf(inputValue);
            if (!correctGuesses[row * word.length + correctIndex]) 
            {
                input.style.backgroundColor = "#e4d500";
            }
            else 
            {
                input.style.backgroundColor = "#4d4d4d";
            }
        }
        else 
        {
            input.style.backgroundColor = "#4d4d4d";
        }

        const allCorrect = Array.from({ length: word.length }, (_, i) =>
            correctGuesses[row * word.length + i]
        ).every(Boolean);

        if (allCorrect) 
        {
            document.getElementById("box2").style.display = "flex";
            document.getElementById("box3").style.display = "none";
            console.log("GANHASTE O ÚLTIMO ROW!");
        }

        if (!allCorrect && currentRow == word.length - 1) 
        {
            document.getElementById("box3").style.display = "flex";
            console.log("PERDESTE O ÚLTIMO ROW!");

            const correctWord = document.getElementById("correctWord");
            correctWord.textContent = `${word}`;
        }
    }
}

function performEnterAction() 
{
    const currentRowElement = document.getElementById(`row${currentRow}`);
    const inputs = currentRowElement.getElementsByClassName("input");
    let allInputsFilled = true;

    for (let i = 0; i < inputs.length; i++) 
    {
        if (inputs[i].innerText === "") 
        {
            allInputsFilled = false;
        }
    }

    if (allInputsFilled) 
    {
        for (let i = 0; i < inputs.length; i++) 
        {
            inputs[i].classList.add("reveal-letter", `letter-delay-${i + 1}`);
            checkLetter(inputs[i], i);
        }
        moveToNextRow();
    } 
    else 
    {
        console.log("Preencha todos os espaços!!");
        document.getElementById("box").style.display = "flex";
    }
}

function ok()
 {
    document.getElementById("box").style.display = "none";
    document.getElementById("box2").style.display = "none";
}

document.addEventListener("keydown", function (event) 
{
    if (document.getElementById("box").style.display !== "flex") 
    {
        const key = event.key.toUpperCase();
        const tecladoButtons = document.querySelectorAll(".button");

        tecladoButtons.forEach((button) => 
        {
            if (button.innerText === key) 
            {
                fillLetter(key);
            }
        });
    }
});

document.addEventListener("keyup", function (event) 
{
    if (event.key === "Enter") 
    {
        performEnterAction();
    }
});

document.addEventListener("keyup", function (event) 
{
    if (event.key === "Backspace") 
    {
        backspace();
    }
});

function backspace() {
    const currentRowElement = document.getElementById(`row${currentRow}`);
    const inputs = currentRowElement.getElementsByClassName("input");

    for (let i = inputs.length - 1; i >= 0; i--)
    {
        if (inputs[i].innerText !== "") 
        {
            inputs[i].innerText = "";
            break;
        }
    }
}

function resetGame() 
{
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
        input.innerText = "";
        input.style.backgroundColor = "";
    });

    currentRow = 0;
    validationCompleted = false;
    correctGuesses = new Array(word.length * word.length).fill(false);

    document.getElementById("box").style.display = "none";
    document.getElementById("box2").style.display = "none";
    document.getElementById("box3").style.display = "none";


    word = chooseRandomWord();
    document.getElementById(`myLetters0`).focus();
}

