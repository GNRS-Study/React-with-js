import React from 'react'

let state = undefined;
function useState(initState) {
  if (state === undefined) {
    state = initState;
  }
  const setState = (newState) => {
    state = newState; // 새로운 state를 할당한다
    render(); // render를 실행한다.
  }
  return [state, setState];
}

// * useState를 여러번 사용할 경우
let currentStateKey = 0; // useState가 실행 된 횟수
const states = []; // state를 보관할 배열
function useState(initState) {
  // initState로 초기값 설정
  if (states.length === currentStateKey) {
    states.push(initState);
  }

  // state 할당
  const state = states[currentStateKey];
  const setState = (newState) => {
    // state를 직접 수정하는 것이 아닌, states 내부의 값을 수정
    states[currentStateKey] = newState;
    render();
  }
  currentStateKey += 1;
  return [state, setState];
}

// * useState 최적화

// * (1) 변경된 값이 없을경우
function useState(initState) {
  // initState로 초기값 설정
  const key = currentStateKey;
  if (states.length === key) {
    states.push(initState);
  }

  // state 할당
  const state = states[key];
  const setState = (newState) => {
    // 값이 똑같은 경우
    if (newState === state) return;

    // 배열/객체일 때는 JSON.stringify를 통해 간단하게 비교할 수 있다.
    // 그런데 Set, Map, WeekMap, Symbol 같은 원시타입의 경우
    // JSON으로 파싱되지 않기 때문에 주의해야한다.
    if (JSON.stringify(newState) === JSON.stringify(state)) return;

    // 기존 값과 다른 경우에만 값을 변경하고 render()를 실행한다.
    states[key] = newState;
    render();
  }
  currentStateKey += 1;
  return [state, setState];
}

// * (2) 변경된 값이 없을경우 (debounce 사용)

let count = 0;
const debounceFrame = callback => {
  let nextFrameCallback = -1;

  // 클로저를 이용하기 위해 debounce를 실행하면 함수를 반환한다.
  return () => {
    count += 1;

    // 실행이 예약된 함수(callback)가 있을 경우 캔슬한다.
    cancelAnimationFrame(nextFrameCallback);

    // 특정시간(timer) 후에 callback이 실행되도록 한다.
    nextFrameCallback = requestAnimationFrame(callback)
  }
};
const 야옹 = debounceFrame(() => console.log('야옹' + count), 100);
야옹(); // 실행 취소
야옹(); // 실행 취소
야옹(); // 실행 취소
야옹(); // 실행
setTimeout(야옹, 100); // 실행
export default useState