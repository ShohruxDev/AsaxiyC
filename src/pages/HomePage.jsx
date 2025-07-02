import React, { useEffect, useState } from "react";
import API from "../API/api";
import "./HomePge.css";
import like from "../images/heart.svg";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context";
const HomePage = () => {
  const [loading, setloading] = useState(false);
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const { setwishlist, wishlist, search, productss, setproductss } =
    useStateValue();
  const handlwishlist = (product) => {
    const isomewishlist = wishlist.some((item) => item.id === product.id);
    if (isomewishlist) {
      setwishlist(wishlist.filter((i) => i.id !== product.id));
    } else {
      setwishlist((prev) => [...prev, product]);
    }
  };
  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    setloading(true);
    API.get("/products")
      .then((res) => setproducts(res.data.products))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, []);
  return (
    <>
      {loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      <ul className="cards">
        {filteredProducts.map((product) => (
          <li
            onClick={() => navigate(`/product/${product.id}`)}
            key={product.id}
            className="card"
          >
            <img className="cardimg" src={product.thumbnail} alt="" />
            <b>{product.title}</b>
            <p>Price: {product.price}</p>

            <div className="like">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  handlwishlist(product);
                }}
                src={like}
                alt=""
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
