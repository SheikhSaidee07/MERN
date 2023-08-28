import { React, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
const Angrypicmode = () => {
  const [data, setData] = useState([]);
  const { token } = jwt_decode(localStorage.getItem("token"));
  const [isLoading, setLoading] = useState(false);
  const getAngryPictures = async () => {
    setLoading(true);
    let res;
    try {
      res = await axios.get(
        "http://127.0.0.1:8080/api/v1/moderator/angryPictures"
      );
      if (res.status === 200) {
        setData(res.data.data.angryTagged);
      }
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAngryPictures();
  }, []); //eslint-disable-line
  const deleteUser = async (item_id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8080/api/v1/moderator/angryPictures/${item_id}`,
        { isRestricted: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        getAngryPictures();
        Swal.fire({
          title: "Restricted!",
          text: "Picture has been Restricted.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      /* alert(err.response.data.message);
      console.log(err.response.data.message); */
      console.log(err);
    } finally {
    }
  };
  const handleDelete = (item_id) => {
    deleteUser(item_id);
  };
  return (
    <>
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
                    src={item.picture}
                    alt="sample"
                    style={{
                      filter: item.isRestricted ? "blur(10px)" : "none",
                    }}
                  />
                  <h3>Tag:</h3>
                  <span className="card-category">{item.tags}</span>
                </div>
                <h3>Comments:</h3>
                <span className="card-category">{item.comments}</span>
              </div>
              <button
                className="btn-img"
                onClick={() => handleDelete(item._id)}
              >
                Restrict
              </button>
            </div>
          ))}
        {isLoading && <h1 className="loading-txt">Loading...</h1>}
      </div>
    </>
  );
};

export default Angrypicmode;
