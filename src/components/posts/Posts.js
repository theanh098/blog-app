import "./posts.scss";
import Post from "../post/Post";
function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((ele) => (
        <Post info={ele} />
      ))}
    </div>
  );
}

export default Posts;
