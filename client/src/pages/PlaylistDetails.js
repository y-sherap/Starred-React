import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Client from "../services/api"
import Song from "../components/Song"

const PlaylistDetails = ({user,authenticated,}) => {
    const {name,id} = useParams()
    const [songs,setSongs]= useState([])
    
    return(
        <div>   
            <h1>{name}</h1>
        </div>
    )
}
export default PlaylistDetails