
import { Observable } from "./observeble.js"
import { Event } from "./event.js";
import { Observer } from "./observer.js";

export enum NotificacionClickEventType {'NO_EVENT', 'SI_EVENT'};

/**
 * @brief Class Notificacion that implements the Observable interface, i.e.,
 * Notificacion objects can be observed
 */
export class Notificacion<T> implements Observable<T> {
  /**
   * array de observers de tipo T
   */
  private observers: Observer<T>[] = [];

  /**
   * tipo de evento actual
   */
  private eventType: NotificacionClickEventType = NotificacionClickEventType.NO_EVENT;

  /**
   * 
   * @param id es la id del evento
   * @param data es la informacion
   */
  constructor(public id: number, public data: T) {
  }
  /**
   * 
   * @returns el tipo de evento actual
   */
  getEventType() {
    return this.eventType;
  }
  /**
   * suscribirse
   * @param observer el observador
   */
  subscribe(observer: Observer<T>) {
    if (this.observers.includes(observer)) {
      throw new Error('The observer had already been subscribed');
    } else {
      this.observers.push(observer);
    }
  }

  /**
   * unsubscibe
   * @param observer el observador
   */
  unsubscribe(observer: Observer<T>) {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      throw new Error('The observer has not been subscribed');
    } else {
      this.observers.splice(index, 1);
    }
  }
  /**
   * es cuando cambia el evento
   * @param event la informacion
   */
  onEvent(event: Event<T>) {
    this.eventType = NotificacionClickEventType.SI_EVENT
    this.notify(event);
  }
  /**
   * es cuando cambia el evento
   * @param event la informacion
   */
  notify(event: Event<T>) {
    this.observers.forEach((observer) => observer.update(this,event));
  }
}

/**
 * @brief {class} NotificacionObserver that implements the interface Observer, i.e.,
 * it is able to observe other objects
 */
export class NotificacionObserver<T> implements Observer<T> {
  constructor(private id: number, private name: string) {
  }
  /**
   * es cuando hay un notify
   * @param observable el observable 
   * @param evento la informacion 
   */
  update(observable: Observable<T>, evento : Event<T>) {
    console.log("UPDATED");
    if (observable instanceof Notificacion) {
      console.log("IS NOTIFICATION")
      switch(observable.getEventType()) {
        case NotificacionClickEventType.SI_EVENT:
          console.log("ID: " + evento.id);
          console.log("DATA: " + evento.data);
          break;
      }
    }

  }
}
