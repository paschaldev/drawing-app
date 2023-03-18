import { nanoid } from 'nanoid';
import { makeAutoObservable } from 'mobx';
import { DrawerShape, Point, ToolButton } from 'src/types';
import { IRect, Vector2d } from 'konva/lib/types';

class LyraStore {
  shapes: Point[] = [];

  activeTool: ToolButton = null;

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
    return Object.values<string>(DrawerShape).includes(this.activeTool);
  }

  toggleActiveTool(tool: ToolButton) {
    // If the same active tool is selected, treat as a toggle
    this.activeTool = tool === this.activeTool ? null : tool;
  }

  addShape(type: DrawerShape, point: Omit<IRect, 'width' | 'height'>) {
    const newShape = {
      type,
      width: 0,
      height: 0,
      id: nanoid(),
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
