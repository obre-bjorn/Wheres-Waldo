import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"


import Game from "../components/Game"
import Modal from "../components/Modal"


const GamePage = () => {

    const {gameId} = useParams()
    const location = useLocation()
    const [gameOver,setGameOver ]= useState(false)

    const {image} = location.state

    console.log("Game ID: ", gameId)




  return (
    <div className="container mx-auto">

        {gameOver && 
                    <Modal>
                            <form action="">
                                <label htmlFor="player">
                                    Enter Your Name: 
                                    <input id="player" type="text" name="playerName"  />
                                </label>
                                <button type="submit">End Game</button>
                            </form>
                        </Modal>
        }


        <Game image={image} handleGameOver = {setGameOver}/>

        
    </div>
  )
}

export default GamePage