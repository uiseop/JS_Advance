(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $items = get(".items");
    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    const limit = 10;
    let page = 1;
    let timerId;

    const getPost = async () => {
        try {
            const response = await fetch(
                `${API_URL}?_limit=${limit}&_page=${page}`
            );
            // if (!response.ok) {
            //     throw new Error("에러가 발생했습니다.")
            // }
            return await response.json();
        } catch (err) {
            console.error(`에러가 발생했습니다. ${err}`);
        }
    };

    const loadPost = async () => {
        const posts = await getPost();
        // console.log(posts);
        for (let post of posts) {
            let html = `<li class="item">
                <div class="header">
                <span class="index">${post.id}.</span>
                <h2 class="item_title">${post.title}</h2>
                </div>
                <p class="desc">${post.body}</p>
            </li>`;
            $items.innerHTML += html;
        }
    };

    const isEndScroll = () => {
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement
        console.log(scrollTop, scrollHeight, clientHeight)
        if(scrollTop + clientHeight >= scrollHeight) {
            console.log("wow you in last")
            page += 1;
            loadPost();
        }
    }

    const throttle = (callback, time) => {
        if (!timerId) {
            timerId = setTimeout(() => {
                timerId = null;
                callback()
            }, time);
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        loadPost();
        window.addEventListener("scroll", () => throttle(isEndScroll, 100))
    });
})();
