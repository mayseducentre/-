import ScrollToTop from "react-scroll-to-top";
import Header from "./header";
import Breadcrumb from "./breadcrumb";


const select= {
    width:"100%",
    padding:"10px 12px"
}

const blogpath=process.env.REACT_APP_BLOG_API;

function Postnews(e){
    e.preventDefault();

    document.getElementById("blogbtn").style.display="none";
    document.getElementById("blogwait").style.display="block";
    
    const constantPrefix="blg";
    const timestampt= date.getTime().toString();
    const id=constantPrefix+timestampt.slice(-6);

  var newshead=document.getElementById("news_head").value;
    var newscontent=document.getElementById("news_content").value
    var newscat=document.getElementById("news_cat").value
    var inputimg=document.getElementById("news_img");
    var date=new Date()
    var timestamp=date.toLocaleDateString();
    var datafile=inputimg.files[0];
    var filereader= new FileReader();
     filereader.readAsDataURL(datafile);
  
  
     filereader.addEventListener("load", () => {
         const base64data=filereader.result;

         fetch(`${blogpath}/blog`,{
            method:"POST",
            body:JSON.stringify({
                "id": id,
                "news_img":base64data,
                "news_heading":newshead,
                "news_category":newscat,
                "news_content":newscontent,
                "date":timestamp
            }),
            headers:{
                "Content-Type":"application/json"
            }
         })
         .then(res=> res.json())
         .then(data => {
            console.log(data)
            
    document.getElementById("blogbtn").style.display="block";
    document.getElementById("blogwait").style.display="none";
            alert("Posted Blog successfully")
         })
         .catch(err => {console.log(err)
            alert(err)
         })


     })
}


function imageview(){
    var inputimg=document.getElementById("news_img");
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
export default function Blogpost(){
    return(
        <>
        <Header />
        <Breadcrumb title="Blog Post"/>

        
  
  

        <div>
        <section className="checkout spad">
        <div className="container">
            <div className="checkout__form">
                <form onSubmit={Postnews}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h3 className="checkout__title">Post News and Updates</h3>
                            
                            <div className="row">
                            <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>News_Image<span>*</span></p>
                                        <input type="file" onChange={imageview} accept="image" id="news_img" required/>
                               <img id="displayimage" style={{maxWidth:"50%",maxHeight:"50%"}}/>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Heading<span>*</span></p>
                                        <input type="text" id="news_head" required/>
                                    </div>
                                </div>


                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Category<span>*</span></p>
                                        <input type="text" id="news_cat" required/>
                                    </div>
                                </div>


                                
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Content<span>*</span></p>
                                        <textarea type="text" id="news_content" required></textarea>
                                    </div>
                                </div>
                                
                              
                            </div>
                           
                             
                            
                            
                           
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit" id="blogbtn" className="site-btn">Post Item</button>
                                <a id="blogwait" style={{display:"none"}}><i className="fa fa-spinner fa-spin"></i> Loading</a>
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



