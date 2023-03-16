import LyraStore from 'src/store';
import AppContext from 'src/contexts';
import Toolbar from 'src/components/Toolbar';

// Mob-X store instance
const store = new LyraStore();

const App = () => {
  return (
    <div className="app">
      <AppContext.Provider value={store}>
        <Toolbar />
      </AppContext.Provider>
    </div>
  );
};

export default App;
