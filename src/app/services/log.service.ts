import { Injectable } from '@angular/core';

/**
 * LogService is used to log all messages 
 */
@Injectable()
export class LogService {
  messages: string[] = [];
  constructor() { }


  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}
