import { Chart } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

  
  export default function AdminDash(){
   
    const data={
        labels:['January','February','March','April','May','June','July','August','September','October','November','December'],

        datasets:[
            {
                label:'MEC Dataset',
                fill: false,
                backgroundColor: 'teal',
                color:'orange',
                borderColor: 'rgba(75, 192,192,1)',
                data:[65, 59,80, 81, 56, 55, 40, 90, 77],
                tension: 0.1,
                height: 100,
                borderCapstyle:'butt',
                borderDash:[],
                borderDashOffset: 0.0,
                borderJoinStyle:'miter',
                pointBorderColor:'rgba(75,192,192,1)',
                pointBackgroundColor:'#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,102,1)',
                pointHoverBorderColor:'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            },
        ],
    }
        const options = {
            responsive:true,
            plugins:{
                legend:{
                    position:'top'
                },
                title:{
                    display: true,
                    text: 'Chart.js Line Chart'
                },
            },
    }
      return(
          <div>
           <div className="col-lg-8">
            <div className="row">
          <div className="col-xxl-4 col-md-6">
                <div className="cardy info-card sales-card">
  
                  
  
                  <div className="card-body">
                    <h5 className="card-title">Staff Account <span style={{cursor:"pointer"}}>| Total</span></h5>
  
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="fa fa-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h3 id="staff_total"></h3>
                        <span className="text-success small pt-1 fw-bold">50%</span> <span className="text-muted small pt-2 ps-1">increase</span>
  
                      </div>
                    </div>
                  </div>
  
                </div>
              </div>
              <div className="col-xxl-4 col-md-6">
                <div className="cardy info-card sales-card">
  
                  
  
                  <div className="card-body">
                    <h5 className="card-title">Students Account <span>| Total</span></h5>
  
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="fa fa-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h3 id="student_total"></h3>
                        <span className="text-success small pt-1 fw-bold">50%</span> <span className="text-muted small pt-2 ps-1">increase</span>
  
                      </div>
                    </div>
                  </div>
  
  
                 
  
                </div>
              </div>
  
  
              <div className="col-lg-4">
              <div className="cardy info-card sales-card">
  
                  
  
                  <div className="card-body">
                    <h5 className="card-title">Recent Subjects <span>| Total</span></h5>
  
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="fa fa-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h3 id="subject_total"></h3>
                        <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
  
                      </div>
                    </div>
                  </div>
  
                </div>
              </div>


              <div className="col-xxl-4 col-md-6">
              <div className="cardy info-card sales-card">
  
                  
  
                  <div className="card-body">
                    <h5 className="card-title">Report <span>| Total</span></h5>
  
                    <div className="d-flex align-items-center">
                     
                      
            <Line data={data} options={options}/>
                    </div>
                  </div>
  
                </div>
              </div>
  
  
              <div className="col-xxl-4 col-md-6">
              <div className="cardy info-card sales-card">
  
                  
  
                  <div className="card-body">
                    <h5 className="card-title">Parent Account <span>| Total</span></h5>
  
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="fa fa-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h3 id="parent_total"></h3>
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