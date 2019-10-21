export const mockUser = {
  username: "Pop123",
  password: "Password123!",
  fullname: "Bob Smith",
  email: "BSmith@gmail.com",
  image_url:
    "https://images.pexels.com/photos/1622419/pexels-photo-1622419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  location: "TEST, LOCATION",
  profile: "test profile"
};

export const mockArticle = {
  title: "test article",
  content: "test content",
  article_category: "News",
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
    id: 1,
    username: mockArticle.author.username
  }
};
