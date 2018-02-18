import consumer from './action-cable'

export default class CableManager {
  constructor(listeners = []) {
    this.listeners = listeners
    this.connect()
  }

  connect() {
    if (this.connection) this.disconnect()

    this.connection = consumer.subscriptions.create(
      { channel: 'PointsChannel' },
      {
        received: this.onReceive.bind(this),
      },
    )
  }

  onReceive(data) {
    this.listeners.forEach(listener => listener(data))
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  disconnect() {
    this.connection.unsubscribe()
    this.connection = null
    this.listeners = []
  }
}
