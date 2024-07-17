
function fetchAssign(){

  var subject=document.getElementById("subject_owner").value;
  if(subject === "English"){
    var path=`${process.env.REACT_APP_API_URL}/engassign`;
}
if(subject === "Science"){
    var path=`${process.env.REACT_APP_API_URL}/sciassign`;
}
if(subject === "Social Studies"){
    var path=`${process.env.REACT_APP_API_URL}/socassign`;
}
if(subject === "Mathematics"){
    var path=`${process.env.REACT_APP_API_URL}/mathassign`;
}
if(subject === "Computing"){
    var path=`${process.env.REACT_APP_API_URL}/compassign`;
}
if(subject === "Creative Art"){
    var path=`${process.env.REACT_APP_API_URL}/artassign`;
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


function fetchLunch(){

  fetch(`${process.env.REACT_APP_API_URL}/stafflunch`)
  .then(res => res.json())
  .then(data => staffLunch(data))
  .catch(err => console.log(err))
}


function staffLunch(data){
  var day =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  var d = new Date();
  let dy=day[d.getDay()];
        
          for(var i=0; i< data.length; i++){
            if(data[i].day === dy){

              document.getElementById("today_lunch").innerHTML=data[i].food;
            }
            else{
             
              document.getElementById("today_lunch").innerHTML="No food today"; 
            }
          }
        }

export default function TeacherDash(){
 
    
    return(
        <div>
         <div className="col-lg-8">
          <div className="row">
        <div className="col-xxl-4 col-md-6">
              <div className="cardy info-card sales-card">

                

                <div className="card-body">
                  <h5 className="card-title" onClick={fetchAssign}>Assignment Posted <span style={{cursor:"pointer"}}>| Check</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="fa fa-cart"></i>
                    </div>
                    <div className="ps-3">
                      <h3 id="assign_posted"></h3>
                      <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="cardy info-card sales-card">

                

                <div className="card-body">
                  <h5 className="card-title">Students <span>| Total</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="fa fa-cart"></i>
                    </div>
                    <div className="ps-3">
                      <h3 id="stu_total"></h3>
                      <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                    </div>
                  </div>
                </div>


               

              </div>
            </div>


            <div className="col-xxl-4 col-md-6">
            <div className="cardy info-card sales-card">

                

                <div className="card-body">
                  <h5 className="card-title">Recent Subjects <span>| Total</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="fa fa-cart"></i>
                    </div>
                    <div className="ps-3">
                      <h3 id="subj_total"></h3>
                      <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>


            <div className="col-xxl-4 col-md-6">
            <div className="cardy info-card sales-card">

                

                <div className="card-body">
                  <h5 className="card-title" onClick={fetchLunch}>Today's Lunch <span>| Lunch</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="fa fa-cart"></i>
                    </div>
                    <div className="ps-3">
                      <h3 id="today_lunch"></h3>
                      <span className="text-success small pt-1 fw-bold">90%</span> <span className="text-muted small pt-2 ps-1">increase</span>

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