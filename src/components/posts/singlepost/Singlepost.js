import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../store/Context";
import { useLocation } from "react-router-dom";
import "./singlepost.scss";

function Singlepost() {
  const location = useLocation();
  const [post, setPost] = useState({});
  const currentUser = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/post/${location.pathname.slice(6)}`
      );
      setPost(res.data);
    };
    fetchData();
  }, [location]);

  const deleteHandle = async (e) => {
    const id = location.pathname.slice(6);
    try {
      const res = await axios.post("http://localhost:5000/api/post/delete", {
        author: currentUser.username,
        id,
      });
      if (res.data === "not your") alert(" u can only delete your post");
      else window.location.replace(`/mypost?user=${currentUser.username}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={post.photo} alt="" />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i
              className="singlePostIcon far fa-trash-alt"
              onClick={deleteHandle}
            ></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">{post.username}</b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  );
}

export default Singlepost;
