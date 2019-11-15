import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ArticleListContext from "../../Context/ArticleListContext";
import CommentApiService from "../../Services/comment-api-service";
import { sortByFrequencyAndRemoveDuplicates } from "../Utils/Utils";
import ChatBox from "../../images/chat.png";
import "./TopUsersList.css";

class TopUsersList extends Component {
  static contextType = ArticleListContext;
  state = {
    browserWidth: ""
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    CommentApiService.getAllComments().then(this.context.setComments);
  }

  componentWillUnmount() {
    window.addEventListener("resize", null);
  }

  getImagesForUsers = (comments, username) => {
    return comments.find(comment => {
      return comment.user.username === username ? comment.user.image_url : null;
    });
  };

  handleResize = (browserWidth, event) => {
    this.setState({ browserWidth: window.innerWidth });
  };

  render() {
    const { comments, lightsOff } = this.context;
    const browserMaxWidth = this.state.browserWidth;
    // Top users list is based on how active they are commenting. Below totals
    // user comments for top 10 users. Duplicates need to be removed because
    // a user comments more than once and therefore in the array more than once. This counts up
    // the frequency the names appear in array and places the total into an object to later be
    // iterated through.
    const usersArray = comments.map(comment => comment.user.username);
    const topUsersList = sortByFrequencyAndRemoveDuplicates(usersArray);
    const topUsers =
      browserMaxWidth <= 768
        ? topUsersList.slice(0, 3)
        : topUsersList.slice(0, 11);
    return (
      <ul className="top_users_list">
        {topUsers.map((user, i) => {
          const imageLinks = this.getImagesForUsers(comments, user);
          const userImage = imageLinks ? imageLinks.user.image_url : "";
          return (
            <li
              key={i}
              className={`top_users_list_item + ${
                lightsOff ? "" : "top_users_list_item_lights_off"
              }`}
            >
              <div className="container_top_user_image">
                <img
                  src={userImage}
                  alt="top user icon"
                  className="top_user_image"
                ></img>
              </div>
              <div className="container_top_user_chatbox hide_icons">
                <img
                  src={ChatBox}
                  alt="top user icon"
                  className="top_user_chatbox"
                ></img>
              </div>
              <div className="container_top_user_username">
                {" "}
                <NavLink
                  to={`/profile/${user}`}
                  key={i}
                  className={`top_users_link + ${
                    lightsOff ? "" : "top_users_link_lights_off"
                  }`}
                >
                  {user}
                </NavLink>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TopUsersList;
