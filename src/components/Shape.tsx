import { useContext, useRef } from 'react';
import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { DrawerAction, ShapePath } from 'src/types';
import { Path } from 'react-konva';
import { Path as PathType } from 'konva/lib/shapes/Path';
import { pointsToPath } from 'src/helpers/geometry';
import { KonvaEventObject } from 'konva/lib/Node';

const SHAPE_COLOR = '#d9d9d9';

const Shape = ({ id, points, origin, boundary }: ShapePath) => {
  const SVGPath = pointsToPath(points);
  const shapeRef = useRef<PathType>(null);
  const { activeTool, updateShapeByID } = useContext(AppContext);

  const isDraggable = activeTool === DrawerAction.MOVE;

  const onDragEnd = (event: KonvaEventObject<DragEvent>) => {
    // Update shape origin and boundary when dragging is complete
    const node = event.target;
    // The x and y axis of the path changes after dragging
    const changeInX = node.x();
    const changeInY = node.y();
    // Set the new origin and boundary by incrementing with the
    // change in value to the x and y axis
    const newOrigin = {
      x: origin.x + changeInX,
      y: origin.y + changeInY,
    };
    const newBoundary = {
      x: boundary.x + changeInX,
      y: boundary.y + changeInY,
    };
    // Update shape data
    updateShapeByID(id, {
      origin: newOrigin,
      boundary: newBoundary,
    });
    // Reset Konva path after updating to prevent double trigger
    shapeRef.current.x(0);
    shapeRef.current.y(0);
  };

  return (
    <Path
      data={SVGPath}
      ref={shapeRef}
      fill={SHAPE_COLOR}
      onDragEnd={onDragEnd}
      draggable={isDraggable}
    />
  );
};

export default observer(Shape);
