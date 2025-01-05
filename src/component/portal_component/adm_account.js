
import emailjs from "emailjs-com"
import { useRef } from "react";


const select ={
    padding:"10px 12px",
    width:"100%"
}





var path=process.env.REACT_APP_API_URL;

export default function DaycareStaff(){
    


    const formRef= useRef();

    var accountapi=process.env.REACT_APP_ACCOUNT_API;
    function Postaccount(e){
        Checkemail();


        e.preventDefault();

      
        var name=document.getElementById("name_account").value;
        var email=document.getElementById("email_account").value;
        var role=document.getElementById("staffrole").value;
        var gender=document.getElementById("gender_account").value;
        var phone=document.getElementById("phone_account").value;
      
        const constantPrefix="Day";
        var d=new Date();
        const timestamp= d.getTime().toString();
        const acc_date=d.toLocaleDateString();
        const id=constantPrefix+timestamp.slice(-6);

        const formData={
            user_email: formRef.current.user_email.value,
            reply_to: formRef.current.user_email.value,
            subj:"Invited to MEC daycare portal",
            to_name: formRef.current.user_name.value,
            mays_msg:`You have been invited to join the MEC Daycare staff portal. Click the link below to create your account. ${name},use this id:   '${id}' to fill out the form. https://mayseducentre.github.io/-#/daycareuser/account/form` 
         };
  
         const noticemail = {
            subject_mail: "New signup on MEC webapp",
            main_body: `A new user has signed up to the following account: ${name}, ${email}. Check activity on https://mayseducentre.github.io/-/#/admin`,
          };
        var apifetch=`${accountapi}/${role}account`;

    
    document.getElementById("waitbtn").style.display="block";
    document.getElementById("createbtn").style.display="none";
    
    setTimeout(()=>{
        const confirmationbox= window.confirm(`You are creating an account as a ${role}. And are you sure that ${email} is valid. We will send a code to  your mail.`);
     

        if(confirmationbox===true && role !== "none"){

            if(!navigator.online){
                alert("You are currently offline. Check your internet connection and try again")
            };
            
          

            emailjs.send('service_4dt6s3i','template_wwdrjbl', formData, 'VIB8bKSD-ZS3RCCHD')
            .then((res)=>{
                console.log(res.text);
            })
            .catch((err)=>{
                console.log(err.text)
            });
          
          
            
                emailjs.send("service_4dt6s3i", "template_0q1tvwm", noticemail, "VIB8bKSD-ZS3RCCHD")
                  .then((res) => {
                    console.log(res.text);
                  })
                  .catch((err) => {
                    console.log(err.text);
                  });

         fetch(`${accountapi}/staffaccount`,  {
            method:"POST",
            body:JSON.stringify({
                "id": id,
            "name":name,
            "email": email,
            "passcode": "",
            "country": "Ghana",
            "role":"staff",
            "school":role,
            "gender": gender,
            "subject": "",
            "contact": phone,
            "thumbnailUrl": "",
            "notice":"",
            "report":"",
            "status":"enrolled",
            "account_date":acc_date
            }),
            headers:{
                "Content-type":"application/json"
            }
         })
         .then(res => res.json())
         .then(data => {console.log(data)
            alert("Signed up successfully! ID has been submitted to inbox.")
           
           document.getElementById("name_account").value="";
           document.getElementById("email_account").value="";
            })
         .catch(err => {console.log(err)
        alert("Failed to signup")})
        }
      
      

       


        document.getElementById("waitbtn").style.display="none";
        document.getElementById("createbtn").style.display="block";
        }, 3000)
       

        
    }
    

    function Checkemail(){
       

 
 fetch(`${accountapi}/staffaccount`)
 .then(res=>res.json())
 .then(data => checkData(data))
 .catch(err => console.log(err))

 
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


    return(
        <>
        
<section className="checkout spad">
<div className="container">
    <div className="checkout__form">
        <form onSubmit={Postaccount} ref={formRef}>
            <div className="row">
                <div className="col-lg-8 col-md-6">
                    <h6 className="checkout__title">Account For Daycare Staff</h6>
                    
                    <input type="text" style={{border:"none", width:"100%", padding:"8px 10px", background:"transparent"}} id="error_msg" readOnly/>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="checkout__input">
                                <p>Staff's FullName<span>*</span></p>
                                <input type="text" id="name_account" placeholder="Full Name" name="user_name" required autoComplete="off"/>
                            </div>
                            <div className="checkout__input">
                                <p>Staff's Gender<span>*</span></p>
                                <select style={select} id="gender_account">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                     </select>
                            </div>
                          
                        </div>
                       
                    </div>
                    <div className="col-lg-6">
                            <div className="checkout__input">
                                <p>Staff's Email <small></small><span>*</span></p>
                                <input type="email" onKeyDown={Checkemail} onBlur={Checkemail} id="email_account" name="user_email" placeholder="Valid email" required autoComplete="off"/>
                            </div>
                           </div>
                   
                   
                


                    <div className="row">
                    <div className="checkout__input">
                                <p> Staff's Phone Number<span>*</span></p>
                                <input type="number" id="phone_account" placeholder="Enter phone number"/>
                            </div>

                            <div className="checkout__input">
                                <p>Staff's Role<span>*</span></p>
                                <input type="text" id="staffrole" value="daycare" readOnly/>
                            </div>
                   
                          
                    </div>

                    
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="checkout__order">
                        
                        <button type="submit" id="createbtn" className="site-btn" onClick={Checkemail}>Create Account</button>
                        <a id="waitbtn" style={{display:"none"}}><div className="loadery"></div></a>
                   
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>


</section>

<br/>
<br/>

        </>
    )
}