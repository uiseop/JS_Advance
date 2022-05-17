# Modal 기능을 적용한 페이지를 제작한다

-   live server를 사용하지 않고, webpack을 사용해본다.
-   sass를 같이 사용해본다.

## webpack 설치 및 실행

### 1) 웹팩 설치하기

우선 로컬에 웹팩을 설치한다. webpack을 터미널에서 명령어로 실행하기 위해 `package.json`을 만들어줘야 한다. 배포할 떄 필요한 패키지가 아니라 개발할 때 필요한 패키지이기 때문에 `-D(대문자)` 옵션 또는 `--save-dev` 옵션을 붙여준다(둘이 같다.). 그러면 package.json에 `dependencies`가 아닌 `devDependencies`에 추가가 된 것을 확인할 수 있다.

```bash
npm init
npm i -d webpack webpack-cli
```

```json
"dependencies": {},
"devDependencies": {
  "webpack": "^5.4.0",
  "webpack-cli": "^4.2.0"
},
...
```
