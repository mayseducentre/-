import { useEffect, useState } from "react"

var path=process.env.REACT_APP_ACCOUNT_API;
export default function MeetP(){

    const [parent, setParent]=useState([]);

    useEffect(()=>{
        fetch(`${path}/parentaccount`)
        .then(res => res.json())
        .then(data => setParent(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
         <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"400px"}}>
                  <h5 className="card-title">Meet Parents <span>| {process.env.REACT_APP_BRAND_SHORT}</span></h5>

                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th>Profile Pic</th>
                        <th>Parent_Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {parent.map((info)=>(
                        <tr key={info.id}>
                        <td><img className="hoverprofile" src={info.thumbnailUrl} /></td>
                        <td>{info.name}</td>
                        <td>{info.contact}</td>
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