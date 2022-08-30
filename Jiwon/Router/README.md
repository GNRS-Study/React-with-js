# Router
> - SPA 라우팅을 구현하는 두 가지 방법
> - History API
> - 브라우저의 History 스택


SPA에서는 전통적인 링크 방식과 다르게 경로가 변경되더라도 새로 페이지를 불러오지 않음.  
페이지를 이동할 때 anchor 태그를 활용해 새로운 html을 불러오는 게 아님.

대신 초기 어플리케이션을 로드할 때 모든 웹사이트 콘텐츠를 로드하고, URL 경로에 따라 올바른 콘텐츠를 보여줌.  
index.html 하위의 DOM을 갈아 끼우면서 다른 페이지를 보여주는 방식.

SPA 라우팅을 구현하기 위해서는 새로운 HTML을 불러오지 않으면서 앞으로 가기, 뒤로 가기, 링크를 통한 경로 이동을 직접 처리해줘야 함.

이때 사용할 수 있는 것이 'History API'.
###

## SPA 라우팅을 구현하는 방법
1. history (Browser History)를 사용한 방법.
    - history.pushState API를 활용하여 페이지를 다시 로드하지 않고 URL을 탐색 가능.
2. hash (Hash History)를 사용한 방법.
    - url 해쉬를 사용하여 전체 url을 시뮬레이트하게되며, url이 변경될 때 페이지가 다시 로드되지 않음.
    - 보통 url에 #이 붙는다.


#### history를 사용하는 방법 (Browser History Mode)
- History API를 사용하는 방법. 가장 보편적인 방법.
- History API의 pushstate와 window 객체의 popstate 이벤트를 이용.
- Browser History의 url의 형태는 site/some-path와 같이 표현.
- 이 방법은 서버 측 지원이 일부 필요. ex) [http://domain.com/site/another-path](http://domain.com/site/another-path) 와 같이 존재하지 않는 경로로 접속할 경우 오류를 출력. 이런 문제를 해결하고 대체할 url은 서버에서 지정해야 함.

```javascript
// history.pushState를 통하여 새 데이터 전달을 위한 상태, 제목, url을 지정.
window.history.pushState({ data: 'some data' }, 'Some history entry title', '/some-path')

window.onpopstate = () => {
  appDiv.innerHTML = routes[window.location.pathname]
}
```

#### hash를 사용하는 방법 (Hash History Mode)
- '#' 앵커를 통해 이동하는 방법. site/#some-path와 같이 url이 표현됨. 
- 보통 정적 페이지에서 사용되며 블로그의 주 제목을 클릭 후 앵커 이동 시 url에 #이 붙는 모습을 볼 수 있음.
- 현재 url의 hash는 window.location.hash를 통하여 확인.
- 라우팅 시스템을 구축할 경우, window.location.hash를 이용하여 라우팅을 변경 가능.
- hash가 변경될 때마다 popstate와 같이 hashchange 이벤트가 발생하기 때문에 hashchange를 통하여 라우팅을 변경 가능.
- 보통 hash History는 웹 페이지 내부에서 이동을 위할 것으로 history가 관리X. 하지만 서버가 없는 정적 페이지 경우에는 hashHistory만으로도 충분.

```javascript
window.addEventListener('hashchange', () => {
  appDiv.innderHTML = routes[window.location.hash.replace('#', '')]
})
```

#

## History API

- [https://developer.mozilla.org/en-US/docs/Web/API/History](https://developer.mozilla.org/en-US/docs/Web/API/History)
- [https://developer.mozilla.org/en-US/docs/Web/API/History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)


## 브라우저의 History 스택