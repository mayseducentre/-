import { useEffect, useState } from "react"
import Breadcrumb from "../breadcrumb";

var path=process.env.REACT_APP_API_URL;

const select ={
    padding:"10px 12px",
    width:"100%"
}

function PushChng(e){
    e.preventDefault()
    var userid=document.getElementById("stuIDs").value;

    var permit2=document.getElementById("permit2").value;

    fetch(`${path}/studentaccount/${userid}`,{
        method:"PATCH",
        body:JSON.stringify({
            "status":permit2
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

function DelAcc(){
    
    var userid=document.getElementById("stuIDs").value;

    if(userid==""){
        alert("Please enter id")
    }
    if(userid !==""){
        var prompt= window.prompt("Enter password");
    }
    

    if(userid !== "" && prompt === process.env.REACT_APP_ADMIN_LOG){
    fetch(`${path}/studentaccount/${userid}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data => {console.log(data)
    alert("Deleted Successful")})
    .catch(err => console.log(err))
    }
}
export default function ManageST(){

    const [stu, setStu]=useState([]);

    useEffect(()=>{
        fetch(`${path}/studentaccount`)
        .then(res => res.json())
        .then(data => setStu(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
        <Breadcrumb title="Manage Student" />
        <div style={{width:"100%",padding:"10px 12px",display:"flex", flexDirection:"row", background:"whitesmoke"}}>
            <a id="stuadm"></a> students | 
            &emsp;&emsp;&emsp;&nbsp;<i className="fa fa-search-o"></i><input style={{padding:"10px 12px",border:"none",background:"transparent"}} placeholder="Search Students..."/></div>
         <div className="col-12">
              <div className="card recent-sales overflow-auto">

               
                <div className="card-body"  style={{maxHeight:"400px"}}>
                  <h5 className="card-title">Meet Students <span>| {process.env.REACT_APP_BRAND_SHORT}</span></h5>

                  <table className="table table-borderless scrolltable">
                    <thead>
                      <tr>
                        <th>Profile Pic</th>
                        <th>Student_ID</th>
                        <th>Student_Name</th>
                        <th>Level/Class</th>
                        <th>Email</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stu.map((info)=>(
                        <tr key={info.id}>
                        <td><img style={{borderRadius:"50%", width:"60px",height:"60px"}} src={info.thumbnailUrl} /></td>
                        <td onClick={()=>{navigator.clipboard.writeText(info.id);alert("ID is copied: " + info.id)}}>{info.id}</td>
                        <td>{info.name}</td>
                        <td>{info.class}</td>
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
                                        <input id="stuIDs" type="text" required/>
                                    </div>
                                </div>
                        <div className="col-lg-8 col-md-6">
                             
            
                            <div className="checkout__input">
                                <p>Actions<span>*</span></p>
                                <select id="permit2" style={select}>
                                    <option value="enrolled">Enroll</option>
                                    <option value="graduated">Graduated</option>
                                    <option value="expelled">Expelled</option>
                                    <option value="left">Left the school</option>
                                </select>
                            </div>
                          
                          </div> 
                        <br/>
                        <br/>
                        
                        <div className="col-lg-8 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit" className="site-btn">Push Changes</button>
                                <button onClick={DelAcc} style={{background:"red",color:"white"}} className="site-btn">Delete Account</button>
                            
                            </div>
                        </div>
                    </div>
                </form>
        </>
    )
}