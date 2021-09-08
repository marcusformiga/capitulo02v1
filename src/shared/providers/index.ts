import { container } from "tsyringe";
import { DayjsProvider } from "./Date/DayJs";
import { IDateProvider } from "./Date/IDateProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsProvider);
