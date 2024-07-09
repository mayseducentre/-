
import bcrypt from "bcryptjs"
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com"


const select ={
    padding:"10px 12px",
    width:"100%"
}



function Sortout(){
    var role=document.getElementById("role_account").value;
    if(role == "student"){
        document.getElementById("studentlogic").style.display="block";
        document.getElementById("stafflogic").style.display="none"
        document.getElementById("parentlogic").style.display="none"
    }
    if(role == "staff"){
        document.getElementById("stafflogic").style.display="block"
        document.getElementById("studentlogic").style.display="none"
        document.getElementById("parentlogic").style.display="none"
    }
    if(role == "parent"){
        document.getElementById("parentlogic").style.display="block"
        document.getElementById("stafflogic").style.display="none"
        document.getElementById("studentlogic").style.display="none";
        
    }
    if(role == "none"){
        document.getElementById("parentlogic").style.display="none"
        document.getElementById("stafflogic").style.display="none"
        document.getElementById("studentlogic").style.display="none"
    }
}


function checkps(){
    
    var passconfirm=document.getElementById("passcode_confirm").value;
    var passcode=document.getElementById("passcode_account").value;

    if(passconfirm !== passcode){
        document.getElementById("passcode_account").style.backgroundColor="#fa7373"
        
        document.getElementById("passcode_confirm").style.backgroundColor="#fa7373";
    
       
       }
       else if(passconfirm == passcode){
        document.getElementById("passcode_account").style.backgroundColor="#9ef178"
        
        document.getElementById("passcode_confirm").style.backgroundColor="#9ef178";
    
        setTimeout(()=>{
            
        document.getElementById("passcode_account").style.backgroundColor="white"
        document.getElementById("passcode_confirm").style.backgroundColor="white"
        }, 10000)
       }
       
}


var path=process.env.REACT_APP_API_LOCAL;

export default function Accountform(){
    const [level, setLevel]=useState([]);
    const [subject, setSubject]=useState([]);

    useEffect(()=>{
        fetch(`${path}/level`)
        .then(res=>res.json())
        .then(data => setLevel(data))
        .catch(err => console.log(err))

        fetch(`${path}/courses`)
        .then(res=>res.json())
        .then(data => setSubject(data))
        .catch(err => console.log(err))
       
    },[])
    


    const formRef= useRef();

    function Postaccount(e){

        Checkemail();


        e.preventDefault();

      
        var name=document.getElementById("name_account").value;
        var passcode=document.getElementById("passcode_account").value;
        var email=document.getElementById("email_account").value;
        var role=document.getElementById("role_account").value;
        var userclass=document.getElementById("class_account").value;
        var subject=document.getElementById("subject_account").value;
        var gender=document.getElementById("gender_account").value;
        var childid=document.getElementById("childid_account").value;
        var phone=document.getElementById("phone_account").value;
        var Pphone=document.getElementById("Pphone_account").value;
    
        const salt=bcrypt.genSaltSync(10);
        const hashedpassword=bcrypt.hashSync(passcode, salt);
        const constantPrefix="011";
        const timestamp= new Date().getTime().toString();
        const randomdigit=Math.floor(Math.random()* 10).toString();
        const id=constantPrefix+timestamp.slice(-6)+randomdigit;
        var passconfirm=document.getElementById("passcode_confirm").value;

        const formData={
            user_email: formRef.current.user_email.value,
            reply_to: formRef.current.user_email.value,
            to_name: formRef.current.user_name.value,
            mays_msg:`Your userID is '${id}'. Please use this ${id} to login into the portal. https://mayseducentre.github.io/-#/portal` 
         };
 
        var apifetch=`${path}/${role}account`;

    
       var inputimg=document.getElementById("portal_img");
       var datafile=inputimg.files[0];
       var filereader= new FileReader();
        filereader.readAsDataURL(datafile);
     
     
        filereader.addEventListener("load", () => {
            var base64data=filereader.result;
   
            
          

       if(role == "student"){
        var formpage={
            "id": id,
            "name":name,
            "email": email,
            "passcode": hashedpassword,
            "country": "Ghana",
            "role":"student",
            "thumbnailUrl": base64data,
            "gender": gender,
            "class": userclass,
            "notice":"",
            "status":"accept"
        }
    } 

    if(role == "staff"){
        var formpage={
            "id": id,
            "name":name,
            "email": email,
            "passcode": hashedpassword,
            "country": "Ghana",
            "role":"staff",
            "gender": gender,
            "subject": subject,
            "contact": phone,
            "thumbnailUrl": base64data,
            "notice":"",
            "status":"accept"
        }
    } 

    if(role == "parent"){
        var formpage={
            "id": id,
            "name":name,
            "email": email,
            "passcode": hashedpassword,
            "country": "Ghana",
            "gender": gender,
            "role":"parent",
            "contact": Pphone,
            "child_id": childid,
            "notice":"",
            "thumbnailUrl": base64data,
            "status":"accept"
        }
    } if(role == "none"){
        alert("Please role cannot be none!")
    }
    document.getElementById("waitbtn").style.display="block";
    document.getElementById("createbtn").style.display="none";
    
    setTimeout(()=>{
        const confirmationbox= window.confirm(`You are creating an account as a ${role}. And are you sure that ${email} is valid. We will send a code to  your mail.`);
     

        if(passcode.length >=8 && passconfirm == passcode && confirmationbox===true && role !== "none"){

            if(!navigator.online){
                alert("You are currently offline. Check your internet connection and try again")
            };
            
          

            // emailjs.send('service_4dt6s3i','template_wwdrjbl', formData, 'VIB8bKSD-ZS3RCCHD')
            // .then((res)=>{
            //     console.log(res.text);
            // })
            // .catch((err)=>{
            //     console.log(err.text)
            // });
           
        

         fetch(`${path}/${role}account`,  {
            method:"POST",
            body:JSON.stringify(formpage),
            headers:{
                "Content-type":"application/json"
            }
         })
         .then(res => res.json())
         .then(data => {console.log(data)
            alert("Signed up successfully")
           
           document.getElementById("name_account").value="";;
           document.getElementById("passcode_confirm").value="";
           document.getElementById("passcode_account").value="";
           document.getElementById("email_account").value="";
            })
         .catch(err => {console.log(err)
        alert("Failed to signup")})
        }
      
        else if(passcode.length < 8){
            var errormsg=document.getElementById("error_msg")
            errormsg.value="Error occurred. Password must have 8 characters";
             errormsg.style.color="red"
    
             setTimeout(()=>{
                errormsg.value=null     
             }, 5000)
        }

        else if(passconfirm !== passcode){
            var errormsg=document.getElementById("error_msg")
            errormsg.value="Error occurred. Password do not match";
             errormsg.style.color="red"
    
             setTimeout(()=>{
                errormsg.value=null     
             }, 5000)
        }

       


        document.getElementById("waitbtn").style.display="none";
        document.getElementById("createbtn").style.display="block";
        }, 3000)
       
    })   

        
    }
    
function imgfile(){
    var inputimg=document.getElementById("portal_img");
    var datafile=inputimg.files[0];
    var filereader= new FileReader();
    var topimgport=document.getElementById("displayimage")
     filereader.readAsDataURL(datafile);
  
  if(datafile.size > 5 * 1024 * 1024){
    alert("Sorry your file must be less than 5mb")
  }

  else{
    filereader.addEventListener("load", () => {
      var url=filereader.result;
      topimgport.src= url;
  
    })
}
  }
  

    function Checkemail(){
       
 fetch(`${path}/studentaccount`)
 .then(res=>res.json())
 .then(data => checkData(data))
 .catch(err => console.log(err))

 
 fetch(`${path}/staffaccount`)
 .then(res=>res.json())
 .then(data => checkData(data))
 .catch(err => console.log(err))

 
 fetch(`${path}/parentaccount`)
 .then(res=>res.json())
 .then(data => checkData(data))
 .catch(err => {console.log(err)
    alert("You are currently offline. Check your internet connection and try again")
alert("Failed to verify");
window.location.reload()})

    }

    function checkData(data){

        for(var i=0; i< data.length; i++){
            var email=document.getElementById("email_account").value;

            if(email === data[i].email){
                document.getElementById("email_account").value=null;
            setTimeout(()=>{
                document.getElementById("error_msg").value=null;
            },7000)

                document.getElementById("error_msg").value="email already exist"
                document.getElementById("error_msg").style.color="red"
                
            }
           
        }
       
    }


    function checkID(){
        fetch(`${path}/studentaccount`)
        .then(res => res.json())
        .then(data => verifyID(data))
        .catch(err => console.log(err))
    }

    function verifyID(data){
        var childid=document.getElementById("childid_account");

        for(var i=0; i < data.length; i++){
            if(childid.value.length ==10 && childid.value !==data[i].id){
              alert("Sorry child's ID does not exist.")
              window.location.reload();
            }
        }
    }
    return(
        <>
        
<section className="checkout spad">
<div className="container">
    <div className="checkout__form">
        <form onSubmit={Postaccount} ref={formRef}>
            <div className="row">
                <div className="col-lg-8 col-md-6">
                    <h6 className="checkout__title">Account</h6>
                    
                    <input type="text" style={{border:"none", width:"100%", padding:"8px 10px", background:"transparent"}} id="error_msg" readOnly/>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="checkout__input">
                                <p>FullName<span>*</span></p>
                                <input type="text" id="name_account" placeholder="Full Name" name="user_name" required autoComplete="off"/>
                            </div>
                            <div className="checkout__input">
                                <p>Gender<span>*</span></p>
                                <select style={select} id="gender_account">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                     </select>
                            </div>
                            <div className="checkout__input">
                                <p>Upload Image<span>*</span></p>
                               <input type="file" onChange={imgfile} accept="image" id="portal_img"/>
                               <img src={require("../img/avatar.jpg")} id="displayimage" style={{maxWidth:"50%",maxHeight:"50%"}}/>
                            </div>
                        </div>
                       
                    </div>
                    <div className="col-lg-6">
                            <div className="checkout__input">
                                <p>Email<span>*</span></p>
                                <input type="email" onKeyDown={Checkemail} onBlur={Checkemail} id="email_account" name="user_email" placeholder="Valid email" required autoComplete="off"/>
                            </div>
                            <div id="verify">
                            <div className="checkout__input">
                                <p>Password<span>*</span></p>
                                <input type="password" id="passcode_account" placeholder="At least 8 characters" required/>
                            </div>
                            <div className="checkout__input">
                                <p>Confirm Password<span>*</span></p>
                                <input type="password" id="passcode_confirm" onKeyUp={checkps} placeholder="Confirm password" required/>
                            </div>
                            </div>
                        </div>
                    
                   
                    <div className="row">

                        <div className="col-lg-6">
                            <div className="checkout__input">
                                <p>Role<span>*</span></p>
                                <select style={select} id="role_account" onChange={Sortout}>
                                <option value="none">None</option>
                                    <option value="student">Student</option>
                                    <option value="staff">Teacher</option>
                                    <option value="parent">Parent</option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                     
                    <div className="row" id="studentlogic" style={{display:"none"}}>
                    <div className="checkout__input">
                                <p>Student's Form/Level<span>*</span></p>
                                <select style={select} id="class_account">
                                    {level.map((lev)=>(
                                        <option value={lev.level}>{lev.level}</option>
                                   
                                    ))}
                                    
                                     </select>
                            </div>

                          
                    </div>


                    <div className="row" id="stafflogic" style={{display:"none"}}>
                    <div className="checkout__input">
                                <p>Phone Number<span>*</span></p>
                                <input type="number" id="phone_account" placeholder="Enter phone number"/>
                            </div>
                    <div className="checkout__input">
                                <p>Subject<span>*</span></p>
                                <select style={select} id="subject_account">
                                {subject.map((sub)=>(
                                        <option value={sub.course}>{sub.course}</option>
                                   
                                    ))}
                                    
                                     </select>
                            </div>

                          
                    </div>


                    <div className="row" id="parentlogic" style={{display:"none"}}>
                    <div className="checkout__input">
                                <p>Phone Number<span>*</span></p>
                                <input type="number" id="Pphone_account" placeholder="Enter phone number"/>
                            </div>
                    <div className="checkout__input">
                                <p>Child's ID<span>*</span></p>
                                <input type="text" id="childid_account" onKeyUp={checkID} placeholder="Enter student name" autoComplete="off"/>
                            </div>
                    
                    </div>

                    
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="checkout__order">
                        
                        <button type="submit" id="createbtn" className="site-btn" onClick={Checkemail}>Create Account</button>
                        <button id="waitbtn" style={{display:"none"}} className="site-btn">Please Wait ...</button>
                   
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