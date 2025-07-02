import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API/api";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <div>Yuklanmoqda...</div>;
  }
  return (
    <div className="product-detail">
      <img src={product.images[0]} alt={product.name} width="200" />
      <li className="productrli">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Narxi: {product.price} so'm</p>
      </li>
    </div>
  );
};

export default ProductDetail;
