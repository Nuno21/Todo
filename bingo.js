
let bingo = [];
const maxArraySize = 35;
let gameWon = false;
let tempoEsgotado = false; 
let timer = 600; 

function newElement()
{
    var inputValue = document.getElementById("input").value.trim();

    if (inputValue !== '') 
    {
        if(bingo.length < maxArraySize)
        {
            bingo.push(inputValue);
            document.getElementById('input').value = '';

            console.log('Array atualizado:', bingo);

            displayArray();

            document.getElementById('input').focus();

        }
        else
        {
            alert(`Você atingiu o número máximo de ${maxArraySize} elementos.`);
        }
    }  
    else
    {
        alert('Por favor, digite um valor válido.');
    }
}

function displayArray()
{
    const columns = document.querySelectorAll('.column p');
    
    if(bingo.length > columns.length)
    {
        alert('ja estão todos os espaços completos')
        return;
    }

    columns.forEach((column, index) => {
        column.textContent = bingo[index] || '';
       
    });
}

function removeByIndex(index) 
{
    if (index >= 0 && index < bingo.length) 
    {
        var removedElement = bingo.splice(index, 1)[0];
        console.log(`Elemento removido do índice ${index}: ${removedElement}`);
        displayArray();
    } 
    else 
    {
        console.log(`Índice inválido: ${index}`);
    }
}


function play()
{
    if(bingo.length >= 25)
    {
        document.getElementById("bingo").style.display = 'block';
        document.getElementById("adicionar").style.display = 'none';
        document.getElementById("titlo").style.display = 'none';
        document.getElementById("valorR").style.display = 'none';
        document.getElementById("clock-container").style.display = 'none';
        bingoElements();
    }
    else
    {
        alert("É Preciso pelos menos 25 elementos para iniciar o bingo");
    }
}

function bingoElements() 
{
    const columns2 = document.querySelectorAll('.column2 p');
    const availableIndexes = Array.from({ length: bingo.length }, (_, i) => i);

    columns2.forEach((column) => 
    {
        if (availableIndexes.length === 0) 
        {
            
            console.error('Sem elementos disponíveis.');
            return;
        }

        
        const randomIndex = Math.floor(Math.random() * availableIndexes.length);
        
        const chosenIndex = availableIndexes.splice(randomIndex, 1)[0];

        const randomElement = bingo[chosenIndex];
        column.textContent = `"${randomElement}"`;
    });
}


function preencherArrayBingo() 
{

    const numerosPossiveis = Array.from({ length: 100 }, (_, i) => i + 1);

    for (let i = 0; i < 100; i++) 
    {
        const indiceAleatorio = Math.floor(Math.random() * numerosPossiveis.length);
        const numeroSelecionado = numerosPossiveis.splice(indiceAleatorio, 1)[0];
        bingo.push(numeroSelecionado);
    }

    document.getElementById('adicionar').style.display = 'none'
    document.getElementById('titlo').style.display = 'none'
    document.getElementById('bingo').style.display = 'block';
    document.getElementById('selection').style.display = 'none';
    bingoElements();
    displayBingoValue();

    return bingo;
}

let bingoIndex = 0; 

function displayBingoValue() 
{
    const valorRDiv = document.querySelector('.valorR');
    
    if (tempoEsgotado || gameWon) 
    {
        return;
    }
    
    if (bingoIndex < bingo.length)
    {
        valorRDiv.textContent = bingo[bingoIndex];
        bingoIndex++;

        setTimeout(displayBingoValue, 5000);
    } 
    else 
    {
        valorRDiv.textContent = "All values displayed"; 
    }
}

const clockElement = document.getElementById("clock");

function formatarTempo(segundos)
{
    const minutos = Math.floor(segundos / 60);
    const segundosFormatados = segundos % 60;
    return `${minutos}:${segundosFormatados < 10 ? '0' : ''}${segundosFormatados}`;
}


function atualizarRelogio() 
{
    if (timer === 0) 
    {
        clearInterval(intervalId); 
        clockElement.textContent = "00:00";
        document.getElementById('box3').style.display ='flex';
        tempoEsgotado = true;
    } 
    else 
    {
        clockElement.textContent = formatarTempo(timer);
        timer--;
    }
}

const intervalId = setInterval(atualizarRelogio, 1000);


function toggleColor(event) 
{
    const clickedColumn = event.currentTarget;

    clickedColumn.style.backgroundColor =
        clickedColumn.style.backgroundColor === "green" ? "" : "green";
    clickedColumn.style.color =
        clickedColumn.style.color === "white" ? "black" : "white"; 

     clickedColumn.classList.toggle("winner");
    
        checkVictory();
}

const winningPositions = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
];

function checkVictory() 
{
    for (const position of winningPositions) 
    {
        const [a, b, c, d, e] = position;
        const columnA = document.getElementById(`column2_${a}`);
        const columnB = document.getElementById(`column2_${b}`);
        const columnC = document.getElementById(`column2_${c}`);
        const columnD = document.getElementById(`column2_${d}`);
        const columnE = document.getElementById(`column2_${e}`);
        
        if (columnA.textContent && columnB.textContent && columnC.textContent && columnD.textContent && columnE.textContent &&
            columnA.classList.contains("winner") &&
            columnB.classList.contains("winner") &&
            columnC.classList.contains("winner") &&
            columnD.classList.contains("winner") &&
            columnE.classList.contains("winner")) 
        {
            gameWon = true;
            document.getElementById("box2").style.display = "flex";
        }

        if (gameWon) 
        {
            clearInterval(intervalId); // Parar o intervalo quando o jogo é ganho
        }
    }
}

document.addEventListener("keyup", function (event) 
{
    if (event.key === "Enter") 
    {
        newElement();
    }
});

document.querySelectorAll('.column').forEach(column => 
    {
    column.addEventListener('click', () => 
    {
        showRemoveButton(column);

    });
});

function personalizado()
{
    document.getElementById('selection').style.display = 'none';
    document.getElementById('titlo').style.display = 'flex';
    document.getElementById('adicionar').style.display = 'flex';
}


    