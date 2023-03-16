import { ToolButton } from 'src/types';
import { makeAutoObservable } from 'mobx';

class LyraStore {
  activeTool: ToolButton = null;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  toggleActiveTool(tool: ToolButton) {
    // If the same active tool is selected, treat as a toggle
    this.activeTool = tool === this.activeTool ? null : tool;
  }
}

export default LyraStore;
