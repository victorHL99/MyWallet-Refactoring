import { Router } from "express";

import {
  postFinancialEvent,
  getFinancialEvents,
  getFinancialEventsSum,
} from "../controllers/financialController.js";

const financialRouter = Router();

financialRouter.post("/financial-events", postFinancialEvent);
financialRouter.get("/financial-events", getFinancialEvents);
financialRouter.get("/financial-events/sum", getFinancialEventsSum);

export default authRouter;
