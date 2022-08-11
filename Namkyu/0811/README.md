
# React-dom
출처 https://url.kr/stfcxm
하나의 root html을 React.dom에 전달하여 렌더함  
```
const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <h1>Hello, world</h1>;
root.render(element);
```
React DOM은 내용이 변경된 노드만 업데이트하여(가상돔) 효율적으로 UI를 보여줌

1. js로 React DOM을 구현
- React.createElement 만들기

createElement로 jsx 구현
createElement는 (component, props, ...children)의 props를 가짐
```
React.createElement('div', null, `Hello ${this.props.toWhat}`);
React.createElement(Hello, {toWhat: 'World'}, null),

<div>Hello {this.props.toWhat}</div>;
<Hello toWhat="World" />,
```
첫번째 인자가 html태그, 2번째는 전달되는 props, 3번째는 태그안에 들어가는 children된다
```
function createElement(node) {
  if (typeof node === ‘string’) {
    return document.createTextNode(node);
  }
  return document.createElement(node.type);
}
```
string으로 들어올경우 바로 createTextNode로 만들어주고
그 외의 경우 document.createElement로 html엘리먼트를 만들어준다

2개이상의 렌더를 위해 적합한 구조로 변경
```
function createElement(node) {
  if (typeof node === ‘string’) {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}
```
root에 appendChild로 jsx문을 넣어서 렌더
```
const a = (
  <ul class="list">
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);
$root.appendChild(createElement(a));
```
- 상태 변화를 감지해서 리렌더 해주는 기능 만들기

기본적으로 두 개의 가상 트리(이전 트리와 새 트리)를 비교하고 실제 DOM에 필요한 변경만 하는 알고리즘을 작성해야 함