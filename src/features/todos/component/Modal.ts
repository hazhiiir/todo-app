import { Component } from 'ToDoTypes'
import { slug } from 'cuid'

export default class Modal implements Component {
  private id: string
  private modal: Element = null
  private videoElement: HTMLVideoElement = null

  constructor() {
    this.id = `modal-${slug()}`
  }
  public update() {
    this.render()
  }
  public mount() {
    this.render()
  }

  public unMount() {
    document.body.removeChild(this.modal)
  }

  public openModal(videoSrc: string) {
    this.videoElement.src = videoSrc
    this.modal.classList.add('open')
  }

  public closeModal() {
    this.modal.classList.remove('open')
  }

  public render() {
    if (this.modal) {
      document.body.removeChild(this.modal)
    }
    this.modal = document.createElement('div')
    this.modal.id = this.id
    this.modal.setAttribute('class', 'modal-window')

    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'wrapper')

    const closeButton = document.createElement('span')
    closeButton.setAttribute('class', 'modal-close')
    closeButton.innerHTML = 'Close'

    this.videoElement = document.createElement('video')
    this.videoElement.src = ''
    this.videoElement.controls = true

    wrapper.appendChild(closeButton)
    wrapper.appendChild(this.videoElement)
    this.modal.appendChild(wrapper)
    document.body.appendChild(this.modal)

    closeButton.addEventListener('click', () => {
      this.closeModal()
    })
  }
}
