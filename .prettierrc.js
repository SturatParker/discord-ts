module.exports = {
  printWidth: 80,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  trailingComma: "es5",
  overrides: [
    {
      files: ["*.html"],
      options: {
        printWidth: 140,
      },
    },
  ],
};
