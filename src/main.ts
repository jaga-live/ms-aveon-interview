import 'reflect-metadata';
import { App } from './core/app';
import { MongoDB } from './database/mongoose';


async function bootstrap() {
	///Start Express APP
	new App().start();

	///Connect to MongoDB
	new MongoDB().connect();
}

bootstrap();