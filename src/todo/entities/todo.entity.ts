import { Status } from '../enums/todo-status.enum';

export class Todo {
  constructor(
    public id: number,
    public text: string,
    public createdAt: Date = new Date(),
    public status: Status = Status.PENDING,
  ) {}
}
