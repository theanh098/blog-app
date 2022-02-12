import "./setting.scss";
import { Context } from "../../store/Context";
import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
function Setting() {
  const currentUser = useContext(Context);
  const [img, setimg] = useState();

  const urlImg = img ? URL.createObjectURL(img) : currentUser.photo;
  const nameRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    // clean up
    return () => {
      URL.revokeObjectURL(img);
    };
  }, [img]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: currentUser.username,
      newData: {
        username: nameRef.current.value,
        password: passRef.current.value,
      },
    };

    if (img) {
      const photo = new FormData();
      const filename = (Date.now().toString() + img.name).replace(/\s+/g, "");
      photo.append("filename", filename);
      photo.append("profilePhoto", img);
      data.newData.profilePic = `http://localhost:5000/static/profileImg/${filename}`;
      data.newData.oldPhoto = currentUser.photo.substring(
        currentUser.photo.lastIndexOf("/") + 1
      );
      try {
        await axios.post("http://localhost:5000/api/profileImg/upload", photo);
        await axios.post("http://localhost:5000/api/auth/update", data);
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            username: nameRef.current.value,
            photo: `http://localhost:5000/static/profileImg/${filename}`,
          })
        );
        alert("your change have been uploaded");
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      await axios.post("http://localhost:5000/api/auth/update", data);
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          username: nameRef.current.value,
          photo: currentUser.photo,
        })
      );
      alert("your change have been uploaded");
      window.location.replace("/");
    }
  };
  const handleChange = (e) => {
    if (e.target.files[0]) setimg(e.target.files[0]);
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Edit your account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={urlImg} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={handleChange}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="your new name"
            name="name"
            ref={nameRef}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="new password"
            name="password"
            ref={passRef}
          />

          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
