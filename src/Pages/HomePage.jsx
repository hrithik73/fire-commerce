import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.CartReducer);

  const getProduct = async () => {
    try {
      setLoader(true);
      const user = await getDocs(collection(db, "products"));
      const productArray = [];
      user.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productArray.push(obj);
      });
      setProduct(productArray);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const addtocart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout loader={loader}>
      <div className="container">
        <div className="row">
          {product.map((product, i) => {
            return (
              <div key={i} className="col-md-4 text-center ">
                <div className="m-2 p-1 product">
                  <div className="product_content">
                    <p>{product.name}</p>
                    <img
                      className="product_img"
                      src={product.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="product_action">
                    <h3>{product.price} RS/-</h3>
                    <div>
                      <button
                        className="mx-1"
                        onClick={() => addtocart(product)}
                      >
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
