import sequelize from "../config/connection";

import { UserFactory } from "./user";
import { KanbanBoardFactory } from "./kanbanBoard";
import { CalendarFactory } from "./calender";
import { RoutineFactory } from "./routine";

const User = UserFactory(sequelize);
const KanbanBoard = KanbanBoardFactory(sequelize);
const Calendar = CalendarFactory(sequelize);
const Routine = RoutineFactory(sequelize);

User.hasMany(KanbanBoard, { foreignKey: "userId" });
KanbanBoard.belongsTo(User, { foreignKey: "userId" });


User.hasMany(Calendar, { foreignKey: "userId" });
Calendar.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Routine, { foreignKey: "userId" });
Routine.belongsTo(User, { foreignKey: "userId" });

export { User, KanbanBoard, Calendar, Routine };
