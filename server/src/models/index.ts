import sequelize from "../config/connection";

import { UserFactory } from "./user";
import { KanbanBoardFactory } from "./kanbanBoard";
import { CalendarFactory } from "./calender";
import { RoutineFactory } from "./routine";
import { EventFactory } from "./event";

const User = UserFactory(sequelize);
const KanbanBoard = KanbanBoardFactory(sequelize);
const Calendar = CalendarFactory(sequelize);
const Routine = RoutineFactory(sequelize);
const Event = EventFactory(sequelize);

User.hasMany(KanbanBoard, { foreignKey: "userId" });
KanbanBoard.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

Calendar.hasMany(Event, { foreignKey: "calendarId", onDelete: "CASCADE" });
Event.belongsTo(Calendar, { foreignKey: "calendarId" })

User.hasOne(Routine, { foreignKey: "userId" });
Routine.belongsTo(User, { foreignKey: "userId" });

export { User, KanbanBoard, Calendar, Event, Routine };
