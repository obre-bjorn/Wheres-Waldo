
import { useEffect, useState } from 'react'

import Modal from '../components/Modal'

const HomePage = () => {


    useEffect( () => {

        const fetchImages  = async () => {

            const response = await fetch('http://localhost:4005/game-images')

            
            const data =await response.json()

            setCharImages(data.images)

        }

        fetchImages()


    }, [])

    const [isOpen,setIsOpen] = useState(false)
    const [charImages,setCharImages] = useState([])


    const handleGameStart = async () => {



    }



    return (

    <div>
        <section className='flex flex-wrap gap-5 mt-5 align-center justify-center'>


            {charImages.length > 0 && 
                charImages.map(image => (  

                    <button key={image.id} onclick={handleGameStart}>
                        
                        <img  className="w-96" src={image.url} alt="" />

                    </button>
                ))
            }


        </section>


        <Modal>


        </Modal>

    </div>


  ) 
}

export default HomePage