import { useState,useEffect } from 'react'

// eslint-disable-next-line react/prop-types
const Timer = ({gameOver}) => {


    const [timer,setTimer] = useState(0)

    useEffect(()=>{


        if (!gameOver){

            const timerInterval = setInterval(()=>{


                setTimer((prev) => prev+1)



        },1000)

        return () => clearInterval(timerInterval)

    }



    },[gameOver])

    
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;


  return (
    <>
        <h1 className='text-3xl text-center text-white mb-5 font-bold'>Time: {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</h1>
    </>
  )
}

export default Timer