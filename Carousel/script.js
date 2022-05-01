(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const setCarousel = () => {
        const carousel = get(".carousel");
        const dots = get(".dots");
        const items = carousel.querySelectorAll(".item");
        const totalItems = items.length;

        for (let dot=0; dot < totalItems; dot++) {
            const dotElement = document.createElement("div")
            dotElement.className = "dot";
            if (dot === 0) {
                dotElement.classList.add("active")
            }
            dots.appendChild(dotElement);
        }
        const dotItems = dots.querySelectorAll(".dot")
        let current = 0;
        items[current].classList.add("active")
        items[1].classList.add("next")
        items[totalItems - 1].classList.add("prev")
        


        const prevButton = get(".carousel_button.prev");
        const nextButton = get(".carousel_button.next");

        prevButton.addEventListener("click", () => {
            movePrev();
        });

        nextButton.addEventListener("click", () => {
            moveNext();
        });

        const movePrev = () => {
            if (current === 0) {
                current = totalItems - 1;
            } else {
                current -= 1;
            }
            moveCarouselTo();
        };

        const moveNext = () => {
            current = (current + 1) % totalItems;
            moveCarouselTo();
        };

        const moveCarouselTo = () => {
            let prev = current === 0 ? totalItems - 1 : current - 1;
            let next = current === totalItems - 1 ? 0 : current + 1;
            console.log(`prev: ${prev}, current: ${current}, next: ${next}`);
            for (let i = 0; i < totalItems; i++) {
                if (i === current) {
                    dotItems[i].classList.add("active")
                    items[i].className = "item"
                    items[i].classList.add("active");
                } else if(i === prev) {
                    items[i].className = "item"
                    items[i].classList.add("prev")
                    dotItems[i].className = "dot"
                } else if(i === next) {
                    items[i].className = "item"
                    items[i].classList.add("next")
                    dotItems[i].className = "dot"
                } else {
                    items[i].className = "item"
                    dotItems[i].className = "dot"
                }
            }
        };
    };

    document.addEventListener("DOMContentLoaded", () => {
        setCarousel();
    });
})();
