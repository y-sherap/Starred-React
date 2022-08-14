import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Client from "../services/api"
import Song from "../components/Song"

const PlaylistDetails = ({user,authenticated,}) => {
    const {name,id} = useParams()
    const [songs,setSongs]= useState([])
    const [playlist,setPlaylist] = useState()
    const renderSongs = async () =>{
        const res = await Client.get(`/song/${id}`)
        setSongs(res.data)
        setPlaylist(res.data[0].Playlist)
    }
    useEffect(()=>{
        renderSongs()
    },[])
    return(
        <div>   
            <h1>{name}</h1>
            {songs.map((song,index)=>(
                <div>
                <Song song = {song} index={index} inPlaylist={true} />
                </div>
            ))}
        </div>
    )
}
export default PlaylistDetails