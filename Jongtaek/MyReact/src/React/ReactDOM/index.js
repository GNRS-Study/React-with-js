import { setRenderFn } from "..";

const eventListenerMap = new Map();

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function setEventListener($el, eventType, eventListener) {
  const elementEventListenerMap = eventListenerMap.get($el) || new Map();
  const prevEventListener = elementEventListenerMap.get(eventType);

  if (prevEventListener) $el.removeEventListener(eventType, prevEventListener);
  if (eventListener) $el.addEventListener(eventType, eventListener);

  elementEventListenerMap.set(eventType, eventListener);
  eventListenerMap.set($el, elementEventListenerMap);
}

function setAttribute($el, [attr, value]) {
  if (attr == "onClick") {
    setEventListener($el, "click", value);
  } else if (attr === "onChange") {
    setEventListener($el, "input", value);
  } else {
    $el.setAttribute(attr, value);
  }
}

function updateProps($el, newProps, oldProps) {
  Object.entries(newProps || {})
    .filter(([attr, value]) => value && (!oldProps || oldProps[attr] != value))
    .forEach(([attr, value]) => setAttribute($el, [attr, value]));
}

export function createElement(node) {
  if (node == null) return;

  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);

  Object.entries(node.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => setAttribute($el, [attr, value]));

  try {
    node.children?.map(createElement).forEach((child) => {
      if (typeof child === "string") {
        $el.insertAdjacentHTML("beforeend", str);
      } else $el.appendChild(child);
    });
  } catch (e) {
    console.log(node);
    console.error(e);
  }

  return $el;
}

export function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    updateProps($parent.childNodes[index], newNode.props, oldNode?.props);
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}
function parseNode(node) {
  if (node == null) return node;
  if (typeof node === "string" || typeof node === "number") return `${node}`;
  let newNode = { ...node };
  if (newNode && typeof newNode.type === "function") {
    newNode = newNode.type.apply(null, [newNode.props, ...newNode.children]);
  }
  newNode.children = newNode.children?.map(parseNode);

  return newNode;
}

export function createRoot($el) {
  let rootNode = null;
  let prevNode = null;
  function renderRoot(root) {
    const parsedNode = parseNode(root);
    updateElement($el, parsedNode, null);
    rootNode = root;
    prevNode = parsedNode;
  }
  setRenderFn(() => {
    const parsedNode = parseNode(rootNode);
    updateElement($el, parsedNode, prevNode);
    prevNode = parsedNode;
  });
  return {
    render: renderRoot,
  };
}

export default { createRoot };
