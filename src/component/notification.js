import React from 'react'
import { ReactNotifications }  from 'react-notifications-component';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

// fetch(path)
// .then(res => res.json())
// .then(data => setText(data))
// .catch(err => console.log(err))



const Notify = () => {
    const addNotification = () => {
        Store.addNotification({
            title: "MEC APP",
            message:"Signup ok",
            type:"success",
            insert:"top",
            container:"top-center",
            dismiss:{
                duration: 5000,
                onScreen: true,
                showIcon: true,
                pauseOnHover: true,
                click:true
            },
            width: 300,
            height: 200
           
        })
    }
    
    return(
        <>
        
        <ReactNotifications />
        <button onClick={addNotification}>PUSH</button>
        
        </>
    )
}

export default Notify;