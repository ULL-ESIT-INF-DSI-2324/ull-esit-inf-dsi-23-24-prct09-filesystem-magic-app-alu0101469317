import { Observer } from "./observer.js";
import { Event } from "./event.js";
/**
 * @brief interfaz observable
 */
export interface Observable<T> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observer: Observer<T>): void;
    notify(event: Event<T>): void;
  }