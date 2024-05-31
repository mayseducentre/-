export default function Error(){
    return(
        <>
        <h2>
        404 page
        </h2>
        <button onClick={()=>{window.history.back()}}>Back to page</button>
        </>
    )
} 