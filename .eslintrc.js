module.exports = {
   root: true,
   parser: "@typescript-eslint/parser",
   plugins: ["@typescript-eslint", "simple-import-sort"],
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
   ],
   rules: {
      "no-duplicate-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "sort-imports": "off",
      "import/order": "off",
   },
};
