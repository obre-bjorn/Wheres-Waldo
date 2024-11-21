import { useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"


import Game from "../components/Game"
import Modal from "../components/Modal"
import { useSession } from "../../contexts/sessionContext"
import { fetchFromApi } from "../utils/api"
import Input from "../components/Input"


const GamePage = () => {

    const navigate = useNavigate()
    const {session,clearSession} = useSession()
    
    const {gameId} = useParams()
    const location = useLocation()
    const {image} = location.state

    const [gameOver,setGameOver ]= useState(false)
    const [showModal, setShowModal] = useState(false)
    const [name,setName] = useState('')


    console.log("Game ID: ", gameId)


    const handleEndGame = async (e) => {


      e.preventDefault()
      
      setShowModal(false)

      const data = fetchFromApi('/end-game', {
        method : 'POST',
        body : {
          sessionID : session,
          name: name
        }
      })

      console.log(data)

      clearSession()
      navigate('/')

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
                            <form onSubmit={handleEndGame}  >
                                <Input setName={setName} name={name}/>
                                <button type="submit">End Game</button>
                            </form>
                    </Modal>
        }


        <Game image={image} handleGameOver = {handleGameOver }/>

        
    </div>
  )
}

export default GamePage