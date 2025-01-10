import { useState } from "react"
import "../style.css"



export default function Imgsec(){
    return(
        <>
          {/* <section className="home-gallery">
        <div className="gallery-wrap flex flex-wrap">
            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid2x2">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid2x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid2x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid2x2 ">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid2x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid3x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>

            <div className="gallery-grid gallery-grid1x1">
                <a href="#"><img src={require("../img/about.jpg")} alt=""/></a>
            </div>
        </div>
    </section> */}


{/* 

<section className="category-area">
            <center><h2>COMING SOON</h2></center>
            <br/>
<br/>
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-8 col-md-12">
					<div className="row">
						<div className="col-lg-8 col-md-8">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-4 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-2 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-6 col-md-6">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
						<div className="col-lg-4 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                  		<div className="col-lg-4 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
									
								
							</div>
						</div>
                        
                        <div className="col-lg-8 col-md-6">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-4 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-4 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-4 col-md-6">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-8 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
								
							</div>
						</div>
                        <div className="col-lg-4 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
									
								
							</div>
						</div>
                 <div className="col-lg-4 col-md-6">
					<div className="single-deal">
						<div className="overlay"></div>
						<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
							
					</div>
				</div>
                
					</div>
				</div>
				
                <div className="col-lg-4 col-md-4">
							<div className="single-deal">
								<div className="overlay"></div>
								<img className="img-fluid w-100" src={require("../img/about.jpg")} alt=""/>
									
								
							</div>
						</div>
                      
			</div>
		</div>
	</section>
	 */}

<center>
    <h3>Our Gallery</h3>
    <br/>
    <br/>
</center>
<div className="imgrow"> 
  <div className="imgcolumn">
  <img src={require("../img/mays/pool.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/bask.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/cadet.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/k.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/ground.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/ourday3.jpg")} style={{width:"100%"}} />
  </div>

  <div className="imgcolumn">
    
  <img src={require("../img/mays/fish.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/game.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/kids.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/play.jpg")} style={{width:"100%"}}/>
  <img src={require("../img/mays/ply.jpg")} style={{width:"100%"}}/>
<img src={require("../img/mays/ourday4.jpg")} style={{width:"100%"}} />
  <img src={require("../img/mays/lab1.jpg")} style={{width:"100%"}}/>
 </div>

  <div className="imgcolumn">
     <img src={require("../img/mays/pol.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/speech.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/jump.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/cert.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/build.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/ourday2.jpg")} style={{width:"100%"}} />
  </div>
  <div className="imgcolumn">
     <img src={require("../img/mays/stu.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/lib.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/lab.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/lab1.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/j1.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/ground.jpg")} style={{width:"100%"}}/>
     <img src={require("../img/mays/ourday1.jpg")} style={{width:"100%"}} />
    
  </div>

  </div>  
<br/>
<br/>
  <center>
<button onClick={()=>{document.location.href="#/librarymedia"}} style={{padding:"10px 70px", border:"1px solid orange", background:"orange", borderRadius:"20px"}}>More</button>
</center>
<br/>
<br/>
  </>
    )
}