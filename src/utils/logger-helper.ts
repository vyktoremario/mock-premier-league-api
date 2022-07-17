import { settings } from '../config';

export class LogHelper {
  /**
   * Logs a debug message to the console. You can add items to the method that will also be logged to the console.
   * @param message
   * @param args
   */
  static debug(message: string, ...args: any[]) {
    if (settings.ENABLE_DEBUGGER) {
      console.log(
        `[DEBUG] ${message}`,
        ...args
      );
    }
  }

  static info(message: string, ...args: any[]): void {
    console.log(
      `[INFO] ${message}`,
      ...args
    );
  }

  static log(message: string, ...args: any[]): void {
    LogHelper.info(message, ...args);
  }

  static error(
    message: string,
    calledFrom?: string,
    statusCode?: number | string
  ): void {
    console.error(
      `[ERROR] ${
        calledFrom ? `[${calledFrom}] ` : ''
      }${statusCode ? `[status: ${statusCode}] ` : ''}${message}`
    );
  }
}
