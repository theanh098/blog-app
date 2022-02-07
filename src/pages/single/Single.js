import Singlepost from "../../components/posts/singlepost/Singlepost";
import Sidebar from "../../components/sidebar/Sidebar";
import "./single.scss";
function Single() {
  return (
    <div className="single">
      <Singlepost />
      <Sidebar />
    </div>
  );
}

export default Single;
