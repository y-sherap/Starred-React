const Playlist = ({playlist,index,updateHover,isHover,}) => {

    return(
        <div>
            <img onMouseOver={() => updateHover(true,index)}  src = {playlist.image} alt = "playlist image"></img>
            {isHover ?<div>
                        <h3>{playlist.name}</h3>
                        <h5>{playlist.mood}</h5>
                      </div>: <span></span> }
        </div>
    )
}

export default Playlist 