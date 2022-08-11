/** @jsx h */
function h(type, props, ...children) {
  return {
    type,
    props,
    children
  };
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

function updateElement($parent, newNode, oldNode, index = 0) {
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
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
} // ---------------------------------------------------------------------


const a = h("ul", null, h("li", null, "item 1"), h("li", null, "item 2"));
const b = h("ul", null, h("li", null, "item 1"), h("li", null, "hello!"));
const c = h("ul", null, h("li", null, "item 1"), h("li", null, "item 2"), h("li", null, "item 3"));
const $root = document.getElementById('root');
const $reload = document.getElementById('reload');
const $remove = document.getElementById('remove');
const $add = document.getElementById('add');
updateElement($root, a);
$reload.addEventListener('click', () => {
  updateElement($root, b, a);
});
$remove.addEventListener('click', () => {
  updateElement($root, null, a);
});
$add.addEventListener('click', () => {
  updateElement($root, c);
});