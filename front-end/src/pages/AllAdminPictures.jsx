import { React, useRef } from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from "./Modal";
function AllAdminPictures() {
  const { id: user_id, token } = jwt_decode(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [modal, setModal] = useState(false);
  const getAllPictures = async () => {
    setLoading(true);
    let res;
    try {
      res = await axios.get("http://127.0.0.1:8080/api/v1/moderator/");
      if (res.status === 200) {
        setData(res.data.data.userPictures);
        console.log(res.data.data.userPictures);
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPictures();
  }, []); //eslint-disable-line
  const deleteImage = async (image_id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8080/api/v1/pictures/${image_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setData(res.data.data.pictures);
        console.log(res.data.data.pictures);
        getAllPictures();
        alert("image deleted");
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    } finally {
    }
  };
  const handleDelete = (img_id) => {
    deleteImage(img_id);
  };
  return (
    <>
      <Modal
        getAllPictures={getAllPictures}
        modal={modal}
        setModal={setModal}
        activeImage={activeImage}
      />
      <div className="card-data">
        {!isLoading &&
          data.map((item, index) => (
            <div key={index} className="card" style={{ position: "relative" }}>
              <div className="card-header">
                <div className="card-category-wrapper">
                  {item.isRestricted && (
                    <span className="restricted-image">
                      Restricted :This Image Violates our policy
                    </span>
                  )}
                  <img
                    src={item.picture}
                    alt={"dsd"}
                    style={{
                      filter: item.isRestricted ? "blur(10px)" : "none",
                    }}
                  />
                  <h3>Tags : </h3>
                  <span className="card-category">{item.tags}</span>
                </div>
                <h3>Comments : </h3>
                <span className="card-category">{item.comments}</span>
              </div>
              <button
                className="btn-img"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="btn-img"
                onClick={() => {
                  setActiveImage(item);
                  setModal(!modal);
                }}
              >
                Update
              </button>
            </div>
          ))}
        {isLoading && <h1>loading...</h1>}
      </div>
    </>
  );
}
export default AllAdminPictures;
