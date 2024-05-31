export default function Category(){
    return(
        <>
         <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
            <div className="text-center mb-5">
                <h1>Explore Top Subjects</h1>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">SOCIAL STUDIES</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">MATHEMATICS</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">RME</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">ARTS AND DESIGN</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">SCIENCE</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">ENGLISH LANGUAGE</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">COMPUTING</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="cat-item position-relative overflow-hidden rounded mb-2">
                        <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                        <a className="cat-overlay text-white text-decoration-none" href="">
                            <h4 className="text-white font-weight-medium">OWOP</h4>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}