/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [ board, setBoard ] = useState(Array(9).fill(null))

  const [ turn, setTurn ] = useState(TURNS.X)
  // null ganador, false empate  
  const [ winner, setWinner ] = useState(null)   

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }



  const uptadeBoard = (index) => {
    // No actualizamos esta posicion si ya tiene algo  
    if(board[index] || winner) return 
    //Actualizar el tablero 
    const newBoard = [...board]
    newBoard[index] = turn 
    setBoard(newBoard)
    // Cambiar el turno 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      } else if (checkEndGame(newBoard)) {
        setWinner(false)
      } 
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((cell, index) => {
            return (
              <Square
              key={index}
              index={index}
              uptadeBoard={uptadeBoard}
              >
                {cell}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  )
}

export default App
