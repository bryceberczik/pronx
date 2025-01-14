import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IRoutineStep {
  id: string;
  title: string;
  order: number;
  routineId: string;
}

interface ICreateRoutineStep extends Optional<IRoutineStep, "id"> {}

export class RoutineStep extends Model<IRoutineStep, ICreateRoutineStep> implements IRoutineStep {
  public id!: string;
  public title!: string;
  public order!: number;
  public routineId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function RoutineStepFactory(sequelize: Sequelize): typeof RoutineStep {
  RoutineStep.init(
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
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      routineId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "routines",
          key: "id",
        },
      },
    },
    {
      tableName: "routine_steps",
      sequelize,
    }
  );

  return RoutineStep;
}
