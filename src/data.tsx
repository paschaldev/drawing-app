import { DrawerAction, DrawerShape, ToolbarGroup } from 'src/types';
import { FiMove as MoveTool } from 'react-icons/fi';
import { IoMdResize as ClosestPointTool } from 'react-icons/io';
import { FaMousePointer as SelectTool } from 'react-icons/fa';
import { MdHexagon as HexagonTool } from 'react-icons/md';
import {
  IoSquareSharp as SquareTool,
  IoTriangleSharp as TriangleTool,
} from 'react-icons/io5';

const tools: ToolbarGroup = [
  {
    id: 'group-1',
    data: [
      {
        title: 'Select',
        id: DrawerAction.SELECT,
        icon: <SelectTool size={20} />,
      },
      {
        title: 'Move',
        id: DrawerAction.MOVE,
        icon: <MoveTool size={20} />,
      },
      {
        title: 'Closest Point',
        id: DrawerAction.CLOSEST_POINT,
        icon: <ClosestPointTool size={22} />,
        className: 'toolbar__button--rotate-45',
      },
    ],
  },
  {
    id: 'group-2',
    data: [
      {
        title: 'Draw triangle',
        id: DrawerShape.TRIANGLE,
        icon: <TriangleTool size={25} />,
        config: {
          sides: 3,
        },
      },
      {
        title: 'Draw Square',
        id: DrawerShape.SQUARE,
        icon: <SquareTool size={20} />,
      },
      {
        title: 'Draw Hexagon',
        id: DrawerShape.HEXAGON,
        icon: <HexagonTool size={30} />,
        config: {
          sides: 6,
        },
      },
    ],
  },
];

export default tools;
