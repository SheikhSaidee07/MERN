import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserDetais() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios(`http://127.0.0.1:8080/api/v1/admin/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.status === 200) {
        setData(res.data.data.singlePic);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
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
              {/* <button
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
              </button> */}
            </div>
          ))}
        {isLoading && <span className="loading-txt">Loading.....</span>}
      </div>
    </>
  );
}
