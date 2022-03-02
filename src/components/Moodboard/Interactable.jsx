import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";

import interact from "interact.js";

export default class Interactable extends Component {
  static defaultProps = {
    draggable: false,
    dropzone: false,
    resizable: false,
    draggableOptions: {},
    dropzoneOptions: {},
    resizableOptions: {}
  };

  render() {
    return cloneElement(this.props.children, {
      ref: node => (this.node = node),
      draggable: false
    });
  }

  componentDidMount() {
    this.interact = interact(findDOMNode(this.node));
    this.setInteractions();
  }

  componentWillReceiveProps() {
    this.interact = interact(findDOMNode(this.node));
    this.setInteractions();
  }

  setInteractions() {
    if (this.props.draggable)
      this.interact.draggable(this.props.draggableOptions);
    if (this.props.dropzone) this.interact.dropzone(this.props.dropzoneOptions);
    if (this.props.resizable)
      this.interact.resizable(this.props.resizableOptions);
  }
}

Interactable.propTypes = {
  children: PropTypes.node.isRequired,
  draggable: PropTypes.bool,
  draggableOptions: PropTypes.object,
  dropzone: PropTypes.bool,
  dropzoneOptions: PropTypes.object,
  resizable: PropTypes.bool,
  resizableOptions: PropTypes.object
};