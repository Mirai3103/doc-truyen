import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.graphql"],
  generates: {
    "src/gql/": {
      preset: "client",
    },
  },
};

export default config;
