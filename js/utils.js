'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            /// to do!!!
            // const secondClassName = ' wall'
            strHTML += `<td class="${className}">${cell}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

//// to do implant class name to walls
// if (i === 0 || i === size - 1 ||
//     j === 0 || j === size - 1 ||
//     (j === 3 && i > 4 && i < size - 2)) {
//     board[i][j] = WALL
// }


// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function restGame() {
    onInit()
    //// for rest score in span 
    document.querySelector('.btn').style.display = 'none'
    document.querySelector('h2 span').innerText = gGame.score
    document.querySelector('.gameOver-modal').style.display = 'none'
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getEmptyCellLocation() {
    var listOfEmptyCells = []
    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === WALL || currCell === FOOD || currCell === GHOST || currCell === powerFood || currCell === PACMAN) continue
            listOfEmptyCells.push({ i, j })


        }
    }
    var randomCell = getRandomInt(0, listOfEmptyCells.length)
    return listOfEmptyCells.splice(randomCell, 1)[0]

}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}