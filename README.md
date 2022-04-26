# 간단한 프로젝트 제작하면서 JS를 익혀보자.
## 목차
- <a href="#todo">Todo List</a>
- <a href="#progress">Progress bar</a>
- <a href="#infinite">Infinite Scroll</a>

# <a id="todo" href="https://github.com/uiseop/JS_Advance/tree/main/Todo_list">Todo List</a>
- 투두리스트 구현
- 백단의 DB 및 API들을 직접 제작하지 않고 저번에 잠깐 사용해봤던 `json-server`를 활용해서 로컬에 REST API 구축 및 연동
- 기본적인 데이터 처리인 생성, 읽기, 수정, 삭제(`CRUD`)를 구현해보면서 JS 메서드 사용법들을 복기시켜본다.

## 사용 기술 스택
- HTML/CSS/Javascript
- Sass (이번에 배워서 써먹어보자)👍
- fetch API ➡️ AJAX 요청을 하기 위한 기술로 최신 기술이면서 내장된 fetch API를 사용한다 ( react에선 axios를 썼었지 )
- json-server를 사용한 REST API
    - response의 header에 있는 `X-Total-Count`의 값을 통한 pagination 구현.
- HTML의 Dataset 사용하여 좀더 편리하게 HTML과 Javascript간의 통신👍

# <a href="https://github.com/uiseop/JS_Advance/tree/main/Progress_bar">Progress bar</a>
- Scroll에 따른 Progressbar 생성하기
- window객체의 `innerWidth`, `innerHeight`프로퍼티와, document.documentElement의 `clientWidth`, `clientHeight`의 차이점을 알 수 있을것이다.

## 사용 기술 스택
- 간단 프로젝트인 만큼 기술(?)이랄것은 없을 것 같고, Fixed랑 더불어 계산식정도..?
- Web API중 하나인 Window.innerHeight를 사용할것같다.
- throttle과 debounce 중 `Throttle` 적용

# <a href="https://github.com/uiseop/JS_Advance/tree/main/InfiniteScroll">Infinite Scroll</a>
- `debounce`를 적용한 무한 스크롤 구현해보기
- 페이지네이션과 비슷하게 한번에 모든 item들을 불러오는것이 아닌, 스크롤이 하단에 닿았을 경우, get요청을 통해 다음 페이지의 item들을 받아오는 기술
- `debounce`를 적용하여서 처음 호출 이후로 호출하는 동안의 모든 요청은 `block`시키도록 해본다.

## 사용 기술 스택
- jsonplaceholder: json-server에서 만든 `Free fake API`, 프로토타이핑용 api라고 한다.
- Debounce: 네트워크 최적화 기술 중 하나로, 이벤트가 발생하면 일정시간동안의 같은 이벤트는 처리하지 않도록 함.
- Promise, async/await를 사용해본다