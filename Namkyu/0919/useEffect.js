import React from 'react'

let hooks = [];
let idx = 0;
function useEffect(cb, depArr) {
  // * cb 콜백함수 , depArr 의존성 배열
  const oldDeps = hooks[idx];
  let hasChanged = true;
  if (oldDeps) {
    hasChanged = depArr.some((dep, i) => !Object.is(dep, oldDeps[i]));
  }

  if (hasChanged) cb();
  hooks[idx] = depArr;
  idx++;
}

// ! https://www.youtube.com/watch?v=KJP1E-Y-xyo
export default useEffect