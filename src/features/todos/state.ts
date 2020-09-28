import { ToDo, Subject, Observer } from 'ToDoTypes'
import storage from '../../services/storage'

export default class State implements Subject {
  private _todos: ToDo[] = []
  private observers: Observer[] = []

  constructor() {
    const savedTodos: ToDo[] | undefined = storage.getToDos()
    if (savedTodos) {
      this.todos = savedTodos
    }
  }

  private backupTodos() {
    storage.saveToDos(this._todos)
  }

  get dones(): ToDo[] {
    return this._todos.filter((todo: ToDo) => todo.checked)
  }

  get todos(): ToDo[] {
    return this._todos.filter((todo: ToDo) => !todo.checked)
  }

  set todos(todos: ToDo[]) {
    this._todos = [...todos]
    this.backupTodos()
    this.notify()
  }

  public addTodo(todo: ToDo) {
    this._todos = [todo, ...this._todos]
    this.backupTodos()
    this.notify()
  }

  public deleteTodo(id: string) {
    const targetIndex = this._todos.findIndex((todo: ToDo) => todo.id === id)
    if (targetIndex !== -1) {
      this._todos.splice(targetIndex, 1)
      this.backupTodos()
      this.notify()
    }
  }

  public toggleTodo(id: string) {
    const targetIndex = this._todos.findIndex((todo: ToDo) => todo.id === id)
    if (targetIndex !== -1) {
      this._todos[targetIndex].checked = !this._todos[targetIndex].checked
      this.backupTodos()
      this.notify()
    }
  }

  public attach(observer: Observer): void {
    const isExist = this.observers.indexOf(observer) !== -1
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    console.log('Subject: Attached an observer.')
    this.observers.push(observer)
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this.observers.splice(observerIndex, 1)
    console.log('Subject: Detached an observer.')
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this)
    }
  }
}
