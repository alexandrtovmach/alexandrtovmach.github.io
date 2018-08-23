import React from "react";

import ImacComponent from "./common/ImacComponent";
import IpadComponent from "./common/IpadComponent";
import IphoneComponent from "./common/IphoneComponent";

export default class DevicesComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !this.props.isEqual(this.props, nextProps);
  }

  render() {
    const { project } = this.props;
    return (
      <div className="devices">
        <div className="desktop-device-container">
          <ImacComponent
            img={project && project.screenshots && project.screenshots.desktop}
          />
        </div>
        <div className="pad-device-container">
          <IpadComponent
            img={project && project.screenshots && project.screenshots.pad}
          />
        </div>
        <div className="phone-device-container">
          <IphoneComponent
            img={project && project.screenshots && project.screenshots.phone}
          />
        </div>
      </div>
    );
  }
}
