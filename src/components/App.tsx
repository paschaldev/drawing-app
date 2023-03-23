import LyraStore from 'src/store';
import AppContext from 'src/contexts';
import Toolbar from 'src/components/Toolbar';
import tools from 'src/data';
import Editor from './Editor';

// Mob-X store instance
const store = new LyraStore();

const App = () => {
  return (
    <div className="app">
      <AppContext.Provider value={store}>
        <Toolbar tools={tools} />
        <Editor />
      </AppContext.Provider>
    </div>
  );
};

export default App;
