import consumer from './action-cable'

export default class CableManager {
  constructor({tripId, listeners = []}) {
    this.listeners = listeners
    if (tripId) {
      this.connect(tripId)
    }
  }

  connect(tripId) {
    if (this.connection) this.disconnect()

    this.connection = consumer.subscriptions.create(
      { channel: 'PointsChannel', trip_id: tripId },
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
