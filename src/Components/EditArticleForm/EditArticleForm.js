import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import { Form, Label, Input, Textarea, Select, Button } from "../Utils/Utils";
import ArticleApiService from "../../Services/article-api-service";
import CategoryApiService from "../../Services/category-api-service";
import TokenService from "../../Services/token-service";
import PropTypes from "prop-types";
import { renderCategories } from "../Utils/Utils";
import {
  ValidationError,
  validateCategory,
  validateTitle,
  validateContent
} from "../ValidationError/ValidationError";
import "./EditArticleForm.css";

class EditArticleForm extends Component {
  static contextType = ArticleContext;
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
      },
      categoriesList: []
    };
  }

  // Populates the edit form with current content
  componentDidMount() {
    this.context.clearError();
    const { article_id } = this.props.match.params;
    ArticleApiService.getArticleById(article_id)
      .then(data => {
        return data;
      })
      .then(article => {
        this.setState({
          title: { value: article.title, touched: true },
          image_url: { value: article.image_url, touched: true },
          content: { value: article.content, touched: true },
          category: { value: article.article_category, touched: true }
        });
      })
      .catch(this.context.setError);
    CategoryApiService.getAllCategories().then(categories => {
      this.setState({ categoriesList: categories });
    });
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

  handleDelete = article_id => {
    ArticleApiService.deleteArticle(article_id).then(() => {
      this.props.history.push(`/articles`);
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { article_id } = this.props.match.params;
    const { title, image_url, content, category } = this.state;
    const token = TokenService.readJwtToken();

    const updatedArticle = {
      author_id: token.user_id,
      title: title.value,
      // Default image provided if no image.
      image_url: image_url.value
        ? image_url.value
        : "https://images.pexels.com/photos/1595/man-person-taking-photo-photographer.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      content: content.value,
      article_category: category.value
    };

    ArticleApiService.updateArticle(updatedArticle, article_id).then(() => {
      this.props.history.push(`/articles/${article_id}`);
    });
  };

  // Disables submit button if form is not filled out.
  isFormValid = () => {
    const { title, content, category } = this.state;
    return title.value && category.value && content.value;
  };

  render() {
    const isValid = this.isFormValid();
    const { article_id } = this.props.match.params;
    const { lightsOff } = this.props;
    const { error } = this.context;
    const { title, image_url, content, category, categoriesList } = this.state;
    return (
      <div className="container_EditArticleForm">
        {error ? (
          <p className="error_message_no_article">{error.error}</p>
        ) : (
          <Form
            className={`EditArticleForm + ${
              lightsOff
                ? "EditArticleForm_lights_on"
                : "EditArticleForm_lights_off"
            }`}
            onSubmit={event => this.handleSubmit(event)}
          >
            <div className="container_EditArticleForm_header">
              <h2>Edit Post</h2>
            </div>
            <div className="container_EditArticleForm_title">
              <Label
                htmlFor="EditArticleForm_article_title"
                className="label_edit_article_form"
              >
                Title
              </Label>
              <Input
                value={title.value}
                placeholder="Top 5 Destinations for This Summer"
                name="title"
                className="EditArticleForm_article_title"
                onChange={e => this.updateTitle(e.target.value)}
              ></Input>
              {title.touched && (
                <ValidationError message={validateTitle(title.value)} />
              )}
            </div>
            <div className="container_EditArticleForm_image_url">
              <Label
                htmlFor="EditArticleForm_article_image_url"
                className="label_edit_article_form"
              >
                Image Url
              </Label>
              <Input
                value={image_url.value}
                type="text"
                placeholder="image url"
                name="image_url"
                className="EditArticleForm_article_image_url"
                onChange={e => this.updateImage_Url(e.target.value)}
              ></Input>
            </div>
            <Label
              htmlFor="EditArticleForm_article_content"
              className="label_edit_article_form"
            >
              Content
            </Label>
            <div className="container_EditArticleForm_textarea">
              <Textarea
                value={content.value}
                placeholder="For the past two years I've traveled to..."
                name="content"
                className="EditArticleForm_article_content"
                onChange={e => this.updateContent(e.target.value)}
              ></Textarea>
              {content.touched && (
                <ValidationError message={validateContent(content.value)} />
              )}
            </div>
            <div className="container_EditArticleForm_select">
              <Select
                className="EditArticleForm_select"
                role="menu"
                value={category.value}
                name="category"
                onChange={e => this.updateCategory(e.target.value)}
              >
                {renderCategories(categoriesList)}
              </Select>
              {category.touched && (
                <ValidationError message={validateCategory(category.value)} />
              )}
            </div>
            <div className="container_EditArticleForm_btn">
              <Button
                role="button"
                type="submit"
                disabled={!isValid}
                className="EditArticleForm_edit_btn"
              >
                Edit
              </Button>
              <Button
                role="button"
                type="button"
                onClick={() => this.handleDelete(article_id)}
                className="EditArticleForm_delete_btn"
              >
                Delete
              </Button>
              <Button
                role="button"
                type="button"
                onClick={() =>
                  this.props.history.push(`/articles/${article_id}`)
                }
                className="EditArticleForm_cancel_btn"
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </div>
    );
  }
}

EditArticleForm.propTypes = {
  article_id: PropTypes.string
};

export default withRouter(EditArticleForm);
