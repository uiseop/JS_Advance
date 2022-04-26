# infinite scroll

> 이번에는 `Debounce`의 가장 유명한 예시인 무한 스크롤을 구현해보자.

## 목차

-   <a href="#api">API 연동</a>
-   <a href="problem">문제 기록</a>

-   무한스크롤 구현
-   컨텐츠의 끝이 화면 끝에 닿으면 api가 호출되게 구현
-   todolist 와 달리 외부 api 연동
-   fetch, async, await

## <a id="api">API 연동</a>

https://jsonplaceholder.typicode.com/

-   프로토타이핑용 api
-   /posts 활용
-   [json-server](https://www.npmjs.com/package/json-server) 만든 곳에서 만들었기 때문에 사용 방법은 json-server와 동일

## <a id="problem">문제 기록</a>
