import { Path } from 'konva/lib/shapes/Path';
import { Vector2d } from 'konva/lib/types';
import { MutableRefObject } from 'react';

export type ToolbarGroup = Array<{
  id: string;
  data: ToolbarIconProps[];
}>;

export type ToolbarProps = {
  tools?: ToolbarGroup;
};
export interface ToolbarIconProps {
  id: ToolButton;
  title: string;
  className?: string;
  icon: React.ReactElement;
}

export interface ShapePath {
  id: string;
  origin: Vector2d;
  type: DrawerShape;
  points?: number[];
  boundary: Vector2d;
}

export enum PolygonShape {
  HEXAGON = 'hexagon',
  TRIANGLE = 'triangle',
}

export enum RegularShape {
  SQUARE = 'square',
}

export type DrawerShape = RegularShape | PolygonShape;

export enum DrawerAction {
  MOVE = 'move',
  SELECT = 'select',
  CLOSEST_POINT = 'closest-point',
}

export type ToolButton = DrawerShape | DrawerAction;

export type ShapeRef = MutableRefObject<Path>;
export interface SelectedShape {
  id: string;
  ref?: ShapeRef;
}

export enum Storage {
  EDITOR = 'lyra-editor-state',
}

export interface Store {
  shapes: ShapePath[];
  reset: () => void;
  isDrawerTool: boolean;
  activeTool: ToolButton;
  selectedShape: SelectedShape;
  shapeIndexFromID(id: string): number;
  shapeFromID(id: string): ShapePath | null;
  toggleActiveTool: (tool: ToolButton) => void;
  updateActiveShape: (position: Vector2d) => void;
  updateShapeByID: (id: string, point: ShapePath) => void;
  addShape: (type: DrawerShape, startPoint: Vector2d) => void;
}
