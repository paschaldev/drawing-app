import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { Vector2d } from 'konva/lib/types';
import { KonvaEventObject } from 'konva/lib/Node';
import { Fragment, useRef, useContext } from 'react';
import { DrawerAction, DrawerShape } from 'src/types';
import { Stage, Layer, Rect, RegularPolygon } from 'react-konva';

const SHAPE_COLOR = '#d9d9d9';

const Editor = () => {
  const isDrawing = useRef(false);
  const { shapes, addShape, activeTool, isDrawerTool, updateActiveShape } =
    useContext(AppContext);

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
    if (
      activeTool === DrawerShape.HEXAGON ||
      activeTool === DrawerShape.SQUARE ||
      activeTool === DrawerShape.TRIANGLE
    ) {
      isDrawing.current = true;
      // Add a new shape object to the list of shapes on canvas
      addShape(activeTool, {
        x: position.x,
        y: position.y,
      });
    }
  };

  const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (isDrawerTool) {
      startDrawing(event);
    }
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

  return (
    <div className="editor">
      <Stage
        width={window.innerWidth - 65}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseup={onMouseUp}
        onMousemove={onMouseMove}
      >
        <Layer>
          {shapes.map(({ type, id, width, height, x, y }) => (
            <Fragment key={id}>
              {type === DrawerShape.SQUARE && (
                <Rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={SHAPE_COLOR}
                  draggable={activeTool === DrawerAction.MOVE}
                />
              )}
              {(type === DrawerShape.HEXAGON ||
                type === DrawerShape.TRIANGLE) && (
                <RegularPolygon
                  x={x}
                  y={y}
                  fill={SHAPE_COLOR}
                  radius={width || 0}
                  sides={type === DrawerShape.HEXAGON ? 6 : 3}
                  draggable={activeTool === DrawerAction.MOVE}
                />
              )}
            </Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default observer(Editor);
