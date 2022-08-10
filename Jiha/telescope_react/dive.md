react dive

node_modules - 관련 패키지들을 관리하는 폴더

public 
- 화면에 실제로 출력되는 화면 파일
- 리액트로 우리가 따로 설정을 안했지만, 웹펙은 public을 바라보게 하고 있음
-index.html => 코드가 DOM아래 위치한 div에 출력됨
ex) <div id="root"></div>

-manifest.json은 PWA(progressive web app)을 사용하게 도와주는 것임.

-public안에 rovots.txt는 크롤링을 도와준다고 함

src 
- 우리들이 작업을 할 때 코드들이 저장되는 공간
ex) component, fonts, style등등

**
Dependencies
- jest
- react(versions)
- todo : react-dom
- react scripts (dependencies 바로 아래 scripts를 실행시켜줌)

scripts란 npm/yarn + start/ build...

eslintConfig - extension

browserlist - 브라우저 호환성

.gitignore - git에 올렸을 때 불필요한 것들