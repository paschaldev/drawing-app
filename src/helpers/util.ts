/* eslint-disable import/prefer-default-export */
import { Stage } from 'konva/lib/Stage';
import { Vector2d } from 'konva/lib/types';
import { Shape } from 'konva/lib/Shape';

/**
 * Get Konva pointer position on a Node
 *
 * @param {Stage | Stage } node - Konva stage or shape object
 * @returns {Vector2d}
 */
export const getPointerPosition = (node: Shape | Stage): Vector2d => {
  // Get the current mouse position on the canvas
  const stage = node.getStage();
  return stage.getPointerPosition();
};
