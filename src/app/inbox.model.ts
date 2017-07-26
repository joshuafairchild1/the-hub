import { Message } from './message.model';

export class Inbox {
  constructor(public senderId: string, public receiverIds: string[], public threads: Message[]) {}
}
