import { deepStrictEqual } from "node:assert/strict";

import {
  camelToSnake,
  snakeToCamel,
  camelToSnakeConverter,
  snakeToCamelConverter,
} from "./index.js";

let counter = 1;

async function runTest(description: string, test: () => Promise<void>) {
  const thisCounter = counter++;
  console.log(description);
  try {
    await test();
    console.log(`\u001b[32mTest ${thisCounter} passed!\u001b[0m`);
  } catch (e) {
    console.error(`\u001b[31mTest ${thisCounter} failed!\u001b[0m`);
    console.error(e);
  }
}

await runTest(
  "camelToSnakeConverter should convert camelCase string to snake_case",
  async () => {
    const camelString = "playerName";
    const expected = "player_name";
    const actual = camelToSnakeConverter(camelString);
    deepStrictEqual(actual, expected);
  }
);

await runTest(
  "camelToSnake for base objects should work properly",
  async () => {
    const camel = { playerName: "LeBron James", totalScore: 56 };
    const expected = { player_name: "LeBron James", total_score: 56 };
    const actual = camelToSnake(camel);
    deepStrictEqual(actual, expected);
  }
);

await runTest(
  "snakeToCamelConverter should convert snake_case string to camelCase",
  async () => {
    const snakeString = "player_name";
    const expected = "playerName";
    const actual = snakeToCamelConverter(snakeString);
    deepStrictEqual(actual, expected);
  }
);

await runTest(
  "snakeToCamel for base objects should work properly",
  async () => {
    const snake = { player_name: "LeBron James", total_score: 56 };
    const expected = { playerName: "LeBron James", totalScore: 56 };
    const actual = snakeToCamel(snake);
    deepStrictEqual(actual, expected);
  }
);
