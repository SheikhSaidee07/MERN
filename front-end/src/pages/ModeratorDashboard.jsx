import { React, useRef } from "react";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import axios from "axios";

function ModeratorDashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("all");
  const getAllPictures = async () => {
    setLoading(true);
    let res;
    try {
      res = await axios.get(
        `http://127.0.0.1:8080/api/v1/moderator/?filter=${filterValue}`
      );
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
  }, [filterValue]); //eslint-disable-line
  return (
    <>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
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
                  <h3>Tag:</h3>
                  <span className="card-category">{item.tags}</span>
                </div>
                <h3 className="comment-txt">Comments:</h3>
                <span className="card-category">{item.comments}</span>
              </div>
            </div>
          ))}
      </div>
      {isLoading && <h1 className="loading-txt">loading...</h1>}
    </>
  );
}
export default ModeratorDashboard;
