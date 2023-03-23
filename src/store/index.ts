import { nanoid } from 'nanoid';
import { makeAutoObservable, toJS, reaction } from 'mobx';
import { Vector2d } from 'konva/lib/types';
import {
  ToolButton,
  DrawerShape,
  PolygonShape,
  RegularShape,
  SelectedShape,
  ShapeRef,
  Storage,
  ShapePath,
} from 'src/types';
import { getShapePoints } from 'src/helpers/geometry';

const autoSave = (store: LyraStore) => {
  let firstRun = true;

  reaction<ShapePath[]>(
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
  shapes: ShapePath[];

  activeTool: ToolButton;

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
      const parsedState: ShapePath[] = JSON.parse(editorState);
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
    this.activeTool = null;
    this.selectedShape = {
      id: null,
    };
  }

  reset() {
    this.initialize();
    sessionStorage.removeItem(Storage.EDITOR);
  }

  get isDrawerTool(): boolean {
    return (
      Object.values<string>(PolygonShape).includes(this.activeTool) ||
      Object.values<string>(RegularShape).includes(this.activeTool)
    );
  }

  shapeIndexFromID(id: string): number {
    return this.shapes.findIndex((item) => item.id === id);
  }

  shapeFromID(id: string): ShapePath | null {
    // Get the shape index in the state
    const shapeIndex = this.shapeIndexFromID(id);
    if (shapeIndex !== -1) {
      return this.shapes[shapeIndex];
    }
    return null;
  }

  toggleActiveTool(tool: ToolButton) {
    // If the same active tool is selected, treat as a toggle
    if (tool !== this.activeTool) {
      this.activeTool = tool;
      return;
    }
    this.activeTool = null;
  }

  transformShape(id?: string, ref?: ShapeRef) {
    // Activate the transform tool on a shape using
    // the shape ID on canvas as reference
    this.selectedShape = {
      id,
      ref,
    };
  }

  addShape(type: DrawerShape, startPoint: Vector2d) {
    const newShape: ShapePath = {
      type,
      id: nanoid(),
      points: [],
      origin: startPoint,
      boundary: startPoint,
    };
    this.shapes.push(newShape);
  }

  updateActiveShape(mousePosition: Vector2d) {
    if (this.shapes.length === 0) return;
    // The active shape is the last item in the store.
    // This action should be triggered during mouse move event.
    const activeShape = this.shapes[this.shapes.length - 1];
    if (activeShape) {
      // Compute the new shape points relative to the mouse position
      const points = getShapePoints(
        activeShape.type,
        activeShape.origin,
        mousePosition
      );
      activeShape.points = points;
      // Update the shapes in the store
      this.shapes.splice(this.shapes.length - 1, 1, activeShape);
      this.shapes = this.shapes.concat();
    }
  }

  updateShapeByID(id: string, data: ShapePath) {
    const shapeIndex = this.shapeIndexFromID(id);
    if (shapeIndex === -1) return;
    let shape = this.shapes[shapeIndex];
    // The active shape is the last item in the store.
    // This action should be triggered during mouse move event.
    if (shape) {
      shape = Object.assign(shape, data);
      this.shapes.splice(shapeIndex, 1, shape);
      this.shapes = this.shapes.concat();
    }
  }
}

export default LyraStore;
