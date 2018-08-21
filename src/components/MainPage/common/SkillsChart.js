import React from 'react';
import isEqual from 'lodash.isequal';
import * as d3 from 'd3';


export default class SkillsChart extends React.Component {

  componentDidMount() {
    this.renderSunburst(this.props);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps, this.props)) {
      this.renderSunburst(this.props);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
  }

  arcTweenData(a, i, node, x, arc) {
    const oi = d3.interpolate({ x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0) }, a);
    function tween(t) {
      const b = oi(t);
      a.x0s = b.x0; 
      a.x1s = b.x1; 
      return arc(b);
    }
    if (i === 0) {
      const xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
      return function (t) {
        x.domain(xd(t));
        return tween(t);
      };
    } else {
      return tween;
    }
  }
  update(root, svg, partition, x, y, radius, arc, node, self) {
    this.isBuilded = true;
    function arcTweenZoom(d) {
      const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
        yd = d3.interpolate(y.domain(), [d.y0, 1]),
        yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
      return function (data, i) {
        return i
            ? () => arc(data)
            : (t) => { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(data); };
      };
    }
    function click(d) {
      node = d;
      self.props.onSelect && self.props.onSelect(d);
      svg.selectAll('path').transition().duration(1000).attrTween('d', arcTweenZoom(d));
    }
    svg.selectAll('path')
      .data(partition(root).descendants())
      .enter()
      .append('path')
      .style('fill', (current) => {
        // const redQ = 255/215;
        // const greenQ = 215/255;
        // return current.fill = d3.rgb(current.depth*redQ*10, current.depth*greenQ*10, 0);
        return "transparent";
      })
      .attr('stroke', "rgb(255, 215, 0)")
      .attr('stroke-width', '2')
      .on('click', d => click(d, node, svg, self, x, y, radius, arc))
      .on('mouseover', function (d, i, arr) {
        arr[i].style.fill = "rgb(255, 215, 0)";
        d3.select(this).style('cursor', 'pointer');
        self.props.onTooltipUpdate(d.data.name);
        return null;
      })
      .on('mouseout', function (d, i, arr) {
        arr[i].style.fill = "transparent";
        d3.select(this).style('cursor', 'default');
        return null;
      });
    svg.selectAll('path').transition().duration(1000).attrTween('d', (d, i) => self.arcTweenData(d, i, node, x, arc));
  }
  renderSunburst(props) {
    if (props.data) {
      const self = this,
        gWidth = this.chartRef.clientWidth,
        gHeight = this.chartRef.clientHeight,
        radius = (Math.min(gWidth, gHeight) / 2) - 10,
        svg = !this.isBuilded? d3.select(`#${this.props.keyId}-svg`).append('g').attr('transform', `translate(${gWidth / 2},${gHeight / 2})`): d3.select(`#${this.props.keyId}-svg`).select('g'),
        x = d3.scaleLinear().range([0, 2 * Math.PI]),
        y = props.scale === 'linear' ? d3.scaleLinear().range([0, radius]) : d3.scaleSqrt().range([0, radius]),
        partition = d3.partition(),
        arc = d3.arc()
          .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
          .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
          .innerRadius(d => Math.max(0, y(d.y0)))
          .outerRadius(d => Math.max(0, y(d.y1))),
        rootData = d3.hierarchy(props.data);
      const node = rootData;
      rootData.sum(d => d.size);
      self.update(rootData, svg, partition, x, y, radius, arc, node, self); // GO!
    }
  }

  render() {
    return (
      <div ref={ref => this.chartRef = ref} id={this.props.keyId}>
        <svg id={`${this.props.keyId}-svg`} />
      </div>
    );
  }
}