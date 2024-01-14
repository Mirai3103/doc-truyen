import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8080/graphql",
    documents: ["src/**/*.tsx", "src/**/*.ts"],
    generates: {
        "src/gql/generated/": {
            preset: "client",
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
