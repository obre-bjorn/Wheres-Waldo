
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../contexts/sessionContext'


import {fetchFromApi} from '../utils/api'
import Modal from '../components/Modal'


const HomePage = () => {


    const navigate = useNavigate()
    const {setSessionData} = useSession()
    const [isOpen,setIsOpen] = useState(false)
    const [charImages,setCharImages] = useState([])
    
    useEffect( () => {

        const fetchImages  = async () => {

            const data = await fetchFromApi('/game-images')
            setCharImages(data.images)

        }

        fetchImages()


    }, [])


    const handleGameStart = async (image) => {

        const data = await fetchFromApi('/start-game')
        
        setSessionData(data.sessionID)
        
        navigate(`/game/${image.id}`,{state : { image }})

    }



    return (

    <div>
        <section className='flex flex-wrap gap-5 mt-5 align-center justify-center'>


            {charImages.length > 0 && 
                charImages.map(image => (  

                    <button key={image.id} onClick={() => handleGameStart(image)}>
                        
                        <img  className="w-96" src={image.url} alt="" />

                    </button>
                ))
            }


        </section>


        <Modal isOpen={isOpen}>


        </Modal>

    </div>


  ) 
}

export default HomePage