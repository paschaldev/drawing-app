export interface ToolbarIconProps {
  id: ToolButton;
  title: string;
  className?: string;
  icon: React.ReactElement;
}

export enum ToolButton {
  MOVE = 'move',
  SQUARE = 'square',
  SELECT = 'select',
  HEXAGON = 'hexagon',
  TRIANGLE = 'triangle',
  CLOSEST_POINT = 'closest-point',
}

export interface Store {
  activeTool: ToolButton;
  toggleActiveTool: (tool: ToolButton) => void;
}
