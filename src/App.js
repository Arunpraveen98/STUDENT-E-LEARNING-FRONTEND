import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import User_Register from "./Components/Registration/User_Register";
import User_Login from "./Components/Login/User_Login";
import StudentClass from "./Pages/StudentClass";
import StudentTask from "./Pages/StudentTask";
import StudentDash from "./Pages/StudentDash";
import StudentCourse from "./Pages/StudentCourse";
import Student_Queries from "./Pages/Student_Queries";
import Home_Page from "./Pages/Home_Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// -------------------
function App() {
  // -------------------
  const [theme, colorMode] = useMode();
  // -------------------
  return (
    <>
      {/* --------------------- */}
      <ToastContainer
        position="top-center"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* --------------------- */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* --------------------- */}
          {/* ROUTES PATH */}
          <Routes>
            <Route path="/" element={<User_Login />} />
            <Route path="/Student-Registration" element={<User_Register />} />
            <Route path="/HomePage" element={<Home_Page />} />
            <Route path="/class" element={<StudentClass />} />
            <Route path="/Task-Submission" element={<StudentTask />} />
            <Route path="/Tasks-Overview" element={<StudentDash />} />
            <Route path="/Free-Courses" element={<StudentCourse />} />
            <Route path="/Queries" element={<Student_Queries />} />
          </Routes>
          {/* --------------------- */}
        </ThemeProvider>
      </ColorModeContext.Provider>
      {/* --------------------- */}
    </>
  );
}

export default App;
