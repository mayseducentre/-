import { useEffect, useState } from "react"
import Breadcrumb from "../breadcrumb";

var path=process.env.REACT_APP_ACCOUNT_API;

const select ={
    padding:"10px 12px",
    width:"100%"
}


export default function Accessibility(){

    const [reg, setReg]=useState([]);
    var regpath=process.env.REACT_APP_REGISTER_API

    useEffect(()=>{
        fetch(`${regpath}/register`)
        .then(res => res.json())
        .then(data => setReg(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
        <Breadcrumb title="Accessibility" />
        <div style={{width:"100%",padding:"10px 12px",display:"flex", flexDirection:"row", background:"whitesmoke"}}>
            <a id="stuadm"></a> students | 
            &emsp;&emsp;&emsp;&nbsp;<i className="fa fa-search-o"></i><input style={{padding:"10px 12px",border:"none",background:"transparent"}} placeholder="Search Students..."/></div>
         <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"400px"}}>
                  <h5 className="card-title">View Register <span>| {process.env.REACT_APP_BRAND_SHORT}</span></h5>

                  <table className="table table-borderless scrolltable">
                    <thead>
                      <tr>
                        <th>Senders ID</th>
                        <th>Date</th>
                        <th>Student_Name</th>
                        <th>Level/Class</th>
                        <th>Time</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reg.map((info)=>(
                        <tr key={info.sent_by}>
                        <td>{info.sent_by}</td>
                        <td>{info.date}</td>
                        <td>{info.name}</td>
                        <td>{info.level}</td>
                        <td>{info.time}</td>
                        <td>{info.status}</td>
                        </tr>
                      
                    ))}
                      
                    </tbody>
                  </table>

                </div>

              </div>
            </div>
            <br/>
            <br/>
       </>
    )
}