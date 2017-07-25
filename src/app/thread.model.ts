import { Message } from './message.model';

export class Thread {
  constructor(
    public userNames: string[],
    public messages: Message[]
  ) {}
}
