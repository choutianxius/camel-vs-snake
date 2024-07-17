import { deepStrictEqual } from "node:assert/strict";

import {
  camelToSnake,
  snakeToCamel,
  camelStringToSnake,
  snakeStringToCamel,
} from "./index.js";

let counter = 1;

async function runTest(description: string, test: () => Promise<void>) {
  const thisCounter = counter++;
  console.log(description);
  try {
    await test();
    console.log(`\u001b[32mTest ${thisCounter} passed!\u001b[0m\n`);
  } catch (e) {
    console.error(`\u001b[31mTest ${thisCounter} failed!\u001b[0m\n`);
    console.error(e);
  }
}

await runTest(
  "camelStringToSnake should convert camelCase string to snake_case",
  async () => {
    const camelString = "playerName";
    const expected = "player_name";
    const actual = camelStringToSnake(camelString);
    deepStrictEqual(actual, expected);
  }
);

await runTest(
  "snakeStringToCamel should convert snake_case string to camelCase",
  async () => {
    const snakeString = "player_name";
    const expected = "playerName";
    const actual = snakeStringToCamel(snakeString);
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
  "snakeToCamel for base objects should work properly",
  async () => {
    const snake = { player_name: "LeBron James", total_score: 56 };
    const expected = { playerName: "LeBron James", totalScore: 56 };
    const actual = snakeToCamel(snake);
    deepStrictEqual(actual, expected);
  }
);

await runTest(
  "camelToSnake should convert each element in an array",
  async () => {
    const camel = [
      { playerName: "LeBron James", totalScore: 56 },
      { playerName: "Stephen Curry", totalScore: 38 },
    ];
    const expected = [
      { player_name: "LeBron James", total_score: 56 },
      { player_name: "Stephen Curry", total_score: 38 },
    ];
    const actual = camelToSnake(camel);
    deepStrictEqual(actual, expected);
  }
);

await runTest(
  "snakeToCamel should convert each element in an array",
  async () => {
    const snake = [
      { player_name: "LeBron James", total_score: 56 },
      { player_name: "Stephen Curry", total_score: 38 },
    ];
    const expected = [
      { playerName: "LeBron James", totalScore: 56 },
      { playerName: "Stephen Curry", totalScore: 38 },
    ];
    const actual = snakeToCamel(snake);
    deepStrictEqual(actual, expected);
  }
);

await runTest("camelToSnake should convert nested objects", async () => {
  const camel = {
    playerName: "LeBron James",
    totalScore: 56,
    teamInfo: { teamName: "Cavaliers", location: "Cleveland" },
  };
  const expected = {
    player_name: "LeBron James",
    total_score: 56,
    team_info: { team_name: "Cavaliers", location: "Cleveland" },
  };
  const actual = camelToSnake(camel);
  deepStrictEqual(actual, expected);
});

await runTest("snakeToCamel should convert nested objects", async () => {
  const snake = {
    player_name: "LeBron James",
    total_score: 56,
    team_info: { team_name: "Cavaliers", location: "Cleveland" },
  };
  const expected = {
    playerName: "LeBron James",
    totalScore: 56,
    teamInfo: { teamName: "Cavaliers", location: "Cleveland" },
  };
  const actual = snakeToCamel(snake);
  deepStrictEqual(actual, expected);
});
