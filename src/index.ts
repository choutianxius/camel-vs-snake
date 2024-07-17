function base(keyConverter: (arg0: string) => string, o: object): object {
  if (Array.isArray(o)) {
    return o.map((x) => base(keyConverter, x));
  }
  const o1 = {};
  Object.entries(o).forEach(([key, value]) => {
    const convertedKey = keyConverter(key);
    if (typeof value === "object") {
      o1[convertedKey] = base(keyConverter, value);
    } else {
      o1[convertedKey] = value;
    }
  });
  return o1;
}

export function camelToSnakeConverter(camel: string): string {
  return camel.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function snakeToCamelConverter(snake: string): string {
  return snake.replace(/_([a-z])/g, (group) =>
    group[1].replace("_", "").toUpperCase()
  );
}

export function camelToSnake(o: object): object {
  return base(camelToSnakeConverter, o);
}

export function snakeToCamel(o: object): object {
  return base(snakeToCamelConverter, o);
}
