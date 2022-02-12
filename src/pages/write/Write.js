import "./write.scss";
import axios from "axios";
import { Context } from "../../store/Context";
import { useContext, useState, useRef, useEffect } from "react";
import postDefault from "../../assets/img/postDefault.jpeg";
function Write() {
  const [img, setimg] = useState();
  const urlImg = img ? URL.createObjectURL(img) : postDefault;
  const titleRef = useRef();
  const descRef = useRef();
  const currentUser = useContext(Context);
  useEffect(() => {
    // clean up
    return () => {
      URL.revokeObjectURL(img);
    };
  }, [img]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postPhoto = new FormData();
    const filename = (Date.now().toString() + img.name).replace(/\s+/g, "");
    postPhoto.append("filename", filename);
    postPhoto.append("postPhotoFile", img);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        postPhoto
      );
      if (res.data === "have been uploaded") {
        try {
          const post = {
            title: titleRef.current.value || "default",
            desc: descRef.current.value || "default",
            photo: `http://localhost:5000/static/postImg/${filename}`,
            username: currentUser.username,
          };
          const res = await axios.post(
            "http://localhost:5000/api/post/create",
            post
          );

          window.location.replace(`/post/${res.data._id}`);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const changeHandle = (e) => {
    if (e.target.files[0]) setimg(e.target.files[0]);
  };
  return (
    <div className="write">
      <img className="writeImg" src={urlImg} alt="" />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            name="postPhotoFile"
            onChange={changeHandle}
            style={{ display: "none" }}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            ref={descRef}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
