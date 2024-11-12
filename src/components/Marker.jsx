/* eslint-disable react/prop-types */

const Marker = ({position}) => {
    const {x,y} = position



    return (
        <div className="absolute"
            style={{
                left: `${x}px`, // Set horizontal position
                top: `${y}px`,  // Set vertical position
                transform: 'translate(-50%, -50%)', // Center the marker
        }}>
            ✅
        </div>
    )
}

export default Marker