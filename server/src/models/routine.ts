import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IRoutine {
  id: string;
  userId: string;
}

interface ICreateRoutine extends Optional<IRoutine, "id"> {}

export class Routine extends Model<IRoutine, ICreateRoutine> implements IRoutine {
  public id!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

interface IRoutineStep {
  id: string;
  routineId: string;
  title: string;
  order: number;
}

interface ICreateRoutineStep extends Optional<IRoutineStep, "id"> {}

export class RoutineStep
  extends Model<IRoutineStep, ICreateRoutineStep>
  implements IRoutineStep
{
  public id!: string;
  public routineId!: string;
  public title!: string;
  public order!: number;

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
    },
    {
      tableName: "routines",
      sequelize,
    }
  );

  return Routine;
}