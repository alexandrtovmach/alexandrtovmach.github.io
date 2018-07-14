import React from "react";
import classnames from "classnames";

export default class About extends React.Component {
  render() {
    return (
      <div className={classnames("about")}>
        {this.props.langPack.about}
      </div>
    );
  }
}