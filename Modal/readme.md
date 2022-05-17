# Modal 기능을 적용한 페이지를 제작한다

-   live server를 사용하지 않고, webpack을 사용해본다.
-   sass를 같이 사용해본다.

## webpack 설치 및 실행

### 1) 웹팩 설치하기

우선 로컬에 웹팩을 설치한다. webpack을 터미널에서 명령어로 실행하기 위해 `package.json`을 만들어줘야 한다. 배포할 떄 필요한 패키지가 아니라 개발할 때 필요한 패키지이기 때문에 `-D(대문자)` 옵션 또는 `--save-dev` 옵션을 붙여준다(둘이 같다.). 그러면 package.json에 `dependencies`가 아닌 `devDependencies`에 추가가 된 것을 확인할 수 있다.

```bash
# 터미널 명령어
npm init
npm i -d webpack webpack-cli
```

```json
// package.json
"dependencies": {},
"devDependencies": {
  "webpack": "^5.4.0",
  "webpack-cli": "^4.2.0"
},
...
```

### 2) 웹팩 실행하기

설치를 마쳤으면 아래 명령어를 참고해서 웹팩을 실행해보자.  

실행 시 필요에 따라 `--mode` 옵션을 줄 수 있다. "development", "production", "none" 세 가지 값을 정할 수 있다. 환경변수(`webpack.config.js`)에 있는 DefinePlugin을 "development"또는 "production"으로 바꾸고 웹팩이 각 모드에 맞는 빌트인 최적화를 할 수 있도록 한다. "none"으로 지정하면 최적화를 허용하지 않는다. 별도로 지정하지 않으면 기본값인 "production" 모드로 실행된다.  

webpack.config.js 파일에서 mode: "development"로 지정할 수 있는데, 개발과 배포 버전을 번갈아가면서 실행하기 위해서는 CLI에서 옵션을 지정해주는 방법이 낫겠다.

```bash
# 터미널 명령어
npx webpack --mode development
# 또는
node_modules/.bin/webpack --mode development
```

(굳이 npm을 통해 webpackd을 설치해뒀으면서 npx로 실행하는것은 아무래도 협업을 위해서겠지..?)

### 3) Entry, Output, Loader, Plugin 설정

다음 해야 할 일은 웹팩의 4가지 핵심 개념을 이해하는 것이다. 실제로 웹팩 공식 홈페이지에서 `Entry`, `Output`, `Loader`, `Plugin`을 Core Concepots라고 소개한다.

#### 3-1) Entry 설정

webpack은 번들링 과정에서 "디펜던시 그래프(dependency graph)"를 그린다. 특정 지점에서 출발하여, 애플리케이션에 필요한 모든 모듈을 포함하는 그래프를 재귀적으로 완성해 나간다. 한 파일이 다른 파일을 필요로 하면 이를 "디펜던시(dependency)"가 있다고 해석하는데, 이 방식으로 웹팩은 이미지 또는 웹 글꼴과 같이 코드가 아닌 리소스도 디펜던시로 관리할 수 있게 된다. 

> ex) 가령 index.html안에 이미지나 정적인 파일들이 있으면 디펜던시가 있는것!

그래프를 모두 그리고 나면 이 모든 모듈을 소수의 번들로 묶어서 (보통 하나의 번들로 묶는다) 브라우저에 로드될 준비를 마친다.

이때 우리는 webpack이 어디를 출발지점으로 해서 그려나가면 좋을지 알려주어야 한다. config파일에서 entry 속성을 설정해서 웹팩이 어떤 모듈로부터 시작해서 디펜던시 그래프를 그려나갈지 명시해줄 수 있다. 'entry' 속성의 기본값은 './src/index.js'이지만 다른 Entry Point를 지정할 수도 있다. (여러 개도 지정 가능)

```javascript
const config = {
    entry: "./src/js/index.js",
}
```