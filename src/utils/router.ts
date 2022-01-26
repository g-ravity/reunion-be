import { Router } from 'express';
import { decorateRouter as myDecoratedRouter } from '@awaitjs/express';

export const decoratedRouter = myDecoratedRouter(Router());
