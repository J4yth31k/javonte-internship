import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      left: "-20px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      background: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    &#8249;
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      right: "-20px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      background: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    &#8250;
  </button>
);

const CountdownTimer = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const diff = new Date(expiryDate) - new Date();
    if (diff <= 0) return null;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!timeLeft) return null;
  return <div className="de_countdown">{timeLeft}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch new items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12" style={{ position: "relative" }}>
            <Slider {...settings}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div key={index} className="px-2">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div className="nft__item_wrap" style={{ marginTop: "16px" }}>
                          <Skeleton
                            width="100%"
                            height="200px"
                            borderRadius="8px"
                          />
                        </div>
                        <div className="nft__item_info" style={{ marginTop: "12px" }}>
                          <Skeleton
                            width="140px"
                            height="20px"
                            borderRadius="4px"
                          />
                          <br />
                          <Skeleton
                            width="80px"
                            height="16px"
                            borderRadius="4px"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <div key={item.id} className="px-2">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.title}`}
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={item.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        {item.expiryDate && (
                          <CountdownTimer expiryDate={item.expiryDate} />
                        )}

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a
                                  href="https://www.facebook.com"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a
                                  href="https://www.twitter.com"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a
                                  href="mailto:?"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">{item.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
