import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button
} from "../Utils/Utils";
import ArticleListContext from "../../Context/ArticleListContext";
import "./AddArticleForm.css";
import TokenService from "../../Services/token-service";
import ArticleApiService from "../../Services/article-api-service";

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
      tag: {
        value: "",
        touched: false
      }
    };
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

  renderCategories = () => {
    const tags = ["News", "Interview", "Guide", "Diary", "Random", "Advice"];
    return tags.map(tag => (
      <option value={tag} key={tag}>
        {tag}
      </option>
    ));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, content, tag } = this.state;
    // const token = TokenService.readJwtToken();
    const newArticle = {
      title: title.value,
      content: content.value,
      article_tag: tag.value
    };

    ArticleApiService.postArticle(newArticle)
      .then(this.context.addArticle(newArticle))
      .then(() => {
        this.props.history.push(`/articles`);
      });
  };

  render() {
    const { tag } = this.state;

    return (
      <Form
        className="AddArticleForm"
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="container_AddArticleForm_header">
          <h2>Create a post</h2>
          <div className="container_AddArticleForm_select">
            <Select name="tag" onChange={e => this.updateTag(e.target.value)}>
              <option key="no-val" value="">
                Select a category
              </option>
              {this.renderCategories()}
            </Select>
          </div>
        </div>
        <FormLabel
          htmlFor="AddArticleForm_article_title"
          className="label_add_article_form"
        ></FormLabel>
        <Input
          type="text"
          placeholder="Top 5 Destinations for This Summer"
          name="title"
          id="AddArticleForm_article_title"
          onChange={e => this.updateTitle(e.target.value)}
        ></Input>
        <FormLabel
          htmlFor="AddArticleForm_article_content"
          className="label_add_article_form"
        ></FormLabel>
        <div className="container_AddArticleForm_textarea">
          <Textarea
            placeholder="For the past two years I've traveled to..."
            name="content"
            id="AddArticleForm_article_content"
            onChange={e => this.updateContent(e.target.value)}
          ></Textarea>
        </div>

        <div className="container_AddArticleForm_btn">
          <Button
            type="button"
            role="button"
            // change below history redirect
            onClick={() => this.props.history.push("/articles")}
          >
            Cancel
          </Button>
          <Button type="submit">Post</Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(AddArticleForm);
