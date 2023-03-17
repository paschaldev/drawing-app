import { ToolbarProps } from 'src/types';
import ToolbarButton from 'src/components/ToolbarButton';

const Toolbar: React.FunctionComponent<ToolbarProps> = ({ tools }) => {
  if (!Array.isArray(tools) || tools.length < 1) {
    return null;
  }

  return (
    <div className="toolbar">
      {tools.map((group) => (
        <div className="toolbar__group" key={group.id}>
          {group.data.map(({ id, title, icon, className }) => (
            <ToolbarButton
              key={id}
              id={id}
              icon={icon}
              title={title}
              className={className}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
