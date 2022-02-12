import "./posts.scss";
import Post from "../post/Post";
function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((ele, index) => (
        <Post info={ele} key={index} />
      ))}
    </div>
  );
}

export default Posts;
