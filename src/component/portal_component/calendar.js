import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../breadcrumb";

const select= {
    width:"100%",
    padding:"10px 12px"
}

var path=process.env.REACT_APP_ASSIGN_API;

const randomdigit=Math.floor(Math.random()* 10).toString();
const id=randomdigit;




function Timetable(e){
    e.preventDefault();
document.getElementById("tab").style.display="none";
document.getElementById("load").style.display="block";

    var table_level=document.getElementById("tablelevel").value;
    var inputimg=document.getElementById("table_img");
    var date=new Date()
    var timestamp=date.toLocaleDateString();
    var datafile=inputimg.files[0];
    var filereader= new FileReader();
     filereader.readAsDataURL(datafile);
  
  
     filereader.addEventListener("load", () => {
         var base64data=filereader.result;

         fetch(`${path}/mectimetable`,{
            method:"POST",
            body:JSON.stringify({
                "id": id,
                "img":base64data,
                "timetable_level":table_level,
                "date":timestamp
            }),
            headers:{
                "Content-type":"application/json"
            }
         })
         .then(res=> res.json())
         .then(data => {console.log(data)
            alert("Posted timetable successfully")
            
document.getElementById("tab").style.display="block";
document.getElementById("load").style.display="none";
         })
         .catch(err => alert(err))


     })
}


function imgfile(){
    var inputimg=document.getElementById("table_img");
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
export default function Calendar(){
    return(
        <>
        <Breadcrumb title="Calendar"/>

        

        <div>
        <section className="checkout spad">
        <div className="container">
            <div className="checkout__form">
                <form onSubmit={Timetable}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h3 className="checkout__title">Post Timetable</h3>
                            
                            <div className="row">
                            <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Timetable_Image<span>*</span></p>
                                        <input type="file" onChange={imgfile} accept="image" id="table_img" required/>
                               <img id="displayimage" style={{maxWidth:"50%",maxHeight:"50%"}}/>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Timetable_level<span>*</span></p>
                                        <input type="text" id="tablelevel" required/>
                                    </div>
                                </div>

                                
                              
                            </div>
                           
                             
                            
                            
                           
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                               <a style={{display:"none"}} id="load"><i className="fa fa-spinner fa-spin"></i> Loading...</a>
                                <button type="submit" id="tab"  className="site-btn">Post Timetable</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
        </div>
 
        <ScrollToTop smooth/>
        </>
    )
}