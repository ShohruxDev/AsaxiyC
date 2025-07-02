import { useQuery } from "@tanstack/react-query";
import API from "../API/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "antd";

const NewPage = () => {
  const navigate = useNavigate();
  const [currentpage, setcurrentpage] = useState(0);
  const [pagesize, setpagesize] = useState(10);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", currentpage, pagesize],
    queryFn: getdata,
  });
  async function getdata() {
    try {
      const res = await API.get(`/products?limit=${pagesize}&skip=${currentpage * pagesize}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  return (
    <>
      <div className="cards">
        {products?.products.map((res) => (
          <li className="card" onClick={() => navigate(`/profille/${res.id}`)} key={res.id}>
            <img src={res.thumbnail} alt="" />
            <b>{res.title}</b>
          </li>
        ))}
        <Pagination
          current={currentpage}
          onChange={(page) => setcurrentpage(page)}
          defaultCurrent={1}
          pageSize={pagesize}
          total={products?.total}
          onShowSizeChange={(_, size) => {
            setpagesize(size);
            setcurrentpage(0);
          }}
        />
      </div>
    </>
  );
};

export default NewPage;
