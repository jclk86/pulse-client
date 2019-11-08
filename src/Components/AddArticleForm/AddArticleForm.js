import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Label, Textarea, Select, Button } from "../Utils/Utils";
import ArticleListContext from "../../Context/ArticleListContext";
import ArticleApiService from "../../Services/article-api-service";
import CategoryApiService from "../../Services/category-api-service";
import { renderCategories } from "../Utils/Utils";
import {
  ValidationError,
  validateCategory,
  validateTitle,
  validateContent
} from "../ValidationError/ValidationError";
import "./AddArticleForm.css";

class AddArticleForm extends Component {
  static contextType = ArticleListContext;
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      image_url: {
        value: "",
        touched: false
      },
      category: {
        value: "",
        touched: false
      }
    };
  }

  componentDidMount() {
    CategoryApiService.getAllCategories().then(this.context.setCategoriesList);
  }

  updateTitle = title => {
    this.setState({ title: { value: title, touched: true } });
  };

  updateImage_Url = image_url => {
    this.setState({ image_url: { value: image_url, touched: true } });
  };

  updateContent = content => {
    this.setState({ content: { value: content, touched: true } });
  };

  updateCategory = category => {
    this.setState({ category: { value: category, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, image_url, content, category } = this.state;
    const newArticle = {
      title: title.value,
      image_url: image_url.value
        ? image_url.value
        : "https://images.pexels.com/photos/1595/man-person-taking-photo-photographer.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      content: content.value,
      article_category: category.value
    };

    ArticleApiService.postArticle(newArticle)
      .then(this.context.addArticle(newArticle))
      .then(() => {
        this.setState({ title: { value: "", touched: false } });
        this.setState({ image_url: { value: "", touched: false } });
        this.setState({ content: { value: "", touched: false } });
        this.setState({ category: { value: "", touched: false } });
        this.props.history.push(`/articles`);
      });
  };

  isFormValid = () => {
    const { title, content, category } = this.state;
    return title.value && category.value && content.value;
  };

  render() {
    const { title, content, category } = this.state;
    const { categoriesList, lightsOff } = this.context;
    const isValid = this.isFormValid();
    return (
      <Form
        className={`AddArticleForm + ${
          lightsOff ? "AddArticleForm_lights_on" : "AddArticleForm_lights_off"
        }`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="container_AddArticleForm_header">
          <h2 className="title_add_article_form">Create a post</h2>
        </div>
        <div className="container_AddArticleForm_title">
          <Label
            htmlFor="AddArticleForm_article_title"
            className="label_add_article_form"
          >
            Title
          </Label>
          <input
            type="text"
            placeholder="Top 5 Destinations for This Summer"
            name="title"
            className="AddArticleForm_article_title"
            onChange={e => this.updateTitle(e.target.value)}
          ></input>
          {title.touched && (
            <ValidationError message={validateTitle(title.value)} />
          )}
        </div>
        <div className="container_AddArticleForm_image_url">
          <Label
            htmlFor="AddArticleForm_article_image_url"
            className="label_add_article_form"
          >
            Image Url
          </Label>
          <input
            type="text"
            placeholder="image url"
            name="image_url"
            className="AddArticleForm_article_image_url"
            onChange={e => this.updateImage_Url(e.target.value)}
          ></input>
        </div>
        <Label
          htmlFor="AddArticleForm_article_content"
          className="label_add_article_form"
        >
          Share your thoughts
        </Label>
        <div className="container_AddArticleForm_textarea">
          <Textarea
            placeholder="For the past two years I've traveled to..."
            name="content"
            className="AddArticleForm_article_content"
            onChange={e => this.updateContent(e.target.value)}
          ></Textarea>
          {content.touched && (
            <ValidationError message={validateContent(content.value)} />
          )}
        </div>
        <div className="container_AddArticleForm_select">
          <Select
            className="AddArticleForm_select"
            name="category"
            onChange={e => this.updateCategory(e.target.value)}
          >
            <option key="no-val" value="">
              Select a category
            </option>
            {renderCategories(categoriesList)}
          </Select>
          {category.touched && (
            <ValidationError message={validateCategory(category.value)} />
          )}
        </div>
        <div className="container_AddArticleForm_btn">
          <Button
            type="button"
            role="button"
            onClick={() => this.props.history.push("/articles")}
            className="AddArticleForm_cancel_btn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            role="button"
            disabled={!isValid}
            className="AddArticleForm_post_btn"
          >
            Post
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(AddArticleForm);
