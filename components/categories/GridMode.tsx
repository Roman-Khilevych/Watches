import { GridModeModel } from '@/models/category';
import Icon from '@/components/UI/Icon';

interface GridModeProps {
  gridMode: GridModeModel;
  setGridMode: (gridMode: GridModeModel) => void;
}

const GridMode: React.FC<GridModeProps> = ({ gridMode, setGridMode }) => {
  function enableBigMode() {
    setGridMode('big');
  }

  function enableSmallMode() {
    setGridMode('small');
  }

  return (
    <div className="flex gap-5">
      <button
        onClick={enableBigMode}
        className={`${
          gridMode === 'big' ? 'text-watch-white ' : 'text-watch-gray2'
        } transition-colors transition-watch`}
      >
        <Icon name="grid-big" className="w-5" />
      </button>
      <button
        onClick={enableSmallMode}
        className={`${
          gridMode === 'small' ? 'text-watch-white' : 'text-watch-gray2'
        } transition-colors transition-watch`}
      >
        <Icon name="grid-small" className="w-5" />
      </button>
    </div>
  );
};

export default GridMode;
