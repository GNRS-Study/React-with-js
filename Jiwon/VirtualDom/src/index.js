/** @jsx h */

function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const $el = document.createElement(node.type);

  Object.entries(node.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => (
      $el.setAttribute(attr, value)
    ));


  console.log("> node.children : ", node.children)

  try {
    node.children
      .map(createElement)
      .forEach(child => $el.appendChild(child));
  } catch (e) {
    console.log(node);
    console.error(e);
  }

  return $el;
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type
}

function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(
      createElement(newNode)
    );
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    );
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

// ---------------------------------------------------------------------

const initTree = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const changeTree = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);

const addTree = (
  <ul>
    <li>item add</li>
    <li>item add</li>
    <li>item add</li>
  </ul>
);

const $root = document.getElementById('root');
const $init = document.getElementById('init');
const $change = document.getElementById('change');
const $add = document.getElementById('add');
const $remove = document.getElementById('remove');

updateElement($root, initTree);

$init.addEventListener('click', () => {
  location.reload()
});

$change.addEventListener('click', () => {
  updateElement($root, changeTree, initTree);
});

$add.addEventListener('click', () => {
  updateElement($root, addTree);
});

$remove.addEventListener('click', () => {
  updateElement($root, null, initTree);
});