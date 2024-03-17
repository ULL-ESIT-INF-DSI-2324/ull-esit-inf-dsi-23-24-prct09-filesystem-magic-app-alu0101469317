import { Observable } from "./observeble.js"
import { Event } from "./event.js";
/**
 *  @brief observer
 */
export interface Observer<T> {
    update(observable: Observable<T>, event: Event<T>): void;
  }
  