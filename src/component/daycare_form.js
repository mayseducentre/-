
import bcrypt from "bcryptjs"
import emailjs from "emailjs-com";


var accountapi=process.env.REACT_APP_ACCOUNT_API;



function Checkid(e){
       e.preventDefault();

    fetch(`${accountapi}/studentaccount`)
    .then(res=>res.json())
    .then(data => checkData(data))
    .catch(err => console.log(err))
   
    
    fetch(`${accountapi}/staffaccount`)
    .then(res=>res.json())
    .then(data => checkData(data))
    .catch(err => console.log(err))
   
    
    fetch(`${accountapi}/parentaccount`)
    .then(res=>res.json())
    .then(data => checkData(data))
    .catch(err => console.log(err))
   
       }
   
       function checkData(data){
   
           for(var i=0; i< data.length; i++){
               var id=document.getElementById("compare_id").value;
   
             
            if(id === data[i].id){
                
                document.getElementById("ps_new").style.display="block";
                document.getElementById("chkmail").style.display="none";
      
            document.getElementById("psid").value=data[i].id;
            document.getElementById("psrole").value=data[i].role;
            
            document.getElementById("psname").value=data[i].name;
            document.getElementById("compare_email").value=data[i].email;
                document.getElementById("compare_id").style.background="lightgreen";
                
            }
            else{
                setTimeout(()=>{
                    document.getElementById("compare_id").style.background="white"
                },3000)
                document.getElementById("compare_id").style.background="red"
            }
              
           }
          
       }

       




function checkps(e){
    e.preventDefault();
    
    var passcode=document.getElementById("password").value;
    var passconfirm=document.getElementById("compare_ps").value;

    if(passconfirm !== passcode){
        document.getElementById("password").style.backgroundColor="#fa7373"
        
        document.getElementById("compare_ps").style.backgroundColor="#fa7373";
        
    
       
       }
       else if(passconfirm == passcode){
        document.getElementById("password").style.backgroundColor="#9ef178"
        
        document.getElementById("compare_ps").style.backgroundColor="#9ef178";
    
        setTimeout(()=>{
            
        document.getElementById("password").style.backgroundColor="white"
        document.getElementById("compare_ps").style.backgroundColor="white"
        }, 10000)
       }
       
}





function Newps(e){
    e.preventDefault();
    var role=document.getElementById("psrole").value;
    var id=document.getElementById("psid").value;
    
    var passcode=document.getElementById("password").value;
    const salt=bcrypt.genSaltSync(10);
    const hashedpassword=bcrypt.hashSync(passcode, salt);


    document.getElementById("pssub").style.display="none"
    document.getElementById("lod").style.display="block"
    if(role =="student"){
        var acc="studentaccount"
    }
    if(role =="staff"){
        var acc="staffaccount"
    }
    if(role =="parent"){
        var acc="parentaccount"
    }
    fetch(`${accountapi}/${acc}/${id}`,{
        method:"PATCH",
        body:JSON.stringify({
         "passcode":hashedpassword
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res=>res.json())
    .then(data => {
        console.log(data)
        document.getElementById("password").value=null;
        document.getElementById("compare_ps").value=null;
        alert("Your passcode is updated successfully")
        var name=document.getElementById("psname").value;
        var email=document.getElementById("compare_email").value;

        const formData = {
            user_email: email,
            subj:"Account Completed Successfully",
            to_name: name,
            mays_msg:`Your account has been successfully completed. Verify it was you by logging in. https://mayseducentre.github.io/-/#/portal` 
         
          };
      
      
            emailjs.send("service_4dt6s3i", "template_wwdrjbl", formData, "VIB8bKSD-ZS3RCCHD")
              .then((res) => {
                console.log(res.text);
              })
              .catch((err) => {
                console.log(err.text);
              });
              
    document.getElementById("pssub").style.display="none"
    document.getElementById("lod").style.display="block"
        window.location.href="#/portal";
    })
    .catch(err => console.log(err))
   
}





export default function DaycareForm(){

    return(
        <>
        <section className="containerS" id="portalogin">
          <div id="forgot" className="formpage">
            <input type="hidden" id="psname"/>
            
            <a onClick={()=>{window.history.back()}} style={{fontSize:"30px",cursor:"pointer"}}>&times;</a>
            
                <div className="form-content">
                    <header>Complete Form</header>
                    <form className="form" onSubmit={Checkid} id="chkmail">
                        
                   
                        <div className="field input-field">
                            <input type="text" name="id" placeholder="Verify id" id="compare_id"  required/>
                        </div>

                        <div className="field button-field">
                            
                            <button>Submit</button>
                            
                        </div>
                    </form>


                        <form className="form" onSubmit={Newps} id="ps_new" style={{display:"none"}}>
                        
                        <input id="psid" type="hidden" readOnly/>
                        
                        <input id="compare_email" type="hidden" readOnly/>
                        
                        <input id="psrole" type="hidden" readOnly/>
                       
                            <div className="field input-field">
                                <input type="text" placeholder="Enter New password" id="password"  required/>
                            </div>
                            <div className="field input-field">
                                <input type="password" placeholder="Confirm Password" onKeyUp={checkps} id="compare_ps"  required/>
                            </div>
    
                            <div className="field button-field" id="pschk">
                                
                                <button id="pssub">Submit</button>
                                <a style={{display:"none"}} id="lod"><div className="loadery"></div></a>
                            </div>
                        </form>

                </div>

                <div className="line"></div>

                
               

            </div>
</section>
        </>
    )
}