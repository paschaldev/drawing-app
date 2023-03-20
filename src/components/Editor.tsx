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
    // The active shape is the last item in the store when mouse
    // was pressed down.
    updateActiveShape(mousePosition);
  };

  const startDrawing = (event: KonvaEventObject<MouseEvent>) => {
    // Get mouse position
    const position = getPointerPosition(event);
    // Check if drawing tool is selected
    if (isDrawerTool) {
      isDrawing.current = true;
      // Add a new shape object to the list of shapes on canvas
      addShape(activeTool.tool as DrawerShape, {
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

  return (
    <div className="editor">
      <Stage
        width={window.innerWidth - 65}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseup={onMouseUp}
        onMousemove={onMouseMove}
        onTouchStart={onTouchStart}
      >
        <Layer>
          {shapes.map(
            ({ type, id, width, height, x, y, sides, scaleX, scaleY }) => (
              <Shape
                x={x}
                y={y}
                id={id}
                key={id}
                type={type}
                width={width}
                sides={sides}
                height={height}
                scaleX={scaleX}
                scaleY={scaleY}
              />
            )
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default observer(Editor);
