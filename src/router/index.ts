import { IncomingMessage, ServerResponse } from 'http';
import { RouterAPI } from './API/router';
import { RouterViews } from './Views/router';

enum BASEPATH {
	API = 'api',
	VIEWS = 'views',
}

export const router = (request: IncomingMessage, response: ServerResponse) => {
	const basepath = request.url?.split('/')[1];
	if (basepath === BASEPATH.API) {
		RouterAPI(request, response);
	} else {
		RouterViews(request, response);
	}
};
