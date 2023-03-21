import { nanoid } from 'nanoid';
import { makeAutoObservable, toJS, reaction } from 'mobx';
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
  Storage,
} from 'src/types';

const autoSave = (store: LyraStore) => {
  let firstRun = true;

  reaction<Point[]>(
    () => store.shapes,
    (shapes) => {
      const stateToJSON = JSON.stringify(toJS(shapes));
      if (!firstRun) {
        sessionStorage.setItem(Storage.EDITOR, stateToJSON);
      }
      firstRun = false;
    },
    {
      delay: 500,
    }
  );
};
class LyraStore {
  shapes: Point[];

  activeTool: ActiveTool;

  selectedShape: SelectedShape;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
    this.loadState();
    autoSave(this);
  }

  private loadState() {
    // Get the last saved state from session storage
    const editorState = sessionStorage.getItem(Storage.EDITOR);
    // Parsing the JSON string from session storage might
    try {
      const parsedState: Point[] = JSON.parse(editorState);
      // Update editor state
      this.shapes = Array.isArray(parsedState) ? parsedState : [];
      return;
    } catch (error) {
      // Handle error state during auto load
      console.log('ERR', error);
    }
    this.initialize();
  }

  private initialize() {
    this.shapes = [];
    this.activeTool = {
      tool: null,
    };
    this.selectedShape = {
      id: null,
    };
  }

  reset() {
    this.initialize();
    sessionStorage.removeItem(Storage.EDITOR);
  }

  get isDrawerTool(): boolean {
    const activeTool = this.activeTool?.tool;
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

  addShape(type: DrawerShape, point: Vector2d & PolygonConfig) {
    const newShape = {
      type,
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
      // Difference between the new mouse position when drawing
      // and the last saved position of the active item
      const posXDifference = newPosition.x - activeShape.x;
      const posYDifference = newPosition.y - activeShape.y;
      // For regular shapes, update width and height
      if (activeShape.type === RegularShape.SQUARE) {
        // Update width and height relative to the new pointer position.
        activeShape.width = posXDifference;
        activeShape.height = posYDifference;
      }
      // For complex shapes / polygons, update the scale value
      else {
        activeShape.scaleX = posXDifference;
        activeShape.scaleY = posYDifference;
      }
      // Update the shapes in the store
      this.shapes.splice(this.shapes.length - 1, 1, activeShape);
      this.shapes = this.shapes.concat();
    }
  }

  updateShapeByID(id: string, point: IRect | Vector2d | PolygonConfig) {
    const shapeIndex = this.shapes.findIndex((item) => item.id === id);
    let shape = this.shapes[shapeIndex];
    // The active shape is the last item in the store.
    // This action should be triggered during mouse move event.
    if (shape) {
      shape = Object.assign(shape, point);
      this.shapes.splice(shapeIndex, 1, shape);
      this.shapes = this.shapes.concat();
    }
  }
}

export default LyraStore;
