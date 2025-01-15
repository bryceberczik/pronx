import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IEvent {
  id: string;
  title: string;
  date: Date;
  calendarId: string;
}

interface ICreateEvent extends Optional<IEvent, "id"> {}

export class Event extends Model<IEvent, ICreateEvent> implements IEvent {
  public id!: string;
  public title!: string;
  public date!: Date;
  public calendarId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function EventFactory(sequelize: Sequelize): typeof Event {
  Event.init(
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
            len: [1, 30]
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
      },
      calendarId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "calendars",
          key: "id",
        },
      },
    },
    {
      tableName: "events",
      sequelize,
    }
  );

  return Event;
}
