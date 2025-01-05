import React from "react";
import StudentPortal from "../portal/student_portal";
import ParentPortal from "../portal/parent_portal";
import TeachersPortal from "../portal/teachers_portal";
import bcrypt from "bcryptjs";
import Daycarestaffportal from "../portal/daycarestaff";

var readonly={
    padding:"2px 3px",
    width:"100%",
    border:"none"
}

var path=process.env.REACT_APP_ACCOUNT_API;


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
   

        fetch(`${path}/studentaccount`)
        .then(res=>res.json())
        .then(data => {
           
            logintoPortal(data)
        
       document.getElementById("loogin").style.display="none";
       document.getElementById("loginbtn").style.display="block";
    })
        .catch(err => {console.log(err)
           alert("Error been encountered. Check internet connection and try again.")})
       
        
        fetch(`${path}/staffaccount`)
        .then(res=>res.json())
        .then(data => {
           
            logintoPortal(data)
        
       document.getElementById("loogin").style.display="none";
       document.getElementById("loginbtn").style.display="block";
    })
        .catch(err => {console.log(err)
           alert("Error been encountered. Check internet connection and try again.")})
       
        
        fetch(`${path}/parentaccount`)
        .then(res=>res.json())
        .then(data => {
           
            logintoPortal(data)
        
       document.getElementById("loogin").style.display="none";
       document.getElementById("loginbtn").style.display="block";
    })
        .catch(err => {console.log(err)
       alert("Error been encountered. Check internet connection and try again.")})
       

    
}

function logintoPortal(data){



    for(var i=0; i < data.length; i++){
        var log_userid=document.getElementById("portal_id").value;
        var log_pass=document.getElementById("portal_key").value;
        const storedhash= data[i].passcode;
        var passwordcheck= bcrypt.compareSync(log_pass, storedhash);

        if(log_userid === data[i].id && passwordcheck && data[i].role === "student" && data[i].status === "enrolled"){
            document.getElementById("portalogin").style.display="none";
           
            document.getElementById("stuportal").style.display="block";
            document.getElementById("studentusername").innerHTML=data[i].name;
            document.getElementById("studentid").value=data[i].id;
            document.getElementById("stu_class").value=data[i].class;
            document.getElementById("stu_classgrade").value=data[i].class;
            document.getElementById("stuimgport").src=data[i].thumbnailUrl;
            document.getElementById("stuheadimg").src=data[i].thumbnailUrl;
             
      
        }

        
        if(log_userid === data[i].id && passwordcheck && data[i].role === "staff" && data[i].status === "enrolled" && data[i].school !== "daycare"){
            document.getElementById("portalogin").style.display="none";
           
            document.getElementById("teachportal").style.display="block";
            document.getElementById("teacherusername").innerHTML=data[i].name;
            document.getElementById("staffname").value=data[i].name;
            document.getElementById("teacherid").value=data[i].id;
            
            document.getElementById("fn_assign").value=data[i].name;
            document.getElementById("email_assign").value=data[i].email;
            document.getElementById("fn_grades").value=data[i].name;
            document.getElementById("email_grades").value=data[i].email;
            document.getElementById("subj_assign").value=data[i].subject;
            document.getElementById("subj_grades").value=data[i].subject;
            document.getElementById("subject_owner").value=data[i].subject;
            document.getElementById("teachimgport").src=data[i].thumbnailUrl;
            document.getElementById("teachheadimg").src=data[i].thumbnailUrl;
            
            
        }

        if(log_userid === data[i].id && passwordcheck && data[i].role === "staff" && data[i].status === "enrolled" && data[i].school === "daycare"){
            document.getElementById("portalogin").style.display="none";
           
            document.getElementById("daycarestaffportal").style.display="block";
            document.getElementById("daycusername").innerHTML=data[i].name;
            document.getElementById("staffname").value=data[i].name;
            document.getElementById("daycarestaffid").value=data[i].id;
            
            document.getElementById("fn_assign").value=data[i].name;
            document.getElementById("email_assign").value=data[i].email;
            document.getElementById("subj_assign").value=data[i].subject;
            document.getElementById("subject_owner").value=data[i].subject;
            document.getElementById("teachimgport").src=data[i].thumbnailUrl;
            document.getElementById("teachheadimg").src=data[i].thumbnailUrl;

            document.getElementById("daycimgport").src=data[i].thumbnailUrl;
            document.getElementById("daycheadimg").src=data[i].thumbnailUrl;
            
            
        }

        if(log_userid === data[i].id && passwordcheck && data[i].role === "parent" && data[i].status === "enrolled"){
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
    
            document.getElementById("loginread").value="Invalid userID or password"
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
                            <a onClick={()=>{window.location.href="#/fgps"}}>Forgot password</a>
                        </div>
<br/>
                       

                        <div className="form-link">
                        <input type="checkbox" id="portalchk" /><label htmlFor="portalchk">Remember me</label>
                           
                        </div>

                        <div className="form-link">
                            <p>Dont have an account. <a href="#/account">Create one</a></p>
                           
                        </div>


                        <div className="field button-field">
                            
                            <button id="loginbtn" type="submit">Login</button>
                            
                           <center>
                             <div className="loadery" id="loogin" style={{display:"none"}}></div>
                            </center>
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

<div id="daycarestaffportal" style={{display:"none"}}>
    <Daycarestaffportal />
</div>

        </div>
    )
}