import { container } from "tsyringe";
import { DayjsProvider } from "./Date/DayJs";
import { IDateProvider } from "./Date/IDateProvider";
import { EtherealMailProvider } from "./Mail/EtheralMailProvider";
import { IMailProvider } from "./Mail/IMailProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsProvider);

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);
