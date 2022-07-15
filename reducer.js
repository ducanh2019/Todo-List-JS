import storage from "./util/storage.js"

const init = {
    Todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null,
}

const actions = {
    add({ Todos }, title) {
        if (title) {
            Todos.push({ title, completed: false })
            storage.set(Todos)
        }
    },
    toggle({ Todos }, index) {
        const todo = Todos[index]
        todo.completed = !todo.completed
        storage.set(Todos)
    },
    toggleAll({ Todos }, completed) {
        Todos.forEach(element => {
            element.completed = completed
        });
    },
    destroy({ Todos }, index) {
        Todos.splice(index, 1)
        storage.set(Todos)
    },
    switchFilter(state, filter) {
        state.filter = filter
    },
    clearCompleted(state) {
        state.Todos = state.Todos.filter(state.filters.active)
        storage.set(state.Todos)
    },
    startEdit(state, index) {
        state.editIndex = index
    },
    endEdit(state, title) {
        if (state.editIndex !== null) {
            if (title) {
                state.Todos[state.editIndex].title = title
                storage.set(state.Todos)
            } else {
                this.destroy(state, state.editIndex)
            }
            state.index = null


        }
    },
    cancelEdit(state) {
        state.editIndex = null
    }

}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}