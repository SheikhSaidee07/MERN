import { React, useState, useEffect } from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";
import Modal from "./Modal";
import Swal from "sweetalert2";

const UserPictures = () => {
  const { id: user_id, token } = jwt_decode(localStorage.getItem("token"));
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [modal, setModal] = useState(false);
  const getAllPictures = async () => {
    try {
      setLoading(true);
      const res = await axios(
        `http://127.0.0.1:8080/api/v1/pictures/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setData(res.data.data.pictures);
      }
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPictures();
  }, []);
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
        getAllPictures();
        Swal.fire({
          title: "Deleted!",
          text: "Picture Data has been deleted.",
          icon: "success",
          confirmButtonText: "Ok",
        });
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
                  <h3>{item.user_id?.name}</h3>
                  {item.isRestricted && (
                    <span className="restricted-image">
                      Restricted :This Image Violates our policy
                    </span>
                  )}
                  <img
                    style={{
                      filter: item.isRestricted ? "blur(10px)" : "none",
                    }}
                    src={item.picture}
                    alt="sample"
                  />
                  <h3>Tag:</h3>
                  <span className="card-category">{item.tags}</span>
                </div>
                <h3 className="comment-txt">Comments:</h3>
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
        {isLoading && <span className="loading-txt">Loading.....</span>}
      </div>
    </>
  );
};

export default UserPictures;
