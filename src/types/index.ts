import { IRect, Vector2d } from 'konva/lib/types';

export type ToolbarGroup = Array<{
  id: string,
  data: ToolbarIconProps[],
}>;

export type ToolbarProps = {
  tools?: ToolbarGroup,
};
export interface ToolbarIconProps {
  id: ToolButton;
  title: string;
  className?: string;
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

export interface Point extends IRect {
  id: string;
  type: DrawerShape;
}

export interface Store {
  activeTool: ToolButton;
  shapes: Point[];
  isDrawerTool: boolean;
  toggleActiveTool: (tool: ToolButton) => void;
  updateActiveShape: (position: Vector2d) => void;
  addShape: (type: DrawerShape, point: Omit<IRect, 'width' | 'height'>) => void;
}
