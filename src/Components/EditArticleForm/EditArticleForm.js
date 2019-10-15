import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ArticleContext from "../../Context/ArticleContext";
import {
  Form,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button
} from "../Utils/Utils";
import ArticleApiService from "../../Services/article-api-service";
import TokenService from "../../Services/token-service";

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
      tag: {
        value: "",
        touched: false
      }
    };
  }

  componentDidMount() {
    const { article_id } = this.props.match.params;
    ArticleApiService.getArticleById(article_id)
      .then(data => {
        return data;
      })
      .then(article => {
        this.setState({
          title: { value: article.title, touched: true },
          content: { value: article.content, touched: true },
          tag: { value: article.article_tag, touched: true }
        });
      });
  }

  updateTitle = title => {
    this.setState({ title: { value: title, touched: true } });
  };

  updateContent = content => {
    this.setState({ content: { value: content, touched: true } });
  };

  updateTag = tag => {
    this.setState({ tag: { value: tag, touched: true } });
  };

  handleDelete = article_id => {
    ArticleApiService.deleteArticle(article_id).then(() => {
      this.props.history.push(`/articles`);
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { article_id } = this.props.match.params;
    const { title, content, tag } = this.state;
    const token = TokenService.readJwtToken();

    const updatedArticle = {
      author_id: token.user_id,
      title: title.value,
      content: content.value,
      article_tag: tag.value
    };

    ArticleApiService.updateArticle(updatedArticle, article_id).then(() => {
      this.props.history.push(`/articles/${article_id}`);
    });
  };

  renderCategories = () => {
    const tags = ["News", "Interview", "Guide", "Diary", "Random", "Advice"];
    return tags.map(tag => (
      <option value={tag} key={tag}>
        {tag}
      </option>
    ));
  };

  render() {
    const { article_id } = this.props.match.params;
    const { title, content, tag } = this.state;
    return (
      <Form
        className="EditArticleForm"
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="container_AddArticleForm_header">
          <h2>Edit post</h2>
          <div className="container_AddArticleForm_select">
            <Select
              value={tag.value}
              name="tag"
              onChange={e => this.updateTag(e.target.value)}
            >
              <option key="no-val" value=""></option>
              {this.renderCategories()}
            </Select>
          </div>
        </div>

        <FormLabel
          htmlFor="EditArticleForm_article_title"
          className="label_edit_article_form"
        ></FormLabel>
        <Input
          value={title.value}
          placeholder="Top 5 Destinations for This Summer"
          name="title"
          id="EditArticleForm_article_title"
          onChange={e => this.updateTitle(e.target.value)}
        ></Input>
        <FormLabel
          htmlFor="EditArticleForm_article_content"
          className="label_edit_article_form"
        ></FormLabel>
        <div className="container_EditArticleForm_textarea">
          <Textarea
            value={content.value}
            placeholder="For the past two years I've traveled to..."
            name="content"
            id="EditArticleForm_article_content"
            onChange={e => this.updateContent(e.target.value)}
          ></Textarea>
        </div>

        <div className="container_EditArticleForm_btn">
          <Button role="button" type="submit">
            Edit
          </Button>
          <Button
            role="button"
            type="button"
            onClick={() => this.handleDelete(article_id)}
          >
            Delete
          </Button>
          <Button
            role="button"
            type="button"
            onClick={() => this.props.history.push(`/articles/${article_id}`)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(EditArticleForm);
