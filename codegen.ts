import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.EXPO_PUBLIC_GRAPHQL_BASE_URL,
  documents: [
    // "**/*.tsx",
    // "**/*.ts",
    "**/*.graphql",
    "!**/node_modules",
    // "!graphql",
    "!generated",
  ],
  generates: {
    "generated/graphql.ts": {
      // preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
