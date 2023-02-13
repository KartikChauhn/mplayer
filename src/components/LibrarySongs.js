import { playSong } from "./util";


const LibrarySongs =({song, setCurrentSong, audioRef , songs,id ,setSongs , setIsPlaying}) =>{
 
    const setSongHandler = () =>{
        setCurrentSong(song);
        playSong(audioRef);  
        setIsPlaying(true);
        
        //add active state
        const newSongs = songs.map((song)=>{
            if(song.id === id){
                
              return{...song,active:true}
            }
            else
                return{
                    ...song,active:false,
                };
            
            });

        setSongs(newSongs);
                
    }
   

    return(
        <div onClick={setSongHandler} className={`library-song ${song.active? "selected" :""}`} >
            {console.log(song.active , song.name)}
            <img src={song.cover} alt="" />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySongs;    