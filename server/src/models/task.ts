import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ITask {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "doing" | "done";
  kanbanBoardId: string;
}

interface ICreateTask extends Optional<ITask, "id"> {}

export class Task extends Model<ITask, ICreateTask> implements ITask {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: "todo" | "doing" | "done";
  public kanbanBoardId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TaskFactory(sequelize: Sequelize): typeof Task {
  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("todo", "doing", "done"),
        allowNull: false,
      },
      kanbanBoardId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "kanban_boards",
          key: "id",
        },
      },
    },
    {
      tableName: "tasks",
      sequelize,
    }
  );

  return Task;
}
