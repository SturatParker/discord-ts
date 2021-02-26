module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["./tsconfig.app.json", "e2e/tsconfig.json"],
        createDefaultProgram: true,
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
      ],
      rules: {
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
      },
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { code: 140 }],
      },
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          { type: "attribute", prefix: "rspb", style: "camelCase" },
        ],
        "@angular-eslint/component-selector": [
          "error",
          { type: "element", prefix: "rspb", style: "kebab-case" },
        ],
      },
    },
    {
      files: ["src/**/*.spec.ts", "src/**/*.d.ts"],
      parserOptions: {
        project: "./tsconfig.spec.json",
      },
      extends: ["plugin:jasmine/recommended"],
      plugins: ["jasmine"],
      env: { jasmine: true },
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
