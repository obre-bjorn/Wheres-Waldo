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


  return (
    <div className=" min-h-screen bg-blue-950">
        <ToastContainer />
      
      <nav className="container mx-auto flex items-center justify-between mb-40 text-2xl text-white py-5 sticky">
        

        <Link to={'/'} className="" >Where&apos;s Waldo </Link>



        <button onClick={handleBtnGetScores}>
          Highscores
        </button>

      </nav>


      <Modal isOpen={showScoreModal} onClose={handleBtnGetScores}>

          <HighScoreListing highscores={highscores}/>
        
      </Modal>

      <Outlet/>

    </div>
  )
}

export default App
