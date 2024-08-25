import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";


var path=process.env.REACT_APP_API_URL;
export default function StudentPerform(){
    const [stu, setStu]=useState([]);

    useEffect(()=>{
        fetch(`${path}/studentaccount`)
        .then(res => res.json())
        .then(data => setStu(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
        <Breadcrumb title="Student Performance" />

        <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"500px"}}>
                  <h5 className="card-title">All Students <span>| {process.env.REACT_APP_BRAND_SHORT}</span></h5>

                  <table className="table table-borderless scrolltable">
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Student_Name</th>
                        <th>Level/Class</th>
                        <th>Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stu.map((info)=>(
                        <tr key={info.id}>
                        <td>xxxxxxxxxx</td>
                        <td>{info.name}</td>
                        <td>{info.class}</td>
                        <td>{info.performance}</td>
                        </tr>
                      
                    ))}
                      
                    </tbody>
                  </table>

                </div>

              </div>
            </div>


 
        </>
    )
}