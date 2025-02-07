import { useEffect, useState } from "react";
import emailjs from "emailjs-com";




const select ={
    padding:"10px 12px",
    width:"100%"
}


function ContentA(){
    var content=document.getElementById("content_grades");

content.style.height="1px"
content.style.height=(content.scrollHeight)+"px";
}

const pathline=process.env.REACT_APP_API_URL;
var path = process.env.REACT_APP_ACCOUNT_API;
var assignpath = process.env.REACT_APP_ASSIGN_API;

const randomdigit = Math.floor(Math.random() * 100).toString();
const id = randomdigit;

function SendGrade(e){
document.getElementById("plswait").style.display="block";
document.getElementById("posta").style.display="none";

e.preventDefault();
    setTimeout(()=>{

        document.getElementById("plswait").style.display="none";
        document.getElementById("posta").style.display="block";
        
    var fullname=document.getElementById("fn_grades").value;
    var subject=document.getElementById("subj_grades").value;
    var stulevel=document.getElementById("level_grades").value;
    var topic=document.getElementById("top_grades").value;
    var content=document.getElementById("content_grades").value;
    var email=document.getElementById("email_grades").value;

 var d=new Date();
 let time=d.toLocaleDateString();
 const agree=window.confirm(`Are you sure the grades is a/an ${subject} grades.`) 
 if(agree === true){

 fetch(`${assignpath}/grades`,{
        method:"POST",
        body:JSON.stringify({
            "name":fullname,
            "subject":subject,
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
      
        alert("Posted Successfully")
           document.getElementById("content_grades").value=null;

    })
    .catch(err => console.log(err))

    
}


}, 3000)

}



function fetchGrade(){

    
    // var subject=document.getElementById("subj_grades").value;
    
    fetch(`${assignpath}/grades`)
    .then(res => res.json())
    .then(data => findCheck(data))
    .catch(err => console.log(err))
  
  
  }
  
  
  function findCheck(data){
    
    var subject=document.getElementById("subj_grades").value;
    for(var i=0; i< data.length; i++){
        if(subject== data[i].subject){
            document.getElementById("gradespost").innerHTML +=
            `
            <a>Id: ${data[i].id}</a>
            <a>Level: ${data[i].level}</a>
            <h5>Grades</h5>
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
  }
  

  function DelGrade(e){

    e.preventDefault();

    var subject=document.getElementById("subj_grades").value;
    var assignid=document.getElementById("delid").value;

    
  
    fetch(`${assignpath}/grades/${assignid}`, {
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data =>{ console.log(data)
alert("Grades has been deleted successfully")}
)
    .catch(err => console.log(err))
  
  
  }
  
  
//   function SendAnnounce(e) {
//     e.preventDefault();
    
//     var subject=document.getElementById("subj_grades").value;

//     var fullname=document.getElementById("fn_grades").value;

//     var stulevel=document.getElementById("level_grades").value;
//     var subject = `${subject} grades posted`;
    
//     var topic=document.getElementById("top_grades").value;
//     var body = `Sir/Madam ${fullname} has posted a/an ${subject} on mec portal for ${stulevel} on the topic ${topic}. Check grades now. https://mayseducentre.github.io/-/#/portal`;
    

//     // var d = new Date();
//     // var date = d.toLocaleDateString();

//     fetch(`${path}/studentaccount`)
//       .then((res) => res.json())
//       .then((data) => {
//         SendMail(data, subject, body);
//         alert("Sent Successfully");
//       })
//       .catch((err) => console.log(err));

//   }

//   function SendMail(data, subject, body) {
//     const formData = {
//       subject_mail: subject,
//       main_body: body,
//     };

//     // Loop through each account and send the email
//     data.forEach((account) => {
//       formData.bcc_email = account.email; // Assuming each account has an 'email' property

//       emailjs
//         .send("service_4dt6s3i", "template_0q1tvwm", formData, "VIB8bKSD-ZS3RCCHD")
//         .then((res) => {
//           console.log(res.text);
//           alert("Global post success")
//         })
//         .catch((err) => {
//           console.log(err.text);
//         });
//     });
//   }

export default function GradeCreate(){
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
                <form onSubmit={SendGrade}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h3 className="checkout__title">Create Grades</h3>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Full Name<span>*</span></p>
                                        <input type="text" id="fn_grades" required readOnly/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Email<span>*</span></p>
                                        <input type="text" id="email_grades" required readOnly/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Subject<span>*</span></p>
                                        <input type="text" id="subj_grades" required readOnly/>
                                    </div>
                                </div>
                               
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Student Level<span>*</span></p>
                                        <select style={select} id="level_grades" required>
                                    {level.map((lev)=>(
                                        <option key={lev.id} value={lev.level}>{lev.level}</option>
                                   
                                    ))}
                                    
                                     </select>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="checkout__input">
                                <p title="Topic for the grades">Topic<span>*</span></p>
                                        <input type="text" id="top_grades" required/>                                   
                            </div>

                            <div className="checkout__input">
                                <p title="Write the grades here">Content<span>*</span></p>
                                        <textarea style={{ resize: "none",overflow:"hidden",width:"100%",padding:"10px 12px"}} id="content_grades" onKeyUp={ContentA} required></textarea>                                   
                            </div>
                            
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit" id="posta" className="site-btn">POST GRADES</button>
                                <button className="site-btn" id="plswait" style={{display:"none"}}>Please Wait...</button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
 
 <button style={{padding:"10px 20px", borderRadius:"20px", background:"skyblue"}} onClick={fetchGrade}>Check Grades</button>
 <div id="gradespost">

 </div>
 
 <br/>
 <br/>
 <div>
    <h6>Delete Grades</h6>
    <form onSubmit={DelGrade}>
    <input placeholder="enter id" id="delid" required/>
    <button style={{background:"red",color:"white"}} className="site-btn">Delete Grades</button>
    </form>                  
 </div>

 <br />
 <br />
        </>
    )
}