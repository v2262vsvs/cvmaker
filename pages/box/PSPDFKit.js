import React, { Component } from "react";

export default class PSPDFKit extends Component {
  containerRef = React.createRef();

  componentDidMount() {
    const url = URL.createObjectURL(this.props.blob);
    window.PSPDFKit.load({
      document: url,
      container: this.containerRef.current
    });
  }

  componentWillUnmount() {
    window.PSPDFKit.unload(this.containerRef.current);
  }

  render() {
    return (
      <div
        ref={this.containerRef}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
    );
  }
}
