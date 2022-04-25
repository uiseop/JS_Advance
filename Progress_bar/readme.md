# Progress Bar

## 목차

<ul>
<li><a href="#scroll">Json-server</a></li>
</ul>

> 블로그들을 보면 해당 페이지 내에 현재 내가 보고있는 부분이 페이지의 어디쯤인지 알려주는 바가 있어 한번 구현해본다.

https://ko.javascript.info/size-and-scroll

### <a id="scroll">요소 사이즈와 스크롤</a>

![요소 사이즈와 스크롤](https://media.vlpt.us/images/wiostz98kr/post/dec62e7b-1432-4db2-8154-8539fb0b3689/image.png)

- 자바스크립트로 요소 사이즈나 스크롤 높이 등을 알 수 있음
- 주황색 보더를 기준
  - 보더 바깥쪽: offsetTop, offsetLeft
  - 보더 사이: clientTop, clinetLeft
  - 콘텐츠: clientWidth, clientHeight
  - 보더 포함한 콘텐츠: offsetWidth, offsetHeight
  - 콘텐츠의 전체 길이: scrollHeight
  - 스크롤바의 수직 위치: scrollTop