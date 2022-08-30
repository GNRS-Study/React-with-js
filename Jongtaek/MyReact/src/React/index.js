function createElement(type, props, ...children) {
  console.log(type);
  return { type, props, children: children.flat() };
}

let render;
let value;
let isInitialized = false;

export function setRenderFn(renderFn) {
  render = renderFn;
}

export function useState(initialValue) {
  if (!isInitialized) {
    value = initialValue;
    isInitialized = true;
  }

  const setValue = (newValue) => {
    console.log("setValue", newValue);
    value = newValue;
    render();
  };
  return [value, setValue];
}

export default {
  createElement,
};
