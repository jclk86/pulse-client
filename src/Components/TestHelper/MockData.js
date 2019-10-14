import { DateFormatter } from "../TestHelper/MockData";

export const mockUser = {
  username: "Pop123",
  password: "Password123!",
  fullname: "Bob Smith",
  email: "BSmith@gmail.com"
};

export const mockArticle = {
  title: "test article",
  content: "test content",
  article_tag: "News",
  article_id: 1,
  date_created: new Date(),
  author: {
    username: "Pop123"
  }
};
