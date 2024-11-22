
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../contexts/sessionContext'


import {fetchFromApi} from '../utils/api'


const HomePage = () => {


    const navigate = useNavigate()
    const {setSessionData} = useSession()
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

    <div className='py-5'>
        <h1 className='mb-10 text-5xl font-bold text-center text-white'>Choose Any of the Images (Bleach || Naruto)</h1>
        <section className='flex flex-wrap gap-20 mt-5 align-center justify-center'>

            {charImages.length > 0 && 
                charImages.map(image => (  

                    <button className= "max-w-min min-w-96  rounded-md transition-all hover:scale-110" key={image.id} onClick={() => handleGameStart(image)}>
                        
                        <img className="w-full rounded-md" src={image.url} alt="" />

                    </button>
                ))
            }


        </section>


    </div>

) 
}

export default HomePage