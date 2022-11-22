'use strict'
var countFood = 0
const WALL = '🦴'
const FOOD = '.'
const EMPTY = ' '
const powerFood = '🥩'
const CHERRY = '🍒'
var gcherryCount = 0
var gIntervalOfCherrySpawn
var gBoard
const gGame = {
    score: 0,
    isOn: false,
    deadGhosts: []
}

function onInit() {
    gGhosts = []
    gGame.deadGhosts = []
    countFood = 0
    gGame.score = 0
    gcherryCount = 0
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalOfCherrySpawn = setInterval(addCherry,15000)
}

function buildBoard() {
    const size = 14
    const board = []

    for (var i = 0; i < size ; i++) {
        board.push([])
        for (var j = 0; j < size ; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = powerFood
    board[1][12] = powerFood
    board[12][12] = powerFood
    board[12][1] = powerFood
    board[3][8] = WALL
    board[3][9] = WALL
    board[3][10] = WALL
    board[6][0] = FOOD
    board[6][13] = FOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    // TODO
    document.querySelector('.btn').style.display = 'block'
    var elModel = document.querySelector('.gameOver-modal')
    var elHeader = document.querySelector('h1')
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalOfCherrySpawn)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
     elModel.style.display = 'block'
    if (countFood === 130) {
        elHeader.innerText = `you won Gj mennn`
    } else  elHeader.innerText = `you have been eaten by the ghost`

}
function addCherry() {
    var emptyLocation = getEmptyCellLocation()
    if (!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation, CHERRY)
    gcherryCount++
    if (gcherryCount === 10) clearInterval(gIntervalOfCherrySpawn)
    console.log(gcherryCount)
}

