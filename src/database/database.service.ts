import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { envs } from 'src/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: envs.databaseUrl,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      const client = await this.pool.connect();
      client.release();
      console.log('Database connection established successfully');
    } catch (error: unknown) {
      console.error(
        'Database connection failed:',
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  async query(text: string, params?: unknown[]): Promise<QueryResult> {
    const start = Date.now();
    const result = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Executed query: ${text} - ${duration}ms`);
    return result;
  }
}
