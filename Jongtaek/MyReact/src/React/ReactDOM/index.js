import { setRenderFn } from "..";

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function setAttribute($el, [attr, value]) {
  if (attr == "onClick") {
    $el.addEventListener("click", value);
  } else {
    $el.setAttribute(attr, value);
  }
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

  console.log("> node.children : ", node.children);

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
  if (newNode && typeof newNode.type === "function") {
    newNode = newNode.type.apply(null, [newNode.props, ...newNode.children]);
  }
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
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

export function createRoot($el) {
  let oldNode = null;
  function render(newNode) {
    console.log(newNode);
    updateElement($el, newNode, oldNode);
    oldNode = newNode;
  }
  setRenderFn(() => render(oldNode));
  return {
    render,
  };
}

export default { createRoot };
