const baseConfig = require("../../packages/formatter/eslint.config.cjs");

module.exports = [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      import: require("eslint-plugin-import"), // Add import plugin
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // Built-in and external libraries
            ["internal"], // Internal modules (path aliases)
            ["parent", "sibling", "index"], // Relative imports
          ],
          pathGroups: [
            {
              pattern: "@nestjs/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@Infrastructure/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@Domain/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@Application/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@Presentation/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@Shared/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "../**", // Relative imports from parent directory
              group: "parent",
              position: "after",
            },
            {
              pattern: "./**", // Relative imports from the current directory
              group: "sibling",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc", // Alphabetical order within each group
            caseInsensitive: true, // Case-insensitive sorting
          },
        },
      ],
    },
  },
];