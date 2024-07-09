import { useEffect, useState } from "react"

var path=process.env.REACT_APP_API_LOCAL;
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
         <div class="col-12">
              <div class="card recent-sales overflow-auto">

               
                <div class="card-body"  style={{maxHeight:"400px"}}>
                  <h5 class="card-title">Meet Teachers <span>| MEC</span></h5>

                  <table class="table table-borderless datatable">
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
                        <tr>
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