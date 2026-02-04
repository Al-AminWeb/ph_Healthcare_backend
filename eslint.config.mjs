/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              ESLINT.CONFIG.MJS - ESLINT CONFIGURATION FILE                   ║
 * ║                    Complete Beginner's Guide                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * 📚 WHAT IS ESLINT?
 * ──────────────────
 * ESLint is a "code quality tool" that finds and fixes problems in JavaScript/TypeScript.
 * Think of it as a spell-checker, but for code!
 *
 * WHAT ESLINT FINDS:
 * - 🔴 Errors: Bugs that will break your code
 * - 🟡 Warnings: Style issues or potential problems
 * - ✨ Auto-fixes: Some issues can be fixed automatically
 *
 * EXAMPLES OF WHAT ESLINT CATCHES:
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │ Problem                          │ ESLint Rule                            │
 * │──────────────────────────────────│────────────────────────────────────────│
 * │ Unused variable                  │ @typescript-eslint/no-unused-vars      │
 * │ Missing 'await' on Promise       │ @typescript-eslint/no-floating-promises│
 * │ Using 'any' type                 │ @typescript-eslint/no-explicit-any     │
 * │ console.log in production        │ no-console                             │
 * │ Using '==' instead of '==='      │ eqeqeq                                 │
 * └────────────────────────────────────────────────────────────────────────────┘
 *
 * 📖 WHY "FLAT CONFIG" (eslint.config.mjs)?
 * ─────────────────────────────────────────
 * ESLint 9+ uses "flat config" format - a simpler, more powerful configuration.
 *
 * OLD WAY (.eslintrc.json):
 * - Multiple files: .eslintrc, .eslintignore
 * - Confusing "extends" chains
 * - Hard to debug configuration
 *
 * NEW WAY (eslint.config.mjs):
 * - Single file for everything
 * - JavaScript/TypeScript - full power of the language
 * - Easier to understand and debug
 * - Better IDE support
 *
 * 📖 FILE EXTENSION MEANINGS:
 * ───────────────────────────
 * .js   = JavaScript (CommonJS or ESM depending on package.json)
 * .mjs  = JavaScript ES Module (always ESM, regardless of package.json)
 * .cjs  = JavaScript CommonJS (always CommonJS)
 * .ts   = TypeScript
 * .mts  = TypeScript ES Module
 *
 * We use .mjs to ensure this config is always treated as ESM.
 *
 * 🔗 DOCUMENTATION:
 * - ESLint Flat Config: https://eslint.org/docs/latest/use/configure/configuration-files
 * - TypeScript-ESLint: https://typescript-eslint.io/getting-started
 * - Typed Linting: https://typescript-eslint.io/getting-started/typed-linting
 *
 * 🔧 COMMANDS:
 * ────────────
 * pnpm lint       → Check all files for issues
 * pnpm lint:fix   → Auto-fix what can be fixed
 * pnpm lint:strict → Zero warnings allowed (for CI/CD)
 */

/*
 * @ts-check
 * ──────────────────────────────────────────────────────────────────────────────
 * This comment enables TypeScript checking in this JavaScript file!
 *
 * HOW IT WORKS:
 * 1. VS Code sees // @ts-check
 * 2. TypeScript language service activates
 * 3. You get autocomplete, type errors, and IntelliSense
 *
 * TRY IT: Hover over 'eslint' below to see its type!
 */
// @ts-check

/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                              IMPORTS                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * We import the tools we need:
 * 1. @eslint/js - Core ESLint rules for JavaScript
 * 2. eslint/config - Helper functions for flat config
 * 3. typescript-eslint - TypeScript-specific rules
 */

/*
 * Import: @eslint/js
 * ──────────────────────────────────────────
 * WHAT: Core ESLint rules for JavaScript
 *
 * PROVIDES:
 * - eslint.configs.recommended: Battle-tested rules for all JS code
 * - eslint.configs.all: Every rule (too strict for most projects)
 *
 * EXAMPLE RULES INCLUDED:
 * - no-undef: Error on undefined variables
 * - no-unused-vars: Warn on unused variables
 * - no-debugger: Error on debugger statements
 */
import eslint from "@eslint/js";

/*
 * Import: eslint/config helpers
 * ──────────────────────────────────────────
 * WHAT: Helper functions for flat config
 *
 * defineConfig():
 * - Wraps your config array
 * - Provides better TypeScript types
 * - Validates configuration
 *
 * globalIgnores():
 * - Creates global ignore patterns
 * - Replaces old .eslintignore file
 * - Applied to ALL config blocks
 */
import { defineConfig, globalIgnores } from "eslint/config";

/*
 * Import: typescript-eslint
 * ──────────────────────────────────────────
 * WHAT: TypeScript support for ESLint
 *
 * PROVIDES:
 * - TypeScript parser (understands .ts files)
 * - Type-aware rules (uses TypeScript compiler)
 * - Preset configurations
 *
 * WHY "typescript-eslint" instead of "@typescript-eslint/eslint-plugin"?
 * - New unified package (v8+)
 * - Simpler imports
 * - Better tree-shaking
 *
 * CONFIGS AVAILABLE:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ Config                    │ Description                                    │
 * │───────────────────────────│────────────────────────────────────────────────│
 * │ recommended               │ Basic rules, no type checking                  │
 * │ recommendedTypeChecked    │ Basic rules + type-aware rules                 │
 * │ strict                    │ Stricter rules, no type checking               │
 * │ strictTypeChecked         │ Stricter + type-aware (what we use) ✅         │
 * │ stylistic                 │ Code style rules                               │
 * │ stylisticTypeChecked      │ Code style + type-aware (what we use) ✅       │
 * │ disableTypeChecked        │ Turns off type-aware rules (for .js files)     │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */
import tseslint from "typescript-eslint";

/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                        EXPORT DEFAULT CONFIG                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * defineConfig() wraps our configuration array.
 *
 * STRUCTURE:
 * export default defineConfig([
 *   globalIgnores([...]),      // Files to ignore
 *   { config for TypeScript }, // Rules for .ts files
 *   { config for JavaScript }, // Rules for .js files
 *   { config for tests },      // Special rules for test files
 * ]);
 *
 * ORDER MATTERS:
 * - Later configs override earlier ones
 * - More specific patterns override general ones
 */
export default defineConfig(
    /*
     * ╔══════════════════════════════════════════════════════════════════════════════╗
     * ║                            GLOBAL IGNORES                                    ║
     * ║              Files/folders that should NEVER be linted                       ║
     * ╚══════════════════════════════════════════════════════════════════════════════╝
     *
     * WHY IGNORE FILES?
     * - Build outputs: Already compiled, no point linting
     * - Dependencies: External code, not our responsibility
     * - Generated files: Auto-generated, will be overwritten
     *
     * PATTERN SYNTAX:
     * ┌────────────────────────────────────────────────────────────────────────────┐
     * │ Pattern        │ Meaning                                                  │
     * │────────────────│──────────────────────────────────────────────────────────│
     * │ dist/          │ Match folder named "dist" (trailing / = folder)          │
     * │ *.log          │ Match any file ending in .log                            │
     * │ .env*          │ Match .env, .env.local, .env.production, etc.            │
     * │ **             │ Match any nested folders                                 │
     * └────────────────────────────────────────────────────────────────────────────┘
     */
    globalIgnores([
        /*
         * Build Outputs
         * ─────────────
         * These folders contain compiled/bundled code.
         * Linting them would:
         * 1. Waste time (already checked source)
         * 2. Find "errors" that are just minification
         */
        "dist/", // TypeScript compiler output (tsc)
        "build/", // Alternative build folder name

        /*
         * Dependencies
         * ────────────
         * node_modules contains ALL installed packages.
         * Size: Often 500MB+ and thousands of files.
         * Never lint - it's external code!
         */
        "node_modules/",

        /*
         * Generated Files
         * ────────────────
         * Prisma generates TypeScript client in this folder.
         * It's auto-generated on every `prisma generate`.
         * Linting would find "errors" that can't be fixed.
         */
        "src/generated/",

        /*
         * Environment Files
         * ─────────────────
         * .env files contain secrets and configuration.
         * They're not code - no need to lint.
         * Pattern .env* matches: .env, .env.local, .env.production
         */
        ".env*",

        /*
         * IDE and Editor Files
         * ────────────────────
         * Configuration for VS Code and IntelliJ.
         * Not code - personal editor settings.
         */
        ".vscode/",
        ".idea/",

        /*
         * Test Coverage Reports
         * ─────────────────────
         * Generated by test runners (Jest, Vitest).
         * Contains HTML reports and coverage data.
         */
        "coverage/",

        /*
         * Log Files
         * ─────────
         * Application logs, error logs, etc.
         * Not code - runtime output.
         */
        "*.log",
        "logs/",

        /*
         * Temporary Files
         * ────────────────
         * Temporary files created during development.
         * Should be cleaned up, not linted.
         */
        ".tmp/",
        "temp/",

        /*
         * Prisma Files
         * ────────────
         * Prisma schema uses its own syntax (not JS/TS).
         * prisma.config.ts is excluded from tsconfig.json too.
         */
        "prisma/",
        "prisma.config.ts",
    ]),

    /*
     * ╔══════════════════════════════════════════════════════════════════════════════╗
     * ║                    TYPESCRIPT CONFIGURATION                                  ║
     * ║              Main rules for all TypeScript files (.ts)                       ║
     * ╚══════════════════════════════════════════════════════════════════════════════╝
     *
     * This is the PRIMARY configuration block.
     * Applies to: All .ts, .mts, .cts files in the project.
     *
     * WHAT "TYPE-CHECKED" MEANS:
     * ─────────────────────────
     * ESLint can use TypeScript's type information to find more bugs!
     *
     * WITHOUT TYPE CHECKING:
     * const x = await fetch('/api'); // ESLint doesn't know x is a Promise
     *
     * WITH TYPE CHECKING:
     * const x = await fetch('/api'); // ESLint knows x is Response, can check methods
     *
     * TYPE-CHECKED RULES CAN FIND:
     * - Awaiting non-Promises
     * - Wrong method calls on types
     * - Unsafe any usage
     * - Missing null checks
     */
    {
        /*
         * name: Identifier for this config block
         * ───────────────────────────────────────
         * Used in error messages: "Rule from 'ph-healthcare/typescript'"
         * Helps identify which config caused an issue.
         */
        name: "ph-healthcare/typescript",

        /*
         * files: Which files this config applies to
         * ──────────────────────────────────────────
         * PATTERNS:
         * - **\/*.ts  = All TypeScript files, any folder depth
         * - **\/*.mts = TypeScript ES Module files
         * - **\/*.cts = TypeScript CommonJS files
         *
         * EXAMPLE MATCHES:
         * ✅ src/server.ts
         * ✅ src/app/modules/user/user.service.ts
         * ❌ src/app.js (not TypeScript)
         */
        files: ["**/*.ts", "**/*.mts", "**/*.cts"],

        /*
         * plugins: ESLint plugins to enable
         * ──────────────────────────────────
         * Plugins add new rules that ESLint doesn't have by default.
         *
         * 'js: eslint' → Core JavaScript rules
         * TypeScript plugin is added by 'extends' below
         */
        plugins: {
            js: eslint,
        },

        /*
         * extends: Inherit from preset configurations
         * ────────────────────────────────────────────
         * Instead of writing 100+ rules, we inherit from battle-tested presets.
         *
         * ORDER MATTERS: Later configs override earlier ones.
         */
        extends: [
            /*
             * eslint.configs.recommended
             * ─────────────────────────────
             * WHAT: Core ESLint rules recommended for all JavaScript
             *
             * INCLUDES (~60 rules):
             * - no-undef: Error on undefined variables
             * - no-unused-vars: Warn on unused variables
             * - no-debugger: Error on debugger statements
             * - no-duplicate-case: Error on duplicate switch cases
             * - no-empty: Error on empty code blocks
             *
             * DOCS: https://eslint.org/docs/rules/
             */
            eslint.configs.recommended,

            /*
             * tseslint.configs.strictTypeChecked
             * ────────────────────────────────────
             * WHAT: Strict TypeScript rules WITH type information
             *
             * INCLUDES recommendedTypeChecked + extra strict rules:
             *
             * FROM recommendedTypeChecked:
             * - @typescript-eslint/no-explicit-any: Error on 'any' type
             * - @typescript-eslint/no-unused-vars: Better unused var detection
             * - @typescript-eslint/no-floating-promises: Must handle promises
             *
             * ADDED BY strict:
             * - @typescript-eslint/no-unsafe-assignment: No assigning 'any'
             * - @typescript-eslint/no-unsafe-member-access: No accessing 'any' props
             * - @typescript-eslint/no-unsafe-call: No calling 'any' as function
             * - @typescript-eslint/no-unsafe-return: No returning 'any'
             *
             * WHY "strictTypeChecked" over "strict"?
             * - "strict" doesn't use TypeScript's type info
             * - "strictTypeChecked" DOES use types = finds more bugs
             *
             * DOCS: https://typescript-eslint.io/linting/configs#strict-type-checked
             */
            tseslint.configs.strictTypeChecked,

            /*
             * tseslint.configs.stylisticTypeChecked
             * ──────────────────────────────────────
             * WHAT: Code style rules WITH type information
             *
             * INCLUDES:
             * - Consistent type assertions (as Type vs <Type>)
             * - Prefer interface over type for objects
             * - Consistent array types (T[] vs Array<T>)
             * - Prefer nullish coalescing (??) over ||
             * - Prefer optional chaining (?.) over &&
             *
             * EXAMPLE:
             * // ❌ Flagged by stylistic rules
             * const name = user && user.name;
             *
             * // ✅ Preferred
             * const name = user?.name;
             *
             * DOCS: https://typescript-eslint.io/linting/configs#stylistic-type-checked
             */
            tseslint.configs.stylisticTypeChecked,
        ],

        /*
         * languageOptions: Parser and environment settings
         * ─────────────────────────────────────────────────
         * Tells ESLint HOW to read your code.
         */
        languageOptions: {
            /*
             * ecmaVersion: JavaScript version to parse
             * ────────────────────────────────────────
             * 'latest' = newest JavaScript syntax
             *
             * WHAT THIS ALLOWS:
             * - ES2023+ features (top-level await, etc.)
             * - New syntax as JavaScript evolves
             */
            ecmaVersion: "latest",

            /*
             * sourceType: How to treat files
             * ─────────────────────────────────
             * 'module' = ES Modules (import/export)
             * 'script' = Old-style scripts (no modules)
             * 'commonjs' = Node.js require/exports
             *
             * We use 'module' because our package.json has "type": "module"
             */
            sourceType: "module",

            /*
             * parserOptions: TypeScript parser configuration
             * ───────────────────────────────────────────────
             * These options configure how TypeScript code is parsed.
             */
            parserOptions: {
                /*
                 * projectService: Automatic TypeScript integration
                 * ─────────────────────────────────────────────────
                 * WHAT: Connects ESLint to TypeScript's type system
                 *
                 * HOW IT WORKS:
                 * 1. ESLint finds tsconfig.json
                 * 2. Starts TypeScript language service
                 * 3. Gets type information for each file
                 * 4. Type-aware rules can now work!
                 *
                 * ALTERNATIVE: projectService: { defaultProject: './tsconfig.json' }
                 * But 'true' auto-detects, which is simpler.
                 *
                 * WITHOUT THIS:
                 * Type-checked rules won't work - they need type information!
                 *
                 * DOCS: https://typescript-eslint.io/packages/parser#projectservice
                 */
                projectService: true,

                /*
                 * tsconfigRootDir: Where to look for tsconfig.json
                 * ─────────────────────────────────────────────────
                 * WHAT: Root directory for TypeScript configuration
                 *
                 * import.meta.dirname:
                 * - ESM way to get current directory (like __dirname in CommonJS)
                 * - Points to folder containing this eslint.config.mjs
                 * - Ensures tsconfig.json is found regardless of where ESLint runs
                 *
                 * WHY NEEDED?
                 * If you run ESLint from a different directory, it needs to know
                 * where the project root is to find tsconfig.json.
                 */
                tsconfigRootDir: import.meta.dirname,
            },
        },

        /*
         * ╔════════════════════════════════════════════════════════════════════════════╗
         * ║                          CUSTOM RULES                                      ║
         * ║              Override or customize default rule behavior                   ║
         * ╚════════════════════════════════════════════════════════════════════════════╝
         *
         * RULE SEVERITY LEVELS:
         * ┌──────────────────────────────────────────────────────────────────────────┐
         * │ Value    │ Meaning                                                       │
         * │──────────│───────────────────────────────────────────────────────────────│
         * │ 'off'    │ Disable the rule completely (same as 0)                       │
         * │ 'warn'   │ Show warning, but don't fail build (same as 1)                │
         * │ 'error'  │ Show error AND fail build (same as 2)                         │
         * └──────────────────────────────────────────────────────────────────────────┘
         *
         * RULE FORMAT:
         * - Simple: 'rule-name': 'error'
         * - With options: 'rule-name': ['error', { option: value }]
         */
        rules: {
            /*
             * ┌──────────────────────────────────────────────────────────────────────────┐
             * │              TYPESCRIPT-ESLINT RULE OVERRIDES                            │
             * └──────────────────────────────────────────────────────────────────────────┘
             */

            /*
             * @typescript-eslint/no-explicit-any: 'error'
             * ────────────────────────────────────────────
             * WHAT: Disallow the 'any' type
             *
             * WHY?
             * 'any' disables TypeScript's type checking - defeats the purpose!
             *
             * BAD (flagged):
             * function process(data: any) { ... } // ❌ anything goes
             *
             * GOOD (alternatives):
             * function process(data: unknown) { ... } // ✅ must check type first
             * function process<T>(data: T) { ... }    // ✅ generic type
             * function process(data: User) { ... }    // ✅ specific type
             *
             * WHEN TO USE any (rare cases):
             * - Third-party library without types
             * - Migrating JavaScript to TypeScript
             * - Use // eslint-disable-next-line @typescript-eslint/no-explicit-any
             */
            "@typescript-eslint/no-explicit-any": "error",

            /*
             * @typescript-eslint/explicit-function-return-type: 'off'
             * ─────────────────────────────────────────────────────────
             * WHAT: Require explicit return types on functions
             *
             * WHY OFF?
             * TypeScript can INFER return types automatically.
             * Explicit types add verbosity without much benefit.
             *
             * WITH RULE ON:
             * function add(a: number, b: number): number { // Must write ": number"
             *   return a + b;
             * }
             *
             * WITH RULE OFF (our choice):
             * function add(a: number, b: number) { // TypeScript infers return: number
             *   return a + b;
             * }
             *
             * EXCEPTION: Public API functions might benefit from explicit types.
             */
            "@typescript-eslint/explicit-function-return-type": "off",

            /*
             * @typescript-eslint/explicit-member-accessibility: 'off'
             * ─────────────────────────────────────────────────────────
             * WHAT: Require public/private/protected on class members
             *
             * WHY OFF?
             * - Default is public (no keyword needed)
             * - TypeScript handles this well
             * - Reduces boilerplate
             *
             * WITH RULE ON:
             * class User {
             *   public name: string;      // Must write 'public'
             *   private password: string; // Must write 'private'
             * }
             *
             * WITH RULE OFF:
             * class User {
             *   name: string;            // Implicitly public
             *   private password: string; // Only specify when not public
             * }
             */
            "@typescript-eslint/explicit-member-accessibility": "off",

            /*
             * @typescript-eslint/naming-convention: 'warn'
             * ──────────────────────────────────────────────
             * WHAT: Enforce consistent naming styles
             *
             * WHY NAMING MATTERS:
             * - Readable code
             * - Instant understanding of what something is
             * - Team consistency
             *
             * COMMON CONVENTIONS:
             * ┌────────────────────────────────────────────────────────────────────────┐
             * │ Type           │ Convention    │ Example                              │
             * │────────────────│───────────────│──────────────────────────────────────│
             * │ Variable       │ camelCase     │ userName, isActive                   │
             * │ Constant       │ UPPER_CASE    │ MAX_RETRIES, API_URL                 │
             * │ Function       │ camelCase     │ getUserById, calculateTotal          │
             * │ Class          │ PascalCase    │ UserService, PaymentController       │
             * │ Interface      │ PascalCase    │ UserResponse, ApiConfig              │
             * │ Type Alias     │ PascalCase    │ UserId, PaymentStatus                │
             * │ Enum           │ PascalCase    │ UserRole, PaymentStatus              │
             * │ Enum Member    │ UPPER_CASE    │ ADMIN, PENDING_PAYMENT               │
             * └────────────────────────────────────────────────────────────────────────┘
             */
            "@typescript-eslint/naming-convention": [
                "warn",
                /*
                 * Type Aliases: Must be PascalCase
                 * type UserId = string;     ✅
                 * type user_id = string;    ❌
                 */
                {
                    selector: "typeAlias",
                    format: ["PascalCase"],
                },
                /*
                 * Enums: Must be PascalCase
                 * enum UserRole { ... }     ✅
                 * enum userRole { ... }     ❌
                 */
                {
                    selector: "enum",
                    format: ["PascalCase"],
                },
                /*
                 * Enum Members: Must be UPPER_CASE
                 * enum UserRole { ADMIN, SUPER_ADMIN }    ✅
                 * enum UserRole { Admin, SuperAdmin }    ❌
                 */
                {
                    selector: "enumMember",
                    format: ["UPPER_CASE"],
                },
                /*
                 * Variables: camelCase, UPPER_CASE (constants), or PascalCase (React components)
                 * const userName = 'John';     ✅ camelCase
                 * const MAX_RETRIES = 3;       ✅ UPPER_CASE
                 * const UserCard = () => ...;  ✅ PascalCase (React)
                 *
                 * leadingUnderscore: 'allow' permits _unusedVar pattern
                 */
                {
                    selector: "variable",
                    format: ["camelCase", "UPPER_CASE", "PascalCase"],
                    leadingUnderscore: "allow",
                },
                /*
                 * Functions: camelCase or PascalCase
                 * function getUserById() { }   ✅ camelCase
                 * function UserCard() { }      ✅ PascalCase (React component)
                 */
                {
                    selector: "function",
                    format: ["camelCase", "PascalCase"],
                },
                /*
                 * Parameters: camelCase
                 * function greet(userName: string) { }  ✅
                 * function greet(user_name: string) { } ❌
                 *
                 * leadingUnderscore allows _unused for intentionally unused params
                 */
                {
                    selector: "parameter",
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                },
            ],

            /*
             * @typescript-eslint/no-floating-promises: 'error'
             * ──────────────────────────────────────────────────
             * WHAT: Ensure promises are properly handled
             *
             * PROBLEM:
             * If you don't await or handle a promise, errors are silently swallowed!
             *
             * BAD (flagged):
             * fetchUser(id);              // ❌ Promise ignored! Errors lost!
             * async function bad() {
             *   doAsyncWork();            // ❌ Not awaited
             * }
             *
             * GOOD:
             * await fetchUser(id);        // ✅ Awaited
             * fetchUser(id).catch(err => logger.error(err)); // ✅ Handled
             * void fetchUser(id);         // ✅ Explicitly ignored (rare)
             *
             * THIS IS A MAJOR BUG FINDER!
             */
            "@typescript-eslint/no-floating-promises": "error",

            /*
             * @typescript-eslint/prefer-nullish-coalescing: 'warn'
             * ──────────────────────────────────────────────────────
             * WHAT: Prefer ?? over || for null/undefined checks
             *
             * WHY?
             * || treats '', 0, false as falsy (often not intended)
             * ?? only treats null/undefined as nullish
             *
             * EXAMPLE:
             * const count = input || 10;   // ❌ If input is 0, count becomes 10!
             * const count = input ?? 10;   // ✅ Only if input is null/undefined
             *
             * REAL BUG THIS CATCHES:
             * const port = process.env.PORT || 3000;  // Bug: '' becomes 3000
             * const port = process.env.PORT ?? 3000;  // Correct: '' stays ''
             */
            "@typescript-eslint/prefer-nullish-coalescing": "warn",

            /*
             * @typescript-eslint/prefer-optional-chain: 'error'
             * ───────────────────────────────────────────────────
             * WHAT: Prefer ?. over && for property access
             *
             * CLEANER CODE:
             * // ❌ Verbose
             * const name = user && user.profile && user.profile.name;
             *
             * // ✅ Clean
             * const name = user?.profile?.name;
             *
             * ALSO WORKS FOR:
             * user?.getProfile?.()   // Optional method call
             * users?.[0]             // Optional array access
             */
            "@typescript-eslint/prefer-optional-chain": "error",

            /*
             * @typescript-eslint/no-unused-vars: 'warn'
             * ──────────────────────────────────────────
             * WHAT: Warn on declared but unused variables
             *
             * PATTERNS TO IGNORE (underscore prefix):
             * - _unusedVar      → Intentionally unused
             * - _req            → Express request not needed
             * - _err            → Caught error not needed
             *
             * EXAMPLE:
             * const used = 1;   // ✅ OK
             * const unused = 1; // ⚠️ Warning: 'unused' is never used
             * const _unused = 1; // ✅ OK (underscore prefix)
             *
             * EXPRESS EXAMPLE:
             * app.use((req, res, _next) => { ... }); // _next intentionally unused
             */
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_", // Ignore params starting with _
                    varsIgnorePattern: "^_", // Ignore vars starting with _
                    caughtErrorsIgnorePattern: "^_", // Ignore catch(e) if _e
                },
            ],

            /*
             * @typescript-eslint/no-empty-function: 'warn'
             * ──────────────────────────────────────────────
             * WHAT: Warn on empty function bodies
             *
             * WHY?
             * Empty functions are often:
             * - Forgotten implementations
             * - Dead code
             * - Bugs waiting to happen
             *
             * ALLOWED EXCEPTIONS:
             * - arrowFunctions: () => {} (common for callbacks)
             * - functions: function() {} (interface implementations)
             * - methods: class { method() {} } (abstract-like patterns)
             *
             * EXAMPLE:
             * const noop = () => {};           // ✅ Allowed (arrow function)
             * function placeholder() {}        // ✅ Allowed
             * class A { onClick() {} }         // ✅ Allowed (method)
             */
            "@typescript-eslint/no-empty-function": [
                "warn",
                {
                    allow: ["arrowFunctions", "functions", "methods"],
                },
            ],

            /*
             * @typescript-eslint/restrict-template-expressions: 'warn'
             * ─────────────────────────────────────────────────────────
             * WHAT: Control what can be used in template strings
             *
             * PROBLEM:
             * Objects in templates produce "[object Object]"!
             *
             * BAD:
             * const user = { name: 'John' };
             * console.log(`User: ${user}`); // "User: [object Object]" ❌
             *
             * GOOD:
             * console.log(`User: ${user.name}`);        // "User: John" ✅
             * console.log(`User: ${JSON.stringify(user)}`); // ✅
             *
             * ALLOWED:
             * - Numbers: `Count: ${5}` ✅
             * - Booleans: `Active: ${true}` ✅
             * - Nullish: `Value: ${null}` ❌ (can be confusing)
             */
            "@typescript-eslint/restrict-template-expressions": [
                "warn",
                {
                    allowNumber: true, // Allow numbers in templates
                    allowBoolean: true, // Allow booleans in templates
                    allowNullish: false, // Don't allow null/undefined
                },
            ],

            /*
             * ┌──────────────────────────────────────────────────────────────────────────┐
             * │                    ESLINT CORE RULE OVERRIDES                            │
             * └──────────────────────────────────────────────────────────────────────────┘
             */

            /*
             * curly: ['error', 'all']
             * ───────────────────────
             * WHAT: Require curly braces for ALL control statements
             *
             * WHY?
             * Missing braces can cause bugs when adding code.
             *
             * BAD (allowed without this rule):
             * if (condition)
             *   doSomething();
             *   doSomethingElse(); // Bug! This ALWAYS runs!
             *
             * GOOD (required by this rule):
             * if (condition) {
             *   doSomething();
             * }
             *
             * EVEN FOR SINGLE LINES:
             * if (condition) { return; } // ✅ Braces required
             */
            curly: ["error", "all"],

            /*
             * eqeqeq: ['error', 'always']
             * ────────────────────────────
             * WHAT: Require === and !== (strict equality)
             *
             * WHY?
             * == does type coercion which causes bugs!
             *
             * EXAMPLES OF == BUGS:
             * '' == false      // true (wat?)
             * '0' == 0         // true (type coercion)
             * null == undefined // true (coercion)
             * [] == false      // true (array coerced)
             *
             * STRICT EQUALITY (===) - No surprises:
             * '' === false     // false ✅
             * '0' === 0        // false ✅
             * null === undefined // false ✅
             *
             * ALWAYS USE === and !== !
             */
            eqeqeq: ["error", "always"],

            /*
             * no-console: ['error', { allow: ['warn', 'error'] }]
             * ────────────────────────────────────────────────────
             * WHAT: Disallow console.log in production code
             *
             * WHY?
             * - console.log is for debugging, not production
             * - Use proper logging library (winston) instead
             * - Console output can leak sensitive data
             * - Proper loggers have levels, formatting, destinations
             *
             * ALLOWED:
             * console.warn('Deprecation notice');  // ✅ Warnings
             * console.error('Fatal error');        // ✅ Errors
             *
             * BLOCKED:
             * console.log('User logged in');       // ❌ Use logger.info()
             * console.info('Processing...');       // ❌ Use logger.info()
             * console.debug('x =', x);             // ❌ Use logger.debug()
             *
             * CORRECT WAY:
             * import { logger } from './utils/logger';
             * logger.info('User logged in', { userId });
             */
            "no-console": ["error", { allow: ["warn", "error"] }],

            /*
             * no-debugger: 'error'
             * ─────────────────────
             * WHAT: Disallow debugger statements
             *
             * WHY?
             * debugger; statements should never be in production!
             * They freeze the browser/Node.js execution.
             *
             * BAD:
             * function process() {
             *   debugger; // ❌ Forgot to remove!
             *   return result;
             * }
             *
             * THIS RULE:
             * Prevents accidental commit of debugger statements.
             */
            "no-debugger": "error",

            /*
             * no-duplicate-imports: 'error'
             * ──────────────────────────────
             * WHAT: Disallow multiple imports from same module
             *
             * BAD:
             * import { userService } from './services';
             * import { paymentService } from './services'; // ❌ Duplicate!
             *
             * GOOD:
             * import { userService, paymentService } from './services'; // ✅
             *
             * WHY?
             * - Cleaner code
             * - Easier to see all imports from a module
             * - Better for tree-shaking
             */
            "no-duplicate-imports": "error",

            /*
             * prefer-const: 'error'
             * ──────────────────────
             * WHAT: Use const when variable is never reassigned
             *
             * WHY?
             * - Shows intent: "this value won't change"
             * - Prevents accidental reassignment
             * - Makes code easier to understand
             *
             * BAD:
             * let name = 'John';  // ❌ Never reassigned, should be const
             * console.log(name);
             *
             * GOOD:
             * const name = 'John'; // ✅ Clear: won't change
             * console.log(name);
             *
             * WHEN TO USE let:
             * let count = 0;
             * count++;          // ✅ Reassigned, let is correct
             */
            "prefer-const": "error",

            /*
             * prefer-template: 'warn'
             * ────────────────────────
             * WHAT: Prefer template literals over string concatenation
             *
             * BAD:
             * const greeting = 'Hello, ' + name + '!'; // ❌ Concatenation
             *
             * GOOD:
             * const greeting = `Hello, ${name}!`;      // ✅ Template literal
             *
             * WHY?
             * - More readable
             * - Easier to maintain
             * - Supports multi-line strings
             * - Can embed expressions
             *
             * TEMPLATE BENEFITS:
             * const sql = `
             *   SELECT *
             *   FROM users
             *   WHERE id = ${userId}
             * `; // Multi-line is easy!
             */
            "prefer-template": "warn",
        },
    },

    /*
     * ╔══════════════════════════════════════════════════════════════════════════════╗
     * ║                    JAVASCRIPT CONFIGURATION                                  ║
     * ║          Rules for plain JavaScript files (.js, .mjs, .cjs)                  ║
     * ╚══════════════════════════════════════════════════════════════════════════════╝
     *
     * WHY SEPARATE CONFIG FOR JS?
     * ────────────────────────────
     * 1. Type-checked rules don't work (no TypeScript types!)
     * 2. JS files might need different rules
     * 3. Config files are often JS (eslint.config.mjs)
     *
     * WHAT FILES?
     * - .js   = JavaScript (format depends on package.json)
     * - .mjs  = JavaScript ES Module
     * - .cjs  = JavaScript CommonJS
     *
     * IN THIS PROJECT:
     * - eslint.config.mjs
     * - Any utility scripts
     */
    {
        /*
         * name: Identifier for debugging
         */
        name: "ph-healthcare/javascript",

        /*
         * files: JavaScript file patterns
         */
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],

        /*
         * extends: Configurations to use
         * ───────────────────────────────
         * 1. eslint.configs.recommended: Core JS rules
         * 2. tseslint.configs.disableTypeChecked: Turn off type-aware rules
         *
         * WHY disableTypeChecked?
         * Type-checked rules need TypeScript.
         * JS files don't have types, so these rules would fail.
         */
        extends: [eslint.configs.recommended, tseslint.configs.disableTypeChecked],

        /*
         * rules: Relaxed rules for JS files
         */
        rules: {
            /*
             * Allow console in JS files
             * ─────────────────────────
             * JS files are often utility scripts where console is OK.
             * The strict no-console rule is for TypeScript production code.
             */
            "no-console": "off",
        },
    },

    /*
     * ╔══════════════════════════════════════════════════════════════════════════════╗
     * ║                    CONFIG FILES CONFIGURATION                                ║
     * ║              Special rules for configuration files                           ║
     * ╚══════════════════════════════════════════════════════════════════════════════╝
     *
     * CONFIG FILES ARE SPECIAL:
     * ─────────────────────────
     * - Often use default exports (export default {})
     * - May use require() for CommonJS interop
     * - Don't follow normal application patterns
     *
     * MATCHES:
     * - eslint.config.mjs
     * - prettier.config.js
     * - vite.config.ts
     * - prisma.config.ts
     */
    {
        name: "ph-healthcare/config-files",

        /*
         * files: Config file patterns
         * ───────────────────────────
         * *.config.{js,ts,mjs,mts} matches:
         * - eslint.config.mjs
         * - tsconfig.json (but that's JSON, not matched)
         * - vite.config.ts
         * - prisma.config.ts (also listed explicitly)
         */
        files: ["*.config.{js,ts,mjs,mts}", "prisma.config.ts"],

        rules: {
            /*
             * Allow default exports in config files
             * ──────────────────────────────────────
             * Config files typically use: export default { ... }
             * Some rules prefer named exports, but configs need defaults.
             */
            "import/prefer-default-export": "off",

            /*
             * Allow require() in config files
             * ─────────────────────────────────
             * Some config files need CommonJS interop:
             * const pkg = require('./package.json');
             */
            "@typescript-eslint/no-require-imports": "off",
        },
    },

    /*
     * ╔══════════════════════════════════════════════════════════════════════════════╗
     * ║                        TEST FILES CONFIGURATION                              ║
     * ║               Relaxed rules for test files                                   ║
     * ╚══════════════════════════════════════════════════════════════════════════════╝
     *
     * WHY SPECIAL RULES FOR TESTS?
     * ─────────────────────────────
     * Tests have different needs:
     * - Mocking often requires 'any' type
     * - Assertions may have "unused" expressions
     * - Magic numbers are OK in test data
     * - Non-null assertions (!) are common in tests
     *
     * TEST FILE NAMING CONVENTIONS:
     * - .test.ts  = Unit tests (user.test.ts)
     * - .spec.ts  = Specification tests (user.spec.ts)
     * - __tests__/ = Test directory (Jest convention)
     */
    {
        name: "ph-healthcare/tests",

        /*
         * files: Test file patterns
         * ─────────────────────────
         * Matches common test naming conventions:
         * - src/services/user.test.ts
         * - src/services/user.spec.ts
         * - src/__tests__/user.ts
         */
        files: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/**/*.ts"],

        rules: {
            /*
             * Allow 'any' in tests
             * ─────────────────────
             * Mocking often requires any:
             * const mockDb = { query: jest.fn() } as any;
             */
            "@typescript-eslint/no-explicit-any": "off",

            /*
             * Allow unused expressions
             * ─────────────────────────
             * Test assertions are often expressions:
             * expect(result).toBe(true); // "unused" expression
             */
            "@typescript-eslint/no-unused-expressions": "off",

            /*
             * Allow magic numbers
             * ────────────────────
             * Test data often has literal numbers:
             * const user = { id: 123, age: 25 };
             */
            "@typescript-eslint/no-magic-numbers": "off",

            /*
             * Allow non-null assertions (!)
             * ──────────────────────────────
             * Tests often know values exist:
             * const user = await findUser(id);
             * expect(user!.name).toBe('John'); // We know user exists
             */
            "@typescript-eslint/no-non-null-assertion": "off",
        },
    },

    /*
     * ╔══════════════════════════════════════════════════════════════════════════════╗
     * ║                    SEED AND SCRIPT FILES CONFIGURATION                       ║
     * ║                 Special rules for database seeds and scripts                 ║
     * ╚══════════════════════════════════════════════════════════════════════════════╝
     *
     * WHAT ARE SEED FILES?
     * ─────────────────────
     * Database seed files populate initial data:
     * - Test users
     * - Sample products
     * - Configuration values
     *
     * Run with: pnpm db:seed
     *
     * WHY SPECIAL RULES?
     * ──────────────────
     * - Seeds use console.log for progress output
     * - May have fire-and-forget async operations
     */
    {
        name: "ph-healthcare/scripts",

        /*
         * files: Seed and script patterns
         */
        files: ["prisma/seed.ts", "scripts/**/*.ts"],

        rules: {
            /*
             * Allow console in scripts
             * ─────────────────────────
             * Seed scripts need console output:
             * console.log('Seeding users...');
             * console.log('✅ Seed complete!');
             */
            "no-console": "off",

            /*
             * Warn (not error) on floating promises
             * ──────────────────────────────────────
             * Scripts may have intentional fire-and-forget:
             * cleanup(); // Don't need to await cleanup
             */
            "@typescript-eslint/no-floating-promises": "warn",
        },
    },

    /*
     * ╔══════════════════════════════════════════════════════════════════════════════╗
     * ║                        REDIS HELPER FILES                                    ║
     * ║         Special rules for Redis cache and connection management             ║
     * ╚══════════════════════════════════════════════════════════════════════════════╝
     *
     * WHY SPECIAL RULES?
     * ──────────────────
     * - Redis client types from getRedisManager().getClient() chain trigger unsafe warnings
     * - Type assertions and guards are correct but ESLint strict mode flags them
     * - These are false positives - the code is type-safe with proper error handling
     */
    {
        name: "ph-healthcare/redis-helpers",

        /*
         * files: Redis helper file patterns
         */
        files: [
            "src/helpers/redisCache.ts",
            "src/helpers/cacheStrategies.ts",
            "src/helpers/redisConnection.ts",
        ],

        rules: {
            /*
             * Disable unsafe type warnings for Redis operations
             * ──────────────────────────────────────────────────
             * The getRedisClient() helper uses proper type guards and error handling.
             * TypeScript's strict mode flags these as potentially unsafe due to method chaining,
             * but the code is actually type-safe with explicit null checks and type assertions.
             */
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
        },
    },
);

/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                           QUICK REFERENCE                                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * COMMANDS:
 * ─────────
 * pnpm lint          → Check all files
 * pnpm lint:fix      → Auto-fix issues
 * pnpm lint:strict   → Zero warnings allowed
 *
 * COMMON DISABLE COMMENTS:
 * ─────────────────────────
 * // eslint-disable-next-line @typescript-eslint/no-explicit-any
 * // eslint-disable-next-line no-console
 *
 * /* eslint-disable @typescript-eslint/no-explicit-any * /  (block)
 * /* eslint-enable @typescript-eslint/no-explicit-any * /   (re-enable)
 *
 * DEBUGGING CONFIG:
 * ─────────────────
 * npx eslint --print-config src/server.ts
 * → Shows final merged config for a file
 *
 * RECOMMENDED READING:
 * ────────────────────
 * 1. ESLint Rules: https://eslint.org/docs/rules/
 * 2. TypeScript-ESLint: https://typescript-eslint.io/rules/
 * 3. Flat Config Guide: https://eslint.org/docs/latest/use/configure/configuration-files
 */
