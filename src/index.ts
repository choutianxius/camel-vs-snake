function base(keyConverter: (arg0: string) => string, o: any): any {
  if (!(o && typeof o === "object")) {
    return o;
  }
  if (Array.isArray(o)) {
    return o.map((x) => base(keyConverter, x));
  }
  if (o?.constructor?.name !== "Object") {
    return o;
  }
  const entries = Object.entries(o).map(([key, value]) => [
    keyConverter(key),
    base(keyConverter, value),
  ]);
  return Object.fromEntries(entries);
}

export function camelStringToSnake(camel: string): string {
  return camel.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function snakeStringToCamel(snake: string): string {
  return snake.replace(/_([a-z])/g, (group) =>
    group[1].replace("_", "").toUpperCase()
  );
}

export function camelToSnake(o: any): any {
  return base(camelStringToSnake, o);
}

export function snakeToCamel(o: any): any {
  return base(snakeStringToCamel, o);
}
