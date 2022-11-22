'use strict'

var GHOST = '👻'
var gGhosts = []
var ghostOnMap = 3
var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < ghostOnMap; i++) {

        createGhost(board)


    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 6,
            j: 8
        },
        currCellContent: FOOD,
        
    }

    gGhosts.push(ghost)


    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')

}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver()
        return
    }
    if (nextCell === PACMAN && gPacman.isSuper) {
        killGhost(ghost.location)
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    // console.log(ghost)
    return `<span>${GHOST}</span>`
}
// style="background-color:${ghost.backGroundColor}
// style="color:${getRandomColor()};"

function killGhost(locationOfDeadGhost) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostLocation = gGhosts[i].location
        if (locationOfDeadGhost.i === currGhostLocation.i && locationOfDeadGhost.j === currGhostLocation.j) {
            var deadGhost = gGhosts.splice(i, 1)[0]
            gGame.deadGhosts.push(deadGhost)
        }
    }
    console.log(gGame.deadGhosts)

}
function bringBackGhosts() {
    for (var i = 0; i < gGame.deadGhosts.length; i++) {
        var currGhost = gGame.deadGhosts[i]
        gGhosts.push(currGhost)
        //// update model
        gBoard[currGhost.location.i][currGhost.location.j] = GHOST
        //// update dom
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
    // gGame.deadGhosts = []
}