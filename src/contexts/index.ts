import { Store } from 'src/types';
import { createContext } from 'react';

const AppContext = createContext<Store>({
  shapes: [],
  activeTool: null,
  selectedShape: {
    id: null,
  },
  reset: () => null,
  isDrawerTool: false,
  addShape: () => null,
  shapeFromID: () => null,
  shapeIndexFromID: () => -1,
  updateShapeByID: () => null,
  transformShape: () => null,
  updateActiveShape: () => null,
  toggleActiveTool: () => null,
});

export default AppContext;
