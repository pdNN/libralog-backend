import express from "express";
import cors from "cors";
import "express-async-errors";
import chalk from "chalk";
import { format } from "date-fns-tz";

import routes from "@shared/infra/http/routes";
import { env } from "@shared/env";
import { errorHandler } from "@shared/errors/errorHandler";
import { newDate } from "@shared/utils/DateFormat";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(
    `[${chalk.cyan("INFO")}] ${chalk.gray.bold(
      format(newDate(), "dd/MM/yy HH:mm:ss"),
    )} Server started at port: 3333 in ${process.env.NODE_ENV} ambient`,
  );
});
