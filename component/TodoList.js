import html from '../core.js'
import { connect } from '../store.js'
import TodoItem from './TodoItem.js'


function TodoList({ Todos, filters, filter }) {
    
    return html`
    <section class="main">
        <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            onchange="dispatch('toggleAll', this.checked)"
            ${Todos.every(filters.completed) && 'checked'}
            >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            ${Todos
                .filter(filters[filter])
                .map((todo, index) => 
                    TodoItem({ todo, index })
                )}
        </ul>
    </section>
    `
}

export default connect()(TodoList)