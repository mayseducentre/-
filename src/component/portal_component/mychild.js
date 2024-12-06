import  { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";

export default function MyChild(){

    return(
        <>
        <Breadcrumb title="My Child"/>
        
          <section className="section profile">
  <div className="row">
    <div className="col-xl-4">

      <div className="cardy">
        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

          <img  alt="Profile Image" className="rounded-circle" />
          <h2>childstat.name</h2>
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
                <div className="col-lg-9 col-md-8" id="childstatid"></div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8" id="childstatname"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Gender</div>
                <div className="col-lg-9 col-md-8" id="childstatgender"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Birth Date</div>
                <div className="col-lg-9 col-md-8" id="childstatbirth"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Country</div>
                <div className="col-lg-9 col-md-8" id="childstatcountry"></div>
              </div>


              <div className="row">
                <div className="col-lg-3 col-md-4 label">Performance</div>
                <div className="col-lg-9 col-md-8" id="childstatperform"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Class/Form (students only)</div>
                <div className="col-lg-9 col-md-8" id="childstatclass"></div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8" id="childstatemail"></div>
              </div>
             

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Status</div>
                <div className="col-lg-9 col-md-8" id="childstatstatus"></div>
              </div>
              
              <div className="row">
                <div className="col-lg-3 col-md-4 label">Report</div>
                <div className="col-lg-9 col-md-8" id="childstatreport"></div>
              </div>
             
            </div>

    
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
 
       </>
    )
}