import ScrollToTop from "react-scroll-to-top";
import Header from "./header";
import Breadcrumb from "./breadcrumb";


const select= {
    width:"100%",
    padding:"10px 12px"
}

var path=process.env.REACT_APP_API_URL;
function CreateIt() {
    document.getElementById("postyIt").style.opacity="0.1"
    var type_item=document.getElementById("type_item").value;
    var item_name=document.getElementById("item_name").value;
    var item_url=document.getElementById("item_url").value;
    var item_desc=document.getElementById("item_desc").value;
    var item_poster=document.getElementById("item_poster").value;

    if(type_item == "featuredbooks"){
    
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc,
                      "poster":item_poster
                
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
        alert(`Posted ${type_item}`)})
        .catch(err => console.log(err))
    });
}
    fetch(`${path}/library/lib`)
    .then(res => res.json())
    .then(librarydata => {
            var item={
                      "name": item_name,
                      "url": item_url,
                      "description": item_desc,
                      "poster":item_poster
                
            }
        
    if(type_item == "featuredbooks"){
        var updatedbook=[...librarydata.featuredbooks, item];
      var library={featuredbooks: updatedbook}
    }
    if(type_item == "dictionary"){
        var updatedbook=[...librarydata.dictionary, item];
      var library={dictionary: updatedbook}
    }
    if(type_item == "featuredvideos"){
        var updatedbook=[...librarydata.featuredvideos, item];
      var library={featuredvideos: updatedbook}
    }
    if(type_item == "storybooks"){
        var updatedbook=[...librarydata.storybooks, item];
      var library={storybooks: updatedbook}
    }
    if(type_item == "featuredwebsites"){
        var updatedbook=[...librarydata.featuredwebsites, item];
      var library={featuredwebsites: updatedbook}
    }
    if(type_item == "featuredaudio"){
        var updatedbook=[...librarydata.featuredaudio, item];
      var library={featuredaudio: updatedbook}
    }
        fetch(`${path}/library/lib`,{
            method:"PATCH",
            body:JSON.stringify(library),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
        alert(`Posted ${type_item}`)
        
    document.getElementById("postyIt").style.opacity="1"
       document.getElementById("item_name").value=null;
        document.getElementById("item_url").value=null;
        document.getElementById("item_desc").value=null;
        document.getElementById("item_poster").value=null;
    })
        .catch(err => console.log(err))
    });
   
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
                                    <option value="featuredaudios">Audio</option>
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
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Item Poster<span>*</span></p>
                                        <input type="text" id="item_poster" required/>
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
        <ScrollToTop smooth/>
        </>
    )
}