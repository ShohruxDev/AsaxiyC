import React from "react";
import { useStateValue } from "../context";
import { useNavigate } from "react-router-dom";

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
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlwishlist(product);
              }}
            >
              Like
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;
