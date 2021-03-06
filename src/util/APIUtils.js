import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from "../constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getAllPolls(page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
    method: "GET",
  });
}

export default function getAllCourses(username) {
  return request({
    url: API_BASE_URL + "/courses/course?username=" + username,
    method: "POST",
  });
}
export function getAllCategoriesByCourseId(courseId) {
  return request({
    url: API_BASE_URL + "/courses/category?courseId=" + courseId,
    method: "POST",
  });
}
export function getVideoStream() {
  return request({
    url: API_BASE_URL + "/courses/video",
    method: "POST",
  });
}
export function getTopicsByCategoryId(categoryId) {
  return request({
    url: API_BASE_URL + "/courses/topics?categoryId=" + categoryId,
    method: "POST",
  });
}
export function getTopicById(topicId) {
  return request({
    url: API_BASE_URL + "/courses/topic?topicId=" + topicId,
    method: "POST",
  });
}
export function getTopicByCategoryId(categoryId) {
  return request({
    url: API_BASE_URL + "/courses/topic?categoryId=" + categoryId,
    method: "POST",
  });
}

export function createPoll(pollData) {
  return request({
    url: API_BASE_URL + "/polls",
    method: "POST",
    body: JSON.stringify(pollData),
  });
}

export function castVote(voteData) {
  return request({
    url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
    method: "POST",
    body: JSON.stringify(voteData),
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: "GET",
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET",
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function getUserProfile(username) {
  return request({
    url: API_BASE_URL + "/users/" + username,
    method: "GET",
  });
}

export function getUserCreatedPolls(username, page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url:
      API_BASE_URL +
      "/users/" +
      username +
      "/polls?page=" +
      page +
      "&size=" +
      size,
    method: "GET",
  });
}

export function getUserVotedPolls(username, page, size) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url:
      API_BASE_URL +
      "/users/" +
      username +
      "/votes?page=" +
      page +
      "&size=" +
      size,
    method: "GET",
  });
}
