import { Message } from './message.model';

export class Chatroom {
  public messages: Message[];
  constructor (
    public name: string
  ) { }
}
