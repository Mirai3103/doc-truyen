import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/graphql",
  generates: {
    "./src/interfaces/graphql.ts": {
      plugins: ["typescript"],
      documents: ["./src/**/*.tsx", "./src/**/*.ts"],
      config: {
        skipTypename: true,
        enumsAsTypes: true,
      },
      hooks: { afterOneFileWrite: ["eslint --fix", "prettier --write"] },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
