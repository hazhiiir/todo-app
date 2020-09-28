import { ToDo } from 'ToDoTypes'
const TODO_KEY = 'todos'

export const getToDos = (): ToDo[] => {
  return JSON.parse(window.localStorage.getItem(TODO_KEY))
}

export const saveToDos = (todos: ToDo[]) => {
  window.localStorage.setItem(TODO_KEY, JSON.stringify(todos))
}

export const destroyToDos = () => {
  window.localStorage.removeItem(TODO_KEY)
}

export default { getToDos, saveToDos, destroyToDos }
