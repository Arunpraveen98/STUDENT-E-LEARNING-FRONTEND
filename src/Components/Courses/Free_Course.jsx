import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import "./Free_Course.css";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
//   ------------------------
const Free_Courses = () => {
  //   ------------------------
  //? React Hooks...
  const [showVideo, setShowVideo] = useState(false);
  const [Course_Content, setCourse_Content] = useState([]);
  const [Course_video, setCourse_video] = useState("");
  const [Loader, setLoader] = useState(true);
  //   ------------------------
  //? React-router-dom Hook...
  const navigate = useNavigate();
  //   ------------------------
  //? Student Object...
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
  //   ------------------------
  //? UseEffect Hook...
  useEffect(() => {
    Get_Course_Content();
  }, []);
  //   ------------------------
  //? Async Function to fetch Free Course Contents...
  async function Get_Course_Content() {
    try {
      //   ------------------------
      const Free_Course_Content = await axios.get(
        `${process.env.REACT_APP_EXPRESS_SERVER}/Free-Courses`,
        // `http://localhost:8000/Free-Courses`,
        {
          headers: {
            Authorization: Student_Data.Student_Token,
          },
        }
      );
      //   ------------------------
      setCourse_Content(Free_Course_Content.data);
      setLoader(false);
      //   ------------------------
      //   console.log(Free_Course_Content.data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }
  //   ------------------------
  //? Free Course Contents video Function...
  const Play_videos = async (Card_id) => {
    try {
      //   ------------------------
      const Get_Course_Video_Url = Course_Content.filter(
        (item) => item.id === Card_id
      );
      setCourse_video(Get_Course_Video_Url[0].Course_Video_Url);
      setShowVideo(true);
      //   ------------------------
      // console.log(Card_id, Get_Course_Video_Url[0].Course_Video_Url);
    } catch (error) {
      console.log(error);
    }
  };

  //   ------------------------
  return (
    <div className="container mt-3">
      <div className="component-title">Basic Tutorial</div>
      {showVideo ? (
        <>
          {/* ------------------------ */}
          {/* COURSES VIDEO CARD */}
          <div>
            <button
              type="button"
              className="btn btn-light m-1"
              onClick={() => setShowVideo(false)}
            >
              <ArrowBack /> Go Back
            </button>
          </div>
          {/* ------------------------ */}
          <Card style={{ width: "60vw", height: "68vh" }} className="mt-3">
            <Card.Body>
              <iframe
                width="100%"
                height="100%"
                src={Course_video}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Card.Body>
          </Card>
          {/* ------------------------ */}
        </>
      ) : (
        <>
          {Loader ? (
            <div className="loader-div">
              <div className="loader">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
                <div className="bar6"></div>
                <div className="bar7"></div>
                <div className="bar8"></div>
                <div className="bar9"></div>
                <div className="bar10"></div>
                <div className="bar11"></div>
                <div className="bar12"></div>
              </div>
            </div>
          ) : (
            //? COURSES CARD...
            <div className="row">
              <div className="col-md-12">
                <div className="card-container">
                  {Course_Content.map((item, index) => {
                    return (
                      <div className="course-content-card" key={index}>
                        {/* ------------------------ */}
                        <div>
                          <img
                            className="course-card-img"
                            src={item.Course_Image_Url}
                          />
                        </div>
                        {/* ------------------------ */}
                        <div>
                          <Card.Body>
                            <Card.Title className="course-title">
                              {item.Course_Name}
                            </Card.Title>
                            <Card.Text className="course-description">
                              {item.Course_Description}
                            </Card.Text>
                          </Card.Body>
                        </div>
                        {/* ------------------------ */}
                        <div className="course-button-div">
                          <button
                            variant="primary"
                            className="view-course-button"
                            onClick={() => {
                              Play_videos(item.id);
                            }}
                          >
                            <span>View Course</span>
                          </button>
                        </div>
                        {/* ------------------------ */}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Free_Courses;
