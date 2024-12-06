export default function MiniBread(props){
    return(
        
        <div style={{padding:"10px 12px",position:"fixed", top:"60px", background:"cornsilk", width:"100%",fontSize:"15px"}}>
            <div>
            <a onClick={props.event} style={{color:"orange",cursor:"pointer"}}>{props.main}&emsp;</a>
            <i className="fa fa-arrow-right"></i>
            <a id="view">&emsp;{props.view}</a>    
            </div>
            
        </div>
    )
}