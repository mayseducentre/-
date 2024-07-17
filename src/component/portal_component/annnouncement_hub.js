import Breadcrumb from "../breadcrumb";
import CreateAnnounce from "./create_announce";


function Announce(){
    document.getElementById("announce_create").style.display="block";
    document.getElementById("compose").style.display="none";
    document.getElementById("mail").style.display="block";
    document.getElementById("announce_view").style.display="none";
}


function AnnounceV(){
    document.getElementById("announce_create").style.display="none";
    document.getElementById("mail").style.display="none";
    document.getElementById("compose").style.display="block";
    document.getElementById("announce_view").style.display="block";
}
export default function AnnounceHub(){
    return(
        <>
        <Breadcrumb title="Announcement Hub" />

        <div id="announce_view" style={{paddingLeft:"10px", paddingRight:"10px"}}>
            <br/>
            <center>
                    <input type="text" placeholder="Search in mails" style={{padding:"10px 12px", width:"90%", borderRadius:"20px"}}/>
                </center>
                <br/>
                <br/>

                <small>Primary</small>
                <br/>
                <br/>
                <br/>
            <div>
            <img src={require("/./Users/USER/posty/src/img/google.png")} style={{width:"30px",height:"30px",borderRadius:"50%", position:"absolute"}}/>
               <div style={{paddingLeft:"50px"}}>
                <a><b>Head</b></a> <small style={{position:"absolute",right:"10px"}}>7/09/24</small>
                <p>This is the message  i posted rcently and i want to add something to it to make it seem so good.</p>
            </div>
            </div>

            
        </div>




     <div id="announce_create" style={{display:"none"}}>
        <CreateAnnounce />
        </div>   
        <button onClick={Announce} id="compose" style={{padding:"10px 20px", background:"skyblue", border:"none",borderRadius:"10px",position:"fixed", bottom:"70px",color:"white",right:"10px"}}>Compose</button>
        <button onClick={AnnounceV} id="mail" style={{display:"none",padding:"10px 20px", background:"skyblue", border:"none",borderRadius:"10px",position:"fixed", bottom:"70px",color:"white",right:"10px"}}>Mails</button>
    
     
        </>
    )
}