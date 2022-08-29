function createElement(type, props, ...children) {
  console.log(type);
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children: children.flat() };
}

export function useState() {
  return [];
}

export default {
  createElement,
};
