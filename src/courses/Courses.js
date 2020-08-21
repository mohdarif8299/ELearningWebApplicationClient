import React, { useState, useEffect } from "react";
import getAllCourses, { getCurrentUser } from "../util/APIUtils";
import { Link } from "react-router-dom";
import { notification } from "antd";

export default function Courses(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [courseCategory, setCourseCategory] = useState([]);
  const [title, setTitle] = useState(String);
  const titleStyle = {
    textAlign: "center",
    color: "#000000",
    display: "block",
    textDecoration: "none",
  };
  const getCategories = (username) => {
    getAllCourses(username).then((data) => {
      console.log(data[0]);
      setCourseCategory(data);
    });
  };
  const loadCurrentUser = () => {
    getCurrentUser().then((data) => {
      getCategories(data.username);
      setCurrentUser(data);
      setTitle("Trending Courses");
    });
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadCurrentUser();
      isMounted = false;
    }
    return () => (isMounted = false);
  }, []);
  return (
    <div className="container-fluid p-0 m-0">
      <h4 className="m-3 ml-2">{title}</h4>
      <div className="row m-3 p-0">
        {courseCategory.map((course, index) => {
          return (
            <div key={index} className="col-md-4 col-sm-12 col-xs-12 card p-2">
              <Link
                to={{
                  pathname: "/courses",
                  state: {
                    courseId: course.id,
                    courseName: course.courseName,
                  },
                }}
                style={titleStyle}
              >
                <div>
                  <img
                    className="img-responsive"
                    height="200px"
                    width="100%"
                    src={course.courseImage}
                  />
                </div>
                <p className="mt-3 mb-0">{course.courseName}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
