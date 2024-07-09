import { useEffect, useState } from "react";

function fetchAssign(){

  var subject=document.getElementById("subject_owner").value;
  if(subject == "English"){
    var path=`${process.env.REACT_APP_API_LOCAL}/engassign`;
}
if(subject == "Science"){
    var path=`${process.env.REACT_APP_API_LOCAL}/sciassign`;
}
if(subject == "Social Studies"){
    var path=`${process.env.REACT_APP_API_LOCAL}/socassign`;
}
if(subject == "Mathematics"){
    var path=`${process.env.REACT_APP_API_LOCAL}/mathassign`;
}
if(subject == "Computing"){
    var path=`${process.env.REACT_APP_API_LOCAL}/compassign`;
}
if(subject == "Creative Art"){
    var path=`${process.env.REACT_APP_API_LOCAL}/artassign`;
}


  fetch(path)
  .then(res => res.json())
  .then(data => findCheck(data))
  .catch(err => console.log(err))


}


function findCheck(data){
  for(var i=0; i< data.length; i++){
    document.getElementById("assign_posted").innerHTML=data.length;
  }
}
export default function TeacherDash(){
  
    return(
        <div>
         <div class="col-lg-8">
          <div class="row">
        <div class="col-xxl-4 col-md-6">
              <div class="cardy info-card sales-card">

                

                <div class="card-body">
                  <h5 class="card-title">Assignment Posted <span style={{cursor:"pointer"}} onClick={fetchAssign}>| Check</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="fa fa-cart"></i>
                    </div>
                    <div class="ps-3">
                      <h3 id="assign_posted"></h3>
                      <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-xxl-4 col-md-6">
              <div class="cardy info-card sales-card">

                

                <div class="card-body">
                  <h5 class="card-title">Students <span>| Total</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="fa fa-cart"></i>
                    </div>
                    <div class="ps-3">
                      <h3 id="stu_total"></h3>
                      <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>



            </div>
            </div>
        </div>
    )
}