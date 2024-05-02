export default function Header(){
    return(
        <>
         <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="/" className="logo">MEC</a>
                <nav id="navbar" className="navbar">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="message.html">FAQ</a></li>
                        <li><a href="shop.html">Blog</a></li>
                    </ul>
                </nav>
            </div>
        </header>
       
        <div className="bottom-nav">
            <a className="fa fa-home" href="index.html"><br /><small className="smaller">Home</small></a>
            <a className="fa fa-exclamation-circle" href="index.html#about"><br /><small className="smaller">About</small></a>
            <a className="fa fa-phone" href="contact.html"><br /><small className="smaller">Contact</small></a>
            <a className="fa fa-question-circle-o" href="message.html"><br /><small className="smaller">FAQ</small></a>
            <a className="fa fa-credit-card" href="shop.html"><br /><small className="smaller">Blog</small></a>
        </div>
       
       </>
    )
}