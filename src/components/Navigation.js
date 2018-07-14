import React from 'react';
import classnames from "classnames";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, bindKeyboard } from 'react-swipeable-views-utils';

import HomeSVG from '../styles/assets/icons/home';
import AboutSVG from '../styles/assets/icons/about';
import CalendarSVG from '../styles/assets/icons/calendar';
import PortfolioSVG from '../styles/assets/icons/portfolio';
import BlogSVG from '../styles/assets/icons/blog';

const iconsInOrder = [
  <HomeSVG className="icon" />,
  <AboutSVG className="icon" />,
  <CalendarSVG className="icon" />,
  <PortfolioSVG className="icon" />,
  <BlogSVG className="icon" />
]

const AutoPlaySwipeableViews = bindKeyboard(autoPlay(SwipeableViews));

export default class Navigation extends React.Component {

  constructor() {
    super();

    this.state = {
      index: 0
    }

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.generateTabs = this.generateTabs.bind(this);
  }

  handleChangeIndex(newIndex) {
    this.setState({
      index: newIndex
    })
  }

  generateTabs(tagsArray) {
    return tagsArray.map((el, i) => {
      return (
        <div
          key={i}
          className={classnames("tab", {
            "active-tab": this.state.index === i
          })}
          onClick={() => {this.handleChangeIndex(i)}}
        >
          <span className="text">{el}</span>
          {iconsInOrder[i]}
        </div>
      )
    })
  }

  render () {
    return (
      <div className="navigation">
        <AutoPlaySwipeableViews
          resistance
          className="tabs-content"
          interval={30000}
          enableMouseEvents={true}
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
        >
          {this.props.children}
        </AutoPlaySwipeableViews>
        <div className="tabs-panel">
          {this.generateTabs(this.props.langPack.tags)}
        </div>
        <div className="navigation-arrows">
          <button
            className={classnames("left", "arrow", {
              "hidden": !this.state.index
            })}
            onClick={() => this.handleChangeIndex(--this.state.index)}
          >
            <svg viewBox="-2 -2 50 80">
              <polyline fill="none" stroke={this.props.theme.secondColor} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/>
            </svg>  
          </button>
          <button
            className={classnames("right", "arrow", {
              "hidden": (this.props.children.length - 1) === this.state.index
            })}
            onClick={() => this.handleChangeIndex(++this.state.index)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 50 80">
              <polyline fill="none" stroke={this.props.theme.secondColor} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
            </svg>
          </button>
        </div>
      </div>
    )
  }
};
