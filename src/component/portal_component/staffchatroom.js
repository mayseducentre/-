import { useEffect, useState } from "react"


const path= process.env.REACT_APP_API_URL;


function Showmessage(){
    var shownow=document.getElementById("shownow");
    
        shownow.style.height="1px"
        shownow.style.height=(shownow.scrollHeight)+"px";

}

export default function StaffChatRoom(){
    const [chat, setChat]=useState([]);

    function chatroom(){
        fetch(`${path}/staff_chat_room`)
        .then(res => res.json())
        .then(data => setChat(data))
        .catch(err => console.log(err))

    }
    useEffect(()=>{
       chatroom()
    },[])
       
    function SendMessage(e){
        e.preventDefault();
    var chatbox=document.getElementById("chatbox").value;
    var staffname=document.getElementById("staffname").value;
    var d=new Date();
    var time=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    
        fetch(`${path}/staff_chat_room`,{
        method:"POST",
        body:JSON.stringify({
        "name": staffname,
        "message":chatbox,
        "time": time
        }),
        headers:{
            "Content-type":"applcation/json"
        }
    })
    .then(res => res.json())
    .then(data=> {console.log(data)
        document.getElementById("chatbox").value=null
    })
    .catch(err => console.log(err))

    chatroom()
    }
    
    
    return(
        <>
        <div style={{paddingLeft:"10px",paddingRight:"10px",width:"100%"}}>
            <input id="staffname" style={{display:"none"}} required/>
            <br/>
            
            <center>
            <div style={{background:"cornsilk", padding:"10px 12px",borderRadius:"15px",width:"60%"}}>
<p>Messages are end-to-end encrypted. No one outside this chat can read them.</p>

</div>
            </center>

<br/>
<br/>
{chat.map((chatview)=>(
     <div className="chatview" key={chatview.id}>
     <small style={{color:"green"}}>{chatview.name}</small>
     <br/>
     <textarea onFocus={Showmessage} onScroll={Showmessage} id="shownow" style={{background:"transparent", border:"none",padding:"10px 12px"}} readOnly>{chatview.message}</textarea>
     <br/>
     <small style={{position:"absolute",right:"10px"}}>{chatview.time}</small>
<br/>
 </div>
))}        

<form onSubmit={SendMessage}>
    <div>
    <textarea onFocus={chatroom} onEmptied={chatroom} onWaiting={chatroom} placeholder="Message" className="chatbox" id="chatbox" required></textarea>
<button className="chatsend" type="submit">Send</button>

    </div>
 
</form>
        </div>
        <br/>
        <br/>
        <br id="down"/>
        </>
    )
}