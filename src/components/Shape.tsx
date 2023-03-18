import { useContext } from 'react';
import AppContext from 'src/contexts';
import { observer } from 'mobx-react-lite';
import { DrawerShape, Point, DrawerAction } from 'src/types';
import { Rect, RegularPolygon } from 'react-konva';

const SHAPE_COLOR = '#d9d9d9';

const Shape = ({ x, y, type, width, sides, height }: Point) => {
  const { activeTool } = useContext(AppContext);
  if (type === DrawerShape.SQUARE) {
    return (
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={SHAPE_COLOR}
        draggable={activeTool.tool === DrawerAction.MOVE}
      />
    );
  }

  if (type === DrawerShape.HEXAGON || type === DrawerShape.TRIANGLE) {
    return (
      <RegularPolygon
        x={x}
        y={y}
        fill={SHAPE_COLOR}
        radius={width || 0}
        sides={Number(sides)}
        draggable={activeTool.tool === DrawerAction.MOVE}
      />
    );
  }

  return null;
};

export default observer(Shape);
