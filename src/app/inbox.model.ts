import { Thread } from './thread.model';

export class Inbox {
  constructor(
    public senderId: string,
    public threads: Thread[]
  ) {}
}
