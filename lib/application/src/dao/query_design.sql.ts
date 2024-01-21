import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getUserQuery = `-- name: GetUser :one
SELECT id, name, code FROM users WHERE id = $1`;

export interface GetUserArgs {
    id: number;
}

export interface GetUserRow {
    id: number;
    name: string;
    code: string;
}

export async function getUser(client: Client, args: GetUserArgs): Promise<GetUserRow | null> {
    const result = await client.query({
        text: getUserQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        code: row[2]
    };
}

