const Playlist = ({playlist,index,updatePlaylist,removePlaylist,updateHover,renderPlaylist,isHover}) => {
    return(
        <div>
            <img onClick={() => updateHover()} src = {playlist.image} alt = "playlist image"></img>
            {isHover ?<div>
                        <h3 onClick={() => renderPlaylist(playlist.id,playlist.name)}>{playlist.name}</h3>
                        <h5>{playlist.mood}</h5>
                        <div>
                            <button onClick={() => updatePlaylist(playlist,index)}>Update</button>
                            <button onClick={() => removePlaylist(playlist,index)}>Remove</button>
                        </div>
                      </div>: <span></span>}
        </div>
    )
}

export default Playlist 