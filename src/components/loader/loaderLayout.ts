import { bentoTiles, BentoTileData } from "./loaderData";

export interface TileLayout {
  id: string;
  data: BentoTileData;
  colSpan: number;
  rowSpan: number;
  colStart?: number;
  rowStart?: number;
}

export interface GridLayout {
  columns: number;
  rows: number;
  gap: number;
  tiles: TileLayout[];
}

export function getGridLayout(viewportWidth: number, viewportHeight: number): GridLayout {
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
  const isLaptop = viewportWidth >= 1024 && viewportWidth < 1280;
  // const isDesktop = viewportWidth >= 1280;

  if (isMobile) {
    // 4-column grid for mobile
    return {
      columns: 4,
      rows: 6,
      gap: 12,
      tiles: [
        { id: "brand", data: bentoTiles[0], colSpan: 4, rowSpan: 2 },
        { id: "food-1", data: bentoTiles[1], colSpan: 2, rowSpan: 2 },
        { id: "rider", data: bentoTiles[4], colSpan: 2, rowSpan: 2 },
        { id: "app", data: bentoTiles[3], colSpan: 2, rowSpan: 2 },
        { id: "order", data: bentoTiles[5], colSpan: 2, rowSpan: 2 },
      ],
    };
  }

  if (isTablet) {
    // 8-column grid for tablet
    return {
      columns: 8,
      rows: 6,
      gap: 16,
      tiles: [
        { id: "food-1", data: bentoTiles[1], colSpan: 3, rowSpan: 3 },
        { id: "brand", data: bentoTiles[0], colSpan: 5, rowSpan: 2 },
        { id: "app", data: bentoTiles[3], colSpan: 3, rowSpan: 4 },
        { id: "restaurant", data: bentoTiles[2], colSpan: 2, rowSpan: 4 },
        { id: "rider", data: bentoTiles[4], colSpan: 3, rowSpan: 3 },
        { id: "order", data: bentoTiles[5], colSpan: 2, rowSpan: 1 },
      ],
    };
  }

  if (isLaptop) {
    // 10-column grid for laptop
    return {
      columns: 10,
      rows: 5,
      gap: 20,
      tiles: [
        { id: "food-1", data: bentoTiles[1], colSpan: 3, rowSpan: 3 },
        { id: "brand", data: bentoTiles[0], colSpan: 4, rowSpan: 2 },
        { id: "rider", data: bentoTiles[4], colSpan: 3, rowSpan: 2 },
        { id: "restaurant", data: bentoTiles[2], colSpan: 2, rowSpan: 3 },
        { id: "app", data: bentoTiles[3], colSpan: 2, rowSpan: 3 },
        { id: "order", data: bentoTiles[5], colSpan: 3, rowSpan: 3 },
      ],
    };
  }

  // 12-column grid for desktop
  return {
    columns: 12,
    rows: 6,
    gap: 24,
    tiles: [
      { id: "food-1", data: bentoTiles[1], colSpan: 3, rowSpan: 3 },
      { id: "brand", data: bentoTiles[0], colSpan: 5, rowSpan: 2 },
      { id: "rider", data: bentoTiles[4], colSpan: 4, rowSpan: 3 },
      { id: "restaurant", data: bentoTiles[2], colSpan: 3, rowSpan: 3 },
      { id: "app", data: bentoTiles[3], colSpan: 3, rowSpan: 4 },
      { id: "order", data: bentoTiles[5], colSpan: 2, rowSpan: 2 },
      { id: "food-2", data: bentoTiles[6], colSpan: 4, rowSpan: 3 },
      { id: "map", data: bentoTiles[8], colSpan: 2, rowSpan: 2 },
    ],
  };
}

export function calculateEntranceData(
  tileRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
) {
  const tileCenterX = tileRect.left + tileRect.width / 2;
  const tileCenterY = tileRect.top + tileRect.height / 2;

  const viewportCenterX = viewportWidth / 2;
  const viewportCenterY = viewportHeight / 2;

  const deltaX = tileCenterX - viewportCenterX;
  const deltaY = tileCenterY - viewportCenterY;

  const angle = Math.atan2(deltaY, deltaX);
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Normalize distance against a max expected viewport diagonal (~2500px)
  const maxDistance = Math.sqrt(viewportWidth ** 2 + viewportHeight ** 2) / 2;
  const normalizedDistance = Math.min(distance / maxDistance, 1);

  return { deltaX, deltaY, angle, distance, normalizedDistance };
}
