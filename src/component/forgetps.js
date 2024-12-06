
import bcrypt from "bcryptjs"
import emailjs from "emailjs-com";

var token=["237788","266889","775556","018933","389912","078854","081463","542311","178000","977000","087109","303030","677778","898900","344111","173333","101234","909080","322222","409098","099999","213132","678905","000099","456446","957436","255307","743538"];


var accountapi=process.env.REACT_APP_ACCOUNT_API;


var tokenrandom=Math.floor(Math.random()* token.length);
var tok=token[tokenrandom];

function Subem(e){

    e.preventDefault();
    
    var email=document.getElementById("compare_email").value;
    
    var name=document.getElementById("psname").value;
    const formData = {
        user_email: email,
        subj:"Verification Code",
        to_name: name,
        mays_msg:`You requested this code to verify your account. Verification code is ${tok}. This code is valid for ten minutes.` 
     
      };
  
  
        emailjs.send("service_4dt6s3i", "template_wwdrjbl", formData, "VIB8bKSD-ZS3RCCHD")
          .then((res) => {
            console.log(res.text);
            alert("Code sent successfully. Check your mail.")
          })
          .catch((err) => {
            console.log(err.text);
          });
          document.getElementById("chkcode").style.display="block";
          document.getElementById("chkmail").style.display="none";
}


function Checkcode(e){
    e.preventDefault();
    var code=document.getElementById("compare_code").value;
    for(var i=0; i < token.length; i++){
 if(code === token[i]){
    document.getElementById("ps_new").style.display="block";
    document.getElementById("chkcode").style.display="none";
 }
 else{
    setTimeout(()=>{
        document.getElementById("error_msg").style.color="black"
    },3000)
    document.getElementById("error_msg").value="invalid code. Try again";
    document.getElementById("error_msg").style.color="red"

 }
    }
}
function Checkemail(){
       
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
               var email=document.getElementById("compare_email").value;
   
             
            if(email === data[i].email){
                document.getElementById("email_link").style.display="block";

            document.getElementById("psid").value=data[i].id;
            document.getElementById("psrole").value=data[i].role;
            
            document.getElementById("psname").value=data[i].name;
                document.getElementById("compare_email").style.background="lightgreen";
                
            }
            else{
                setTimeout(()=>{
                    document.getElementById("compare_email").style.background="white"
                },3000)
                document.getElementById("compare_email").style.background="red"
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
            subj:"Passcode Updated",
            to_name: name,
            mays_msg:`Your password has been successfully updated. Verify it was you by logging in. https://mayseducentre.github.io/-/#/portal` 
         
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





export default function ForgetPs(){

    return(
        <>
        <section className="containerS" id="portalogin">
          <div id="forgot" className="formpage">
            <input type="hidden" id="psname"/>
            
            <a onClick={()=>{window.history.back()}} style={{fontSize:"30px",cursor:"pointer"}}>&times;</a>
            
                <div className="form-content">
                    <header>Forgot Password</header>
                    <form className="form" onSubmit={Subem} id="chkmail">
                        
                   
                        <div className="field input-field">
                            <input type="email" name="email" onKeyUp={Checkemail} onBlur={Checkemail} placeholder="Verify email" id="compare_email"  required/>
                        </div>

                        <div className="field button-field" id="email_link" style={{display:"none"}}>
                            
                            <button>Submit</button>
                            
                        </div>
                    </form>

                    <form className="form" onSubmit={Checkcode} id="chkcode" style={{display:"none"}}>
                        
                        <input id="error_msg" readOnly/>
                       
                            <div className="field input-field">
                                <input type="text" placeholder="Enter Verification code" id="compare_code"  required/>
                            </div>
    
                            <div className="field button-field" id="codechk">
                                
                                <button>Verify</button>
                                
                            </div>
                        </form>

                        <form className="form" onSubmit={Newps} id="ps_new" style={{display:"none"}}>
                        
                        <input id="psid" type="hidden" readOnly/>
                        
                        <input id="psrole" type="hidden" readOnly/>
                       
                            <div className="field input-field">
                                <input type="text" placeholder="Enter New password" id="password"  required/>
                            </div>
                            <div className="field input-field">
                                <input type="password" placeholder="Confirm Password" onKeyUp={checkps} id="compare_ps"  required/>
                            </div>
    
                            <div className="field button-field" id="pschk">
                                
                                <button id="pssub">Submit</button>
                                <a style={{display:"none"}} id="lod"><i className="fa fa-spinner fa-spin"></i> Loading</a>
                            </div>
                        </form>

                </div>

                <div className="line"></div>

                
               

            </div>
</section>
        </>
    )
}