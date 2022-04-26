(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $items = get(".items");
    const $loader = get(".loader");
    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    const limit = 10;
    let page = 1;
    let timerId;
    let end;

    const getPost = async () => {
        try {
            const response = await fetch(
                `${API_URL}?_limit=${limit}&_page=${page}`
            );

            for (let pair of response.headers.entries()) {
                if (pair[0] === "x-total-count") {
                    end = pair[1];
                }
            }
            // if (!response.ok) {
            //     throw new Error("에러가 발생했습니다.")
            // }
            return await response.json();
        } catch (err) {
            console.error(`에러가 발생했습니다. ${err}`);
        }
    };

    const loadPost = async () => {
        try {
            $loader.classList.add("show");
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
        } catch (err) {
            console.error(err);
        } finally {
            $loader.classList.remove("show");
            timerId = null;
        }
    };

    const isEndScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement;
        if (limit * page >= end) {
            console.log("It's Finish!!");
            window.removeEventListener("scroll", onScroll);
            return;
        }
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            console.log("wow you in last");
            page += 1;
            loadPost();
            return;
        }
        timerId = null;
    };

    const throttle = (callback, time) => {
        if (!timerId) {
            timerId = setTimeout(() => {
                callback();
            }, time);
        }
    };

    const onScroll = () => {
        throttle(isEndScroll, 100);
    };

    window.addEventListener("DOMContentLoaded", () => {
        loadPost();
        window.addEventListener("scroll", onScroll);
    });
})();
