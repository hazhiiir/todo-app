import { Component, ToDo } from 'ToDoTypes'
import State from '../state'

export default class TodoList implements Component {
  private container: Element
  private state: State
  private selector: 'todos' | 'dones'

  constructor(container: string, state: State, selector: 'todos' | 'dones') {
    const element = document.querySelector(container)
    if (!element) {
      throw 'Container does not exist in DOM!'
    }
    this.container = element
    this.state = state
    this.selector = selector
  }
  public mount() {
    this.state.attach(this)
    this.render()
  }

  public unMount() {
    this.container.innerHTML = ''
    this.state.detach(this)
  }

  public update() {
    this.render()
  }

  public render() {
    this.container.innerHTML = ''
    const todos = this.state[this.selector]
      .map((todo: ToDo) => {
        const liEl = document.createElement('li')
        liEl.innerHTML = todo.title

        const actionContainer = document.createElement('div')

        const deleteButton = document.createElement('span')
        deleteButton.innerHTML = 'Delete'
        deleteButton.setAttribute('class', 'action delete')

        const doneButton = document.createElement('span')
        doneButton.innerHTML = todo.checked ? 'Todo!' : 'Done!'
        doneButton.setAttribute('class', 'action complete')

        actionContainer.appendChild(deleteButton)
        actionContainer.appendChild(doneButton)
        liEl.appendChild(actionContainer)

        doneButton.addEventListener('click', () => {
          this.state.toggleTodo(todo.id)
        })

        deleteButton.addEventListener('click', () => {
          this.state.deleteTodo(todo.id)
        })

        return liEl
      })
      .forEach((el: Element) => this.container.appendChild(el))
  }
}
