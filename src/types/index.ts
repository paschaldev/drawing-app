import { Rect } from 'konva/lib/shapes/Rect';
import { RegularPolygon } from 'konva/lib/shapes/RegularPolygon';
import { IRect, Vector2d } from 'konva/lib/types';
import { MutableRefObject } from 'react';

export type ToolbarGroup = Array<{
  id: string;
  data: ToolbarIconProps[];
}>;

export type ToolbarProps = {
  tools?: ToolbarGroup;
};

export interface PolygonConfig {
  sides?: number;
}

export type ToolButtonConfig = PolygonConfig;
export interface ToolbarIconProps {
  id: ToolButton;
  title: string;
  className?: string;
  config?: ToolButtonConfig;
  icon: React.ReactElement;
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

export interface Point extends IRect, PolygonConfig {
  id: string;
  type: DrawerShape;
}
export interface ActiveTool {
  tool: ToolButton;
  config?: ToolButtonConfig;
}

export type ShapeRef = MutableRefObject<Rect | RegularPolygon>;
export interface SelectedShape {
  id: string;
  ref?: ShapeRef;
}

export interface Store {
  shapes: Point[];
  activeTool: ActiveTool;
  selectedShape: SelectedShape;
  isDrawerTool: boolean;
  transformShape: (id: string, ref?: ShapeRef) => void;
  updateActiveShape: (position: Vector2d) => void;
  toggleActiveTool: (tool: ToolButton, config?: ToolButtonConfig) => void;
  addShape: (
    type: DrawerShape,
    point: Omit<IRect, 'width' | 'height'> & PolygonConfig
  ) => void;
}
