import "./myposts.scss";
import { useEffect } from "react";
import axios from "axios";

import Posts from "../../components/posts/Posts";
import { useContext, useState } from "react";
import { Context } from "../../store/Context";
function Myposts() {
  const currentUser = useContext(Context);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/posts?user=${currentUser.username}`
      );
      setPosts(res.data);
    };
    fetchData();
  }, [currentUser]);
  return (
    <div className="myPosts">
      <Posts posts={posts} />
    </div>
  );
}

export default Myposts;
