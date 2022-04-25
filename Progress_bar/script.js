(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $progressBar = get(".progress_bar");
    let timer;
    
    const throttle = (callback, time) => {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                callback();
            }, time)
        }
        return
    }

    const onscroll = () => {
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop;
        const width = (scrollTop/height) * 100
        console.log(width)

        $progressBar.style.width = width + "%";
    };

    window.addEventListener("scroll", () => throttle(onscroll, 100));
})();
