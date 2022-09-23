**** REACT 18 변경점 ****

1. Automatic Batching
- setState를 하나로 통합해서 배치처리후, 리렌더링 진행 (리렌더링 성능 개선)
- 18이전 버전 에서는 이벤트 핸들러 내부에서 발생하는 상태 업데이트만 배치처리를 지원
- 이벤트 핸들러 내부에 fetch()등 과 같은 콜백을 받아 처리하는 메소드가 존재할 경우 Automatic Batching이 되지않음

```js
const onhandleClick = () =>{
  setClick(prev=>prev+1)
  setState(prev=>!prev)
}

const onhandleClick = () =>{
  fetch(“”,(res)=>{
 setClick(prev=>prev+1)
 setState(prev=>!prev)
})}
```
- react18에서도 상태 업데이트 + 콜백함수 내부에서 상태 업데이트를 진행할 경우 Automatic Batching이 되지않음
