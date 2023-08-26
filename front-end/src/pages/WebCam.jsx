import { Link, useNavigate } from "react-router-dom"; //eslint-disable-line
import React from "react";
import Webcam from "react-webcam";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useCallback, useRef, useState } from "react";
import Swal from "sweetalert2";
function WebCam() {
  const { id: user_id, token } = jwt_decode(localStorage.getItem("token"));
  const [imgSrc, setImgSrc] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  // let imageUrl = "";
  // capturing function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };
  const imgRef = useRef();
  const getImageSource = () => {
    // imageUrl = imgRef.current.src;
    setImageUrl(imgRef.current.src);
    /* x */
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };

  const imageSet = async () => {
    await capture();
    await getImageSource();
  };
  //form data

  // const [selectedOption, setSelectedOption] = useState("");
  // const handleSelectChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };
  const sendData = async (body) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8080/api/v1/pictures/${user_id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Uploaded Successfully",
          icon: "Success",
          confirmButtonText: "Ok",
        });
        retake();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imageUrl);
    if (!imageUrl) alert("please capture image");
    else {
      const body = {
        picture: imageUrl,
        tags: tag,
        comments: comment,
      };
      sendData(body);
      setComment("");
      setTag("");
      setMessage("");
    }
  };
  return (
    <>
      <div className="web-form-container">
        <div className="web-container">
          {imgSrc ? (
            <img src={imgSrc} alt="webcam" className="web-image" ref={imgRef} />
          ) : (
            <div className="webcam-container">
              <Webcam ref={webcamRef} className="web-cam" />
            </div>
          )}
          <div className="btn-container">
            {imgSrc ? (
              <>
                <button onClick={retake} className="btn-image">
                  Retake photo
                </button>
              </>
            ) : (
              <button onClick={imageSet} className="btn-image">
                Capture photo
              </button>
            )}
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} method="post">
            <div className="form-group">
              <label htmlFor="formdata">Choose any One:</label>
              <select
                name="formdata"
                id="formdata"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
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
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default WebCam;
