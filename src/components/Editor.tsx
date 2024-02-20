import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { KonvaEventObject } from 'konva/lib/Node';
import { useRef, useContext } from 'react';
import { DrawerShape } from 'src/types';
import { Stage, Layer } from 'react-konva';
import Shape from 'src/components/Shape';
import { getPointerPosition } from 'src/helpers/util';

const Editor = () => {
  const isDrawing = useRef<null | string>(null);
  const {
    reset,
    shapes,
    addShape,
    activeTool,
    isDrawerTool,
    updateShapeByID,
    updateActiveShape,
  } = useContext(AppContext);

  const drawWithMouse = (event: KonvaEventObject<MouseEvent>) => {
    // This method fires when the mouse is pressed down waiting to be released.
    const mousePosition = getPointerPosition(event.target);
    // The active shape is the last item in the store when mouse was pressed down.
    updateActiveShape(mousePosition);
  };

  const startDrawing = (event: KonvaEventObject<MouseEvent>) => {
    // Get mouse position
    const position = getPointerPosition(event.target);
    // Check if drawing tool is selected
    if (isDrawerTool) {
      // Add a new shape object to the list of shapes on canvas
      const shapeID = addShape(activeTool as DrawerShape, {
        x: position.x,
        y: position.y,
      });
      // Keep track of the shape ID
      isDrawing.current = shapeID;
    }
  };

  const setInitialBoundary = (event: KonvaEventObject<MouseEvent>) => {
    // The shape boundary is the current mouse position when
    // mouse is released
    const boundary = getPointerPosition(event.target);
    // Update shape boundary on mouse release
    updateShapeByID(isDrawing.current, {
      boundary,
    });
  };

  const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (isDrawerTool) {
      startDrawing(event);
    }
  };

  const onMouseUp = (event: KonvaEventObject<MouseEvent>) => {
    if (isDrawerTool) {
      setInitialBoundary(event);
      isDrawing.current = null;
    }
  };

  const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (isDrawerTool && isDrawing.current) {
      drawWithMouse(event);
    }
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
        <a target="_blank" href="https://github.com/paschaldev/drawing-app">See the code on Github!</a>
      </div>
      <Stage
        width={window.innerWidth - 65}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseup={onMouseUp}
        onMousemove={onMouseMove}
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
