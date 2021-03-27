export const tabCoordinates = {};

export function storeCoordinates(key, value) {
  tabCoordinates[key] = {
    x: value.x,
    y: value.y,
  };
}
