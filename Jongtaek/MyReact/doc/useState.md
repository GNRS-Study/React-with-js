### useState 구현하기

1. webpack 설정으로 개발환경 구축하기
   [참조](https://berkbach.com/%EC%9B%B9%ED%8C%A9-webpack-%EA%B3%BC-%EB%B0%94%EB%B2%A8-babel-%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-react-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-fb87d0027766/)

2. react 를 직접 사용하는 듯한 느낌을 주기위해 babel alias 설정
   [링크](https://www.daleseo.com/js-babel-resolver/)

3. function component 추가 -> React.createElement 에서 typeof type === 'function'일 경우 설정 및 useState 가짜 코드 넣기

4. 이러다 보니 ReactDom의 createElement 쪽에서 문제 발생 -> insertAdjacentHTML 로 child가 string인 경우 문제 해결, null 일경우 그냥 리턴

5. useState
   - React.createElement 에서 FC 를 실행해버리면 state가 변하지 않는 문제가 있었음 => updateElement 에 추가
   - onClick 을 그냥 넣으면 string type으로 변환되어서 들어가서 실행되지 않음 => addEventListener 사용
   - state 를 변경하고 다시 그려줘야 함 -> render 메소드 추가 - 좀 이상하긴 하지만 일단 돌아가는 코드를 만들기 위해...

6. useState 를 여러 번 사용하는 경우에 대한 처리
   - state 를 리스트로 관리함
   - input 타입의 경우 onChange 정의 필요
     - render 할 때마다 포커스를 잃는 문제가 있음
