import React from "react";
import AdminPortal from "../portal/admin_portal";

var readonly={
    padding:"2px 3px",
    width:"100%",
    border:"none"
}



function logAdmin(e){

 e.preventDefault();
var adminpath=process.env.REACT_APP_ADMIN_LOG;

var admin_key=document.getElementById("admin_key");

if(admin_key.value == adminpath){
    document.getElementById("adminlog").style.display="none";
    document.getElementById("adminpage").style.display="block";
    
}
    
                
        setTimeout(()=>{
            document.getElementById("loginread").value=null;
        },5000)

            document.getElementById("loginread").value="Not allowed to login. Invalid password"
            document.getElementById("loginread").style.color="red"
        
        }
    



   
export default function AdminPage(){
    
   

    return(
        <div>
            <section className="containerS" id="adminlog">
            
              <div className="formpage login" id="login">
                
            <a onClick={()=>{window.history.back()}} style={{fontSize:"30px",cursor:"pointer"}}>&times;</a>
            
                <div className="form-content">
                    <header>Login</header>
                    <form className="form" onSubmit={logAdmin}>
                    <input style={readonly} id="loginread" readOnly/>
                     
                        
                        <div className="field input-field">
                            <input type="password" name="password" placeholder="Password" id="admin_key" className="password" required/>
                            <i className='fa fa-hide eye-icon'></i>
                        </div>

                       

                       

                        <div className="field button-field">
                            
                            <button type="submit">Login</button>
                            
                        </div>
                    </form>

                  
                </div>
            </div>
        </section>

<div id="adminpage" style={{display:"none"}}>
    <AdminPortal />
</div>

        </div>
    )
}