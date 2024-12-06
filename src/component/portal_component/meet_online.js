import { useState } from "react"

export default function Meet(){
    const [isMeeting, setIsMeeting]=useState(true);

    function Quit(){
        setIsMeeting(false);
    }
    return(
        <>
        {/* {isMeeting ? (
            <iframe style={{width:"100%",height:"100vh"}} src="https://whereby.com/meconline" allow="camera; microphone; fullscreen; speaker; display-capture"></iframe>
        ) : (
            <p>You have left the meeting.</p>
        
        )}
        <button onClick={Quit}>Quit Meeting</button> */}
        </>
    )
}