import { ToDo } from 'ToDoTypes'
import { slug } from 'cuid'

export const createTodo = (title: string): ToDo => ({
  id: slug(),
  title,
  checked: false,
})

export default createTodo
