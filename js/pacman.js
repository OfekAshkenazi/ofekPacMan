'use strict'

var PACMAN = '<img src="images/pacmanSmall2.png">'
var PacmanDown = '<img src="images/pacmanSmallDown.png">'
var pacmanUp = '<img src="images/pacmanSmallUp.png">'
var pacManLeft = '<img src="images/pacmanSmallLeft.png">'
var pacManRight = '<img src="images/pacmanSmall2.png">'
var gPacman
const pacmanMoveAudio = new Audio('pacman_chomp.wav')

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    pacmanMoveAudio.play()
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    /// 
    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    }

    if (nextCell === FOOD) {
        countFood++
        // 130
        if (countFood === 130) {
            gameOver()
        }
        updateScore(1)
    }

    if (nextCell === CHERRY) updateScore(10)

    if (nextCell === powerFood && gPacman.isSuper) return

    if (nextCell === powerFood && !gPacman.isSuper) {
        gPacman.isSuper = true
        for (var i = 0; i < gGhosts.length; i++) {
            const currGhost = gGhosts[i]
            GHOST = '👿'
            renderCell(currGhost.location, getGhostHTML(ev))

        }
        setTimeout(() => {
            gPacman.isSuper = false

            GHOST = '👻'

            bringBackGhosts()
        }, 5000)

    }

    if (nextCell === GHOST && gPacman.isSuper) {
        countFood--
        killGhost(nextLocation)
    }
    console.log(ev.key)
    if (ev.key === 'ArrowDown') PACMAN = PacmanDown
    else if (ev.key === 'ArrowUp') PACMAN = pacmanUp
    else if (ev.key === 'ArrowLeft') PACMAN = pacManLeft
    else if (ev.key === 'ArrowRight') PACMAN = pacManRight

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)



}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--

            break;
        case 'ArrowRight':
            if (nextLocation.i === 6 && nextLocation.j === 14) {
                nextLocation.i = 6
                nextLocation.j = 0
                gBoard[gPacman.location.i = 6][gPacman.location.j = 0] = PACMAN
            } else nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            if (nextLocation.i === 6 && nextLocation.j === -1) {
                nextLocation.i = 6
                nextLocation.j = 13
                gBoard[gPacman.location.i = 6][gPacman.location.j = 13] = PACMAN

            } else nextLocation.j--
            break;
    }
    return nextLocation
}