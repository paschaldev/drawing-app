import { Store } from 'src/types';
import { createContext } from 'react';

const AppContext = createContext<Store>({
  shapes: [],
  activeTool: {
    tool: null,
  },
  selectedShape: {
    id: null,
  },
  isDrawerTool: false,
  addShape: () => null,
  transformShape: () => null,
  updateActiveShape: () => null,
  toggleActiveTool: () => null,
});

export default AppContext;
