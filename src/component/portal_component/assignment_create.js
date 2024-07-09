import { useEffect, useState } from "react";


const select ={
    padding:"10px 12px",
    width:"100%"
}


function ContentA(){
    var content=document.getElementById("content_assign");

content.style.height="1px"
content.style.height=(content.scrollHeight)+"px";
}

const pathline=process.env.REACT_APP_API_LOCAL;

function SendAssign(e){
document.getElementById("plswait").style.display="block";
document.getElementById("posta").style.display="none";

e.preventDefault();
    setTimeout(()=>{

        document.getElementById("plswait").style.display="none";
        document.getElementById("posta").style.display="block";
        
    var fullname=document.getElementById("fn_assign").value;
    var endsub=document.getElementById("endsub_assign").value;
    var subject=document.getElementById("subj_assign").value;
    var reference=document.getElementById("ref_assign").value;
    var stulevel=document.getElementById("level_assign").value;
    var topic=document.getElementById("top_assign").value;
    var content=document.getElementById("content_assign").value;
    var email=document.getElementById("email_assign").value;

    if(subject == "English"){
        var path=`${process.env.REACT_APP_API_LOCAL}/engassign`;
    }
    if(subject == "Science"){
        var path=`${process.env.REACT_APP_API_LOCAL}/sciassign`;
    }
    if(subject == "Social Studies"){
        var path=`${process.env.REACT_APP_API_LOCAL}/socassign`;
    }
    if(subject == "Mathematics"){
        var path=`${process.env.REACT_APP_API_LOCAL}/mathassign`;
    }
    if(subject == "Computing"){
        var path=`${process.env.REACT_APP_API_LOCAL}/compassign`;
    }
    if(subject == "Creative Art"){
        var path=`${process.env.REACT_APP_API_LOCAL}/artassign`;
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
        alert("Posted Successfully")
           document.getElementById("content_assign").value=null;

    })
    .catch(err => console.log(err))

    
}


}, 3000)

}

export default function AssignCreate(){
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
                                        <input type="text" id="fn_assign" required readOnly/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Email<span>*</span></p>
                                        <input type="text" id="email_assign" required readOnly/>
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
                                        <input type="text" id="subj_assign" required readOnly/>
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
                                        <select style={select} id="level_assign">
                                    {level.map((lev)=>(
                                        <option value={lev.level}>{lev.level}</option>
                                   
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
 
 
        </>
    )
}