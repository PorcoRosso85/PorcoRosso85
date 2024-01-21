import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getUserQuery = `-- name: GetUser :one
SELECT user_id, user_name, email, registered_at FROM users WHERE email = $1`;

export interface GetUserArgs {
    email: string;
}

export interface GetUserRow {
    userId: number;
    userName: string;
    email: string;
    registeredAt: Date;
}

export async function getUser(client: Client, args: GetUserArgs): Promise<GetUserRow | null> {
    const result = await client.query({
        text: getUserQuery,
        values: [args.email],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userId: row[0],
        userName: row[1],
        email: row[2],
        registeredAt: row[3]
    };
}

export const insertUserQuery = `-- name: InsertUser :one

INSERT INTO users (user_id, user_name, email, registered_at) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, email, registered_at`;

export interface InsertUserArgs {
    userId: number;
    userName: string;
    email: string;
    registeredAt: Date;
}

export interface InsertUserRow {
    userId: number;
    userName: string;
    email: string;
    registeredAt: Date;
}

export async function insertUser(client: Client, args: InsertUserArgs): Promise<InsertUserRow | null> {
    const result = await client.query({
        text: insertUserQuery,
        values: [args.userId, args.userName, args.email, args.registeredAt],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userId: row[0],
        userName: row[1],
        email: row[2],
        registeredAt: row[3]
    };
}

