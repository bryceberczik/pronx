import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ICalendar {
  id: string;
  userId: string;
}

interface ICreateCalendar extends Optional<ICalendar, "id"> {}

export class Calendar extends Model<ICalendar, ICreateCalendar> implements ICalendar {
  public id!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CalendarFactory(sequelize: Sequelize): typeof Calendar {
  Calendar.init(
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
      tableName: "calendars",
      sequelize,
    }
  );

  return Calendar;
}
