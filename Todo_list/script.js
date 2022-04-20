(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $todos = get(".todos");
    const $form = get(".todo_form");
    const $todoInput = get(".todo_input");

    const API_URL = "http://localhost:3000/todos";

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
                      <i class="far fa-edit"></i>
                    </button>
                    <button class="todo_remove_button">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                  <div class="item_buttons edit_buttons">
                    <button class="todo_edit_confirm_button">
                      <i class="fas fa-check"></i>
                    </button>
                    <button class="todo_edit_cancel_button">
                      <i class="fas fa-times"></i>
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
        fetch(API_URL)
            .then((res) => res.json())
            .then((todos) => renderAllTodos(todos))
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
        if (e.target.className === "todo_edit_button") {
            $label.style.display = "none";
            $editInput.style.display = "block";
            $contentButtons.style.display = "none";
            $editButtons.style.display = "flex";
            $editInput.focus();
            $editInput.value = "";
            $editInput.value = value;
        }

        if (e.target.className === "todo_edit_cancel_button") {
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
        if (e.target.className === "todo_edit_confirm_button") {
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
        if (e.target.className === "todo_remove_button") {
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
