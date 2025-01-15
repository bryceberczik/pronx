import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IRoutineSteps {
  id: string;
  title: string;
  routineId: string;
}

interface ICreateRoutineSteps extends Optional<IRoutineSteps, "id"> {}

export class RoutineSteps extends Model<IRoutineSteps, ICreateRoutineSteps> implements IRoutineSteps {
  public id!: string;
  public title!: string;
  public routineId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function RoutineStepsFactory(sequelize: Sequelize): typeof RoutineSteps {
  RoutineSteps.init(
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
            len: [1, 30],
        }
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
      tableName: "routineSteps",
      sequelize,
    }
  );

  return RoutineSteps;
}