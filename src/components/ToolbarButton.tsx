import { ToolbarIconProps } from 'src/types';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import AppContext from 'src/contexts';

const ToolbarIcon: React.FunctionComponent<ToolbarIconProps> = ({
  id,
  icon,
  title,
  className,
}) => {
  const { activeTool, toggleActiveTool } = useContext(AppContext);
  // Set toolbar button classes
  let resolvedClassName = 'toolbar__button';
  if (className) {
    resolvedClassName += ` ${className}`;
  }
  if (id && activeTool === id) {
    resolvedClassName += ' toolbar__button--active';
  }

  const handleClick = () => {
    toggleActiveTool(id);
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={handleClick}
      className={resolvedClassName}
    >
      {icon}
    </button>
  );
};

export default observer(ToolbarIcon);
