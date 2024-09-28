import Breadcrumb from "../breadcrumb";
import Speech from "./speech";

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { useState } from "react";

var path=process.env.REACT_APP_ACCOUNT_API;

function getNote(){
    var id=document.getElementById("teacherid").value;
    fetch(`${path}/staffaccount/${id}`)
    .then(res => res.json())
    .then(data => displayNote(data))
    .catch(err => console.log(err))
   
    }

    function displayNote(data){
        for(var i=0; i < data.length; i++){
        var div= document.createElement("div");
        div.innerHTML=`${data[i].note}` 

        document.getElementById("user_note").appendChild(div)
        }
    }

export default function LNote(){
    const [content, setContent]=useState('');

    const modelChange=(newcontent) =>{
        setContent(newcontent)
    }

    function sendContent(){
        var id=document.getElementById("teacherid").value;
        fetch(`${path}/staffaccount/${id}`,{
            method:"PATCH",
            body: JSON.stringify({
                "note":content
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
            alert("Saved successfully")
        })
        .catch(err => console.log(err))
    }
    return(
        <>
        <Breadcrumb title="Notes" />
        <br/>
        {/* <button style={{padding:"10px 12px",background:"black",color:"white"}}>Speech to Text</button>
        <br/>
        <br/>
        <button style={{padding:"10px 12px",background:"black",color:"white"}}>Note Editor</button> */}
<Speech />
{/* <FroalaEditorComponent tag='textarea' model={content} onModelChange={modelChange}/>

<center>
<button  onClick={sendContent}>Save on Cloud</button>
<button onClick={getNote}>Get Note</button>
</center>

<div id="user_note"></div> */}
        </>
    )
}