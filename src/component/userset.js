
import "../bootstrap.css";
import "../style.css";
import Footer from "./footer";
import ScrollToTop from "react-scroll-to-top";
import Header from "./header";

function Overview(){
    var overview=document.getElementById("profile-overview");
    var edit=document.getElementById("profile-edit")
    var settings=document.getElementById("profile-settings")
    
    overview.classList.remove("hide");
    edit.classList.add("hide");
    settings.classList.add("hide")
}


function Edit(){
  // var nameport=document.getElementById("nameport");
    var overview=document.getElementById("profile-overview");
    var edit=document.getElementById("profile-edit")
    var settings=document.getElementById("profile-settings")
    

    overview.classList.add("hide");
    edit.classList.remove("hide");
    settings.classList.add("hide")
}

function Settings(){
    var overview=document.getElementById("profile-overview");
    var edit=document.getElementById("profile-edit")
    var settings=document.getElementById("profile-settings")
    
    overview.classList.add("hide");
    edit.classList.add("hide");
    settings.classList.remove("hide")
}




document.addEventListener("load", (e)=>{
if(e.crtlKey && e.key === "s"){
  pushChanges();
}
})

// function SaveChanges(){
//   var editfullname=document.getElementById("nameport").value;
//   var editabout=document.getElementById("genderport").value;
//   var editcompany=document.getElementById("company").value;
//   var editjob=document.getElementById("roleport").value;
//   var editcountry=document.getElementById("countryport").value;
//   var editaddress=document.getElementById("address").value;
//   var editphone=document.getElementById("phoneport").value;
//   var editemail=document.getElementById("emailport").value;
//   var editusername=document.getElementById("username").value;
   
  
  
//   localStorage.setItem("fulln" , editfullname)
//   localStorage.setItem("genderport" , editabout)
//   localStorage.setItem("company" , editcompany)
//   localStorage.setItem("roleport" , editjob)
//   localStorage.setItem("countryport" , editcountry)
//   localStorage.setItem("address" , editaddress)
//   localStorage.setItem("phoneport" , editphone)
//   localStorage.setItem("emailport" , editemail)
//   localStorage.setItem("username" , editusername)


//   alert("Saved")

// }


function ChangeImage(){
  var inputimg=document.getElementById("image-input");
  var datafile=inputimg.files[0];
  var filereader= new FileReader();
  var topimgport=document.getElementById("topimgport")
   filereader.readAsDataURL(datafile);

   if(datafile.size > 5 * 1024 * 1024){
    alert("Sorry your file must be less than 20kb")
  }

  else{
    filereader.addEventListener("load", () => {
      var url=filereader.result;
      topimgport.src= url;
    var base64data=filereader.result;
    var role=document.getElementById("overviewroleport").innerHTML;

    var id= document.getElementById("idport").innerHTML;
   var accountP=process.env.REACT_APP_API_LOCAL;

                if(role == "student"){
                  var path=`${accountP}/studentaccount/${id}`
               } 
              
               if(role == "staff"){
                  
                 var path=`${accountP}/staffaccount/${id}`
               } 
              
               if(role == "parent"){
                   
                  var path=`${accountP}/parentaccount/${id}`
                   }


        fetch(path, {
            method:"PATCH",
            body:JSON.stringify({
                "thumbnailUrl":base64data
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
    })
        .catch(err => console.log(err))
  
    })
}
}

function Profile(){
  setTimeout(()=>{

    var firstchance=localStorage.getItem("fstport");
    if(firstchance != "1"){
      alert("Make sure you save changes after editing your profile!");

      localStorage.setItem("fstport", "1");
    }

    
    // document.getElementById("topnameport").innerHTML=localStorage.getItem("fulln");
    
    // document.getElementById("toproleport").innerHTML=localStorage.getItem("roleport")


    // document.getElementById("overviewnameport").innerHTML=document.getElementById("nameport").value
    // document.getElementById("overviewabout").innerHTML=document.getElementById("genderport").value
    
    // document.getElementById("overviewgenderport").innerHTML=document.getElementById("company").value
    // document.getElementById("overviewroleport").innerHTML=document.getElementById("roleport").value
    // document.getElementById("overviewcountryport").innerHTML=document.getElementById("countryport").value
    // document.getElementById("overviewaddress").innerHTML=document.getElementById("address").value
    // document.getElementById("overviewphoneport").innerHTML=document.getElementById("phoneport").value
    // document.getElementById("overviewemailport").innerHTML=document.getElementById("emailport").value
    // document.getElementById("overviewusername").innerHTML=document.getElementById("username").value



  },1000)
 
}



function pushChanges(){
    var id= document.getElementById("idport").innerHTML;
  
    var editfullname=document.getElementById("nameport").value;
    var editgender=document.getElementById("genderport").value;
    var role=document.getElementById("overviewroleport").innerHTML;
    var editcountry=document.getElementById("countryport").value;
    var editphone=document.getElementById("phoneport").value;
    var editemail=document.getElementById("emailport").value;
    var imageurl;
    // var d=new Date();
    // var time=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
   var accountP=process.env.REACT_APP_API_LOCAL;

   if(role == "student"){
    var path=`${accountP}/studentaccount/${id}`
 } 

 if(role == "staff"){
    
   var path=`${accountP}/staffaccount/${id}`
 } 

 if(role == "parent"){
     
    var path=`${accountP}/parentaccount/${id}`
     }
     
            
    fetch(path, {
        method:"PATCH",
        body:JSON.stringify({
            "id":id,
            "email":editemail,
            "contact":editphone,
            "notice":"",
            "country":editcountry,
            "gender":editgender,
            "name":editfullname
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    
    alert("Updated")

    window.location.reload();
})
    .catch(err => console.log(err))

}

export default function UserSet() {
    return (
        <div onLoad={Profile()}>

<br/>
<br/>
<Header />
	


	


<section className="section profile">
  <div className="row">
    <div className="col-xl-4">

      <div className="cardy">
        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

          <img  alt="Profile Image" src={require('../img/avatar.jpg')} id="topimgport" className="rounded-circle" />
          <h2 id="topnameport"></h2>
          <h3 id="toproleport"></h3>
         
        </div>
      </div>

    </div>

    <div className="col-xl-8">

      <div className="card">
        <div className="card-body pt-3">
          
          <ul className="nav nav-tabs nav-tabs-bordered">

            <li className="nav-item">
              <button className="nav-link active" onClick={Overview}>Overview</button>
            </li>

            <li className="nav-item">
              <button className="nav-link" onClick={Edit}>Edit Profile</button>
            </li>

            <li className="nav-item">
              <button className="nav-link" onClick={Settings}>Settings</button>
            </li>

          </ul>


          <div className="tab-content pt-2">




            <div className="profile-overview" id="profile-overview">
              <h5 className="card-title">About</h5>
              <p className="small fstport-italic" id="overviewabout"></p>

              <h5 className="card-title">Profile Details</h5>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">ID</div>
                <div className="col-lg-9 col-md-8" id="idport"></div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8" id="overviewnameport"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Gender</div>
                <div className="col-lg-9 col-md-8" id="overviewgenderport"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Role</div>
                <div className="col-lg-9 col-md-8" id="overviewroleport"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Country</div>
                <div className="col-lg-9 col-md-8" id="overviewcountryport"></div>
              </div>


              <div className="row">
                <div className="col-lg-3 col-md-4 label">Phone</div>
                <div className="col-lg-9 col-md-8" id="overviewphoneport"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Class/Form (students only)</div>
                <div className="col-lg-9 col-md-8" id="overviewclassport"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8" id="overviewemailport"></div>
              </div>
             

            </div>





            <div className="hide profile-edit pt-3" id="profile-edit">

              
              <form action="#" onSubmit={pushChanges}>
                <div className="row mb-3">
                  <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                  <div className="col-md-8 col-lg-9">
                    <input type="file" onChange={ChangeImage} id="image-input" accept="image"/>
                    <div className="pt-2">
                      <label for="image-input"><a className="btn btn-primary btn-sm" title="Upload new profile image"><i className="fa fa-upload"></i></a></label>
                      <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="fa fa-trash-o"></i></a>
                    </div>
                  </div>
                </div>
                <div className="row mb-3" style={{display:"none"}}>
                  <label for="passcoport" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="fullName" type="text" className="form-control" id="passcoport"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="fullName" type="text" className="form-control" id="nameport" onKeyUp={()=>{document.getElementById("overviewnameport").innerHTML=document.getElementById("nameport").value}}/>
                  </div>
                </div>

              
                <div className="row mb-3">
                  <label for="company" className="col-md-4 col-lg-3 col-form-label">Gender</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="company" type="text" className="form-control" id="genderport" onKeyUp={()=>{document.getElementById("overviewgenderport").innerHTML=document.getElementById("company").value}} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Job" className="col-md-4 col-lg-3 col-form-label">Role</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="roleport" type="text" className="form-control" id="roleport" onKeyUp={()=>{document.getElementById("overviewroleport").innerHTML=document.getElementById("roleport").value}} readOnly/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="countryport" type="text" className="form-control" id="countryport" onKeyUp={()=>{document.getElementById("overviewcountryport").innerHTML=document.getElementById("countryport").value}} />
                  </div>
                </div>


                <div className="row mb-3">
                  <label for="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="phoneport" type="number" className="form-control" id="phoneport" onKeyUp={()=>{document.getElementById("overviewphoneport").innerHTML=document.getElementById("phoneport").value}}/>
                  </div>
                </div>

               

                <div className="row mb-3">
                  <label for="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="emailport" type="emailport" className="form-control" id="emailport" onKeyUp={()=>{document.getElementById("overviewemailport").innerHTML=document.getElementById("emailport").value}}/>
                  </div>
                </div>

                

              

              </form>

              <div className="text-center">
                  <button className="btn btn-primary" type="submit" onClick={pushChanges}>Save Changes</button>
                
                </div>
            </div>




            <div className="hide pt-3" id="profile-settings">

              
              <form>

                <div className="row mb-3">
                  <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                  <div className="col-md-8 col-lg-9">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="changesMade" checked />
                      <label className="form-check-label" for="changesMade">
                        Changes made to your account
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="newProducts" checked />
                      <label className="form-check-label" for="newProducts">
                        Information on new products and services
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="proOffers" />
                      <label className="form-check-label" for="proOffers">
                        Marketing and promo offers
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="securityNotify" checked disabled />
                      <label className="form-check-label" for="securityNotify">
                        Security alerts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  
                </div>
              </form>

            </div>



          </div>

        </div>
      </div>

    </div>
  </div>
</section>



<Footer />

<ScrollToTop />
        </div>
    )
}