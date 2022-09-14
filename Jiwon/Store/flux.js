const counter = (state = 0, action) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		default:
			return state;
	}
};


const createStore = reducer => {
	let state;
	let listeners = [];
	const getState = () => state;
	const dispatch = action => {
		state = reducer(state, action);
		console.log(listeners);
		listeners.forEach(listener => listener());
	};
	const subscribe = listener => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	};
	dispatch({});
	return { getState, dispatch, subscribe };
};


const store = createStore(counter);


const renderFirst = () => {
	document.getElementById("first").innerHTML = store.getState();
};

const renderSecond = () => {
	document.getElementById("second").innerHTML = store.getState();
};


let renderFirstSubscription = store.subscribe(renderFirst);

store.subscribe(renderSecond);

renderFirst();
renderSecond();


document.addEventListener("click", () => {
	store.dispatch({ type: "INCREMENT" });

	console.log(store.getState());

	if (store.getState() > 3 && document.getElementById("first")) {
		document.getElementById("first").remove();
		renderFirstSubscription();
	}
});
