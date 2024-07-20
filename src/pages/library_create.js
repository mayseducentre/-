import React from "react";
import CreateItem from "../component/create_items";

var readonly={
    padding:"2px 3px",
    width:"100%",
    border:"none"
}



function logAdmin(e){

 e.preventDefault();
var adminpath=process.env.REACT_APP_LIBRARY_LOG;

var library_key=document.getElementById("library_key");

if(library_key.value == adminpath){
    document.getElementById("librarylog").style.display="none";
    document.getElementById("librarypage").style.display="block";
    
}
    
                
        setTimeout(()=>{
            document.getElementById("loginread").value=null;
        },5000)

            document.getElementById("loginread").value="Not allowed to login. Invalid password"
            document.getElementById("loginread").style.color="red"
        
        }
    



   
export default function LibraryLog(){
    
   

    return(
        <div>
            <section className="containerS" id="librarylog">
            
              <div className="formpage login" id="login">
                
            <a onClick={()=>{window.history.back()}} style={{fontSize:"30px",cursor:"pointer"}}>&times;</a>
            
                <div className="form-content">
                    <header>Login</header>
                    <form className="form" onSubmit={logAdmin}>
                    <input style={readonly} id="loginread" readOnly/>
                     
                        
                        <div className="field input-field">
                            <input type="password" name="password" placeholder="Password" id="library_key" className="password" required/>
                            <i className='fa fa-hide eye-icon'></i>
                        </div>

                       

                       

                        <div className="field button-field">
                            
                            <button type="submit">Login</button>
                            
                        </div>
                    </form>

                  
                </div>
            </div>
        </section>

<div id="librarypage" style={{display:"none"}}>
    <CreateItem />
</div>

        </div>
    )
}