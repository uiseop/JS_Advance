(function () {
    const get = (target) => {
        return document.querySelector(target);
    };

    const $todos = get(".todos");
    const API_URL = "http://localhost:3000/todos";

    const createTodoElement = (todo) => {
        const { id, content, completed } = todo;
        const isChecked = completed ? "checked" : "";
        const $todoItem = document.createElement("li");
        $todoItem.classList.add("todo");
        $todoItem.dataset.id = id;
        $todoItem.innerHTML = `
            <div class="content">
                    <input type="checkbox" class="todo_checkbox" >
                    <label>${content}</label>
                    <input hidden type="text" value="${content}">
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
            console.log(todoElement)
            $todos.appendChild(todoElement);
        });
    };

    const getTodos = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((todos) => renderAllTodos(todos))
            .catch((err) => console.error(err));
    };

    const init = () => {
        window.addEventListener("DOMContentLoaded", () => {
            getTodos();
        });
    };

    init();
})();
