(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $items = get(".items");
    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    const limit = 10;
    const page = 1;

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
        console.log(posts)
        for (let post of posts) {
            let html = `<li class="item">
                <div className="header">
                <span className="index">${post.id}.</span>
                <h2 className="item_title">${post.title}</h2>
                </div>
                <p className="desc">${post.body}</p>
            </li>`
            $items.innerHTML += html;
        }
    };

    window.addEventListener("DOMContentLoaded", () => {
        loadPost();
    });
})();
