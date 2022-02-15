// deno-lint-ignore-file no-explicit-any
import { DataTypes, Model } from "../deps.ts";

const PENDING_ENUM = "Pending";
const DONE_ENUM = "Done";

export class SubTask extends Model {
  static table = "subtasks";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    taskId: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM,
      values: [PENDING_ENUM, DONE_ENUM],
      allowNull: false,
    },
    due: { type: DataTypes.DATE, allowNull: true },
  };

  //Model
  id!: string;
  taskId!: string;
  title!: string;
  description!: string;
  status!: boolean;
  due!: string;

  hydrate = (data: any) => {
    this.id = crypto.randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.taskId = data.taskId;
    this.due = data.due ?? "";
  };
}

export class Task extends Model {
  static table = "tasks";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM,
      values: [PENDING_ENUM, DONE_ENUM],
      allowNull: false,
    },
    due: { type: DataTypes.DATE, allowNull: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: true },
  };

  hydrate = (data: any) => {
    this.id = crypto.randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.userId = data.userId;
    this.category = data.category ?? "";
    this.due = data.due ?? "";
  };

  //Model
  id!: string;
  title!: string;
  description!: string;
  status!: boolean;
  due!: string;
  userId!: string;
  category!: string;
}