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

#### 3-2) Output 설정

output은 웹팩이 번들을 꾸리고 나서 `결과물`을 어디로 내보낼지 지정하는 속성이다. 기본값으로 메인 결과물인 main.js 파일은 `./dist/main.js`에, 그 외 파일은 `./dist`폴더에 내보내진다. 파일 이름(file name), 경로(path),를 별도로 지정할 수 있고, clean을 true로 설정하면 지정한 결과물이 내보내지는 디렉토리안에 사용하지 않는 파일을 알아서 정리해준다. 이 외에도 수많은 커스텀 옵션을 설정할 수 있다고 한다.

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  output: {
    filename: 'main.js',
    path: path.resolve(dirname, 'dist'),
    clean: true
  },
};
```

#### 3-3) Loader 설정하기 

이제까지 자바스크립트 외의 리소스도 번들링할 수 있다고 했지만, 사실 웹팩은 기본적으로 JavaScript와 JSON 파일만 이해할 수 있다. 이 때 필요한 것이 Loader이다. 사용하려는 포맷에 대응하는 Loader를 설정해주면 다른 포맷의 리소스도 디펜던시 그래프에 추가할 수있게 된다. 

Loader를 설정하려면 'test'와 'use' 두 가지 필수 속성을 적어주어야 한다. 'test'는 어떤 파일을 변환할지 지정하는 속성으로, 보통 /\.txt$/과 같이 정규표현식으로 작성한다. 이 때, /\.txt$/ 과 같이 따옴표 없이 작성해야한다. '/\.txt$/' 또는 "/\.txt$/"와 같이 따옴표를 넣으면 빌드가 제대로 안될 것이다,,, 'use'는 파일을 변환할 때 어떤 로더를 사용해야하는지 명시하는 속성이다.이는 웹팩 컴파일러에게 다음과 같이 말하는 것과 같다.

> 웹팩 컴파일러야!
> 디펜던시 그래프를 그리다가 'test'에 지정된 파일형식을 발견하잖아?
> 그러면 번들에 넣기 전에 내가 'use'에 지정한 로더로 꼭 변환해줘야해~!

이렇게 Loader를 설정해주면 포맷에 얽매이지 않은 자유로운 import가 가능하다. 예를 들어 js파일에서 `import '../css/index.css';`과 같이 해당 모듈에서 필요한 css파일을 import해올 수 있다. 웹팩을 사용하기 전에는 상상할 수 없었던 일이다! 이 기능은 다른 번들러에서는 지원되지 않을 수도 있다고 한다. 

주의할 점은 config에 바로 rules 속성을 쓰는게 아니라 반드시 module.rules에 정의해 주어야 한다는 것이다. (틀리면 웹팩이 알아서 경고해주기는 한다.)

#### 3-4) Plugin 설정하기

바닐라 자바스크립트 프로젝트에서 꼭 필요한 두 가지 Plugin만 설정해보자. (주요 플러그인 리스트는 <a href="https://webpack.js.org/plugins/">여기</a>서 확인할 수 있다.)

<a href="https://webpack.js.org/plugins/html-webpack-plugin/">html-webpack-plugin</a>을 사용하면 dist의 main.js를 스크립트 파일로 포함하는 HTML 문서를 dist 디렉토리 내에 자동으로 생성해준다. template에 원본으로 사용할 HTML문서 경로를 넣어주면 된다. 이 플러그인을 사용하지 않고 빌드하면 dist 디렉토리에 .html 파일이 생성되지 않고, 따라서 dist 디렉토리 내의 빌드 결과물 만으로는 렌더할 수 없다.  

<a href="https://webpack.js.org/plugins/mini-css-extract-plugin/">mini-css-extract-plugin</a>를 사용하면 빌드 결과 JS파일에서 스타일시트를 분리해서 CSS 파일을 따로 만들어준다. 크기가 큰 하나의 파일을 받는 것보다 작은 여러 개의 파일을 다운로드 하는 것이 성능상 유리하기 때문에, 배포 시에는 분리하는 것이 좋다. 

```bash
# 터미널 명령어
npm i -D html-webpack-plugin mini-css-extract-plugin
```

```javascript
// webpack.config.js
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }), 
    new MiniCssExtractPlugin()
  ],
};
```

### Webpack.config.js 설정

#### 바벨 

바벨은 ES6+ 문법으로 작성된 js파일을 ES5 문법으로 트랜스파일링 해준다.  

```bash
# 터미널 명령어
npm i -D babel-loader @babel/core @babel/preset-env
npm i core-js regenerator-runtime
```

```javascript
// webpack.config.js
const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|pages)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```

#### CSS 

```bash
# 터미널 명령어
npm i -D css-loader
```

```javascript
// webpack.config.js
const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { import: true },
          },
        ],
      },
    ],
  },
};
```

#### 이미지 설정

```javascript
const config = {
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
};
```

### 웹팩 dev-server 설정

코드를 수정했을 때 다시 빌드하고 새로고침 하지 않아도 바로바로 빌드 결과를 확인할 수 있는 dev-server를 설정해보자.

```bash
# 터미널 명령어
npm i -D webpack-dev-server
```

```javascript
const config = {
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  devServer: {
    contentBase: path.resolve(dirname, 'dist'),
    compress: true,
    hot: false,
    historyApiFallback: true,
    liveReload: true,
    open: true,
    port: 5500,
    watchContentBase: true,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
};
```

설정을 마치면 package.json에 script(명령어)를 추가해보자.

```javascript
// package.json

"scripts": {
  "start": "webpack serve --mode=production",
  "start:dev": "webpack serve --mode=development",
  "build": "webpack --mode=production",
  "build:dev": "webpack --mode=production",
},
```

## 전체 코드 보기

```javascript
// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|pages)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { import: true },
          },
        ],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }), new MiniCssExtractPlugin()],
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  devServer: {
    contentBase: path.resolve(dirname, 'dist'),
    compress: true,
    hot: false,
    historyApiFallback: true,
    liveReload: true,
    open: true,
    port: 5500,
    watchContentBase: true,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
};

export default config;
```

```javascript
// babel.js
{
  "presets": [
    [
      "@babel/env",
      {
        "useBuiltIns": "usage",
        "corejs": "3.9"
      }
    ]
  ]
}
```

```javascript
// package.json
{
  ...
  "main": "src/js/index.js",
  "license": "MIT",
  "type": "module",
  "engines": {
    "node": ">=14"
  },
  "scripts": {
    "start": "webpack serve --mode=production",
    "start:dev": "webpack serve --mode=development",
    "build": "webpack --mode=production",
    "build:dev": "webpack --mode=production",
  },
  "dependencies": {
    "core-js": "^3.9.1",
    "regenerator-runtime": "^0.13.7"
  },
  "devDependencies": {
    "@babel/core": "^7.13.10",
    "@babel/preset-env": "^7.13.10",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.1.3",
    "cypress": "^6.7.1",
    "html-webpack-plugin": "^5.3.1",
    "mini-css-extract-plugin": "^1.3.9",
    "webpack": "^5.26.0",
    "webpack-cli": "^4.5.0",
    "webpack-dev-server": "^3.11.2"
  },
}
```