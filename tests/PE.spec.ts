import 'mocha';
import {expect} from 'chai';
import {Notificacion , NotificacionObserver, NotificacionClickEventType} from '../src/PE/notifications.js'
import { Event } from '../src/PE/event.js';
/**
 * Test for basicFunctions.js
 */
describe("add function tests", () => {
  
// Client code
const myNotificacion = new Notificacion<string>(0, 'myNotificacion');
const firstNotificacionObserver = new NotificacionObserver(0, 'firstNotificacionObserver');
const secondNotificacionObserver = new NotificacionObserver(1, 'secondNotificacionObserver');
const evento : Event<string>=  {
  id: "iashd2932h8",
  data: "hola"
}
it("comprabar instacia notificacion 0", () => {
  expect(myNotificacion).to.be.instanceOf(Notificacion<string>)
})
it("comprabar instacia notificacion first", () => {
  expect(firstNotificacionObserver).to.be.instanceOf(NotificacionObserver)
})
it("comprabar instacia notificacion second", () => {
  expect(secondNotificacionObserver).to.be.instanceOf(NotificacionObserver)
})

  console.log('firstNotificacionObserver subscription');
  myNotificacion.subscribe(firstNotificacionObserver);

  console.log('secondNotificacionObserver subscription');
  myNotificacion.subscribe(secondNotificacionObserver);

  try {
    myNotificacion.subscribe(secondNotificacionObserver);
  } catch (error) {
    console.log('secondNotificacionObserver was already subscribed');
  }

  it("comprabar evento", () => {
    expect(myNotificacion.getEventType() == NotificacionClickEventType.NO_EVENT).to.deep.equal(false);
  })
  console.log('myNotificacion on event');
  myNotificacion.onEvent(evento);

  it("comprabar evento", () => {
    expect(myNotificacion.getEventType() == NotificacionClickEventType.SI_EVENT).to.deep.equal(true);
  })
});
