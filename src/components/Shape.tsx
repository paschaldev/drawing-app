import { RefObject, useContext, useRef } from 'react';
import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import {
  RegularShape,
  PolygonShape,
  Point,
  DrawerAction,
  PolygonConfig,
} from 'src/types';
import { Rect, RegularPolygon } from 'react-konva';
import { RegularPolygon as RegularPolygonType } from 'konva/lib/shapes/RegularPolygon';
import { Rect as RectType } from 'konva/lib/shapes/Rect';
import ShapeTransformer from 'src/components/ShapeTransformer';
import { KonvaEventObject } from 'konva/lib/Node';
import { IRect, Vector2d } from 'konva/lib/types';

const SHAPE_COLOR = '#d9d9d9';

const Shape = ({
  x,
  y,
  id,
  type,
  width,
  sides,
  height,
  scaleX,
  scaleY,
}: Point) => {
  const shapeRef = useRef<RegularPolygonType | RectType>(null);

  const { activeTool, transformShape, updateShapeByID, selectedShape } =
    useContext(AppContext);

  const isDraggable = activeTool?.tool === DrawerAction.MOVE;
  const isPolygon = Object.values<string>(PolygonShape).includes(type);

  const onClick = () => {
    transformShape(id, shapeRef);
  };

  const handleChange = (point: IRect | Vector2d | PolygonConfig) => {
    updateShapeByID(id, point);
  };

  const onDragEnd = (event: KonvaEventObject<DragEvent>) => {
    handleChange({
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  const onTransformEnd = () => {
    const node = selectedShape?.ref?.current;
    if (!node) return;
    // Transformer event changes the scale, but not the shape width and height
    const newScaleX = node.scaleX();
    const newScaleY = node.scaleY();
    // Reset the scale value
    node.scaleX(1);
    node.scaleY(1);
    // Update shape state with new dimensions computed with the current scale value
    if (isPolygon) {
      handleChange({
        scaleX: newScaleX,
        scaleY: newScaleY,
      });
      return;
    }
    // For regular shapes, update width and height
    handleChange({
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * newScaleX),
      height: Math.max(node.height() * newScaleY),
    });
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
          onTap={onClick}
          onClick={onClick}
          draggable={isDraggable}
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
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
          radius={1}
          onTap={onClick}
          scaleX={scaleX}
          scaleY={scaleY}
          onClick={onClick}
          sides={Number(sides)}
          draggable={isDraggable}
          onDragEnd={onDragEnd}
          strokeScaleEnabled={false}
          onTransformEnd={onTransformEnd}
          ref={shapeRef as RefObject<RegularPolygonType>}
        />
      </ShapeTransformer>
    );
  }

  return null;
};

export default observer(Shape);
