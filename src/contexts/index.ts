import { Store } from 'src/types';
import { createContext } from 'react';

const AppContext = createContext<Store>({
  shapes: [],
  activeTool: {
    tool: null,
  },
  addShape: () => null,
  isDrawerTool: false,
  updateActiveShape: () => null,
  toggleActiveTool: () => null,
});

export default AppContext;
