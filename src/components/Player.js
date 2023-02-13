import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
import { playSong } from "./util";


const Player = ({audioRef,
    isPlaying,currentSong , playSongHandler,songInfo,setSongInfo,
    songs,setCurrentSong,setSongs, setIsPlaying}) => {

    
        const getTime = (time) => {
            return(
                Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
            );
        }

        const dragHandler = (e) =>{
            audioRef.current.currentTime = e.target.value;
            setSongInfo( {...songInfo, currentTime : e.target.value});
        }

        const skipTrackHandler = (direction) =>{
           const currentIndex = songs.findIndex((song) => song.id  === currentSong.id);
            
            if(direction === "skip-back"){
                if(currentIndex===0){
                    setCurrentSong(songs[songs.length - 1])
                }else{
                    setCurrentSong(songs[(currentIndex -1) % songs.length]);
                }
                playSong(audioRef); 
            }
            else{
                setCurrentSong(songs[(currentIndex +1) % songs.length]);
                playSong(audioRef);    
            }
            setIsPlaying(true);
        } 

        useEffect(()=>{
            const newSongs = songs.map((song)=>{
                if(song.id === currentSong.id)
                    return{
                        ...song,active:true,
                    };
                
                else
                    return{
                        ...song,active:false,
                    };
                
            });
            setSongs(newSongs);
        },[currentSong])


    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                min={0}
                max = {songInfo.duration || 0}
                value = {songInfo.currentTime}
                onChange={dragHandler}
                type="range"
                />
                <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={()=>skipTrackHandler("skip-back")} 
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft} 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay} 
                />
                <FontAwesomeIcon 
                    onClick={()=>skipTrackHandler("skip-forward")}  
                    className="skip-forward" 
                    size="2x" 
                    icon={faAngleRight} 
                />
            </div>
            
        </div>
    )
}

export default Player;