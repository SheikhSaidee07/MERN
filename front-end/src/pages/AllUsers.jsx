import { React, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const { id: user_id, token } = jwt_decode(localStorage.getItem("token"));
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios(`http://127.0.0.1:8080/api/v1/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        setData(res.data.data.allUsers);
        console.log(res.data.data.allUsers);
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (item_id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8080/api/v1/admin/users/${item_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        getAllUsers();
        alert("User deleted Successfully");
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    } finally {
    }
  };
  const handleDelete = (item_id) => {
    deleteUser(item_id);
  };

  useEffect(() => {
    getAllUsers();
  }, []); //eslint-disable-line

  const getImage = async (image_id) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8080/api/v1/pictures/${image_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.body);
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    } finally {
    }
  };
  const getUserImage = (img_id) => {
    getImage(img_id);
  };

  return (
    <div className="card-data">
      {!isLoading &&
        data.map((item, index) => (
          <div key={index} className="card-wrapper">
            <div className="card-new">
              <div className="card-header">
                <div className="card-category-wrapper">
                  <h3>{item.name}</h3>
                  <p>{item.email}</p>
                </div>
              </div>
              <button
                className="btn-img"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="btn-img"
                // onClick={() => getUserImage(item._id)}
                onClick={() => navigate(`/user/${item._id}`)}
              >
                Profile
              </button>
            </div>
          </div>
        ))}
      {isLoading && <span className="loading-txt">Loading.....</span>}
    </div>
  );
};

export default AllUsers;
