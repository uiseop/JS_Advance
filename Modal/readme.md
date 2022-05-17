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