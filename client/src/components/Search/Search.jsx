import { useState } from 'react'
import axios from 'axios'
import Song from '../Song/Song'

const Search = ({ user, playlists }) => {
  const [songs, setSongs] = useState([])
  const [search, setSearch] = useState()
  const [isSearch, setIsSearch] = useState(false)
  const axios = require('axios')

  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/search/',
    params: {
      q: `${search}`,
      type: 'tracks',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5'
    },
    headers: {
      'X-RapidAPI-Key': '303d72b48fmsh678a2284baa6cd2p10546ajsn372ba29a7be4',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  }

  const getSongs = async () => {
    await axios
      .request(options)
      .then(function (response) {
        setSongs(response.data.tracks.items)
      })
      .catch(function (error) {
        console.error(error)
      })
    setIsSearch(true)
  }
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            getSongs()
          }
        }}
      ></input>
      <button
        onClick={() => {
          setIsSearch(false)
        }}
      >
        X
      </button>
      {isSearch ? (
        <div>
          {songs.map((song) => (
            <Song song={song.data} inPlaylist={false} playlists={playlists} />
          ))}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  )
}

export default Search
