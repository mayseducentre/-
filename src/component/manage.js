import ScrollToTop from "react-scroll-to-top";
import Header from "./header";
import Breadcrumb from "./breadcrumb";


const select= {
    width:"100%",
    padding:"10px 12px"
}

var path=process.env.REACT_APP_API_URL;
const blogpath=process.env.REACT_APP_BLOG_API;
var librarypath=process.env.REACT_APP_LIBRARY_API;

var date=new Date();
const constantPrefix="lib";
const timestampt= date.getTime().toString();
const randomdigit=Math.floor(Math.random()* 100).toString();
const id=constantPrefix+timestampt.slice(-6)+randomdigit;

function CreateIt(e) {
    e.preventDefault();

    document.getElementById("postyIt").style.opacity="0.1"
    var type_item=document.getElementById("type_item").value;
    var item_name=document.getElementById("item_name").value;
    var item_url=document.getElementById("item_url").value;
    var item_desc=document.getElementById("item_desc").value;

    if(type_item == "featuredbooks"){
    
    fetch(`${librarypath}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                      "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredbooks, item];
        
        fetch(`${librarypath}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({featuredbooks: updatedbook}),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        alert(`Posted ${type_item} successfully`)
    document.getElementById("postyIt").style.opacity="1"
   document.getElementById("item_name").value=null;
    document.getElementById("item_url").value=null;
    document.getElementById("item_desc").value=null;})
        .catch(err => console.log(err))
    });
}



if(type_item == "featuredvideos"){
    
    fetch(`${librarypath}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredvideos, item];
        
        fetch(`${librarypath}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({featuredvideos: updatedbook}),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        alert(`Posted ${type_item} successfully`)
    document.getElementById("postyIt").style.opacity="1"
   document.getElementById("item_name").value=null;
    document.getElementById("item_url").value=null;
    document.getElementById("item_desc").value=null;})
        .catch(err => console.log(err))
    });
}



if(type_item == "mecmedia"){
    
    fetch(`${librarypath}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                      "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.mecmedia, item];
        
        fetch(`${librarypath}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({mecmedia: updatedbook}),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        alert(`Posted ${type_item} successfully`)
    document.getElementById("postyIt").style.opacity="1"
   document.getElementById("item_name").value=null;
    document.getElementById("item_url").value=null;
    document.getElementById("item_desc").value=null;})
        .catch(err => console.log(err))
    });
}




if(type_item == "featuredwebsites"){
    
    fetch(`${librarypath}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredwebsites, item];
        
        fetch(`${librarypath}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({featuredwebsites: updatedbook}),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        alert(`Posted ${type_item} successfully`)
    document.getElementById("postyIt").style.opacity="1"
   document.getElementById("item_name").value=null;
    document.getElementById("item_url").value=null;
    document.getElementById("item_desc").value=null;})
        .catch(err => console.log(err))
    });
}




if(type_item == "storybooks"){
    
    fetch(`${librarypath}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.storybooks, item];
        
        fetch(`${librarypath}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({storybooks: updatedbook}),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        alert(`Posted ${type_item} successfully`)
    document.getElementById("postyIt").style.opacity="1"
   document.getElementById("item_name").value=null;
    document.getElementById("item_url").value=null;
    document.getElementById("item_desc").value=null;})
        .catch(err => console.log(err))
    });
}


if(type_item == "dictionary"){
    
    fetch(`${librarypath}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.dictionary, item];
        
        fetch(`${librarypath}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({dictionary: updatedbook}),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        alert(`Posted ${type_item} successfully`)
    document.getElementById("postyIt").style.opacity="1"
   document.getElementById("item_name").value=null;
    document.getElementById("item_url").value=null;
    document.getElementById("item_desc").value=null;
})
        .catch(err => console.log(err))
    });
}

// if(type_item == "featuredgraduation"){
    
//     fetch(`${librarypath}/library/lib`)
//     .then(res => res.json())
//     .then(librarydata => {
//             var item={
//                       "id":id,
//                       "name": item_name,
//                       "url": item_url,
//                       "description": item_desc
                
//             }
//         const updatedbook=[...librarydata.featuredgraduation, item];
        
//         fetch(`${librarypath}/library/lib`,{
//             method:"PATCH",
//             body:JSON.stringify({featuredgraduation: updatedbook}),
//             headers:{
//                 "Content-type":"application/json"
//             }
//         })
//         .then(res => res.json())
//         .then(data => {console.log(data)
//         alert(`Posted ${type_item} successfully`)
//     document.getElementById("postyIt").style.opacity="1"
//    document.getElementById("item_name").value=null;
//     document.getElementById("item_url").value=null;
//     document.getElementById("item_desc").value=null;
// })
//         .catch(err => console.log(err))
//     });
// }



}


function UpdateHead(e){
    var info=document.getElementById("upd_info").value;
    var color=document.getElementById("upd_color").value;
e.preventDefault()
    fetch(`${path}/update/maysupd`, {
        method:"PUT",
        body:JSON.stringify({
            "id":id,
            "info":info,
            "color":color
        }),
        headers:{
            "Content-type":"application/json"
        }
    }
    )
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Headline posted")
    })
    .catch(err => console.log(err))
}


function Postnews(e){
    e.preventDefault();

    document.getElementById("blogbtn").style.display="none";
    document.getElementById("blogwait").style.display="block";
    
    
const randomdigit=Math.floor(Math.random()* 10).toString();

const timestamptr= date.getTime().toString();
const idr=randomdigit + timestamptr;

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
                "id": idr,
                "news_img":base64data,
                "news_heading":newshead,
                "news_category":newscat,
                "news_content":newscontent,
                "date":timestamp
            }),
            headers:{
                "Content-type":"application/json"
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
export default function Manage(){
    return(
        <>
        <Header />
        <Breadcrumb title="Manage Items"/>

        <div>

        <section className="checkout spad">
        <div className="container">
            <div className="checkout__form">
                <form onSubmit={CreateIt}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h3 className="checkout__title">Library Items</h3>
                            <div className="checkout__input">
                                <p>Type of Item<span>*</span></p>
                                <select style={select} id="type_item">
                                    <option value="featuredbooks">Books</option>
                                    <option value="featuredvideos">Videos</option>
                                    <option value="storybooks">Story Books</option>
                                    <option value="mecmedia">Media</option>
                                    {/* <option value="featuredgraduation">2024 Graduation</option> */}
                                    <option value="featuredwebsites">Websites</option>
                                    <option value="dictionary">Dictionary</option>
                                     </select>
                            </div>
                            <div className="row">
                            <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Item Name<span>*</span></p>
                                        <input type="text" id="item_name" required/>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Item Url<span>*</span></p>
                                        <input type="text" id="item_url" required/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Item Description<span>*</span></p>
                                        <input type="text" id="item_desc" required/>
                                    </div>
                                </div>
                              
                            </div>
                           
                             
                            
                            
                           
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit" id="postyIt" className="site-btn">Post Item</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
        </div>

        <hr/>

        <div>
        <section className="checkout spad">
        <div className="container">
            <div className="checkout__form">
                <form onSubmit={UpdateHead}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h3 className="checkout__title">HeadLine Info</h3>
                            
                            <div className="row">
                            <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Info<span>*</span></p>
                                        <input type="text" id="upd_info" required/>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Color<span>*</span></p>
                                        <input type="text" id="upd_color" required/>
                                    </div>
                                </div>
                                
                              
                            </div>
                           
                             
                            
                            
                           
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit"  className="site-btn">Post Item</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
        </div>
  
  
  

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
                                <a id="blogwait" style={{display:"none"}}><div className="loadery"></div></a>
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



