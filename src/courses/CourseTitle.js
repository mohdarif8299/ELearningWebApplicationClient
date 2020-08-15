import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { getCourseById, getCourseTitlesByCategoryId } from "../util/APIUtils";

export default function CourseTitle(props) {
  const { categoryId, categoryName } = props.location.state;
  const [coursesTitles, setCourseTitles] = useState([]);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(String);
  const [src, setSrc] = useState(String);

  const currentCourse = (courseName, url) => {
    if (courseName === url) {
      return {
        border: "none",
        color: "#007bff",
        backgroundColor: "#ffffff",
        outline: "none",
        fontWeight: "700",
      };
    } else
      return {
        border: "none",
        color: "#000000",
        outline: "none",
        fontWeight: "600",
        backgroundColor: "#ffffff",
      };
  };
  const titleStyle = {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #dadada",
  };
  const getCourses = () => {
    getCourseTitlesByCategoryId(categoryId).then((data) => {
      if (data.length === 0) setError(true);
      else {
        console.log(data[0]);
        setCourseTitles(data);
        getCoursesById(data[0].courseId);
      }
    });
  };

  const getCoursesById = (id) => {
    getCourseById(id).then((data) => {
      console.log(data);
      setUrl(data.courseName);
      setSrc(data.videoUrl);
    });
  };

  useEffect(() => {
    getCourses();
  }, []);
  const onCourseTitleClick = (data) => {
    getCoursesById(data.courseId);
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0">
        <div
          className="col-md-4 col-sm-12 col-xs-12 m-0 p-0"
          style={{ overflowY: "scroll", maxHeight: "620px" }}
        >
          <h4 className="mt-3 ml-3 text-align-center">{categoryName}</h4>
          {coursesTitles.map((course, index) => {
            return (
              <div key={index} className="text-black p-3" style={titleStyle}>
                <button
                  style={currentCourse(course.courseName, url)}
                  onClick={() => onCourseTitleClick(course)}
                >
                  {course.courseName}
                </button>
              </div>
            );
          })}
        </div>
        <div
          className="card col-md-8 col-sm-12 col-xs-12 p-3"
          style={{
            overflowY: "scroll",
            height: "620px",
          }}
        >
          <h4 className="mt-3">{url}</h4>
          <ReactPlayer
            className="m-0 p-0"
            width="100%"
            height="100%"
            url={src}
          />
        </div>
      </div>
    </div>
  );
}
