import { useContext, useRef } from 'react';
import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { DrawerAction, ShapePath } from 'src/types';
import { Path } from 'react-konva';
import { Path as PathType } from 'konva/lib/shapes/Path';
import { pointsToPath } from 'src/helpers/geometry';
// import ShapeTracker from './ShapeTracker';

const SHAPE_COLOR = '#d9d9d9';

const Shape = ({ points }: ShapePath) => {
  const SVGPath = pointsToPath(points);
  const shapeRef = useRef<PathType>(null);
  const { activeTool } = useContext(AppContext);

  const isDraggable = activeTool === DrawerAction.MOVE;

  return (
    <Path
      data={SVGPath}
      ref={shapeRef}
      fill={SHAPE_COLOR}
      draggable={isDraggable}
    />
  );
};

export default observer(Shape);
