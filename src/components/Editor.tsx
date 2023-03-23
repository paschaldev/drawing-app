import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { Vector2d } from 'konva/lib/types';
import { KonvaEventObject } from 'konva/lib/Node';
import { useRef, useContext } from 'react';
import { DrawerShape } from 'src/types';
import { Stage, Layer } from 'react-konva';
import Shape from 'src/components/Shape';

const Editor = () => {
  const isDrawing = useRef(false);
  const {
    reset,
    shapes,
    addShape,
    activeTool,
    isDrawerTool,
    updateActiveShape,
    transformShape,
  } = useContext(AppContext);

  const getPointerPosition = (
    event: KonvaEventObject<MouseEvent>
  ): Vector2d => {
    // Get the current mouse position on the canvas
    const stage = event.target.getStage();
    return stage.getPointerPosition();
  };

  const drawWithMouse = (event: KonvaEventObject<MouseEvent>) => {
    // This method fires when the mouse is pressed down waiting to be released.
    const mousePosition = getPointerPosition(event);
    // The active shape is the last item in the store when mouse was pressed down.
    updateActiveShape(mousePosition);
  };

  const startDrawing = (event: KonvaEventObject<MouseEvent>) => {
    // Get mouse position
    const position = getPointerPosition(event);
    // Check if drawing tool is selected
    if (isDrawerTool) {
      isDrawing.current = true;
      // Add a new shape object to the list of shapes on canvas
      addShape(activeTool as DrawerShape, {
        x: position.x,
        y: position.y,
      });
    }
  };

  const checkDeselect = (event: KonvaEventObject<TouchEvent | MouseEvent>) => {
    // Deselect when clicked on empty drawing area
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) {
      transformShape(null);
    }
  };

  const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (isDrawerTool) {
      startDrawing(event);
    }
    checkDeselect(event);
  };

  const onMouseUp = () => {
    if (isDrawerTool) {
      isDrawing.current = false;
    }
  };

  const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (isDrawerTool && isDrawing.current) {
      drawWithMouse(event);
    }
  };

  const onTouchStart = (event: KonvaEventObject<TouchEvent>) => {
    checkDeselect(event);
  };

  const clearCanvas = () => {
    reset();
  };

  return (
    <div className="editor">
      <div className="editor__actions">
        <button onClick={clearCanvas} type="button">
          Clear Canvas
        </button>
      </div>
      <Stage
        width={window.innerWidth - 65}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseup={onMouseUp}
        onMousemove={onMouseMove}
        onTouchStart={onTouchStart}
      >
        <Layer>
          {Array.isArray(shapes) && shapes.length > 0 && (
            <>
              {shapes.map(({ type, id, points, origin, boundary }) => (
                <Shape
                  id={id}
                  key={id}
                  type={type}
                  origin={origin}
                  points={points}
                  boundary={boundary}
                />
              ))}
            </>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default observer(Editor);
