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
import TagApiService from "../../Services/tag-api-service";
import { renderTags } from "../Utils/Utils";

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
      tag: {
        value: "",
        touched: false
      }
    };
  }

  componentDidMount() {
    TagApiService.getAllTags().then(this.context.setTagList);
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

  updateTag = tag => {
    this.setState({ tag: { value: tag, touched: true } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, image_url, content, tag } = this.state;
    // const token = TokenService.readJwtToken();
    const newArticle = {
      title: title.value,
      image_url: image_url.value,
      content: content.value,
      article_tag: tag.value
    };

    ArticleApiService.postArticle(newArticle)
      .then(this.context.addArticle(newArticle))
      .then(() => {
        this.setState({ title: { value: "", touched: false } });
        this.setState({ image_url: { value: "", touched: false } });
        this.setState({ content: { value: "", touched: false } });
        this.setState({ tag: { value: "", touched: false } });
        this.props.history.push(`/articles`);
      });
  };

  render() {
    const { tagList } = this.context;

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
              {renderTags(tagList)}
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
          htmlFor="AddArticleForm_article_image_url"
          className="label_add_article_form"
        ></FormLabel>
        <Input
          type="text"
          placeholder="image url"
          name="image_url"
          id="AddArticleForm_article_image_url"
          onChange={e => this.updateImage_Url(e.target.value)}
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
