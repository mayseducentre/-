import { useEffect, useState } from "react"

var path=process.env.REACT_APP_API_URL;
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
                  <h5 className="card-title">Meet Parents <span>| MEC</span></h5>

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
                        <td><img style={{borderRadius:"50%", width:"60px",height:"60px"}} src={info.thumbnailUrl} /></td>
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