import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"


import Game from "../components/Game"
import Modal from "../components/Modal"
import { useSession } from "../../contexts/sessionContext"
import { fetchFromApi } from "../utils/api"
import Input from "../components/Input"


const GamePage = () => {


    const {session,clearSession} = useSession()
    const {gameId} = useParams()
    const location = useLocation()
    const [gameOver,setGameOver ]= useState(false)
    const [showModal, setShowModal] = useState(false)
    const {image} = location.state

    console.log("Game ID: ", gameId)


    const handleEndGame = async () => {
      
      setShowModal(false)

      const data = fetchFromApi('/end-game', {
        body : JSON.stringify({
          session,
          name
        })
      })
      console.log(data)

      clearSession()


    }


    const handleGameOver = () => {

      setGameOver(true)
      setShowModal(true)

    }
    
    
    console.log('GAMEPAGE.GameOver: ', gameOver )


  return (
    <div className="container mx-auto">

        {gameOver && 
                    <Modal isOpen={showModal}>
                            <form action="/" onSubmit={handleEndGame}>
                                <Input/>
                                <button type="submit">End Game</button>
                            </form>
                    </Modal>
        }


        <Game image={image} handleGameOver = {handleGameOver }/>

        
    </div>
  )
}

export default GamePage