import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { useSelector } from "react-redux";
import useAuth from "../../Shared/useAuth";
import MyBreadcrumb from "./components/MyBreadcrumb";
const Home = React.lazy(() => import("./pages/Home"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
let timer;
function App() {
  const token = useSelector((state) => state.student.token);
  const auth = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      timer = setTimeout(() => {
        console.log("Going to login");
        history.push("/Login");
      }, 100);
      return () => {
        clearInterval(timer);
      };
    }
  }, [token]);

  const [toggle, setToggle] = useState(false);
  const sidebar = JSON.parse(localStorage.getItem("Sidebare"))
  useEffect(()=>{
if(sidebar) {setToggle(sidebar["value"])}
  },[])
  return (
    <div className="Student__area">
      <Header toggle={toggle} setToggle={setToggle} />
      <Sidebar logout={auth.logout} toggle={toggle} />
      <div className={toggle ? " full__content content" : "content"}>
        <MyBreadcrumb />
        <Switch>
          <Route path="/Student" component={Home} exact />
          <Route path="/Student/Notifications/:id?" component={Notifications} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
