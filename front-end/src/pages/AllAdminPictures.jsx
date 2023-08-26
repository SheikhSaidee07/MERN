import { React, useRef } from "react";
import { useEffect, useState } from "react";

import axios from "axios";

function AllAdminPictures() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
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
  return (
    <>
      <div className="card-data">
        {!isLoading &&
          data.map((item, index) => (
            <div key={index} className="card-wrapper">
              <div className="card">
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
              </div>
            </div>
          ))}
        {isLoading && <h1>loading...</h1>}
      </div>
    </>
  );
}
export default AllAdminPictures;
