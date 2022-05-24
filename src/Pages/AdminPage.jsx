import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Layout from "../component/Layout";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    category: "",
    price: 0,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setProducts(productArray);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const editHandler = (item) => {
    handleShow();
    setProduct(item);
  };

  const updateData = async () => {
    try {
      setLoader(true);
      await setDoc(doc(db, "products", product.id), product);
      getProduct();
      toast.success("Upadted successfully");
      handleClose();
      setLoader(false);
    } catch (error) {
      toast.error("Upadte failed");
      setLoader(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout loader={loader}>
      <h3 className="mt-2">Products List</h3>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <img src={item.imageUrl} alt="" height="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td style={{ cursor: "pointer" }}>
                  <FaTrash /> <FaEdit onClick={() => editHandler(item)} />{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            <input
              type="text"
              placeholder="Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <input
              type="text"
              value={product.description}
              placeholder="Description"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button type="submit" onClick={updateData}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default AdminPage;
