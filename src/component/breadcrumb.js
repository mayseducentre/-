export default function Breadcrumb(props){

    return(
        <section className="breadcrumb-option" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.image})`}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__text animate__animated animate__fadeInLeft">
                        <h4>{props.title}</h4>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
