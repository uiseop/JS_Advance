(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $content = get(".content")

    const onscroll = () => {
        console.log("offsetTop: ", $content.offsetTop)
        console.log("scrollTop: ", $content.scrollTop)
        console.log("scrollHeight: ", $content.scrollHeight)
        console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight)
        
    }

    window.addEventListener("scroll", () => onscroll())

})();
