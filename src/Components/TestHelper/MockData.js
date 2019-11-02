export const mockUser = {
  username: "Pop123",
  password: "Password123!",
  fullname: "Bob Smith",
  email: "BSmith@gmail.com",
  image_url:
    "https://images.pexels.com/photos/1622419/pexels-photo-1622419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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

export const mockUsers = [
  {
    username: "Pop123",
    password: "Password123!",
    fullname: "Bob Smith",
    email: "BSmith@gmail.com",
    image_url:
      "https://images.pexels.com/photos/1622419/pexels-photo-1622419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    profile: "test profile"
  },
  {
    username: "testuser2",
    password: "Password123!",
    fullname: "Test User",
    email: "TUser@gmail.com",
    image_url:
      "https://images.pexels.com/photos/1622419/pexels-photo-1622419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    profile: "test profile"
  }
];

export const mockArticles = [
  {
    title: "test article one",
    content: "test content",
    article_category: "News",
    id: 1,
    date_created: "2019-10-14T21:49:20.570Z",
    author: {
      username: mockUsers[0].username
    }
  },
  {
    title: "test article two",
    content: "test content",
    article_category: "News",
    id: 2,
    date_created: "2019-10-14T21:49:20.570Z",
    author: {
      username: mockUsers[1].username
    }
  }
];

export const categories = [
  { name: "Diary" },
  { name: "Guide" },
  { name: "Advice" },
  { name: "Interview" },
  { name: "Random" },
  { name: "News" }
];
