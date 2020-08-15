import React, { useState, useEffect } from "react";
import { getAllCategories } from "../util/APIUtils";
import { Link } from "react-router-dom";
import { notification } from "antd";

export default function Courses(props) {
  const [courseCategory, setCourseCategory] = useState([]);
  const titleStyle = {
    textAlign: "center",
    color: "#000000",
    display: "block",
    textDecoration: "none",
  };
  const getCategories = () => {
    getAllCategories().then((data) => {
      console.log(data[0]);
      setCourseCategory(data);
    });
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getCategories();
      isMounted = false;
    }
    return () => (isMounted = false);
  }, []);
  return (
    <div className="container-fluid p-0 m-0">
      <h3 className="mt-3 ml-5">Trending Courses</h3>
      <div className="row m-3 p-0 justify-content-center">
        {courseCategory.map((courseCategory, index) => {
          return (
            <div key={index} className="col-md-4 col-sm-12 col-xs-12 card p-2">
              <Link
                to={{
                  pathname: "/courses",
                  state: {
                    categoryId: courseCategory.id,
                    categoryName: courseCategory.categoryName,
                  },
                }}
                style={titleStyle}
              >
                <div>
                  <img
                    className="img-responsive"
                    height="200px"
                    width="100%"
                    src={courseCategory.categoryImage}
                  />
                </div>
                <p className="mt-3 mb-0">{courseCategory.categoryName}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
