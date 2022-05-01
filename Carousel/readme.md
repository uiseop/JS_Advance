# Carousel 구현

> 홈페이지 상단에 위치하는 광고 배너, 혹은 이미지 슬라이더를 구현해본다.

## Todo
- 버튼들을 클릭하여서 이미지를 전환한다
- 현재 이미지가 몇 번째 이미지인지 알려준다
- 모바일처럼 스크롤을 통해 이미지를 넘겨준다

## <a id="problem">문제 기록</a>

### CSS디자인 생각하기

처음에는 `display: flex`구조를 생각해서 한 줄로 이미지들을 모두 늘여뜨린 다음에 하나씩 옆으로 불러오려고 했었는데 그렇게 되면 마지막에서 첫번째로 돌아갈 떄 연속적이지 않은? 끊기는? 느낌이 들 것 같다는 생각으로 다른 사람의 코드를 참조하니

➡️ 해결:
```css
.carousel {
    position: absolute;
    width: 100%;
    z-index: 0;
}
```
으로 해줌으로써 `.active`된 아이템들만 z-index값과 opacity를 변경시켜줌으로써 연속적인것처럼 보이게 한 것 같다.

### className 명명하기

```javascript
const moveCarouselTo = () => {
    let prev = current === 0 ? totalItems - 1 : current - 1;
    let next = current === totalItems - 1 ? 0 : current + 1;
    console.log(`prev: ${prev}, current: ${current}, next: ${next}`);
    for (let i = 0; i < totalItems; i++) {
        if (i === current) {
            items[i].classList.add("active");
        } else if (i === prev) {
            items[i].classList.add("prev");
        } else if (i === next) {
            items[i].classList.add("next");
        } else {
            items[i].className = "item";
        }
    }
};

/* outputs 
버튼을 누를때마다 active, prev, next가 추가되고 없애는 과정이 없기에 클래스명이 많아짐
*/
```

➡️ 해결: className에 따른 로직에 이상이 생겨 items[i].className = "item"을 추가해줌
