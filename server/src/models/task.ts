import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ITask {
  id: string;
  title: string;
  description?: string; // Optional field
  status: "todo" | "doing" | "done";
  kanbanId: string;
}

interface ICreateTask extends Optional<ITask, "id"> {}

export class Task extends Model<ITask, ICreateTask> implements ITask {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: "todo" | "doing" | "done";
  public kanbanId!: string;

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
        validate: {
          notEmpty: true,
          len: [1, 50], // Title length validation
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("todo", "doing", "done"),
        allowNull: false,
        defaultValue: "todo",
      },
      kanbanId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "kanbanBoards",
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
