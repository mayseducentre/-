import Breadcrumb from "../breadcrumb";
import Speech from "./speech";

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { useState } from "react";

var path=process.env.REACT_APP_ACCOUNT_API;

function getNote(){
    var id=document.getElementById("teacherid").value;
    fetch(`${path}/staffaccount/${id}`)
    .then(res => res.json())
    .then(data => displayNote(data))
    .catch(err => console.log(err))
   
    }

    function displayNote(data){
        for(var i=0; i < data.length; i++){
        var div= document.createElement("div");
        div.innerHTML=`${data[i].note}` 

        document.getElementById("user_note").appendChild(div)
        }
    }

export default function LNote(){
    const [content, setContent]=useState('');

    const modelChange=(newcontent) =>{
        setContent(newcontent)
    }

    function sendContent(){
        var id=document.getElementById("teacherid").value;
        fetch(`${path}/staffaccount/${id}`,{
            method:"PATCH",
            body: JSON.stringify({
                "note":content
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data)
            alert("Saved successfully")
        })
        .catch(err => console.log(err))
    }
    

  const notedb=process.env.REACT_APP_NOTE_DB
  var d=new Date();
  var time =d.getDate();
    
  const [lessonNote, setLessonNote] = useState({
    username:'',
    subject: '',
    class: '',
    week: '',
    day: '',
    topic: '',
    subTopic: '',
    introduction: '',
    teachingAids: '',
    objectives: '',
    mainContent: '',
    conclusion: '',
    evaluation: '',
    references: '',
    date: `${time}`
  });

  const handleChange = (e) => {
    setLessonNote({ ...lessonNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${notedb}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lessonNote)
      });
      if (response.ok) {
        alert('Lesson note submitted successfully');
        setLessonNote({
          username:'',
          subject: '',
          class: '',
          week: '',
          day: '',
          topic: '',
          subTopic: '',
          introduction: '',
          teachingAids: '',
          objectives: '',
          mainContent: '',
          conclusion: '',
          evaluation: '',
          references: '',
          date:`${time}`
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Breadcrumb title="Lesson Note" />
    <br/>
    <form className="lesson-note-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Full Name</label>
      <input name="username" id="username" placeholder="Full Name" value={lessonNote.username} onChange={handleChange} required />

      <label htmlFor="subject">Subject</label>
      <input name="subject" id="subject" placeholder="Subject" value={lessonNote.subject} onChange={handleChange} required />

      <label htmlFor="class">Class</label>
      <input name="class" id="class" placeholder="Class" value={lessonNote.class} onChange={handleChange} required />

      <label htmlFor="week">Week</label>
      <input name="week" id="week" placeholder="Week" value={lessonNote.week} onChange={handleChange} required />

      <label htmlFor="day">Day</label>
      <input name="day" id="day" placeholder="Day" value={lessonNote.day} onChange={handleChange} required />

      <label htmlFor="topic">Topic</label>
      <input name="topic" id="topic" placeholder="Topic" value={lessonNote.topic} onChange={handleChange} required />

      <label htmlFor="subTopic">Sub-Topic</label>
      <input name="subTopic" id="subTopic" placeholder="Sub-Topic" value={lessonNote.subTopic} onChange={handleChange} />

      <label htmlFor="introduction">Introduction</label>
      <textarea name="introduction" id="introduction" placeholder="Introduction" value={lessonNote.introduction} onChange={handleChange} required></textarea>

      <label htmlFor="teachingAids">Teaching Aids</label>
      <textarea name="teachingAids" id="teachingAids" placeholder="Teaching Aids" value={lessonNote.teachingAids} onChange={handleChange} required></textarea>

      <label htmlFor="objectives">Objectives</label>
      <textarea name="objectives" id="objectives" placeholder="Objectives" value={lessonNote.objectives} onChange={handleChange} required></textarea>

      <label htmlFor="mainContent">Main Content</label>
      <textarea name="mainContent" id="mainContent" placeholder="Main Content" value={lessonNote.mainContent} onChange={handleChange} required></textarea>

      <label htmlFor="conclusion">Conclusion</label>
      <textarea name="conclusion" id="conclusion" placeholder="Conclusion" value={lessonNote.conclusion} onChange={handleChange} required></textarea>

      <label htmlFor="evaluation">Evaluation</label>
      <textarea name="evaluation" id="evaluation" placeholder="Evaluation" value={lessonNote.evaluation} onChange={handleChange} required></textarea>

      <label htmlFor="references">References</label>
      <textarea name="references" id="references" placeholder="References" value={lessonNote.references} onChange={handleChange}></textarea>

      <button type="submit">Submit Lesson Note</button>
    </form>
        {/* <button style={{padding:"10px 12px",background:"black",color:"white"}}>Speech to Text</button>
        <br/>
        <br/>
        <button style={{padding:"10px 12px",background:"black",color:"white"}}>Note Editor</button> */}
<Speech />
{/* <FroalaEditorComponent tag='textarea' model={content} onModelChange={modelChange}/>

<center>
<button  onClick={sendContent}>Save on Cloud</button>
<button onClick={getNote}>Get Note</button>
</center>

<div id="user_note"></div> */}
        
        </>
    )
}