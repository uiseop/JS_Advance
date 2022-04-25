(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const getAll = (target) => {
        return document.querySelectorAll(target);
    };

    const $todos = get(".todos");
    const $form = get(".todo_form");
    const $todoInput = get(".todo_input");
    const $pagination = get(".pagination");

    const API_URL = "http://localhost:3000/todos";
    let currentPage = 1;
    const limit = 5;
    const pageCount = 5;
    let totalCount;
    let totalPage;

    const pagination = () => {
        $pagination.innerHTML = "";
        const pageGroup = Math.ceil(currentPage / pageCount);
        let prev = null;
        let next = null;
        let lastNumber = pageGroup * pageCount;
        if (lastNumber > totalPage) {
            lastNumber = totalPage;
        }
        let firstNumber = (pageGroup - 1) * pageCount + 1;
        if (currentPage !== 1) {
            prev = `<button class="prev" data-fn="prev">이전</button>`;
        }
        // console.log("firstNumber: ", firstNumber, "lastNumber: ", lastNumber);
        currentPage > pageCount ? ($pagination.innerHTML += prev) : "";
        for (let idx = firstNumber; idx < lastNumber + 1; idx++) {
            // console.log(idx, currentPage, "why?!?!");
            const button =
                idx === currentPage
                    ? `<button class="active">${idx}</button>`
                    : `<button>${idx}</button>`;
            $pagination.innerHTML += button;
        }
        if (currentPage < totalPage) {
            next = `<button class"next" data-fn="next">다음</button>`;
        }
        next ? ($pagination.innerHTML += next) : "";
        const $currentPageButtons = getAll(`.pagination button`);
        // console.log($currentPageButtons)
        $currentPageButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (button.dataset.fn === "prev") {
                    currentPage = (pageGroup - 2) * 5 + 1;
                } else if (button.dataset.fn === "next") {
                    currentPage = pageGroup * 5 + 1;
                } else {
                    currentPage = Number(button.innerText);
                }
                // console.log("currentPage: ", currentPage, pageGroup);
                getTodos();
            });
        });
    };

    const createTodoElement = (todo) => {
        const { id, content, completed } = todo;
        const isChecked = completed ? "checked" : "";
        const $todoItem = document.createElement("li");
        $todoItem.classList.add("todo");
        $todoItem.dataset.id = id;
        $todoItem.innerHTML = `
            <div class="content">
                    <input type="checkbox" class="todo_checkbox" ${isChecked} >
                    <label>${content}</label>
                    <input class="todo_input" type="text" value="${content}">
                </div>
                <div class="item_buttons content_buttons">
                    <button class="todo_edit_button">
                      <i class="far fa-edit edit"></i>
                    </button>
                    <button class="todo_remove_button">
                      <i class="far fa-trash-alt remove"></i>
                    </button>
                  </div>
                  <div class="item_buttons edit_buttons">
                    <button class="todo_edit_confirm_button">
                      <i class="fas fa-check confirm"></i>
                    </button>
                    <button class="todo_edit_cancel_button">
                      <i class="fas fa-times cancel"></i>
                    </button>
                  </div>
        `;
        return $todoItem;
    };

    const renderAllTodos = (todos) => {
        $todos.innerHTML = "";
        todos.forEach((todo) => {
            const todoElement = createTodoElement(todo);
            // console.log(todoElement)
            $todos.appendChild(todoElement);
        });
    };

    const getTodos = () => {
        fetch(`${API_URL}?_page=${currentPage}&_limit=${limit}`)
            .then((res) => {
                // console.log(res.headers.entries());
                const response = [...res.headers];
                totalCount = response[6][1];
                totalPage = Math.ceil(totalCount / limit);
                pagination();
                return res.json();
            })
            .then((todos) => {
                // console.log(todos);
                return renderAllTodos(todos);
            })
            .catch((err) => console.error(err));
    };

    const addTodo = (e) => {
        e.preventDefault();
        console.log($todoInput.value);
        const todo = {
            content: $todoInput.value,
            completed: false,
        };
        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(getTodos())
            .then(() => {
                $todoInput.value = "";
                $todoInput.focus();
            })
            .catch((err) => console.error(err));
    };

    const toggleTodo = (e) => {
        // console.log(e.target.className)
        if (e.target.className !== "todo_checkbox") return;
        const completed = e.target.checked;
        const $todo = e.target.closest(".todo");
        const id = $todo.dataset.id;
        fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ completed }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(getTodos())
            .catch((err) => console.error(err));
    };

    const changeMode = (e) => {
        const $todo = e.target.closest(".todo");
        const $label = $todo.querySelector("label");
        const $editInput = $todo.querySelector(".todo_input");
        const $contentButtons = $todo.querySelector(".content_buttons");
        const $editButtons = $todo.querySelector(".edit_buttons");
        const value = $editInput.value;
        if (
            e.target.className === "todo_edit_button" ||
            e.target.classList[2] === "edit"
        ) {
            $label.style.display = "none";
            $editInput.style.display = "block";
            $contentButtons.style.display = "none";
            $editButtons.style.display = "flex";
            $editInput.focus();
            $editInput.value = "";
            $editInput.value = value;
        }

        if (
            e.target.className === "todo_edit_cancel_button" ||
            e.target.classList[2] === "cancel"
        ) {
            $label.style.display = "block";
            $editInput.style.display = "none";
            $contentButtons.style.display = "flex";
            $editButtons.style.display = "none";
            $editInput.value = $label.innerText;
        }
    };

    const editTodo = (e) => {
        const $todo = e.target.closest(".todo");
        const id = $todo.dataset.id;
        const $input = $todo.querySelector(".todo_input");
        const content = $input.value;
        const $label = $todo.querySelector("label");
        const $editInput = $todo.querySelector(".todo_input");
        const $contentButtons = $todo.querySelector(".content_buttons");
        const $editButtons = $todo.querySelector(".edit_buttons");
        if (
            e.target.className === "todo_edit_confirm_button" ||
            e.target.classList[2] === "confirm"
        ) {
            if (content === $label.innerText) {
                $label.style.display = "block";
                $editInput.style.display = "none";
                $contentButtons.style.display = "flex";
                $editButtons.style.display = "none";
                $editInput.value = $label.innerText;
                return;
            }
            fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ content }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(getTodos())
                .catch((error) => console.error(error));
        }
    };

    const removeTodo = (e) => {
        const $todo = e.target.closest(".todo");
        const id = $todo.dataset.id;
        if (
            e.target.className === "todo_remove_button" ||
            e.target.classList[2] === "remove"
        ) {
            fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            })
                .then(getTodos)
                .catch((err) => console.error(err));
        }
    };

    const init = () => {
        window.addEventListener("DOMContentLoaded", () => {
            getTodos();
        });
        $form.addEventListener("submit", addTodo);
        $todos.addEventListener("click", toggleTodo);
        $todos.addEventListener("click", changeMode);
        $todos.addEventListener("click", editTodo);
        $todos.addEventListener("click", removeTodo);
    };

    init();
})();
