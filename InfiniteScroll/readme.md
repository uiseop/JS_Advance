# infinite scroll

> 이번에는 `Debounce`의 가장 유명한 예시인 무한 스크롤을 구현해보자.
-   무한스크롤 구현
-   컨텐츠의 끝이 화면 끝에 닿으면 api가 호출되게 구현
-   todolist 와 달리 외부 api 연동
-   fetch, async, await

<hr/>
## 목차

-   <a href="#api">API 연동</a>
-   <a href="#problem">문제 기록</a>


## <a id="api">API 연동</a>

https://jsonplaceholder.typicode.com/

-   프로토타이핑용 api
-   /posts 활용
-   [json-server](https://www.npmjs.com/package/json-server) 만든 곳에서 만들었기 때문에 사용 방법은 json-server와 동일

## <a id="problem">문제 기록</a>

### Script에서 한번에 Element추가하기 - CSS안먹힘

```javascript
const loadPost = async () => {
    const posts = await getPost();
    console.log(posts);
    for (let post of posts) {
        let html = `<li class="item">
                <div className="header">
                <span className="index">${post.id}.</span>
                <h2 className="item_title">${post.title}</h2>
                </div>
                <p className="desc">${post.body}</p>
            </li>`;
        $items.innerHTML += html;
    }
};
```
해당 코드를 적용해서 `$items`에 불러온 post들을 작성한 css의 class에 맞게 작성해서 `$items.innerHTML`에 넣어주었는데 CSS가 적용되지 않는 문제가 발생..

➡️ ...VScode에서 제공해주는 자동완성 기능을 너무 믿었던 나머지 실수를 범함... `className`이 아니라 `class`라고 작성해야하는것을..ㅎ..ㅎ.. 아 .. ㅎㅎ😂😂