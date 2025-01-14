import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IRoutine {
  id: string;
  userId: string;
  routineSteps: Array<{ title: string; description: string; order: number }>;
}

interface ICreateRoutine extends Optional<IRoutine, "id"> {}

export class Routine extends Model<IRoutine, ICreateRoutine> implements IRoutine {
  public id!: string;
  public userId!: string;
  public routineSteps!: Array<{ title: string; description: string; order: number }>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function RoutineFactory(sequelize: Sequelize): typeof Routine {
  Routine.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      routineSteps: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "routines",
      sequelize,
    }
  );

  return Routine;
}