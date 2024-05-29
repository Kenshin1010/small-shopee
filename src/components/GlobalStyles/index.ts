import PropTypes from "prop-types";
import React from "react";
import "./GlobalStyles.scss";

type GlobalStylesProps = {
  children: React.ReactNode;
};
function GlobalStyles({ children }: GlobalStylesProps) {
  return children;
  // React.Children.only(children);
}

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
