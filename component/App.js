import html from '../core.js'
import { connect } from '../store.js'
import Header from './Header.js'
import TodoList from './TodoList.js'
import Footer from './Footer.js'


function App({Todos}) { 

    
    return html `
    <section class="todoapp">
        ${Header()}
        ${Todos.length > 0 && TodoList()}
        ${Todos.length > 0 && Footer()}
    </section>
        
    `
 }

 export default connect()(App)