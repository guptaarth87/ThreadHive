export declare const usersChannelMapping: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "users_channel_mapping";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "users_channel_mapping";
            dataType: "bigint";
            columnType: "MySqlBigInt64";
            data: bigint;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: true;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "user_id";
            tableName: "users_channel_mapping";
            dataType: "bigint";
            columnType: "MySqlBigInt64";
            data: bigint;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        channelId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "channel_id";
            tableName: "users_channel_mapping";
            dataType: "bigint";
            columnType: "MySqlBigInt64";
            data: bigint;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "mysql";
}>;
