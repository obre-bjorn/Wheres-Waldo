import { useState } from "react";
import { Link, Outlet } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { fetchFromApi } from "./utils/api";

import HighScoreListing from "./components/HighScoreLising";
import Modal from "./components/Modal";


function App() {

  const [highscores, setHighScores] = useState([])
  const [showScoreModal,setScoreModal] = useState(false)




  

  const fetchHighScores = async () => {

    const data = await fetchFromApi('/highscores')

    setHighScores(data.scores)

  }


  const handleBtnGetScores = async () => {


      
      await fetchHighScores()
    
      setScoreModal(true)

  }


    const handleCloseHighScoreModal = () => {
        setScoreModal(false)
    }


  return (
    <div className=" min-h-screen bg-blue-950 relative">
        <ToastContainer />
      
      <nav className="container mx-auto flex items-center justify-between mb-10 text-2xl text-white py-5 px-10 sticky">
        

        <Link to={'/'} className="transition-all hover:scale-105 hover:text-orange-500" >Where&apos;s Waldo </Link>



        <button className="transition-all hover:scale-105 hover:text-orange-500" onClick={handleBtnGetScores}>
          Highscores
        </button>

      </nav>


      <Modal isOpen={showScoreModal} onClose={handleCloseHighScoreModal}>

          <HighScoreListing highscores={highscores}/>
        
      </Modal>

      <Outlet/>

    </div>
  )
}

export default App
