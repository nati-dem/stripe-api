import * as winston from "winston";

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };

export class Logger {

    private static logger: winston.Logger;

    private constructor(){
    }
    
    public static getLogger = () =>{
        if(!this.logger){
            this.logger = winston.createLogger({
                //levels: logLevels,
                format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                transports: [new winston.transports.Console()],
              });
        }
        return this.logger;
    }

  }

export const logger = Logger.getLogger();
