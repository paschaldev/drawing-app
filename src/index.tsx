import { createRoot } from 'react-dom/client';
import App from 'src/components/App';
import 'src/styles/index.scss';

const root = document.getElementById('root');
const app = createRoot(root);
app.render(<App />);
