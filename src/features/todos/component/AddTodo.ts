import { Component } from 'ToDoTypes'
import State from '../state'
import createTodo from '../factory'
import Modal from './Modal'
import { fetch as fetchPolyfill } from 'whatwg-fetch'

export default class AddTodo implements Component {
  private container: Element
  private state: State
  private modal: Modal
  private addedTodoCount = 0
  constructor(container: string, state: State) {
    const element = document.querySelector(container)
    if (!element) {
      throw 'Container does not exist in DOM!'
    }
    this.container = element
    this.state = state
    this.modal = new Modal()
  }

  private resetLimit() {
    this.addedTodoCount = 0
  }

  private limited() {
    return this.addedTodoCount === 5
  }

  public mount() {
    this.render()
    this.modal.render()
  }

  public unMount() {
    this.container.innerHTML = ''
  }

  public update() {
    this.render()
  }

  public render() {
    this.container.innerHTML = ''

    const inputElement = document.createElement('input')
    inputElement.type = 'text'
    inputElement.name = 'item'
    inputElement.id = 'text'
    inputElement.placeholder = 'Add Your Note'

    const buttonElement = document.createElement('button')
    buttonElement.id = 'create-todo'
    buttonElement.innerHTML = 'ADD'

    this.container.appendChild(inputElement)
    this.container.appendChild(buttonElement)

    const addTodo = () => {
      const value = inputElement.value
      if (!value) return

      if (this.limited()) {
        fetchPolyfill(
          'http://api.aparat.com/fa/v1/video/video/mostViewedVideos',
        )
          .then((response: any) => {
            return response.json()
          })
          .then((data: any) => {
            console.log(data)
            this.modal.openModal(data?.data[0]?.attributes?.preview_src)
            this.resetLimit()
          })
          .catch(() => {
            this.state.addTodo(createTodo(value))
            inputElement.value = ''
          })
      } else {
        this.state.addTodo(createTodo(value))
        inputElement.value = ''
        this.addedTodoCount++
      }
    }

    buttonElement.addEventListener('click', addTodo)

    inputElement.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        addTodo()
      }
    })
  }
}
