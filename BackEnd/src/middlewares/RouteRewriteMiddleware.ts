import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { rewritePathToRoot } from '../lib/rewrite-path-to-root';

@Injectable()
export class RouteRewriteMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const rewriteBase = rewritePathToRoot();
    if (rewriteBase && req.url.startsWith(`/${rewriteBase}`)) {
      req.url = req.url.replace(`/${rewriteBase}`, '');
    }
    next();
  }
}
