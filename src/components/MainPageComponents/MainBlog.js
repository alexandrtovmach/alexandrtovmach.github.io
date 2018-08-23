import React from "react";

import BlogListComponent from "../BlogComponent/BlogListComponent";

export default class MainPortfolioComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !this.props.isEqual(this.state, nextState) ||
      !this.props.isEqual(this.props, nextProps)
    );
  }

  render() {
    return (
      <div className="main-blog">
        <BlogListComponent
          items={3}
          infinityScroll={false}
          locale={this.props.locale}
        />
        <a href="/blog" className="button" title={this.props.langPack.blog}>
          {this.props.langPack.more}
        </a>
      </div>
    );
  }
}
