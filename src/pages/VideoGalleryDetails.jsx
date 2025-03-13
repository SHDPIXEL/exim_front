import React from "react";
import { Link } from "react-router-dom";
import blogdetailsimg from "../assets/images/blogdetails.jpg";
import adsimg from "../assets/images/adsimg.gif";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import adsleftbannerimg from "../assets/images/topleftads.png";
import banner4 from "../assets/images/banner7.png";
import newfocusVideo from "../assets/images/newfocusVideo.mp4";

const VideGalleryDetails = () => {

    const bottomData = [
        {
            id: 1,
            title: "Proposed US tariffs seen impacting dry bulk trade",
            imgUrl: banner4,
            Datetime: "December 06, 2024",
            category: "Shipping"
        },
        {
            id: 2,
            title: "Proposed US tariffs seen impacting dry bulk trade",
            imgUrl: banner4,
            Datetime: "December 06, 2024",
            category: "Indian Economy"
        },
        {
            id: 3,
            title: "Proposed US tariffs seen impacting dry bulk trade",
            imgUrl: banner4,
            Datetime: "December 06, 2024",
            category: "Export"
        }
        ,
        {
            id: 4,
            title: "Proposed US tariffs seen impacting dry bulk trade",
            imgUrl: banner4,
            Datetime: "December 06, 2024",
            category: "Export"
        }

    ];
    return (

        <div className='container mt-5 mb-5 '>
            <div className="row">
                <div className="col-xxl-9 col-lg-9 blog-details">
                    <div className="th-blog blog-single">
                        <Link to="/#" className="categorybtn" >Indian Economy</Link>
                        <h2 className="blog-title">Global trade reaching a record in 2024 presents opportunities amidst uncertainty: Report</h2>
                        <div className="blog-meta"><Link className="author" href="/"><i className="far fa-user"></i>By - Tnews</Link> <Link to="/#"><i className="far fa-calendar-days"></i>21 June, 2023</Link>

                        </div>
                        <div className="blog-img ">
                            <div className="videobox h-auto">
                                <video width="100%" height="100%" className="videogal" controls={true} muted autoPlay loop>
                                    <source src={newfocusVideo} type="video/mp4" />
                                </video>
                                {/* <div className="play-icon">
                                    <i className="bi bi-play-fill"></i>
                                </div> */}

                            </div>
                        </div>
                        <div className="blog-content-wrap">
                            <div className="share-links-wrap">
                                <div className="share-links"><span className="share-links-title">Share Post:</span>
                                    <div className="multi-social"><Link to="https://facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link> <Link to="https://twitter.com/" target="_blank"><i className="bi bi-twitter-x"></i></Link> <Link to="https://linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></Link>                    <Link to="https://pinterest.com/" target="_blank"><i className="fab fa-pinterest-p"></i></Link> <Link to="https://instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></div>
                                </div>
                            </div>
                            <div className="blog-content">
                                <div className="blog-info-wrap">
                                    <button className="blog-info print_btn">Print : <i className="fas fa-print"></i></button> <Link className="blog-info" href="mailto:">Email : <i className="fas fa-envelope"></i> </Link>
                                    <button className="blog-info ms-sm-auto">15k <i className="fas fa-thumbs-up"></i></button> <span className="blog-info">126k <i className="fas fa-eye"></i></span> <span className="blog-info">12k <i className="fas fa-share-nodes"></i></span></div>
                                <div className="content">
                                    <p>India's journey toward becoming a global economic powerhouse is marked by remarkable achievements in its export landscape. The nation has demonstrated significant progress in diverse sectors, ranging from petroleum oils and agrochemicals to semiconductors and precious stones. This growth reflects India's ability to leverage advanced technology, innovative practices and competitive.</p>
                                    <p>Igniting their competitive spirit. It encourages them to set ambitious goals, not settling for mediocrity but pushing themselves to excel in their chosen sport or athletic endeavor. The pursuit of victory becomes the driving force, motivating
                                        athletes to give their all,</p>
                                    <p>Surpass their limitations, and achieve remarkable feats. It emphasizes the importance of hard work, dedication, and Perseverance in the face of challenges and obstacles that may arise along the way.</p>
                                    <div className="my-4 py-lg-2">
                                        <Link to="/#"><img className="light-img w-100" src={adsimg} alt="Ads" /></Link>
                                    </div>
                                    <p>The slogan reminds athletes that their participation in sports has the potential to leave a lasting legacy. It suggests that their accomplishments, records, and impact can inspire future generations, shaping the sport itself and influencing
                                        others to follow in their footsteps. By embracing sports and embracing the pursuit of victory, individuals have the opportunity to create a legacy that will be remembered and celebrated long after their own participation.</p>

                                    <h3 className="h4 fw-bold">Achieve greatness, fueled by innovation</h3>
                                    <p>Achieve greatness, fueled by innovation" encapsulates the idea that by embracing and harnessing innovative approaches and technologies, individuals can reach extraordinary heights of success and achievement. It implies that the combination
                                        of pushing boundaries, thinking outside the box, and adopting cutting-edge advancements can Propel individuals to surpass their limitations and accomplish remarkable feats.</p>
                                    <p>This phrase suggests that innovation serves as the driving force behind progress and improvement in various fields, including sports, business, arts, and personal development. It conveys the message that by embracing new ideas.</p>
                                    <div className="text-end"> <cite><b>Source: </b>Exim News Service: Mumbai, Jan. 2</cite></div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="blog-navigation mt-3">
                        <div className="nav-btn prev">
                            <div className="img"><img src={banner2} alt="blog img" className="nav-img" /></div>
                            <div className="media-body">
                                <h5 className="title"><Link className="hover-line" to="/#">Global trade reaching a record in 2024 presents... </Link></h5><Link to="/#" className="nav-text"><i className="fas fa-arrow-left me-2"></i>Prev</Link></div>
                        </div>
                        <div className="divider"></div>
                        <div className="nav-btn next">
                            <div className="media-body">
                                <h5 className="title"><Link className="hover-line" to="/#">Minister launches policy for  movement...</Link></h5><Link to="/#" className="nav-text">Next<i className="fas fa-arrow-right ms-2"></i></Link></div>
                            <div className="img"><img src={banner3} alt="blog img" className="nav-img" /></div>
                        </div>
                    </div>




                </div>
                <div className="col-lg-3">


                    <div className="mb-3">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Recent News</div>
                        </div>
                        {bottomData.map((item) => (
                            <div className="righttopStory topleftimgcard SiderecentPost" key={item.id}>
                                <div className="imgside">
                                    <img src={item.imgUrl} width="" height="100%" alt={item.title} />
                                </div>
                                <div className="textside">
                                    <div className="categorybtn">{item.category}</div>
                                    <h4>{item.title}</h4>
                                    <p>{item.Datetime}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="mb-4 mt-4">
                        <div className="col-md-12 mb-3">
                            <div className="webTittle"><i className="bi bi-chevron-right"></i>Popular Tags</div>
                        </div>
                        <div className="tagcloud"><Link to="/#">Trade</Link>  <Link to="/#">Shipping</Link><Link to="/#">Exports</Link> <Link to="/#">Special Reports</Link><Link to="/#">Indian Economy </Link> <Link to="/#">Tarnsport & logistic</Link><Link to="/#">Port</Link></div>

                    </div>
                    <img src={adsleftbannerimg} alt="hu" className="w-100" style={{ height: "348px" }} />
                    <div className="mt-4">
                        <div className="HeadlineList">
                            <div className="categorybtn d-inline-block p-2 px-3 mx-auto w-auto mb-4"><i className="bi bi-fire me-2"></i> Top Headlines</div>
                            <ul>
                                <li>
                                    <div className="Headlinesingle">
                                        <h3>01</h3>
                                        <h5>Maritime India Vision 2030 achieving its aims, Parliament told</h5>
                                    </div>
                                </li>
                                <li>
                                    <div className="Headlinesingle">
                                        <h3>02</h3>
                                        <h5>CMA CGM PSS from the Indian Subcontinent, Middle East Gulf, Red Sea ...</h5>
                                    </div>
                                </li>
                                <li>
                                    <div className="Headlinesingle">
                                        <h3>03</h3>
                                        <h5>CMA CGM PSS from the Indian Subcontinent, Middle East Gulf, Red Sea ...</h5>
                                    </div>
                                </li>
                                <li>
                                    <div className="Headlinesingle">
                                        <h3>04</h3>
                                        <h5>Alliance capacity market share</h5>
                                    </div>
                                </li>
                                <li>
                                    <div className="Headlinesingle">
                                        <h3>05</h3>
                                        <h5>Proposed US tariffs seen impacting dry bulk trade</h5>
                                    </div>
                                </li>
                                <li>
                                    <div className="Headlinesingle">
                                        <h3>06</h3>
                                        <h5>Proposed US tariffs seen impacting dry bulk trade</h5>
                                    </div>
                                </li>
                                <li>
                                    <div className="Headlinesingle">
                                        <h3>07</h3>
                                        <h5>Proposed US tariffs seen impacting dry bulk trade</h5>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}
export default VideGalleryDetails