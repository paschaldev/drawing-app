import { createRoot } from 'react-dom/client';
import App from 'src/components/App';

const root = document.getElementById('root');
const app = createRoot(root);
app.render(<App />);
