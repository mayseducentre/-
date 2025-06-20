import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

const select ={
    padding:"10px 12px",
    width:"100%"
}


function ContentA(){
    var content=document.getElementById("content_assign");

content.style.height="1px"
content.style.height=(content.scrollHeight)+"px";
}

const pathline=process.env.REACT_APP_API_URL;
var path = process.env.REACT_APP_ACCOUNT_API;
var assignpath = process.env.REACT_APP_ASSIGN_API;

const randomdigit = Math.floor(Math.random() * 10).toString();
const id = randomdigit;

function SendAssign(e){
document.getElementById("plswait").style.display="block";
document.getElementById("posta").style.display="none";

e.preventDefault();
    setTimeout(()=>{

        document.getElementById("plswait").style.display="none";
        document.getElementById("posta").style.display="block";
        
    var fullname=document.getElementById("fn_assign").value;
    var endsub=document.getElementById("endsub_assign").value;
    var subject=document.getElementById("subject_owner").value;
    var reference=document.getElementById("ref_assign").value;
    var stulevel=document.getElementById("level_assign").value;
    var topic=document.getElementById("top_assign").value;
    var content=document.getElementById("content_assign").value;
    var email=document.getElementById("email_assign").value;

    if(subject == "English"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/engassign`;
    }
    if(subject == "Science"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/sciassign`;
    }
    if(subject == "Social Studies"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/socassign`;
    }
    if(subject == "Mathematics"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/mathassign`;
    }
    if(subject == "Computing"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/compassign`;
    }
    if(subject == "Creative Art"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/artassign`;
    }
    if(subject == "GA"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/gaassign`;
    }
    if(subject == "French"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/frenchassign`;
    }
    if(subject == "RME"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/rmeassign`;
    }
    if(subject == "Career Tech"){
        var path=`${process.env.REACT_APP_ASSIGN_API}/careertechassign`;
    }
   
 var d=new Date();
 let time=d.toLocaleDateString();
 const agree=window.confirm(`Are you sure the assignment is a/an ${subject} assignment.`) 
 if(agree === true){

 fetch(path,{
        method:"POST",
        body:JSON.stringify({
            "name":fullname,
            "end_subm":endsub,
            "subject":subject,
            "reference":reference,
            "email":email,
            "level":stulevel,
            "time":time,
            "topic":topic,
            "content":content
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
      SendAnnounce();
        alert("Posted Successfully")
           document.getElementById("content_assign").value=null;

    })
    .catch(err => console.log(err))

    
}


}, 3000)

}



function fetchAssign(){

    
    var subject=document.getElementById("subj_assign").value;
    if(subject === "English"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/engassign`;
  }
  if(subject === "Science"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/sciassign`;
  }
  if(subject === "Social Studies"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/socassign`;
  }
  if(subject === "Mathematics"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/mathassign`;
  }
  if(subject === "Computing"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/compassign`;
  }
  if(subject === "Creative Art"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/artassign`;
  }
  
  
    fetch(path)
    .then(res => res.json())
    .then(data => findCheck(data))
    .catch(err => console.log(err))
  
  
  }
  
  
  function findCheck(data){
    for(var i=0; i< data.length; i++){
      document.getElementById("assignpost").innerHTML +=
      `
      <a>Id: ${data[i].id}</a>
      <h5>Assignment</h5>
      <small>End of submision: ${data[i].end_subm}</small>
      <br>
      <small>Reference: ${data[i].reference}</small>
      <center>
      <h4><u>${data[i].topic}</u></h4>
      </center>
      <small>Posted by Sir/Madam ${data[i].name} on ${data[i].time}</small>
      <br>
      <br>
      <textarea style="height:300px;border:none" readonly>${data[i].content}</textarea>
      `
           
    }
  }
  

  function DelAssign(e){

    e.preventDefault();

    var subject=document.getElementById("subj_assign").value;
    var assignid=document.getElementById("delid").value;

    if(subject === "English"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/engassign/${assignid}`;
  }
  if(subject === "Science"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/sciassign/${assignid}`;
  }
  if(subject === "Social Studies"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/socassign/${assignid}`;
  }
  if(subject === "Mathematics"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/mathassign/${assignid}`;
  }
  if(subject === "Computing"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/compassign/${assignid}`;
  }
  if(subject === "Creative Art"){
      var path=`${process.env.REACT_APP_ASSIGN_API}/artassign/${assignid}`;
  }
  
  
    fetch(path, {
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data =>{ console.log(data)
alert("Assignment has been deleted successfully")}
)
    .catch(err => console.log(err))
  
  
  }
  
  
  function SendAnnounce(e) {
    e.preventDefault();
    
    var subject=document.getElementById("subj_assign").value;

    var fullname=document.getElementById("fn_assign").value;

    var stulevel=document.getElementById("level_assign").value;
    var subject = `${subject} assignment posted`;
    
    var topic=document.getElementById("top_assign").value;
    var body = `Sir/Madam ${fullname} has posted a/an ${subject} on mec portal for ${stulevel} on the topic ${topic}. Check assignment now. https://mayseducentre.github.io/-/#/portal`;
    

    // var d = new Date();
    // var date = d.toLocaleDateString();

    fetch(`${path}/studentaccount`)
      .then((res) => res.json())
      .then((data) => {
        SendMail(data, subject, body);
        alert("Sent Successfully");
      })
      .catch((err) => console.log(err));

  }

  function SendMail(data, subject, body) {
    const formData = {
      subject_mail: subject,
      main_body: body,
    };

    // Loop through each account and send the email
    data.forEach((account) => {
      formData.bcc_email = account.email; // Assuming each account has an 'email' property

      emailjs
        .send("service_4dt6s3i", "template_0q1tvwm", formData, "VIB8bKSD-ZS3RCCHD")
        .then((res) => {
          console.log(res.text);
          alert("Global post success")
        })
        .catch((err) => {
          console.log(err.text);
        });
    });
  }

export default function AssignCreate({user}){
    const [level, setLevel]=useState([]);

    useEffect(()=>{
        fetch(`${pathline}/level`)
        .then(res=>res.json())
        .then(data => setLevel(data))
        .catch(err => console.log(err))

     
    },[])
    return(
        <>
         <section className="checkout spad">
        <div className="container">
            <div className="checkout__form">
                <form onSubmit={SendAssign}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h3 className="checkout__title">Create assignment</h3>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Full Name<span>*</span></p>
                                        <input value={user.name} type="text" id="fn_assign" required readOnly/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Email<span>*</span></p>
                                        <input value={user.email} type="text" id="email_assign" required readOnly/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>End of Submission<span>*</span></p>
                                        <input type="date" id="endsub_assign" required/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Subject<span>*</span></p>
                                        <input type="text" value={user.subject} id="subj_assign" required readOnly/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Reference<span>*</span></p>
                                        <input type="text" id="ref_assign" required/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Student Level<span>*</span></p>
                                        <select style={select} id="level_assign" required>
                                    {level.map((lev)=>(
                                        <option key={lev.id} value={lev.level}>{lev.level}</option>
                                   
                                    ))}
                                    
                                     </select>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="checkout__input">
                                <p title="Topic for the assignment">Topic<span>*</span></p>
                                        <input type="text" id="top_assign" required/>                                   
                            </div>

                            <div className="checkout__input">
                                <p title="Write the assignment's questions here">Content<span>*</span></p>
                                        <textarea style={{ resize: "none",overflow:"hidden",width:"100%",padding:"10px 12px"}} id="content_assign" onKeyUp={ContentA} required></textarea>                                   
                            </div>
                            
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit" id="posta" className="site-btn">POST ASSIGNMENT</button>
                                <button className="site-btn" id="plswait" style={{display:"none"}}>Please Wait...</button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
 
 <button style={{padding:"10px 20px", borderRadius:"20px", background:"skyblue"}} onClick={fetchAssign}>Check Assignment</button>
 <div id="assignpost">

 </div>
 
 <br/>
 <br/>
 <div>
    <h6>Delete Assignment</h6>
    <form onSubmit={DelAssign}>
    <input placeholder="enter id" id="delid" required/>
    <button style={{background:"red",color:"white"}} className="site-btn">Delete Assignment</button>
    </form>                  
 </div>
        </>
    )
}