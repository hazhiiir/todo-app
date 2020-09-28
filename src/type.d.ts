declare module 'whatwg-fetch'

declare module 'ToDoTypes' {
  export interface ToDo {
    id: string
    title: string
    checked: boolean
  }

  export interface Observer {
    // Receive update from subject.
    update(subject: Subject): void
  }

  export interface Subject {
    attach(observer: Observer): void

    detach(observer: Observer): void

    notify(): void
  }

  export interface Component extends Observer {
    render(): void
    mount(): void
    unMount(): void
  }
}
