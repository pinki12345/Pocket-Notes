import "./App.css";
import Displaycontent from "./component/Displaycontent";
import Sidebar from "./component/Sidebar";
import {useSelector,useDispatch} from "react-redux";
import {useEffect } from "react";
import { setIsMobileView } from "./actions/index";

function App() {
  const dispatch=useDispatch();
  const isMobileView = useSelector((state) => state.isMobileView)

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobileView(window.innerWidth <= 768));
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (

       <div className="App" style={{
        display: "flex",
        flexDirection: isMobileView ? "column" : "row",
        // width: "100vw",
        // height: "100vh",
      }}>
        <Sidebar />
        <Displaycontent />
      </div>
      
  );
}

export default App;
