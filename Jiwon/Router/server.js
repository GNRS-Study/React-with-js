// express 모듈 불러오기
const express = require("express");
// path : 폴더와 파일의 경로를 지정해주는 모듈.
// path.join(경로, .. .) : 여러 인자를 넣으면 하나의 경로로 합쳐준다. /를 상대경로로 처리.
// path.resolve(경로, .. .) : 여러 인자를 넣으면 하나의 경로로 합쳐준다. /를 절대경로로 처리.
// path.parse(경로) : 파일 경로를 root, dir, base, ext, name으로 분리한다.
// path.format(객체) : path.parse() 한 객체를 파일 경로로 합친다.
// path.relative(기준경로, 비교경로) : 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려준다.
// https://nodejs.org/api/path.html
const path = require("path");

// express 사용
const app = express();

// 정적 파일(이미지, css, js)을 제공하기 위해서 express의 기본 미들웨어 함수인 express.static 사용
app.use("/", express.static(__dirname));
// app.use("/", express.static(path.resolve(__dirname))); // __dirname : D:\React-with-js\Jiwon\Router

// ex.
// app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
// server.js 의 실행경로 + "/static"을 localhost:port/static으로 마운트
// path.resolve 를 사용해서 인자로 받은 값들을 하나의 문자열로 만들어 주고 정적 디렉토리에 대한 마운트 경로를 지정해 주면
// /static 경로를 통해 frontend 디렉토리에 포함된 파일을 로드할 수 있게 됨
// http://localhost:8080/static/js/index.js
// http://localhost:8080/static/css/index.css


// get요청이 오면 index.html 파일을 읽고 내용을 클라이언트로 전송
app.get("/*", (req, res) => {
	res.sendFile(path.resolve("index.html"));
});


// port 생성 서버 실행
app.listen(process.env.PORT || 3000, () => console.log("Server running ...."));