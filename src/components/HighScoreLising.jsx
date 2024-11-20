/* eslint-disable react/prop-types */


const HighScoreListing = ({highscores}) => {
  return (
    <div>
        {highscores.map(highscore => {

            return (
                <div key={highscore.id}>
                    <span><h3>{highscore.name}</h3>--<h4>{highscore.timetaken}</h4></span>
                </div>
            )
        } )
        
        }
    
    </div>
  )
}

export default HighScoreListing