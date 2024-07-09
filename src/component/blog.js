export default function Blog(){
    return(
        <>
         <section id="recent-posts" className="recent-posts sections-bg">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
          <h2>Recent Blog Posts</h2>
          <p>Find out the most exciting and interesting information from our blog.</p>
        </div>

        <div className="row gy-4">

          <div className="col-xl-4 col-md-6">
            <article>

              <div className="post-img">
                <img src={require("../img/n.jpg")} alt="" className="img-fluid"/>
              </div>

              <p className="post-category">2020 Graduation</p>

              <h2 className="title">
                <a href="#/">Annual Graduation Ceremony</a>
              </h2>

              <div className="d-flex align-items-center">
                <img src={require("../img/v.png")} alt="" className="img-fluid post-author-img flex-shrink-0"/>
                <div className="post-meta">
                  <p className="post-author">Maria Doe</p>
                  <p className="post-date">
                    <time datetime="2022-01-01">Jan 1, 2020</time>
                  </p>
                </div>
              </div>

            </article>
          </div>

          <div className="col-xl-4 col-md-6">
            <article>

              <div className="post-img">
                <img src={require("../img/v.png")} alt="" className="img-fluid"/>
              </div>

              <p className="post-category">Inter-Class Quiz</p>

              <h2 className="title">
                <a href="#/">MAY's Inter-Class quiz</a>
              </h2>

              <div className="d-flex align-items-center">
                <img src={require("../img/v.png")} alt="" className="img-fluid post-author-img flex-shrink-0" />
                <div className="post-meta">
                  <p className="post-author">John</p>
                  <p className="post-date">
                    <time datetime="2022-01-01">Jun 5, 2022</time>
                  </p>
                </div>
              </div>

            </article>
          </div>

          <div className="col-xl-4 col-md-6">
            <article>

              <div className="post-img">
                <img src={require("../img/i.jpg")} alt="" className="img-fluid"/>
              </div>

              <p className="post-category">Entertainment</p>

              <h2 className="title">
                <a href="#/">MAY's fun club</a>
              </h2>

              <div className="d-flex align-items-center">
                <img src={require("../img/v.png")} alt="" className="img-fluid post-author-img flex-shrink-0"/>
                <div className="post-meta">
                  <p className="post-author">Mark Dower</p>
                  <p className="post-date">
                    <time datetime="2022-01-01">Jun 22, 2022</time>
                  </p>
                </div>
              </div>

            </article>
          </div>
        </div>
      </div>
    </section>
        </>
    )
}