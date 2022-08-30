import Home from "./pages/Home.js";
import Posts from "./pages/Posts.js";
import Mypage from "./pages/Mypage.js";
import NotFound from "./pages/NotFound.js";

const routes = [
	{ path: /^\/$/, element: Home },
	{ path: /^\/posts$/, element: Posts },
	{ path: /^\/mypage$/, element: Mypage },
];

const findMatchedRoute = () => routes.find((route) => route.path.test(location.pathname));

const route = async () => {
	const page = new (findMatchedRoute()?.element || NotFound);
	document.querySelector("#root").innerHTML = await page.getHtml();
};

const init = () => {
	// HTML이 모두 로드됐을 때 첫 페이지를 보여주기 위해서 DOMContentLoaded 사용
	document.addEventListener("DOMContentLoaded", () => {

		// click 이벤트를 등록하고 data-link라는 속성(a 태그)이 있는 곳에서만 동작하도록 조건
		document.body.addEventListener("click", (e) => {
			if (e.target.matches("[data-link]")) {
				e.preventDefault();
				console.log("> e.target.href : ", e.target.href)
				// history.pushState를 사용해서 url을 변경
				history.pushState(null, null, e.target.href);
				route().then();
			}
		});

		// route 함수를 실행시켜 렌더링
		route().then();
	});

	// 뒤로 가기 할 때 데이터 나오게 하기 위해
	// popstate : 브라우저의 백 버튼이나 (history.back() 호출) 등을 통해서만 발생.
	// https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event
	window.addEventListener("popstate", () => {
		route().then();
	});

	// window.addEventListener("historychange", ({ detail }) => {
	// 	console.log("> detail : ", detail)
	// 	const { to, isReplace } = detail;
	//
	// 	console.log("> to : ", to)
	// 	console.log("> isReplace : ", isReplace)
	//
	// 	if (isReplace || to === location.pathname) {
	// 		history.replaceState(null, "", to);
	// 	}
	// 	else {
	// 		history.pushState(null, "", to)
	// 	}
	//
	// 	router().then();
	// });
};

init();

await route()