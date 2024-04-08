import { io } from 'socket.io-client';

export class Connection {
  #socket;

  constructor (url) {
    this.#socket = io(url);
  }

  startGame (sessionId) {
    this.#socket.emit('startGame', {sessionId});
  }
}