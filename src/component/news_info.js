export default function NewsInfo(){
    return(
        <>
        <div style={{paddingLeft:"30px",paddingRight:"30px"}}>

        <button onClick={()=>{window.location.reload()}} style={{borderRadius:"20px",padding:"10px 25px",border:"1px solid orange",background:"transparent",color:"black"}}><i className="fa fa-arrow-left"></i> Back</button>
            
        <h2 id="newsheader"></h2>
        <a id="newsdate"></a>|<a id="newscategory"></a>
        <br/>
        <br/>
        <img id="newsimg" style={{maxWidth:"100%",height:"400px"}}/>
      <br/>
      <br/>
        <textarea id="newscontent" style={{width:"100%",height:"100vh",border:"none"}} readOnly></textarea>
        <button onClick={()=>{window.location.reload()}} style={{borderRadius:"20px",padding:"10px 25px",border:"1px solid orange",background:"transparent",color:"black"}}><i className="fa fa-arrow-left"></i> Back</button>
      
        </div>
        <br/>
        <br/>
  </>
    )
}