import { Store } from 'src/types';
import { createContext } from 'react';

const AppContext = createContext<Store>({
  activeTool: null,
  toggleActiveTool: () => null,
});

export default AppContext;
