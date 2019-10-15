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
  id: 1,
  date_created: "2019-10-14T21:49:20.570Z",
  author: {
    username: mockUser.username
  }
};

export const mockComment = {
  id: 1,
  content: "test comment content",
  date_created: "2019-10-14T21:49:20.570Z",
  article_id: 1,
  user: {
    username: mockArticle.author.username
  }
};
