import State from './features/todos/state'
import TodoList from './features/todos/component/ToDoList'
import AddTodo from './features/todos/component/AddTodo'

function init() {
  const state = new State()

  const ToDoListComponent = new TodoList('.todo-list ul', state, 'todos')
  const DoneListComponent = new TodoList('.dones ul', state, 'dones')
  const AddTodoComponent = new AddTodo('.inout', state)

  ToDoListComponent.mount()
  DoneListComponent.mount()
  AddTodoComponent.mount()
}

init()
