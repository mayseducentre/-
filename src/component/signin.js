import React from "react";
import StudentPortal from "../portal/student_portal";
import ParentPortal from "../portal/parent_portal";
import TeachersPortal from "../portal/teachers_portal";
import bcrypt from "bcryptjs";

var readonly={
    padding:"2px 3px",
    width:"100%",
    border:"none"
}

var path=process.env.REACT_APP_API_LOCAL;


function logPortal(e){
    e.preventDefault();


    var portcheck=document.getElementById("portalchk");

    if(portcheck.checked == true){
        var log_userid=document.getElementById("portal_id").value;
        var log_pass=document.getElementById("portal_key").value;

localStorage.setItem("portalid", log_userid);
localStorage.setItem("portalkey",log_pass);
localStorage.setItem("portalcheck", portcheck.checked)

}

    else{
        localStorage.removeItem("portalid");
        localStorage.removeItem("portalkey");
        localStorage.removeItem("portalcheck");
    }


    
    document.getElementById("loogin").style.display="block";
    document.getElementById("loginbtn").style.display="none";
   
    
    setTimeout(()=>{

        fetch(`${path}/studentaccount`)
        .then(res=>res.json())
        .then(data => {
           
            logintoPortal(data)})
        .catch(err => {console.log(err)
           alert("Error been encountered")})
       
        
        fetch(`${path}/staffaccount`)
        .then(res=>res.json())
        .then(data => {
           
            logintoPortal(data)})
        .catch(err => {console.log(err)
           alert("Error been encountered")})
       
        
        fetch(`${path}/parentaccount`)
        .then(res=>res.json())
        .then(data => {
           
            logintoPortal(data)})
        .catch(err => {console.log(err)
       alert("Error been encountered")})
       
       document.getElementById("loogin").style.display="none";
    document.getElementById("loginbtn").style.display="block";
    }, 3000)
    
}

function logintoPortal(data){



    for(var i=0; i < data.length; i++){
        var log_userid=document.getElementById("portal_id").value;
        var log_pass=document.getElementById("portal_key").value;
        const storedhash= data[i].passcode;
        var passwordcheck= bcrypt.compareSync(log_pass, storedhash);

        if(log_userid === data[i].id && passwordcheck && data[i].role === "student" && data[i].status == "accept"){
            document.getElementById("portalogin").style.display="none";
           
            document.getElementById("stuportal").style.display="block";
            document.getElementById("studentusername").innerHTML=data[i].name;
            document.getElementById("studentid").value=data[i].id;
            document.getElementById("stu_class").value=data[i].class;
            document.getElementById("stuimgport").src=data[i].thumbnailUrl;
            document.getElementById("stuheadimg").src=data[i].thumbnailUrl;
             
      
        }

        
        if(log_userid === data[i].id && passwordcheck && data[i].role === "staff" && data[i].status == "accept"){
            document.getElementById("portalogin").style.display="none";
           
            document.getElementById("teachportal").style.display="block";
            document.getElementById("teacherusername").innerHTML=data[i].name;
            document.getElementById("teacherid").value=data[i].id;
            
            document.getElementById("fn_assign").value=data[i].name;
            document.getElementById("email_assign").value=data[i].email;
            document.getElementById("subj_assign").value=data[i].subject;
            document.getElementById("subject_owner").value=data[i].subject;
            document.getElementById("teachimgport").src=data[i].thumbnailUrl;
            document.getElementById("teachheadimg").src=data[i].thumbnailUrl;
            
            
        }

        if(log_userid === data[i].id && passwordcheck && data[i].role === "parent" && data[i].status == "accept"){
            document.getElementById("portalogin").style.display="none";
           
            document.getElementById("parentportal").style.display="block";
            document.getElementById("parentusername").innerHTML=data[i].name;
            document.getElementById("parentid").value=data[i].id;
             document.getElementById("parentimgport").src=data[i].thumbnailUrl;
            document.getElementById("parentheadimg").src=data[i].thumbnailUrl;
            
           
      
            
        }

        else {
            setTimeout(()=>{
                document.getElementById("loginread").value=null;
            },3000)
    
            document.getElementById("loginread").value="Not allowed to login. Invalid userID or password"
            document.getElementById("loginread").style.color="red";

          
            
        }
       }

       
}


function Logon(){
    setTimeout(()=>{
    document.getElementById("portal_id").value=localStorage.getItem("portalid")
    document.getElementById("portal_key").value=localStorage.getItem("portalkey")
    document.getElementById("portalchk").checked=localStorage.getItem("portalcheck")
    },1000)
}

   
export default function SignLog(){
    
   

    return(
        <div>
            <section className="containerS" id="portalogin" onLoad={Logon()}>
            
              <div className="formpage login" id="login">
                
            <a onClick={()=>{window.history.back()}} style={{fontSize:"30px",cursor:"pointer"}}>&times;</a>
            
                <div className="form-content">
                    <header>Login</header>
                    <form className="form" onSubmit={logPortal}>
                    <input style={readonly} id="loginread" readOnly/>
                     
                        <div className="field input-field">
                            <input type="text" placeholder="User_Id" name="id"  id="portal_id" className="input" required/>
                        </div>

                        <div className="field input-field">
                            <input type="password" name="password" placeholder="Password" id="portal_key" className="password" required/>
                            <i className='bx bx-hide eye-icon'></i>
                        </div>

                       

                        <div className="form-link">
                        <input type="checkbox" id="portalchk" /><label htmlFor="portalchk">Remember me</label>
                           
                        </div>

                        <div className="field button-field">
                            
                            <button id="loginbtn" type="submit">Login</button>
                            <button id="loogin" style={{display:"none"}}>Please Wait <i className="fa fa-spinner fa-spin"></i>...</button>
                            
                        </div>
                    </form>

                  
                </div>
            </div>
        </section>

<div id="stuportal" style={{display:"none"}}>
    <StudentPortal />
</div>


<div id="teachportal" style={{display:"none"}}>
    <TeachersPortal />
</div>


<div id="parentportal" style={{display:"none"}}>
    <ParentPortal />
</div>

        </div>
    )
}