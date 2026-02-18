import { getRequestContext } from '@cloudflare/next-on-pages';

export function getPlatform() {
    const context = getRequestContext();
    return {
        db: context.env.DB as D1Database,
        storage: context.env.STORAGE as R2Bucket,
        env: context.env,
    };
}

// Example usage in an API route:
// const { db, storage } = getPlatform();
// const results = await db.prepare('SELECT * FROM users').all();
