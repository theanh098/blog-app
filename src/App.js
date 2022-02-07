import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Setting from "./pages/setting/Setting";
import Write from "./pages/write/Write";
import Myposts from "./pages/myposts/Myposts";
import { Context } from "./store/Context";
import { useContext } from "react";
function App() {
  const currentUser = useContext(Context);

  return (
    <BrowserRouter>
      <div className="app">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/write" element={currentUser ? <Write /> : <Login />} />
          <Route path="/mypost" element={<Myposts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
