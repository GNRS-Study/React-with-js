window.addEventListener("DOMContentLoaded", ignite);

function ignite() {
	const $counter = document.querySelector("#counter");
	const $increment = document.querySelector("#increment");
	const $decrement = document.querySelector("#decrement");
	const $reset = document.querySelector("#reset");

	function createStore(initialState, reducer) {
		// state의 필드가 업데이트될 때 마다 updateUI()를 자동으로 호출하기 위해 state 객체를 프록시로 래핑.
		// state 필드가 업데이트 될때마다 updateUI() 호출.
		const state = new Proxy(
			{ value: initialState },
			{
				set(obj, prop, value) {
					obj[prop] = value;
					updateUI();
				},
			}
		);

		function getState() {
			// `initialState`가 객체인 경우에만 작동
			return { ...state.value };
		}

		function dispatch(action) {
			const prevState = getState();
			state.value = reducer(prevState, action);
		}

		return {
			getState,
			dispatch,
		};
	}


	const initialState = { counter: 0 };


	// Store를 생성할 때 정의
	function reducer(state, action) {
		switch (action) {
			case "INCREMENT":
				state.counter = state.counter + 1;
				break;
			case "DECREMENT":
				state.counter = state.counter - 1;
				break;
			case "RESET":
			default:
				state.counter = 0;
				break;
		}

		return state;
	}


	const store = createStore(initialState, reducer);


	function updateUI() {
		$counter.innerText = store.getState().counter;
	}


	$increment.addEventListener("click", () => {
		store.dispatch("INCREMENT");
	});
	$decrement.addEventListener("click", () => {
		store.dispatch("DECREMENT");
	});
	$reset.addEventListener("click", () => {
		store.dispatch("RESET");
	});
}