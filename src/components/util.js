export const playSong = (audioRef)=>{
    const playPromise = audioRef.current.play();
    if(playPromise!== undefined){
        playPromise.then((audio) =>{
            audioRef.current.play();
        })
    }
}                