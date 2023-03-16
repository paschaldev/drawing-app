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
          id="select"
          title="Select"
          icon={<SelectTool size={20} />}
        />
        <ToolbarButton id="move" title="Move" icon={<MoveTool size={20} />} />
        <ToolbarButton
          id="closest-point"
          className="toolbar__button--rotate-45"
          title="Closest Point"
          icon={<ClosestPointTool size={22} />}
        />
      </div>
      <div className="toolbar__group">
        <ToolbarButton
          id="triangle"
          title="Draw Triangle"
          icon={<TriangleTool size={25} />}
        />
        <ToolbarButton
          id="square"
          title="Draw Square"
          icon={<SquareTool size={25} />}
        />
        <ToolbarButton
          id="hexagon"
          title="Draw Hexagon"
          icon={<HexagonTool size={30} />}
        />
      </div>
    </div>
  );
};

export default Toolbar;
