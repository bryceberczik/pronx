import sequelize from "../config/connection";

import { UserFactory } from "./user";
import { KanbanBoardFactory } from "./kanbanBoard";
import { TaskFactory } from "./task";
import { CalendarFactory } from "./calender";
import { RoutineFactory } from "./routine";
import { RoutineStepFactory } from "./routineStep";

const User = UserFactory(sequelize);
const KanbanBoard = KanbanBoardFactory(sequelize);
const Task = TaskFactory(sequelize);
const Calendar = CalendarFactory(sequelize);
const Routine = RoutineFactory(sequelize);
const RoutineStep = RoutineStepFactory(sequelize);

User.hasMany(KanbanBoard, { foreignKey: "userId" });
KanbanBoard.belongsTo(User, { foreignKey: "userId" });

KanbanBoard.hasMany(Task, { foreignKey: "kanbanBoardId" });
Task.belongsTo(KanbanBoard, { foreignKey: "kanbanBoardId" });

User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Routine, { foreignKey: "userId" });
Routine.belongsTo(User, { foreignKey: "userId" });

Routine.hasMany(RoutineStep, { foreignKey: "routineId" });
RoutineStep.belongsTo(Routine, { foreignKey: "routineId" });

export { User, KanbanBoard, Task, Calendar, Routine, RoutineStep };
