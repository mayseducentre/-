import { useEffect, useState } from "react"

var path=process.env.REACT_APP_API_LOCAL;
export default function MeetST(){

    const [stu, setStu]=useState([]);

    useEffect(()=>{
        fetch(`${path}/studentaccount`)
        .then(res => res.json())
        .then(data => setStu(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
         <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"400px"}}>
                  <h5 className="card-title">Meet Students <span>| MEC</span></h5>

                  <table className="table table-borderless scrolltable">
                    <thead>
                      <tr>
                        <th>Profile Pic</th>
                        <th>Student_Name</th>
                        <th>Level</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stu.map((info)=>(
                        <tr>
                        <td><img style={{borderRadius:"50%", width:"60px",height:"60px"}} src={info.thumbnailUrl} /></td>
                        <td>{info.name}</td>
                        <td>{info.className}</td>
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