import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import typescriptEslintParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const rules = [
    ...compat.extends(
        "next/core-web-vitals",
        "next",
        "plugin:@typescript-eslint/recommended",
    ),
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            parser: typescriptEslintParser,
        },
        plugins: {
            "@typescript-eslint": typescriptEslintPlugin,
            import: importPlugin,
        },
        rules: {
            "no-console": [
                "error",
                {
                    allow: ["warn", "error"],
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
            "import/order": [
                "error",
                {
                    "newlines-between": "always",
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                    ],
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            quotes: [
                "error",
                "double",
                {
                    allowTemplateLiterals: true,
                },
            ],
            semi: ["error", "always"],
            "comma-dangle": ["error", "always-multiline"],
        },
    },
];
export default rules;
