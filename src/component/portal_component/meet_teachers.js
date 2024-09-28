import { useEffect, useState } from "react"

var path=process.env.REACT_APP_ACCOUNT_API;
export default function MeetT(){

    const [staff, setStaff]=useState([]);

    useEffect(()=>{
        fetch(`${path}/staffaccount`)
        .then(res => res.json())
        .then(data => setStaff(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
         <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"400px"}}>
                  <h5 className="card-title">Meet Teachers <span>| {process.env.REACT_APP_BRAND_SHORT}</span></h5>

                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th>Profile Pic</th>
                        <th>Staff_Name</th>
                        <th>Subject</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {staff.map((info)=>(
                        <tr key={info.id}>
                        <td><img style={{borderRadius:"50%", width:"60px",height:"60px"}} src={info.thumbnailUrl} /></td>
                        <td>{info.name}</td>
                        <td>{info.subject}</td>
                        <td><a href="mailto:${info.email}">{info.email}</a></td>
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