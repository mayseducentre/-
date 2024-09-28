import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";


const select ={
    padding:"10px 12px",
    width:"100%"
}




const pathline=process.env.REACT_APP_API_URL;
const registerpath=process.env.REACT_APP_REGISTER_API;

function pushRegister(e){
document.getElementById("plswait").style.display="block";
document.getElementById("posta").style.display="none";

e.preventDefault();

localStorage.setItem("reglevel", level);
        document.getElementById("plswait").style.display="none";
        document.getElementById("posta").style.display="block";
        
    var stu_name=document.getElementById("reg_stu").value;
    var date=document.getElementById("reg_date").value;
    var level=document.getElementById("reg_level").value;
    var status=document.getElementById("reg_status").value;

    
   
 var d=new Date();
 let time=d.toLocaleDateString();
var id=document.getElementById("teacherid").value;
 fetch(`${registerpath}/register`,{
        method:"POST",
        body:JSON.stringify({
            "name":stu_name,
            "date":date,
            "level":level,
            "status":status,
            "time":time,
            "sent_by":id
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        alert("Register Saved Successfully")
           document.getElementById("reg_stu").value=null;

    })
    .catch(err => console.log(err))

    



}


function displayRegister(){
    fetch(`${registerpath}/register`)
    .then(res => res.json())
    .then(data=> registry(data))
    .catch(err => console.log(err))
}

function registry(data){
    var level=document.getElementById("reglev").value;

    for(var i=0; i< data.length; i++){
        if(level === data[i].level){
var table=document.getElementById("tabb");
            table.innerHTML +=`
                   
                        <tr>
                        <td>${data[i].date}</td>
                        <td>${data[i].level}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].status}</td>
                       </tr>
                      
                      
`
        }
    }
}


function CheckReg(){
    fetch(`${registerpath}/register`)
    .then(res => res.json())
    .then(data=> chkreg(data))
    .catch(err => console.log(err))
}

function chkreg(data){
    var date=document.getElementById("checkdate").value;

    var table=document.getElementById("tabb");
    for(var i=0; i< data.length; i++){
        if(date === data[i].date){
            
            table.innerHTML +=`
                    
                        <tr>
                        <td>${data[i].date}</td>
                        <td>${data[i].level}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].status}</td>
                       </tr>
                      
                      
                   
`
        }
        else if(date !== data[i].date){
document.getElementById("not").innerHTML="Nothing to show";
document.getElementById("not").style.color="red";
setTimeout(()=>{
    
document.getElementById("not").innerHTML="";
})
        }
    }
}
export default function RegisterBook(){
    const [level, setLevel]=useState([]);

    useEffect(()=>{
        fetch(`${pathline}/level`)
        .then(res=>res.json())
        .then(data => setLevel(data))
        .catch(err => console.log(err))

     
    },[])
    return(
        <>

<Breadcrumb title="Register Book" />

         <section className="checkout spad">
        <div className="container">
            <div className="checkout__form">
                <form onSubmit={pushRegister}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h3 className="checkout__title">Mark Register</h3>
                            <div className="row">
                            <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Class<span>*</span></p>
                                        <select style={select} id="reg_level" required>
                                    {level.map((lev)=>(
                                        <option key={lev.id} value={lev.level}>{lev.level}</option>
                                   
                                    ))}
                                    
                                     </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Student Name<span>*</span></p>
                                        <input type="text" id="reg_stu" required/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Status<span>*</span></p>
                                        <select style={select} id="reg_status" required>
                                    
                                        <option value="present">present</option>
                                        <option value="absent">absent</option>
                                        <option value="left">left</option>
                                   
                                    </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Date<span>*</span></p>
                                        <input type="date" id="reg_date" required/>
                                    </div>
                                </div>
                                
                                
                                
                            </div>
                            
                            
                            
                            
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__order">
                               
                                <button type="submit" id="posta" className="site-btn">DONE</button>
                                <button className="site-btn" id="plswait" style={{display:"none"}}>Please Wait...</button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
 
 

 <button onClick={displayRegister}>View Register</button>
 <div className="checkout__input">
                                        <p>Class<span>*</span></p>
                                        <select style={select} id="reglev" required>
                                    {level.map((lev)=>(
                                        <option key={lev.id} value={lev.level}>{lev.level}</option>
                                   
                                    ))}
                                    
                                     </select>
                                    </div>
 <input type="date" id="checkdate" onChange={CheckReg}/>

 <table className="table table-borderless scrolltable" id="tab">
    <p id="not"></p>
 <thead>
                      <tr>
                        <th>Date</th>
                        <th>Level</th>
                        <th>Student_Name</th>
                        <th>Status</th>
                       </tr>
                    </thead>
                    <tbody id="tabb">

                    </tbody>
 </table>
        </>
    )
}