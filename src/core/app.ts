import express from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './inversify/inversify';
import {Request, Response, NextFunction} from 'express';
import { HttpException, ValidationException } from './exception';

export class App{

	start() {
		const server = new InversifyExpressServer(container);

		///Express Config
		server.setConfig((app) => {
			app.use(express.json());
			app.use(cors());
		});

		///Error Config
		server.setErrorConfig((app) => {
			app.use((err: any, req: Request, res: Response, next: NextFunction) => {

				if (err instanceof HttpException) {
					return res.status(err.statusCode).json({ error: err.message });
				} else if (err instanceof ValidationException) {
					return res.status(400).json({ error: 'Validation Exception', errorInfo: err.error.details});
				}
				else {
					console.log(err);
					return res.status(500).json({ error: 'Internal Server Exception' });
				}
			});
		});

		const app = server.build();
		app.listen(5000, () => {
			console.log('App Started');
		});
	}
}