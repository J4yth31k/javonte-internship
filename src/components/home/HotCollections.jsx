import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
  <button
    className="slick-prev-custom"
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
    className="slick-next-custom"
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

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
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
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    )
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch hot collections:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12" style={{ position: "relative" }}>
            <Slider {...settings}>
              {loading
                ? new Array(6).fill(0).map((_, index) => (
                    <div key={index} className="px-2">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton
                            width="100%"
                            height="200px"
                            borderRadius="8px"
                          />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>
                        <div
                          className="nft_coll_info"
                          style={{ paddingTop: "40px" }}
                        >
                          <Skeleton
                            width="120px"
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
                : collections.map((collection) => (
                    <div key={collection.id} className="px-2">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt={collection.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage}
                              alt={collection.title}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>ERC-{collection.code}</span>
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

export default HotCollections;
