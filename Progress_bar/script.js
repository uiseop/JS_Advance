(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $progressBar = get(".progress_bar");

    const onscroll = () => {
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop;
        const width = (scrollTop/height) * 100
        // console.log(width)

        $progressBar.style.width = width + "%";
    };

    window.addEventListener("scroll", () => onscroll());
})();
