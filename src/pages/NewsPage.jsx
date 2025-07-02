import React from "react";
import { useStateValue } from "../context";
import { useNavigate } from "react-router-dom";
import like from "../images/heart.svg";
const NewsPage = () => {
  const navigate = useNavigate();
  const { wishlist, setwishlist } = useStateValue();
  const handlwishlist = (product) => {
    const isomewishlist = wishlist.some((item) => item.id === product.id);
    if (isomewishlist) {
      setwishlist(wishlist.filter((i) => i.id !== product.id));
    } else {
      setwishlist((prev) => [...prev, product]);
    }
  };
  return (
    <div>
      <ul className="cards">
        {wishlist.map((product) => (
          <li
            onClick={() => navigate(`/product/${product.id}`)}
            key={product.id}
            className="card"
          >
            <img className="cardimg" src={product.thumbnail} alt="" />
            <b>{product.title}</b>
            <p>Price: {product.price}</p>
            <p>Brand: {product.brand}</p>
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
    </div>
  );
};

export default NewsPage;
