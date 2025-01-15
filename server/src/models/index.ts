import sequelize from "../config/connection";

import { UserFactory } from "./user";
import { KanbanBoardFactory } from "./kanbanBoard";
import { CalendarFactory } from "./calender";
import { RoutineFactory } from "./routine";
import { EventFactory } from "./event";
import { RoutineStepsFactory } from "./routineSteps";
import { TaskFactory } from "./task";

const User = UserFactory(sequelize);
const KanbanBoard = KanbanBoardFactory(sequelize);
const Task = TaskFactory(sequelize);
const Calendar = CalendarFactory(sequelize);
const Routine = RoutineFactory(sequelize);
const RoutineSteps = RoutineStepsFactory(sequelize);
const Event = EventFactory(sequelize);

User.hasMany(KanbanBoard, { foreignKey: "userId", onDelete: "CASCADE" });
KanbanBoard.belongsTo(User, { foreignKey: "userId" });

KanbanBoard.hasMany(Task, { foreignKey: "kanbanId", onDelete: "CASCADE" });
Task.belongsTo(KanbanBoard, { foreignKey: "kanbanId" });

User.hasMany(Calendar, { foreignKey: "userId", onDelete: "CASCADE" });
Calendar.belongsTo(User, { foreignKey: "userId" });

Calendar.hasMany(Event, { foreignKey: "calendarId", onDelete: "CASCADE" });
Event.belongsTo(Calendar, { foreignKey: "calendarId" })
 
User.hasOne(Routine, { foreignKey: "userId", onDelete: "CASCADE" });
Routine.belongsTo(User, { foreignKey: "userId" });

Routine.hasMany(RoutineSteps, { foreignKey: "routineId", onDelete: "CASCADE" });
RoutineSteps.belongsTo(Routine, { foreignKey: "routineId" });

export { User, KanbanBoard, Calendar, Event, Routine, RoutineSteps, Task };
