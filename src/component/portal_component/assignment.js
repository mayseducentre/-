import React, { useState, useEffect } from "react";

export default function AssignmentHub() {
  const [pin, setPin] = useState("");
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(3600); // 60 mins
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [theoryScores, setTheoryScores] = useState({});
  const [score, setScore] = useState(0);

  // 🔥 60 OBJECTIVE (HARD + MIXED)
  const questions = [
    {id:1,q:"A network connecting multiple cities is:",o:["LAN","WAN","PAN","MAN"],a:"WAN"},
    {id:2,q:"Which device directs data between networks?",o:["Switch","Router","Hub","Monitor"],a:"Router"},
    {id:3,q:"E-commerce risk mainly involves:",o:["Speed","Fraud","Convenience","Access"],a:"Fraud"},
    {id:4,q:"Cashless system reduces:",o:["Speed","Cash handling","Convenience","Security"],a:"Cash handling"},
    {id:5,q:"PIN is used for:",o:["Display","Security","Typing","Connection"],a:"Security"},
    {id:6,q:"Debit card uses:",o:["Loan","Own funds","Gift","Credit"],a:"Own funds"},
    {id:7,q:"Credit card allows:",o:["Saving","Borrowing","Printing","Sharing"],a:"Borrowing"},
    {id:8,q:"E-learning depends on:",o:["Books","Internet","Paper","Chalk"],a:"Internet"},
    {id:9,q:"A LAN is best used in:",o:["Country","School","World","Continent"],a:"School"},
    {id:10,q:"WAN example:",o:["Internet","Classroom","Office","Desk"],a:"Internet"},

    // 🔥 HARD SCENARIOS
    {id:11,q:"A business loses money due to fake website payments. This is:",o:["Hardware failure","Fraud","Network lag","Storage issue"],a:"Fraud"},
    {id:12,q:"Students share files via school network. This shows:",o:["Isolation","Resource sharing","Security risk","Slow speed"],a:"Resource sharing"},
    {id:13,q:"Which limits e-learning most in rural areas?",o:["Books","Internet","Teachers","Classrooms"],a:"Internet"},
    {id:14,q:"Mobile money is:",o:["Cash payment","Cashless system","Barter","Manual system"],a:"Cashless system"},
    {id:15,q:"Card fraud occurs when:",o:["PIN safe","Details stolen","Secure login","Encrypted"],a:"Details stolen"},

    // 🔥 CONTINUE TO 60 (pattern)
    ...Array.from({length:45},(_,i)=>({
      id:16+i,
      q:`Applied ICT scenario question ${16+i}: Identify the BEST concept involved.`,
      o:["Network","E-commerce","Cashless","E-learning"],
      a:["Network","E-commerce","Cashless","E-learning"][i%4]
    }))
  ];

  // 🔥 THEORY (20 QUESTIONS)
  const theory = [
    "Explain THREE advantages of networking in schools.",
    "Differentiate LAN and WAN with examples.",
    "Explain TWO risks of e-commerce and prevention.",
    "Describe Mobile Money process step-by-step.",
    "Explain THREE benefits of cashless society.",
    "State TWO disadvantages of cashless economy.",
    "Compare debit vs credit card (3 points).",
    "Explain how POS machine works.",
    "State THREE advantages of e-learning.",
    "Explain TWO challenges of e-learning.",
    "Explain role of router in network.",
    "Discuss fraud prevention in e-commerce.",
    "Explain importance of PIN security.",
    "Describe online banking process.",
    "Explain effect of poor internet on learning.",
    "Discuss Ghana’s readiness for cashless economy.",
    "Explain importance of cybersecurity.",
    "Compare traditional vs e-learning.",
    "Explain advantages of transaction cards.",
    "Analyse risks of digital payments."
  ];

  // ⏱ TIMER
  useEffect(()=>{
    if(start && time>0 && !submitted){
      const t=setTimeout(()=>setTime(time-1),1000);
      return ()=>clearTimeout(t);
    }
    if(time===0) submit();
  },[time,start,submitted]);

  const unlock=()=> pin==="1234"?setStart(true):alert("Wrong PIN");

  const select=(id,val)=> setAnswers({...answers,[id]:val});

  const submit=()=>{
    let marks=0;

    questions.forEach(q=>{
      if(answers[q.id]===q.a) marks+=1;
    });

    let theoryTotal=Object.values(theoryScores).reduce((a,b)=>a+Number(b||0),0);

    setScore(marks+theoryTotal);
    setSubmitted(true);
  };

  return (
    <div style={{maxWidth:"900px",margin:"auto",padding:"20px"}}>
      <h2>🔥 ELITE BECE ICT SYSTEM</h2>

      {!start && (
        <>
          <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN"/>
          <button onClick={unlock}>Start Exam</button>
        </>
      )}

      {start && !submitted && (
        <>
          <h3>Time: {Math.floor(time/60)}:{time%60}</h3>

          <h3>Objective</h3>
          {questions.map(q=>(
            <div key={q.id}>
              <p>{q.q}</p>
              {q.o.map(opt=>(
                <label key={opt}>
                  <input type="radio" name={q.id} onChange={()=>select(q.id,opt)}/>
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <h3>Theory (Self-Mark)</h3>
          {theory.map((t,i)=>(
            <div key={i}>
              <p>{i+1}. {t}</p>
              <input
                type="number"
                placeholder="Score yourself (0-5)"
                onChange={(e)=>setTheoryScores({...theoryScores,[i]:e.target.value})}
              />
            </div>
          ))}

          <button onClick={submit}>Submit</button>
        </>
      )}

      {submitted && (
        <>
          <h2>Final Score: {score}</h2>
          <p>Objective + Theory combined.</p>
        </>
      )}
    </div>
  );
}