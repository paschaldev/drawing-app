import { IRect, Vector2d } from 'konva/lib/types';

export type ToolbarGroup = Array<{
  id: string,
  data: ToolbarIconProps[],
}>;

export type ToolbarProps = {
  tools?: ToolbarGroup,
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

export enum DrawerShape {
  SQUARE = 'square',
  HEXAGON = 'hexagon',
  TRIANGLE = 'triangle',
}

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

export interface Store {
  shapes: Point[];
  activeTool: ActiveTool;
  isDrawerTool: boolean;
  updateActiveShape: (position: Vector2d) => void;
  toggleActiveTool: (tool: ToolButton, config?: ToolButtonConfig) => void;
  addShape: (
    type: DrawerShape,
    point: Omit<IRect, 'width' | 'height'> & PolygonConfig
  ) => void;
}
