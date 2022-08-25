https://serzhul.io/JavaScript/learn-webpack-in-under-10minutes/
https://webpack.js.org/concepts/loaders/#example

yarn eject 하기
- 숨겨져 있던 webpack설정이나, babel설정 파일등을 보고 수정할수있슴
단 한번 eject를 수행하게 되면 이전 상태로 되돌아 갈 수 없다
 
# Webpack 이란?
자바스크립트 파일들을 하나의 자바스크립트 파일로 만들어주는 방식을 모듈 번들링이라고 한다.

# Webpack
- mode: webpack에게 현재 모드를 알려주는 옵션입니다.

- bail: True 일 경우 첫 번째 오류를 허용합니다. 여기서는 production 일 때만 허용합니다.

- devtool: 어떤 source-map 을 사용할지 결정하는 부분입니다. source-map 이란 원본 코드와 빌드된 코드를 매핑 해주는 방법입니다. CRA 에서는 production 일 때는 source-map , development 일 때는 cheap-module-source-map 을 사용 근데 source-map 를 넣었을 때 원본 코드가 드러나는 경우가 있어서 source map 을 안쓰는 사람도 있습니다. 또 쓰더라도 source-map 의 성능이 안 좋아서 source-map 대신 cheap-module-source-map 를 사용하는 경우도 있습니다.

- entry: 앱을 번들할 때 시작 점을 정의합니다. 배열로 받을 경우 시작시 모든 모듈이 로드됩니다. 여기서는 ].filter(Boolean) 을 통해서 isEnvDevelopment 부분을 모드에 따라서 제외시켰습니다.

- output: 번들을 완료한 파일을 설정합니다. path 는 파일을 저장할 경로 입니다. pathinfo 는 모듈에 관련된 내용을 주석으로 표시합니다. 

- production 일 때는 안하는 것이 좋습니다. filename 은 번들을 완료한 파일의 이름을 정의합니다. chunkFilename 은 청크 파일의 이름을 정의합니다. publicPath 는 브라우저에서 참조될때 출력 파일의 공용 URL 주소를 지정합니다. devtoolModuleFilenameTemplate 은 source-map의 소스 배열을 커스터마이징 합니다. jsonpFunction 는 여러 개의 webpack이 작동할 때 충돌을 막기위해 설정합니다. globalObject 는 전역변수를 설정하는 부분입니다. 기본 값은 window 입니다.

- optimization: webpack 4 부터 mode 에 따라서 설정이 가능해졌습니다. minimize 는 TerserPlugin 이나 minimizer 에 따로 정의된 plugin 을 사용해서 번들한 파일을 최소화 할지 결정합니다. minimizer 는 TerserPlugin 을 커스터마이징 하거나 기본 값으로 minimize 에 사용될 minimizer 를 설정합니다. 여기서는 TerserPlugin 커스터마이징과 OptimizeCSSAssetsPlugin 을 추가해서 사용했네요. splitChunks 는 청크 파일에서 중복되는 모듈을 모으는 역할을 합니다. runtimeChunk 를 true 나 설정을 하면 런타임만 포함하는 각 진입점에 청크가 추가됩니다.

- resolve: 이 옵션은 모듈을 해석하는데 관여합니다. 모듈을 해석할 때 modules 로 먼저 탐색할 폴더를 지정할 수 있습니다. extensions 로 .ts , .jsx 와 같은 확장자를 관리할 수 있습니다. 여기서는 paths.js/moduleFileExtensions 로 관리하고 있습니다. alias 는 모듈에 별명을 주어서 간단하게 import , require 를 할 수 있습니다. plugins 는 모듈 해석에 대한 plugin 입니다.

- resolveLoader: resolve 와 같은 속성을 갖지만 resolveLoader는 loader 모듈만 해석합니다.

- module: loader 를 설정하는 부분입니다. strictExportPresence 는 경고 대신 에러를 보냅니다. rules 로 loader를 설정합니다.

- plugins: plugin을 설정합니다.

- node: 노드 객체를 설정합니다. true, false, empty, mock 값으로 객체를 설정할 수 있습니다. true 는 polyfill 을 제공합니다. false 는 어떤 것도 반환하지 않습니다. empty 는 빈 객체, mock 은 mock 객체를 반환합니다.

1. yarn eject
- react app에서 eject를 실행하면 숨겨져있던 파일이 꺼내져서 config 와 scripts 폴더가 생기고 package.json 파일이 모든 dependency 와 babel, jest 설정 코드가 드러납니다

