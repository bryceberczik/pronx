const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from './config/connection.js';
import path from "node:path";
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get("*", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "../client/dist/index.html"));
  });

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
