import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface ICalendar {
  id: string;
  title: string;
  description?: string;
  date: Date;
  userId: string;
}

interface ICreateCalendar extends Optional<ICalendar, "id"> {}

export class Calendar extends Model<ICalendar, ICreateCalendar> implements ICalendar {
  public id!: string;
  public title!: string;
  public description?: string;
  public date!: Date;
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
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
