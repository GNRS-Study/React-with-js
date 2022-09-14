# Store
> 2022년 09월 15일.
> - 중앙 집중식 상태관리
> - Observer Pattern
> - Flux Pattern
> - Proxy

## 중앙 집중식 상태관리

상태관리는 프론트엔드 개발에서 제일 중요한 것 중 하나!  
➔ React나 Vue와 같은 프론트엔드 프레임워크의 주된 목적 중 하나가 **상태를 기반으로 DOM을 렌더링하는 것** 이기 때문  

Todo List와 같은 간단한 서비스는 사실 상태관리 프레임워크 필요X. (컴포넌트 수도 적고, depth도 낮기 때문)
하지만 엔터프라이즈급 서비스(ex. 은행 전산망)를 개발한다면!? (상태관리가 복잡해지고, 컴포넌트 depth도 깊어지고...)

이때 중앙 집중식 저장소 역할을 하며 예측 가능한 방식으로 상태를 변경할 수 있다면 매우 편해질 것!

- [Redux](https://ko.redux.js.org/introduction/getting-started/)
- [Vuex](https://vuex.vuejs.org/)

## Observer Pattern

상태의 변경을 관찰하겠다. ➔   
상태가 변경되면 미리 정의한 일련의 동작을 실행시키는 원리.

#### 중앙 집중식 저장소(Store)를 구현하기 위한 저장소(Store)와 컴포넌트(Component)의 관계
- Store는 여러 개의 Component에서 사용될 수 있다.
- Store가 변경될 때, Store가 사용되고 있는 Component도 변경되어야 한다.


#### Observer pattern
- 옵저버들(객체의 상태 변화를 관찰하는 관찰자들)의 목록을 객체에 등록하여 상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴.
- 주로 분산 이벤트 핸들링 시스템을 구현하는 데 사용.
- 발행/구독 모델.

#### 패턴의 흐름
1. 상태를 정의한다.
2. 구독를 추가한다.
3. 상태를 변경한다.

#### core
```javascript
export const State = (state) => {
  state._subscribers = new Set();
  state.subscribe = (render) => state._subscribers.add(render);

  Object.keys(state).forEach((key) => {
    let _value = state[key];

    Object.defineProperty(state, key, {
      get() {
        return _value;
      },

      set(value) {
        if (_value === value) return;
        if (JSON.stringify(_value) === JSON.stringify(value)) return;

        _value = value;
        state._subscribers.forEach((fn) => fn());
      },
    });
  });

  return state;
};
```


## Flux Pattern

React에서 사용되는 상태관리 패턴. ( Redux, Context API )  

핵심 : 동작이 단방향으로 흐른다.

```
Action -> Dispatcher -> Model -> View
```
- Action : 상태를 변경하는 메소드. ( action key + payload )
- Dispatcher : action을 store에게 전달하는 역할.
- Model(Store) : 상태을 관리하는 역할.
- View : 화면을 렌더링하는 역할.

#### core
```javascript
export class Store {
  #state = {};
  #listeners = [];
  #reducer;

  /**
   * 액션을 수행하고 새로운 state를 반환한다. dispatch를 통해 원하는 액션을 수행할 수 있다.
   * @param { {} } state
   * @param {{ (state, actionKey: String, payload: {}): {} }} reducer
   */
  constructor(state, reducer) {
    this.#state = state;
    this.#reducer = reducer;
  }

  getState() {
    return { ...this.#state };
  }

  subscribe(func) {
    this.#listeners.push(func);
  }

  publish() {
    this.#listeners.forEach((func) => func());
  }

  /**
   * @param {string} actionKey
   */
  async dispatch(actionKey, { ...payload } = {}) {
    this.#state = await this.#reducer(this.#state, actionKey, { ...payload });
    this.publish();
  }
}
```

#### /stores/RecentlyViewdStore.js
```javascript
import { Store } from "../core";

const initState = { recentlyViewedList: [] };

const reducer = (state, actionKey, { text }) => {
  const { recentlyViewedList } = state;

  switch (actionKey) {
    case "ADD_ITEM":
      const newList = [text, ...recentlyViewedList.filter((v) => v !== text)];
      return { ...state, recentlyViewedList: newList };
    default:
      return { ...state };
  }
};

/**
 * @actionKey `ADD_ITEM`
 * @state { recentlyViewedList: string[] }
 */
export const RecentlyViewedStore = new Store(initState, reducer);
```

## Proxy