import NotiesPermission from "./noties_permission"

function Notify(){
    if(Notification.permission === 'granted'){
        new Notification('MAYS EDU CENTRE', {
            body:'You can signup now.'
        })
    }
    else{
        console.error('Notification not granted')
    }
}

export default function Noties(){

    return(
        <div onLoad={Notify()}>
        <NotiesPermission />
        </div>
    )
}