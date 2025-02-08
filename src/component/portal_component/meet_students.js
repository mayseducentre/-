import { useEffect, useState } from "react"

var path=process.env.REACT_APP_ACCOUNT_API;
export default function MeetST(){

    const [stu, setStu]=useState([]);
const stuc=()=>{
  fetch(`${path}/studentaccount`)
  .then(res => res.json())
  .then(data => setStu(data))
  .catch(err => console.log(err))
}
    useEffect(()=>{
       stuc()
        
    },[])
    return(
        <>
         <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"400px"}}>
            <a onClick={()=>{stuc()}} className="pointer">Refresh</a>
                  <h5 className="card-title">Meet Students <span>| {process.env.REACT_APP_BRAND_SHORT}</span></h5>

                  <table className="table table-borderless scrolltable">
                    <thead>
                      <tr>
                        <th>Profile Pic</th>
                        <th>Student_Name</th>
                        <th>Level/Class</th>
                        <th>Email</th>
                        <th>Last seen</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stu.map((info)=>(
                        <tr key={info.id}>
                        <td><img src={info.thumbnailUrl} className="hoverprofile" /></td>
                        <td>{info.name}</td>
                        <td>{info.class}</td>
                        <td><a href="mailto:${info.email}">{info.email}</a></td>
                        <td>{info.lastseen}</td>
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