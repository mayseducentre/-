

var readonly={
    padding:"2px 3px",
    width:"100%",
    border:"none"
}


   
export default function SignLog(){
    
   

    return(
        <div>
        <section className="containerS">
              <div className="formpage login" id="login">
                
            <a onClick={()=>{window.history.back()}} style={{fontSize:"30px",cursor:"pointer"}}>&times;</a>
            
                <div className="form-content">
                    <header>Login</header>
                    <form className="form" >
                    <input style={readonly} id="loginread" readOnly/>
                     
                        <div className="field input-field">
                            <input type="text" placeholder="UserId"  id="userid" className="input" required/>
                        </div>

                        <div className="field input-field">
                            <input type="password" placeholder="Password" id="logp" className="password" required/>
                            <i className='bx bx-hide eye-icon'></i>
                        </div>

                       

                        <div className="form-link">
                        <input type="checkbox" id="check" /><label htmlFor="check">Remember me</label>
                           
                        </div>

                        <div className="field button-field">
                            
                            <button type="submit">Login</button>
                            
                        </div>
                    </form>

                  
                </div>

                <div className="line"></div>

               

               

            </div>
            

            
        </section>


        </div>
    )
}