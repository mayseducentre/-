export default function CreateAnnounce(){
    return(
        <>
        <section className="checkout spad">
    <div className="container">
        <div className="checkout__form">
            <form>
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <h3 className="checkout__title">Post an Announcement</h3>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="checkout__input">
                                    <p>Subject<span>*</span></p>
                                    <input type="text" id="subject_email" required/>
                                </div>
                            </div>
                            
                        </div>
                        
                       
                       
                         
                       

                      
                        <div className="checkout__input">
                            <p>Content<span>*</span></p>
                            <textarea type="text" placeholder="Comment" className="checkout__input__add" ></textarea>
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="checkout__order">
                           
                            <button type="submit" className="site-btn">POST ANNOUNCEMENT</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>

        </>
    )
}