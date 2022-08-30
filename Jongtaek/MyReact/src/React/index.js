function createElement(type, props, ...children) {
  return { type, props, children: children.flat() };
}

let render;
let hooks = [];
let idx = 0;

export function setRenderFn(renderFn) {
  render = () => {
    idx = 0;
    renderFn();
  };
}

export function useState(initialValue) {
  const index = idx;
  if (hooks.length < index + 1) {
    hooks[index] = initialValue;
  }

  const setValue = (newValue) => {
    console.log("setValue", newValue, index);
    hooks[index] = newValue;
    render();
  };

  const value = hooks[index];
  idx++;
  if (idx > hooks.length) idx %= hooks.length;

  return [value, setValue];
}

export default {
  createElement,
};
