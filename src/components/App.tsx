import LyraStore from 'src/store';
import AppContext from 'src/contexts';
import Toolbar from 'src/components/Toolbar';
import tools from 'src/data';

// Mob-X store instance
const store = new LyraStore();

const App = () => {
  return (
    <div className="app">
      <AppContext.Provider value={store}>
        <Toolbar tools={tools} />
      </AppContext.Provider>
    </div>
  );
};

export default App;
