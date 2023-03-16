import { ToolbarIconProps } from 'src/types';

const ToolbarIcon: React.FunctionComponent<ToolbarIconProps> = ({
  icon,
  title,
  className,
}) => {
  const resolvedClassName = `toolbar__button${
    className ? ` ${className}` : ''
  }`;

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className={resolvedClassName}
    >
      {icon}
    </button>
  );
};

export default ToolbarIcon;
