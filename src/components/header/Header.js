import "./header.scss";
import headerImg from "../../assets/img/headerImg.jpeg";
function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <span className="headerTitleS">React practice</span>
        <span className="headerTitleL">Blog</span>
      </div>
      <img src={headerImg} alt="" className="headerImg" />
    </div>
  );
}

export default Header;
