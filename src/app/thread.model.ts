import { Message } from './message.model';

export class Thread {
  public isRead: boolean = false;
  constructor(
    public messages: Message[]
  ) {}
}
