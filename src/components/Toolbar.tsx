import { ToolButton } from 'src/types';
import { FiMove as MoveTool } from 'react-icons/fi';
import { IoMdResize as ClosestPointTool } from 'react-icons/io';
import { FaMousePointer as SelectTool } from 'react-icons/fa';
import { MdHexagon as HexagonTool } from 'react-icons/md';
import {
  IoSquareSharp as SquareTool,
  IoTriangleSharp as TriangleTool,
} from 'react-icons/io5';
import ToolbarButton from './ToolbarButton';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar__group">
        <ToolbarButton
          title="Select"
          id={ToolButton.SELECT}
          icon={<SelectTool size={20} />}
        />
        <ToolbarButton
          title="Move"
          id={ToolButton.MOVE}
          icon={<MoveTool size={20} />}
        />
        <ToolbarButton
          title="Closest Point"
          id={ToolButton.CLOSEST_POINT}
          className="toolbar__button--rotate-45"
          icon={<ClosestPointTool size={22} />}
        />
      </div>
      <div className="toolbar__group">
        <ToolbarButton
          id={ToolButton.TRIANGLE}
          title="Draw Triangle"
          icon={<TriangleTool size={25} />}
        />
        <ToolbarButton
          id={ToolButton.SQUARE}
          title="Draw Square"
          icon={<SquareTool size={25} />}
        />
        <ToolbarButton
          id={ToolButton.HEXAGON}
          title="Draw Hexagon"
          icon={<HexagonTool size={30} />}
        />
      </div>
    </div>
  );
};

export default Toolbar;
