import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";

export default function ViewCalendar(){
    const [featured, setFeatured]=useState([]);
     
const [loading, setLoading]=useState(false);

       var tablepath=process.env.REACT_APP_ASSIGN_API;

     useEffect(()=>{

      fetch(`${tablepath}/mectimetable`)
      .then(res => res.json())
      .then(data => {
        
          setFeatured(data)
          setLoading(true)
        
      })
      .catch(err => console.log("Error fetching data", err))


       
     }, [])
    return(
        <>
        <Breadcrumb title="View Calendar" />

        
    <div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Timetable</h5>
        

        <center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
<div className="scroll-container" id="scroll1">


{featured.map(table => (
 <div className="scroll-item" key={table.id} >
 <img src={table.img} />
<textarea value={table.timetable_level} readOnly></textarea>
    </div>
))} 

    
</div>

</div>

        </>
    )
}