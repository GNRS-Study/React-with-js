import React from "react";
function createElement(type, props, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children: children.flat() };
}

export default {
  createElement,
};
