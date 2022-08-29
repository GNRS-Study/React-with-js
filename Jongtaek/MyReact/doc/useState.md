### useState 구현하기

전에 ReactDom.createRoot, root.render 를 구현해보자

1. webpack 설정으로 개발환경 구축하기
   [참조](https://berkbach.com/%EC%9B%B9%ED%8C%A9-webpack-%EA%B3%BC-%EB%B0%94%EB%B2%A8-babel-%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-react-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-fb87d0027766/)

2. react 를 직접 사용하는 듯한 느낌을 주기위해 babel alias 설정
   https://www.daleseo.com/js-babel-resolver/

3. function component 추가 -> React.createElement 에서 typeof type === 'function'일 경우 설정 및 useState 가짜 코드 넣기

4. 이러다 보니 ReactDom의 createElement 쪽에서 문제 발생 -> insertAdjacentHTML 로 child가 string인 경우 문제 해결, null 일경우 그냥 리턴
