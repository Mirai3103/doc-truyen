import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8080/graphql",
    documents: ["src/**/*.tsx", "./src/**/*.graphql"],
    generates: {
        "src/gql/generated/graphql.ts": {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
