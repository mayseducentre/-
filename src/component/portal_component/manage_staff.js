import { useEffect, useState } from "react"
import Breadcrumb from "../breadcrumb";

var path=process.env.REACT_APP_API_URL;
const select ={
    padding:"10px 12px",
    width:"100%"
}

function PushChng(e){
    e.preventDefault()
    var userid=document.getElementById("staffIDs").value;

    var permit1=document.getElementById("permit1").value;

    fetch(`${path}/staffaccount/${userid}`,{
        method:"PATCH",
        body:JSON.stringify({
            "status":permit1
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data => {console.log(data)
    alert("Pushed Successful")})
    .catch(err => console.log(err))
}
export default function ManageT(){

    const [stu, setStu]=useState([]);

    useEffect(()=>{
        fetch(`${path}/staffaccount`)
        .then(res => res.json())
        .then(data => setStu(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
        <Breadcrumb title="Manage Staff" />
         <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"400px"}}>
                  <h5 className="card-title">Meet Staffs <span>| MEC</span></h5>

                  <table className="table table-borderless scrolltable">
                    <thead>
                      <tr>
                        <th>Profile Pic</th>
                        <th>Staff_ID</th>
                        <th>Staff_Name</th>
                        <th>Staff_Subject</th>
                        <th>Staff_Email</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stu.map((info)=>(
                        <tr key={info.id}>
                        <td><img style={{borderRadius:"50%", width:"60px",height:"60px"}} src={info.thumbnailUrl} /></td>
                        <td onClick={()=>{navigator.clipboard.writeText(info.id);alert("ID is copied: " + info.id)}}>{info.id}</td>
                        <td>{info.name}</td>
                        <td>{info.subject}</td>
                        <td><a href="mailto:${info.email}">{info.email}</a></td>
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
            <br/>
            <br/>
            <form  onSubmit={PushChng}>
                    <div className="row">
                    <div className="col-lg-6">
                    <div className="checkout__input">
                                        <p>User ID<span>*</span></p>
                                        <input id="staffIDs" type="text" required/>
                                    </div>
                                </div>
                        <div className="col-lg-8 col-md-6">
                             
            
                            <div className="checkout__input">
                                <p>Permissions<span>*</span></p>
                                <select id="permit1" style={select}>
                                    <option value="accept">Accept</option>
                                    <option value="deny">Deny</option>
                                </select>
                            </div>
                          
                          </div> 
                        <br/>
                        <br/>
                        
                        <div className="col-lg-8 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit" className="site-btn">Push Changes</button>
                            
                            </div>
                        </div>
                    </div>
                </form>
 
        </>
    )
}