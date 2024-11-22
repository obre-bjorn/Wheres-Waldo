/* eslint-disable react/prop-types */


const HighScoreListing = ({highscores}) => {


    
    return (
        <div>
                       
             <h2 className="text-blue-950 underline text-center text-2xl">Highscores: </h2>
            {highscores.map(highscore => {

                return (
                    <div key={highscore.id} className="w-full flex justify-between px-9">
                        
                        
                            <h3>{highscore.name}: </h3>
                            <h4>{highscore.timetaken}s</h4>
                        
                    </div>
                )
            } )
            
            }
        
        </div>
    )
}

export default HighScoreListing