import { Link } from "react-router-dom";
import "./post.scss";

function Post({ info }) {
  return (
    <Link to={`/post/${info._id}`}>
      <div className="post">
        <img className="postImg" src={info.photo} alt="" />
        <div className="postInfo">
          <div className="postCats">
            <span className="postCat">{info.categories[0]}</span>
          </div>
          <span className="postTitle">{info.title}</span>
          <hr />
          <span className="postDate">
            {new Date(info.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{info.desc}</p>
      </div>
    </Link>
  );
}

export default Post;
