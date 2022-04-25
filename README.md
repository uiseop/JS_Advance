# 간단한 프로젝트 제작하면서 JS를 익혀보자.

# <a href="https://github.com/uiseop/JS_Advance/tree/main/Todo_list">Todo List</a>
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
- 블로그들을 보면 해당 페이지 내에 현재 내가 보고있는 부분이 페이지의 어디쯤인지 알려주는 바가 있어 한번 구현해본다.

## 사용 기술 스택
- 간단 프로젝트인 만큼 기술(?)이랄것은 없을 것 같고, Fixed랑 더불어 계산식정도..?
- Web API중 하나인 Window.innerHeight를 사용할것같다.