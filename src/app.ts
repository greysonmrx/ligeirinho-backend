import 'reflect-metadata';

import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import createConnection from './database';
import AppError from './errors/AppError';

class App {
  public server: Express;

  constructor() {
    createConnection();
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private exceptionHandler(): void {
    this.server.use(
      (
        err: Error,
        request: Request,
        response: Response,
        _next: NextFunction,
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        console.log(err);

        return response.status(500).json({
          status: 'error',
          message: 'Erro interno do servidor.',
        });
      },
    );
  }
}

export default new App().server;
