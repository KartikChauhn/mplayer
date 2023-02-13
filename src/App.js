import React,{useState , useRef} from 'react';

import './Styles/style.scss';

import Song from './components/Song';
import Player from './components/Player';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';



function App() {

  
  const [songs,setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime : "00",
    duration: 0
  });
  const [libraryStatus , setLibraryStatus] = useState(false);


  const playSongHandler = () =>{
    if(isPlaying){
        audioRef.current.pause();
        setIsPlaying(false);
    }else{
        audioRef.current.play();
        setIsPlaying(true);
    }
  };

  
  const timeUpdateHandler =(e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo,currentTime:current,duration});
  };

  const songEnd = ()=>{
    const currentIndex = songs.findIndex((song) => song.id  === currentSong.id);

      setCurrentSong(songs[(currentIndex +1) % songs.length]);

  }
  
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player 
        audioRef={audioRef} 
        isPlaying={isPlaying} 
        currentSong={currentSong}
        playSongHandler={playSongHandler}
        songInfo ={songInfo}
        setSongInfo = {setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        setIsPlaying = {setIsPlaying}
      />
      <Library 
        songs={data()} 
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        setIsPlaying = {setIsPlaying}
      />
      <audio 
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                onEnded = {songEnd}
                // autoPlay 
                src={currentSong.audio}> 
      </audio>
    </div>
  );
}

export default App;
