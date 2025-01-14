import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IKanbanBoard {
  id: string;
  name: string;
  description?: string;
  userId: string;
  tasks: Array<{ title: string; description: string; status: "todo" | "doing" | "done" }>;
}

interface ICreateKanbanBoard extends Optional<IKanbanBoard, "id"> {}

export class KanbanBoard extends Model<IKanbanBoard, ICreateKanbanBoard> implements IKanbanBoard {
  public id!: string;
  public name!: string;
  public description?: string;
  public userId!: string;
  public tasks!: Array<{ title: string; description: string; status: "todo" | "doing" | "done" }>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function KanbanBoardFactory(sequelize: Sequelize): typeof KanbanBoard {
  KanbanBoard.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      tasks: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "kanban_boards",
      sequelize,
    }
  );

  return KanbanBoard;
}