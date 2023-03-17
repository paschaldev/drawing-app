import tools from 'src/data';
import LyraStore from 'src/store';
import '@testing-library/jest-dom';
import AppContext from 'src/contexts';
import { ToolButton } from 'src/types';
import Toolbar from 'src/components/Toolbar';
import ToolbarButton from 'src/components/ToolbarButton';
import { fireEvent, render, screen } from '@testing-library/react';

// Create new MobX store instance
const store = new LyraStore();

test('Render single toolbar button', async () => {
  const title = 'Test Select';
  const defaultClass = 'toolbar__button';
  const customClass = 'test-button-class';

  render(
    <ToolbarButton
      title={title}
      icon={<span />}
      className={customClass}
      id={ToolButton.SELECT}
    />
  );

  await screen.findByRole('button');
  expect(screen.getByRole('button')).toHaveClass(
    `${defaultClass} ${customClass}`
  );
});

test('Active toolbar button state', async () => {
  const title = 'Test Select';
  const activeClass = 'toolbar__button--active';

  render(
    <AppContext.Provider value={store}>
      <ToolbarButton title={title} icon={<span />} id={ToolButton.SELECT} />
    </AppContext.Provider>
  );

  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toHaveClass(activeClass);
});

test('Render empty toolbar', async () => {
  const { container } = render(<Toolbar />);
  expect(container).toBeEmptyDOMElement();
});

test('Render all toolbar buttons', async () => {
  render(<Toolbar tools={tools} />);
  tools.forEach((group) => {
    group.data.forEach((item) => {
      expect(screen.getByLabelText(item.title)).toBeInTheDocument();
    });
  });
});
