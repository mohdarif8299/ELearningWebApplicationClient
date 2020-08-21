import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./style.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "font-awesome/css/font-awesome.min.css";
import {
  getAllCategoriesByCourseId,
  getTopicById,
  getVideoStream,
} from "../util/APIUtils";

export default function CourseTitle(props) {
  const { courseId, courseName } = props.location.state;
  const [categories, setCategories] = useState([]);
  const [initalIndex, setInitialIndex] = useState(0);
  const [finalIndex, setFinalIndex] = useState(0);
  let [index, setIndex] = useState(1);
  const [url, setUrl] = useState(String);
  const [src, setSrc] = useState(String);
  const currentCourse = (currentTopic, showingTopic) => {
    if (currentTopic === showingTopic) {
      return {
        textAlign: "start",
        border: "none",
        outline: "none",
        display: "block",
        color: "#007bff",
        backgroundColor: "#ffffff",
        borderBottom: "#1px solid #dadada",
      };
    } else {
      return {
        textAlign: "start",
        border: "none",
        outline: "none",
        display: "block",
        color: "#666666",
        backgroundColor: "#ffffff",
        borderBottom: "#1px solid #dadada",
      };
    }
  };
  const nextBtn = {
    border: "none",
    background: "none",
    display: "inline-block",
    outline: "none",
  };
  const titleStyle = {
    textAlign: "start",
    backgroundColor: "#f7f8fa",
    border: "none",
    outline: "none",
  };
  let count = 0;
  const getCourses = () => {
    getAllCategoriesByCourseId(courseId).then((data) => {
      data.forEach((i) => {
        count = count + i.topic.length;
        console.log(count);
      });
      setFinalIndex(count);
      setCategories(data);
      setIndex(data[0].topic[0].id);
      setInitialIndex(data[0].topic[0].id);
      //  videoStream();
      // initial topic
      getTopic(courseId, data[0].topic[0].id);
    });
  };
  useEffect(() => {
    getCourses();
  }, []);
  const videoStream = () => {
    getVideoStream().then((data) => {
      setSrc(data);
    });
  };
  const getTopic = (topicCourseId, topicId) => {
    if (topicCourseId !== courseId) {
      return "notfound";
    } else {
      getTopicById(topicId).then((data) => {
        if (data === null) {
          return "notfound";
        } else {
          if (parseInt(data.courseId) !== topicCourseId) {
            return "notfound";
          } else {
            setUrl(data.topicName);
            setSrc(data.topicUrl);
            setIndex(data.id);
          }
        }
      });
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0">
        <div
          className="col-md-4 col-sm-12 col-xs-12 m-0 p-0"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "620px",
          }}
        >
          <h4 className="mt-3 ml-3 text-align-center">{courseName}</h4>
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    backgroundColor="#f7f8fa"
                  >
                    <button style={titleStyle}>{category.categoryName}</button>
                  </AccordionSummary>
                  {category.topic.map((topic) => {
                    return (
                      <AccordionDetails key={topic.id}>
                        <button
                          className="pl-5 pt-2 pb-2 pr-2"
                          key={topic.id}
                          onClick={() =>
                            getTopic(parseInt(topic.courseId), topic.id)
                          }
                          style={currentCourse(topic.topicName, url)}
                        >
                          {topic.topicName}
                        </button>
                      </AccordionDetails>
                    );
                  })}
                </Accordion>
              </div>
            );
          })}
        </div>
        <div
          className="card col-md-8 col-sm-12 col-xs-12 p-3"
          style={{
            overflowY: "scroll",
            height: "550px !important",
          }}
        >
          <h4 className="mt-3">{url}</h4>
          <ReactPlayer
            className="m-0 p-0"
            width="100%"
            outline="none"
            height="100%"
            url={src}
            config={{
              file: {
                attributes: {
                  onContextMenu: (e) => e.preventDefault(),
                  controlsList: "nodownload",
                },
              },
            }}
            controls={true}
          />
          <div className="row">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div className="col-md-4"></div>
            <div className="col-md-4 col-sm-12 dcol-xs-12 mt-3">
              <div className="float-right btn btn-primary btn-sm">
                <button
                  style={nextBtn}
                  onClick={() => getTopic(courseId, index + 1)}
                >
                  Next
                </button>
                <i className="fa fa-arrow-right" />
              </div>
              <div className="float-left btn btn-primary btn-sm">
                <i className="fa fa-arrow-left" />
                <button
                  style={nextBtn}
                  onClick={() => getTopic(courseId, index - 1)}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
