import { useState } from "react"
import {  useLocation, useNavigate } from "react-router-dom"


import Game from "../components/Game"
import Modal from "../components/Modal"
import { useSession } from "../../contexts/sessionContext"
import { fetchFromApi } from "../utils/api"
import Input from "../components/Input"


const GamePage = () => {

    const navigate = useNavigate()
    const {session,clearSession} = useSession()
    
    
    const location = useLocation()
    const {image} = location.state

    const [gameOver,setGameOver ]= useState(false)
    const [showModal, setShowModal] = useState(false)
    const [name,setName] = useState('')




    const handleEndGame = async (e) => {


      e.preventDefault()
      
      setShowModal(false)

      await fetchFromApi('/end-game', {
        method : 'POST',
        body : {
          sessionID : session,
          name: name
        }
      })

      

      clearSession()
      navigate('/')

    }


    const handleGameOver = () => {

      setGameOver(true)
      setShowModal(true)

    }
    
    
    


  return (
    <div className="container mx-auto">

        {gameOver && 
                    <Modal isOpen={showModal}>
                            <h1 className="text-2xl text-blue-900">Ranking Form</h1>
                            <form onSubmit={handleEndGame}  className="flex flex-col gap-4 mt-5">
                                <Input setName={setName} name={name} />
                                <button type="submit" className="bg-blue-900 text-white py-2 px-4 mt-5">End Game</button>
                            </form>
                    </Modal>
        }


        <Game image={image} handleGameOver = {handleGameOver }/>

        
    </div>
  )
}

export default GamePage