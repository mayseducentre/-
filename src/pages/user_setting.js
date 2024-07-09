import React from "react";
import bcrypt from "bcryptjs";
import UserSet from "../component/userset";

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

 fetch(`${path}/studentaccount`)
 .then(res=>res.json())
 .then(data => logintoPortal(data))
 .catch(err => {console.log(err)
    alert("You are currently offline. Check your internet connection and try again")})

 
 fetch(`${path}/staffaccount`)
 .then(res=>res.json())
 .then(data => logintoPortal(data))
 .catch(err => {console.log(err)
    alert("You are currently offline. Check your internet connection and try again")})

 
 fetch(`${path}/parentaccount`)
 .then(res=>res.json())
 .then(data => logintoPortal(data))
 .catch(err => {console.log(err)
alert("You are currently offline. Check your internet connection and try again")})
}

function logintoPortal(data){
    for(var i=0; i < data.length; i++){
        var log_userid=document.getElementById("portal_id").value;
        var log_pass=document.getElementById("portal_key").value;
        const storedhash= data[i].passcode;
        var passwordcheck= bcrypt.compareSync(log_pass, storedhash);

        if(log_userid === data[i].id && passwordcheck){
            document.getElementById("portalogin").style.display="none";
           
            document.getElementById("userset").style.display="block";
            
            
            document.getElementById("emailport").value=data[i].email;
            document.getElementById("idport").innerHTML=data[i].id;
            document.getElementById("passcoport").value=data[i].passcode;
            
document.getElementById("nameport").value=data[i].name;
document.getElementById("roleport").value=data[i].role;
document.getElementById("countryport").value=data[i].country;
document.getElementById("phoneport").value=data[i].contact;

document.getElementById("topimgport").src=data[i].thumbnailUrl;

document.getElementById("genderport").value=data[i].gender;

document.getElementById("topnameport").innerHTML=data[i].name;

document.getElementById("toproleport").innerHTML=data[i].role;

document.getElementById("overviewnameport").innerHTML=data[i].name;

document.getElementById("overviewgenderport").innerHTML=data[i].gender;
document.getElementById("overviewroleport").innerHTML=data[i].role;
document.getElementById("overviewcountryport").innerHTML=data[i].country;
document.getElementById("overviewphoneport").innerHTML=data[i].contact;
document.getElementById("overviewclassport").innerHTML=data[i].class;
document.getElementById("overviewemailport").innerHTML=data[i].email;
        }

     

        else{
                
        setTimeout(()=>{
            document.getElementById("loginread").value=null;
        },5000)

            document.getElementById("loginread").value="Not allowed to login. Invalid userID or password"
            document.getElementById("loginread").style.color="red"
        
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

   
export default function SignSet(){
    
   

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
                            
                            <button type="submit">Login</button>
                            
                        </div>
                    </form>

                  
                </div>
            </div>
        </section>

<div id="userset" style={{display:"none"}}>
    <UserSet />
</div>


        </div>
    )
}