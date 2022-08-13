const Playlist = ({playlist,index,updatePlaylist,removePlaylist,updateHover,renderPlaylist,renderUpdate,isHover,isEdit}) => {
    return(
        <div>
            <img onClick={() => updateHover()} src = {playlist.image} alt = "playlist image"></img>
            {isHover ?<div>
                        {isEdit? <span></span>:<h3 onClick={() => renderPlaylist(playlist.id,playlist.name)}>{playlist.name}</h3>}
                        {isEdit? <span></span>:<h5>{playlist.mood}</h5>}
                        <div>
                            {isEdit? 
                                <div>
                                    <input type="text" placeholder="Playlist Name"></input>
                                    <input type="text" placeholder="Playlist Mood"></input>
                                    <button onClick={() => updatePlaylist()}></button>
                                </div>
                                :<button onClick={() => renderUpdate(playlist,index)}>Update</button>}
                            {isEdit? <span></span>:<button onClick={() => removePlaylist(playlist,index)}>Remove</button>}
                        </div>
                      </div>: <span></span>}
        </div>
    )
}

export default Playlist 