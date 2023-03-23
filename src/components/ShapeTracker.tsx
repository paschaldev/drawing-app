import { Circle } from 'react-konva';
import { observer } from 'mobx-react-lite';
import { ShapeRef } from 'src/types';
import { KonvaEventObject } from 'konva/lib/Node';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getClosestPointToSVG } from 'src/helpers/geometry';
import { Vector2d } from 'konva/lib/types';
import { getPointerPosition } from 'src/helpers/util';

export type ShapeTrackerProps = {
  origin: Vector2d;
  shapeRef: ShapeRef;
};

const ShapeTracker = ({ origin, shapeRef }: ShapeTrackerProps) => {
  // This variable pauses tracking on the main stage while tracking within a shape
  const isTrackingInside = useRef(false);
  // Save references to the shape and stage node
  const shapeNode = shapeRef?.current;
  const stageNode = shapeNode?.getStage();
  // Tracking points
  const [point, setPoints] = useState({
    x: origin.x,
    y: origin.y,
  });

  const disableTrackInsideShape = useCallback(() => {
    if (shapeNode) {
      shapeNode.off('mousemove mouseleave');
    }
  }, [shapeNode]);

  const disableTrackOutsideShape = useCallback(() => {
    if (stageNode) {
      stageNode.off('mousemove');
    }
  }, [stageNode]);

  const mouseMoveOnStage = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      // Inner shape child bubbles events to the parent Stage.
      // This check ensures only one listener is updating the
      // tracking point at a time
      if (isTrackingInside.current === true) return;
      // Get the current mouse position on the stage canvas
      const mousePosition = getPointerPosition(event.target);
      // Get the closest point of the mouse to any shape path
      const closestPoint = getClosestPointToSVG(shapeNode, mousePosition);
      setPoints(closestPoint);
    },
    [shapeNode]
  );

  const mouseMoveInsideShape = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      isTrackingInside.current = true;
      // When mouse is inside a shape, use the current mouse
      // position as the closest tracking point
      const mousePosition = getPointerPosition(event.target);
      setPoints(mousePosition);
    },
    []
  );

  const trackOutsideShape = useCallback(() => {
    if (stageNode) {
      stageNode.on('mousemove', mouseMoveOnStage);
    }
  }, [mouseMoveOnStage, stageNode]);

  const trackInsideShape = useCallback(() => {
    if (shapeNode) {
      shapeNode.on('mousemove', mouseMoveInsideShape);
      shapeNode.on('mouseleave', () => {
        isTrackingInside.current = false;
      });
    }
  }, [mouseMoveInsideShape, shapeNode]);

  const trackAllMovement = useCallback(() => {
    trackInsideShape();
    trackOutsideShape();
  }, [trackInsideShape, trackOutsideShape]);

  const stopAllTracking = useCallback(() => {
    disableTrackInsideShape();
    disableTrackOutsideShape();
  }, [disableTrackInsideShape, disableTrackOutsideShape]);

  // Setup trackers
  useEffect(() => {
    trackAllMovement();
    return () => {
      stopAllTracking();
    };
  }, [stopAllTracking, trackAllMovement]);

  return (
    <Circle radius={3} fill="red" x={point.x} y={point.y} listening={false} />
  );
};

export default observer(ShapeTracker);
