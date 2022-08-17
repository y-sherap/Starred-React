import Song from '../Song/Song'
import "./search.css"
const Search = ({ user, playlists,getSongs,songs,setSearch,search,isSearch}) => {
  return (
    <div id="searchContainer">
      <input
        type="text"
        placeholder='Add songs to playlist'
        value={search}
        maxLength= '40'
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            getSongs(e,true)
          }
        }}
        id="Search"
      ></input>
      <button     
       id="removeButton"
        onClick={(e) => {
          getSongs(e,false)
          setSearch('')
        }}
      >
        X
      </button>
    
      {isSearch ? (
        <div id="searchResults">
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