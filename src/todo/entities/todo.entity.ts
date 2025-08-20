import { Status } from '../enums/todo-status.enum';

export class Todo {
  constructor(
    public id: number,
    public title: string,
    public createdAt: Date = new Date(),
    public status: Status = Status.PENDING,
    public inProgressAt?: Date, // set when status changes to IN_PROGRESS
    public completedAt?: Date, // set when status changes to COMPLETED
  ) {}
}
