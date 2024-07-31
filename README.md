# Camel VS Snake

Provides utility functions for converting object attribute names from camelCase to snake_case.

Supports:

- Converting strings between camelCase and snake_case;
- Converting base objects;
- Converting nested objects;
- Converting arrays of objects.

Exported functions: `camelToSnake`, `snakeToCamel`, `camelStringToSnake`, `snakeStringToCamel`.

Unit tests are managed by a custom `runTest` function which emulates `Jest` syntax, which were first implemented using `node:assert`. Now I switched to bun, so the `deepStrictEqual` and `ok` functions are implemented using `bun:test` API. Could have fully migrated to `bun:test` but the hand-crafted test runner is funny to play with and I don't want to discard it.
