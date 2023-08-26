import { useState } from "react";
import "../App.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
export default function Modal({
  modal,
  setModal,
  activeImage,
  getAllPictures,
}) {
  const { token } = jwt_decode(localStorage.getItem("token"));
  const [option, setOption] = useState("");
  console.log(activeImage);
  const toggleModal = () => {
    setModal(!modal);
  };

  const sendData = async (body) => {
    try {
      console.log(activeImage._id);
      const res = await axios.put(
        `http://127.0.0.1:8080/api/v1/pictures/${activeImage._id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      alert(error.response.data.message);
    }
    getAllPictures();
    toggleModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      tags: e.target.tags.value,
      comments: e.target.comments.value,
    };
    console.log("body", body);
    sendData(body);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  console.log("Modal");
  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="job-brief">
              <div className="form-container">
                <form onSubmit={handleSubmit} method="post">
                  <div className="form-group">
                    <label htmlFor="formdata">Choose any One:</label>
                    <select
                      name="tags"
                      id="formdata"
                      value={option.tag}
                      defaultValue={activeImage.tags}
                      onChange={(e) => "heekko" /*  setTag(e.target.value) */}
                      required
                    >
                      <option value="">Select any Feeling</option>
                      <option value="happy">Happy</option>
                      <option value="sad">Sad</option>
                      <option value="angry">Angry</option>
                      <option value="excited">Excited</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="comments">Comments:</label>
                    <textarea
                      name="comments"
                      id="comments"
                      rows="4"
                      cols="50"
                      defaultValue={activeImage.comments}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "black", marginTop: "10px" }}
                  >
                    {" "}
                    submit{" "}
                  </button>
                </form>
              </div>
            </div>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
