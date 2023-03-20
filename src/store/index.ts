import { nanoid } from 'nanoid';
import { makeAutoObservable } from 'mobx';
import { IRect, Vector2d } from 'konva/lib/types';
import {
  Point,
  ToolButton,
  ActiveTool,
  DrawerShape,
  PolygonShape,
  RegularShape,
  ToolButtonConfig,
  PolygonConfig,
  SelectedShape,
  ShapeRef,
} from 'src/types';

class LyraStore {
  shapes: Point[] = [];

  activeTool: ActiveTool = {
    tool: null,
  };

  selectedShape: SelectedShape = {
    id: null,
  };

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  get isDrawerTool(): boolean {
    const activeTool = this.activeTool.tool;
    return (
      Object.values<string>(PolygonShape).includes(activeTool) ||
      Object.values<string>(RegularShape).includes(activeTool)
    );
  }

  toggleActiveTool(tool: ToolButton, config?: ToolButtonConfig) {
    // If the same active tool is selected, treat as a toggle
    if (tool !== this.activeTool?.tool) {
      this.activeTool = {
        tool,
        config,
      };
      return;
    }
    this.activeTool = {
      tool: null,
    };
  }

  transformShape(id?: string, ref?: ShapeRef) {
    // Activate the transform tool on a shape using
    // the shape ID on canvas as reference
    this.selectedShape = {
      id,
      ref,
    };
  }

  addShape(type: DrawerShape, point: Omit<IRect, 'width' | 'height'>) {
    const newShape: Point & PolygonConfig = {
      type,
      width: 0,
      height: 0,
      id: nanoid(),
      sides: this.activeTool?.config?.sides,
      ...point,
    };
    this.shapes.push(newShape);
  }

  updateActiveShape(newPosition: Vector2d) {
    if (this.shapes.length === 0) return;
    // The active shape is the last item in the store.
    // This action should be triggered during mouse move event.
    const activeShape = this.shapes[this.shapes.length - 1];
    if (activeShape) {
      // Update width and height relative to the new pointer position.
      activeShape.width = newPosition.x - activeShape.x;
      activeShape.height = newPosition.y - activeShape.y;
      // Update the shapes in the store
      this.shapes.splice(this.shapes.length - 1, 1, activeShape);
      this.shapes = this.shapes.concat();
    }
  }
}

export default LyraStore;
