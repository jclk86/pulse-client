import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ArticleListContext from "../../Context/ArticleListContext";
import CommentApiService from "../../Services/comment-api-service";
import { sortByFrequencyAndRemoveDuplicates } from "../Utils/Utils";
import ChatBox from "../../images/chat.png";
import "./TopUsersList.css";

class TopUsersList extends Component {
  static contextType = ArticleListContext;

  componentDidMount() {
    CommentApiService.getAllComments().then(this.context.setComments);
  }

  getImagesForUsers = (comments, username) => {
    return comments.find(comment => {
      return comment.user.username === username ? comment.user.image_url : null;
    });
  };

  render() {
    const { comments, lightsOff } = this.context;
    const usersArray = comments.map(comment => comment.user.username);
    const topUsersList = sortByFrequencyAndRemoveDuplicates(usersArray);
    const topTenUsers = topUsersList.slice(0, 11);
    return (
      <ul className="top_users_list">
        {topTenUsers.map((user, i) => {
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
              <div className="container_top_user_chatbox">
                <img
                  src={ChatBox}
                  alt="top user icon"
                  className="top_user_chatbox"
                ></img>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TopUsersList;
