import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useRef, useEffect, useContext } from 'react';
import { Transformer } from 'react-konva';
import AppContext from 'src/contexts';

type Props = {
  id: string;
};

const ShapeTransformer: React.FunctionComponent<PropsWithChildren<Props>> = ({
  id,
  children,
}) => {
  const { selectedShape } = useContext(AppContext);
  const transformerRef = useRef<TransformerType>(null);

  const isSelected = selectedShape.id === id;

  useEffect(() => {
    if (isSelected && selectedShape?.ref?.current) {
      // Manually attach transformer
      transformerRef.current.nodes([selectedShape.ref.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected, selectedShape.ref]);

  return (
    <>
      {children}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          ignoreStroke
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default observer(ShapeTransformer);
