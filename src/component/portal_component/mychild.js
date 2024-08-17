import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";

var path=process.env.REACT_APP_API_URL;
export default function MyChild(){
const [child, setChild]=useState([]);


var id=document.getElementById("childportid").value;
useEffect(()=>{
  fetch(`${path}/studentaccount/${id}`)
  .then(res => res.json())
  .then(data => setChild(data))
  .catch(err => console.log(err));

},[])
    return(
        <>
        <Breadcrumb title="My Child"/>

        {child.map((childstat)=>(
          <section className="section profile">
  <div className="row">
    <div className="col-xl-4">

      <div className="cardy">
        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

          <img  alt="Profile Image" className="rounded-circle" />
          <h2>{childstat.name}</h2>
          <h3>Student</h3>
         
        </div>
      </div>

    </div>

    <div className="col-xl-8">

      <div className="card">
        <div className="card-body pt-3">
          
          <ul className="nav nav-tabs nav-tabs-bordered">

            <li className="nav-item">
              <button className="nav-link active" >Overview</button>
            </li>

          </ul>


          <div className="tab-content pt-2">




            <div className="profile-overview" id="profile-overview">

              <h5 className="card-title">About Child</h5>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">ID</div>
                <div className="col-lg-9 col-md-8" >{childstat.id}</div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8" >{childstat.name}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Gender</div>
                <div className="col-lg-9 col-md-8">{childstat.gender}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Birth Date</div>
                <div className="col-lg-9 col-md-8">{childstat.birth_date}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Country</div>
                <div className="col-lg-9 col-md-8" >{childstat.country}</div>
              </div>


              <div className="row">
                <div className="col-lg-3 col-md-4 label">Performance</div>
                <div className="col-lg-9 col-md-8" >{childstat.performance}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Class/Form (students only)</div>
                <div className="col-lg-9 col-md-8">{childstat.class}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8" >{childstat.email}</div>
              </div>
             

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Status</div>
                <div className="col-lg-9 col-md-8">{childstat.status}</div>
              </div>
              
              <div className="row">
                <div className="col-lg-3 col-md-4 label">Report</div>
                <div className="col-lg-9 col-md-8">{childstat.report}</div>
              </div>
             
            </div>

    
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
 
        ))}
       </>
    )
}