import { useContext, useRef } from 'react';
import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { DrawerAction, ShapePath } from 'src/types';
import { Path } from 'react-konva';
import { Path as PathType } from 'konva/lib/shapes/Path';
import ShapeTransformer from 'src/components/ShapeTransformer';
import { pointsToPath } from 'src/helpers/geometry';
// import ShapeTracker from './ShapeTracker';

const SHAPE_COLOR = '#d9d9d9';

const Shape = ({ id, points }: ShapePath) => {
  const SVGPath = pointsToPath(points);
  const shapeRef = useRef<PathType>(null);
  const { activeTool, transformShape } = useContext(AppContext);

  const isDraggable = activeTool === DrawerAction.MOVE;

  const onClick = () => {
    if (activeTool === DrawerAction.SELECT) {
      transformShape(id, shapeRef);
    }
  };

  return (
    <ShapeTransformer id={id}>
      <Path
        data={SVGPath}
        ref={shapeRef}
        onTap={onClick}
        onClick={onClick}
        fill={SHAPE_COLOR}
        draggable={isDraggable}
      />
    </ShapeTransformer>
  );
};

export default observer(Shape);
