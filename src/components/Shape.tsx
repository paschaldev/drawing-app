import { RefObject, useContext, useRef } from 'react';
import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { RegularShape, PolygonShape, Point, DrawerAction } from 'src/types';
import { Rect, RegularPolygon } from 'react-konva';
import { RegularPolygon as RegularPolygonType } from 'konva/lib/shapes/RegularPolygon';
import { Rect as RectType } from 'konva/lib/shapes/Rect';
import ShapeTransformer from './ShapeTransformer';

const SHAPE_COLOR = '#d9d9d9';

const Shape = ({ x, y, id, type, width, sides, height }: Point) => {
  const shapeRef = useRef<RegularPolygonType | RectType>(null);

  const { activeTool, transformShape } = useContext(AppContext);

  const isDraggable = activeTool.tool === DrawerAction.MOVE;
  const isPolygon = Object.values<string>(PolygonShape).includes(type);

  const handleClick = () => {
    transformShape(id, shapeRef);
  };

  if (type === RegularShape.SQUARE) {
    return (
      <ShapeTransformer id={id}>
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={SHAPE_COLOR}
          onTap={handleClick}
          onClick={handleClick}
          draggable={isDraggable}
          ref={shapeRef as RefObject<RectType>}
        />
      </ShapeTransformer>
    );
  }

  if (isPolygon) {
    return (
      <ShapeTransformer id={id}>
        <RegularPolygon
          x={x}
          y={y}
          fill={SHAPE_COLOR}
          radius={width || 0}
          sides={Number(sides)}
          onTap={handleClick}
          onClick={handleClick}
          draggable={isDraggable}
          ref={shapeRef as RefObject<RegularPolygonType>}
        />
      </ShapeTransformer>
    );
  }

  return null;
};

export default observer(Shape);
