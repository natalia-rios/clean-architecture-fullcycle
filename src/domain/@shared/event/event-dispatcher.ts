import type EventDispatcherInterface from './event-dispatcher.interface'
import type EventHandlerInterface from './event-handler.interface'
import type eventInterface from './event.interface'

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: Record<string, EventHandlerInterface[]> = {}

  get getEventHandlers (): Record<string, EventHandlerInterface[]> {
    return this.eventHandlers
  }

  register (eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister (eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler)
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1)
      }
    }
  }

  unregisterAll (): void {
    this.eventHandlers = {}
  }

  notify (event: eventInterface): void {
    const eventName = event.constructor.name
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event)
      })
    }
  }
}
