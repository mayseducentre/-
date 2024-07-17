export default function Header(){
    return(
        <>
         <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="#/" className="logo">
                    <img src={require("../img/v.png")} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
                <nav id="navbar" className="navbar animate__animated animate__fadeInRight">
                    <ul>
                        <li><a href="#/">Home</a></li>
                        <li><a href="#/about">About</a></li>
                        <li><a href="#/library">Library</a></li>
                        <li><a href="#/contact">Contact</a></li>
                        <li><a href="#/register">Register</a></li>
                       <li><a href="#/portal">Portal</a></li>
                       <li><a href="#/account">Account</a></li>
                    </ul>
                </nav>
            </div>
        </header>
       
        <div className="bottom-nav animate__animated animate__fadeInUp">
            <a className="fa fa-home" href="#/"><br /><small className="smaller">Home</small></a>
            <a className="fa fa-exclamation-circle" href="#/about"><br /><small className="smaller">About</small></a>
            <a className="fa fa-exclamation-circle" href="#/library"><br /><small className="smaller">Library</small></a>
            <a className="fa fa-phone" href="#/contact"><br /><small className="smaller">Contact</small></a>
            <a className="fa fa-credit-card" href="#/register"><br /><small className="smaller">Register</small></a>
            <a className="fa fa-graduation-cap" href="#/portal"><br /><small className="smaller">Portal</small></a>
            <a className="fa fa-user-o" href="#/account"><br /><small className="smaller">Account</small></a>
        </div>
       
       </>
    )
}