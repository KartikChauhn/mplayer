import LibrarySongs from "./LibrarySongs";

const Library= ({songs , setCurrentSong,audioRef , setSongs, libraryStatus , setIsPlaying}) =>{
    
    
    return(
        <div className= {`library ${libraryStatus? "active-library" : ""}`}>
            <h1>Library</h1>
            <div className="library-songs">
                {songs.map((song)=>(
                    <LibrarySongs 
                        song = {song} 
                        setCurrentSong={setCurrentSong}
                        audioRef={audioRef}
                        songs ={songs}
                        id={song.id}
                        setSongs={setSongs}
                        key={song.id} 
                        setIsPlaying = {setIsPlaying}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default Library;