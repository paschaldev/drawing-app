import { Path } from 'konva/lib/shapes/Path';
import { Vector2d } from 'konva/lib/types';
import { DrawerShape, PolygonShape, RegularShape } from 'src/types';

/**
 * Get [x,y] co-ordinates representing a rectangle between
 * two points.
 *
 * @param {Vector2d} origin - Point of first click
 * @param {Vector2d} mousePosition - Current mouse position in context
 *
 * @returns {Array}
 */
export const getTriangle = (
  origin: Vector2d,
  mousePosition: Vector2d
): Vector2d[] => {
  // First point of the rectangle is the tip / midpoint at the top.
  // To get the point as mouse moves, subtract the current mouse
  // position on the x-axis from the origin; divide by 2
  const midpointX = (mousePosition.x - origin.x) / 2;
  const firstPoint = { x: midpointX + origin.x, y: origin.y };

  const data = [
    firstPoint,
    { x: mousePosition.x, y: mousePosition.y },
    { x: origin.x, y: mousePosition.y },
    firstPoint, // Close path
  ];

  return data;
};

/**
 * Get co-ordinates representing a fixed 6-sided polygon
 *
 * @param {Vector2d} origin - Point of first click
 * @param {Vector2d} mousePosition - Current mouse position in context
 *
 * @returns {Array}
 */
export const getPolygon = (
  origin: Vector2d,
  mousePosition: Vector2d
): Vector2d[] => {
  const SIDES = 6;
  // Calculate the distance between the two points
  const distance = Math.sqrt(
    (mousePosition.x - origin.x) ** 2 + (mousePosition.y - origin.y) ** 2
  );
  // Calculate the radius of the hexagon
  const radius = distance / 2;
  // Calculate the angle between the two points
  const angle = Math.atan2(
    mousePosition.y - origin.y,
    mousePosition.x - origin.x
  );
  // Calculate the x and y coordinates of the six points
  const data = [];
  for (let i = 0; i < SIDES; i += 1) {
    const degree = angle + (i * Math.PI) / 3;
    const x = origin.x + radius * Math.cos(degree);
    const y = origin.y + radius * Math.sin(degree);
    data.push({ x, y });
  }
  // Close hexagon path
  data.push(data[0]);
  return data;
};

/**
 * Get coordinates for rectangle
 *
 * @param {Vector2d} origin - Point of first click
 * @param {Vector2d} mousePosition - Current mouse position in context
 *
 * @returns
 */
export const getRectangle = (
  origin: Vector2d,
  mousePosition: Vector2d
): Vector2d[] => {
  // First point is the top-left most part of the rectangle
  const firstPoint = { x: origin.x, y: origin.y };
  const data = [
    firstPoint,
    { x: mousePosition.x, y: origin.y },
    { x: mousePosition.x, y: mousePosition.y },
    { x: origin.x, y: mousePosition.y },
    firstPoint, // Close path
  ];

  return data;
};

/** Shape functions definitions */
const shapeFunctions = {
  [PolygonShape.TRIANGLE]: getTriangle,
  [PolygonShape.HEXAGON]: getPolygon,
  [RegularShape.SQUARE]: getRectangle,
};
/**
 * Get shape points from the type
 *
 * @param {DrawerShape} type - The type of shape points: Rectangle, Hexagon, Triangle
 * @param {Vector2d} origin - Point of first click
 * @param {Vector2d} mousePosition - Current mouse position in context
 *
 * @returns {Array}
 */
export const getShapePoints = (
  type: DrawerShape,
  origin: Vector2d,
  mousePosition: Vector2d
): number[] => {
  // Get shape function
  const shapeFunction = shapeFunctions[type];
  if (shapeFunction) {
    // Get points for the fixed size shapes
    const points: Vector2d[] = shapeFunction(origin, mousePosition);
    // Transform array of object points to flattened nested array of points
    // => [{x:1, y:2}, {x:3, y:4}] => [1,2, 3,4]
    return points.map(({ x, y }) => [x, y]).flat();
  }
  return [];
};

/**
 * Convert Konva points to SVG string data
 *
 * @param {...number} points - Flat array of number points represening Konva Line
 *
 * @returns {string}
 */
export const pointsToPath = (points: number[]): string => {
  let path = '';

  for (let i = 0; i < points.length; i += 2) {
    switch (i) {
      case 0: // move
        path = `${path}M ${points[i]},${points[i + 1]} `;
        break;
      default:
        path = `${path}L ${points[i]},${points[i + 1]} `;
        break;
    }
  }
  return path;
};

/**
 * Get the closest point of a coordinate to SVG path
 *
 * @link {https://gist.github.com/mbostock/8027637 }
 * @param {Path} pathNode - Konva Path node
 * @param {Vector2d} point - {x,y} coordinates
 *
 * @returns {Vector2d}
 */
export const getClosestPointToSVG = (
  pathNode: Path,
  point: Vector2d
): Vector2d => {
  const pathLength = pathNode.getLength();
  let precision = 8;
  let best: Vector2d;
  let bestLength: number;
  let bestDistance = Infinity;

  function distance2(p: Vector2d) {
    const dx = p.x - point.x;
    const dy = p.y - point.y;
    return dx * dx + dy * dy;
  }
  // linear scan for coarse approximation
  for (
    let scan, scanLength = 0, scanDistance;
    scanLength <= pathLength;
    scanLength += precision
  ) {
    scanDistance = distance2((scan = pathNode.getPointAtLength(scanLength)));
    if (scanDistance < bestDistance) {
      best = scan;
      bestLength = scanLength;
      bestDistance = scanDistance;
    }
  }
  // binary search for precise estimate
  precision /= 2;
  while (precision > 0.5) {
    let before;
    let after;
    const beforeLength = bestLength - precision;
    const afterLength = bestLength + precision;
    const beforeDistance = distance2(
      (before = pathNode.getPointAtLength(beforeLength))
    );
    const afterDistance = distance2(
      (after = pathNode.getPointAtLength(afterLength))
    );
    if (beforeLength >= 0 && beforeDistance < bestDistance) {
      best = before;
      bestLength = beforeLength;
      bestDistance = beforeDistance;
    } else if (afterLength <= pathLength && afterDistance < bestDistance) {
      best = after;
      bestLength = afterLength;
      bestDistance = afterDistance;
    } else {
      precision /= 2;
    }
  }
  best = { x: best.x, y: best.y };
  return best;
};
