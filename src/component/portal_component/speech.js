import { useEffect, useState } from "react";

const SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;


export default function Speech(){
const [isListening, setIsListening]=useState(false);
const [text,setText]=useState('');
const [error, setError]=useState(null);
const recognition= SpeechRecognition ? new SpeechRecognition(): null;

if(recognition){
    recognition.continuous=true;
    recognition.interimResults = true;
    recognition.lang= 'en-US';

    recognition.onresult=(e)=>{
        const transcriptArray = Array.from(e.results).map((result)=> result[0].transcript).join('');
        setText(transcriptArray);
    };

    recognition.onerror=(e)=>{
        setError(e.error);
        setIsListening(false);
    }
}

useEffect(()=>{
    const savedContent=localStorage.getItem('editorContent');
    if(savedContent){
        setText(savedContent);
    }
},[]);

const handleContentChange=(e)=>{
    const newContent=e.target.value;
    setText(newContent);
    localStorage.setItem('editorContent', newContent)
}
const handleListen=()=>{
    if(recognition){
        if(isListening){
            setIsListening(false)
        }else{
          recognition.start();
          setIsListening(true);
          setError(null);
        }
    }else{
        alert("Can't support your browser")
    }
}
    return(
        <>
        {/* <div>
            <button onClick={handleListen}>{isListening ? 'Stop Listening':'Start Listening'}</button>
        <textarea value={text} onChange={handleContentChange}>{error&& <p>Error:{error}</p>}</textarea>
        </div> */}
        </>
    )
}