import ScrollToTop from "react-scroll-to-top";
import Header from "./header";
import Breadcrumb from "./breadcrumb";


const select= {
    width:"100%",
    padding:"10px 12px"
}

var path=process.env.REACT_APP_API_URL;
const randomdigit=Math.floor(Math.random()* 10).toString();
const id=randomdigit;
function CreateIt(e) {
    e.preventDefault();

    document.getElementById("postyIt").style.opacity="0.1"
    var type_item=document.getElementById("type_item").value;
    var item_name=document.getElementById("item_name").value;
    var item_url=document.getElementById("item_url").value;
    var item_desc=document.getElementById("item_desc").value;

    if(type_item == "featuredbooks"){
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                      "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredbooks, item];
        
        fetch(`${path}/library/lib`,{
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
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredvideos, item];
        
        fetch(`${path}/library/lib`,{
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



if(type_item == "featuredexhibit"){
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                      "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredexhibit, item];
        
        fetch(`${path}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({featuredexhibit: updatedbook}),
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
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredwebsites, item];
        
        fetch(`${path}/library/lib`,{
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
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.storybooks, item];
        
        fetch(`${path}/library/lib`,{
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
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                       "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.dictionary, item];
        
        fetch(`${path}/library/lib`,{
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

if(type_item == "featuredgraduation"){
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                      "id":id,
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc
                
            }
        const updatedbook=[...librarydata.featuredgraduation, item];
        
        fetch(`${path}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify({featuredgraduation: updatedbook}),
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
export default function CreateItem(){
    return(
        <>
        <Header />
        <Breadcrumb title="Create Items"/>

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
                                    <option value="featuredexhibit">Exhibitions</option>
                                    <option value="featuredgraduation">2024 Graduation</option>
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
        <ScrollToTop smooth/>
        </>
    )
}