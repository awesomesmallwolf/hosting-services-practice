import dotenv from "dotenv";
import { Router } from "itty-router";
import { createCors } from "itty-cors";
import routes from './api/routes';
dotenv.config();
const port = process.env.PORT;

const { preflight, corsify } = createCors({ origins: ['*'] });

const router = Router();

interface Error {
  message?: string;
  status?: number;
}

const errorHandler = (error: Error) =>
  new Response(error.message || 'Server Error', { status: error.status || 500 })

router
  .all('*', preflight)
  .get('/user', routes.user.handle)
  .get('/task', routes.task.handle)
  .get('/detail', routes.detail.handle)
  .get('/news', routes.news.handle)
  .get('/', () => {
    return new Response("Ok");
  });

interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response>|Response): Promise<Response>;
}

// export default {
//   fetch: (...args) => router
//     .handle(...args)
//     .catch(err => error(500, err.stack))
// }

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return router
			.handle(request)
			.catch(errorHandler)
			.then(corsify);
	},
};
