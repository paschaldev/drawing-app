## Local Setup 

- Run `yarn` to install dependecies
- After installation, to start a local server, run `yarn run dev` 

## Design & Implementation

I chose [Konva](https://konvajs.org/) over `Three.js` because we do not need 3D shapes. Konva.JS is a HTML5 2d canvas js library, lightweight and offers basic drawing tools and functions.

Every shape drawn on the canvas is saved in a `MobX` store; every time the `shapes` property changes, there is a listener that saves the current state of the canvas in `sessionStorage`. You can close the tab and not lose state.

### Biggest Challenge

The biggest challenge was making the closest point tool work as desired. For drawing regular shapes, Konva provides useful components like `RegularPolygon` to draw n-side polygons and `Rect` for rectangles. However, these components do not have methods to get the `points` data nor a method to interract directly with their paths. You can only track mouse movement within the shapes, outside the shapes, there is no way to target the boundaries.

Konva also allows you to draw custom shapes using a `Line` or `Path` component. The `Path` component is represented as SVG data which is accessible as a property. To solve the closest point tool problem, I had to come up with a way to draw regular shapes using `Path` and SVG data. 

Two points `origin(x,y)` and `boundary(x,y)` on a custom shape object representing the first click and mouse release event respectively keeps track of the custom shape area. With this boundary box, I added functions that return an array of co-ordinates point for different shapes based on the `origin` and current mouse position.

To get the SVG representation of these points, with this guide https://css-tricks.com/svg-path-syntax-illustrated-guide/, I added a function that converts an array of points to SVG path data. With a Valid SVG representation, I replaced `RegularPolygon` and `Rect` with `Path` and SVG data.

To compute closest point to a SVG path, I used this algorithm: https://gist.github.com/mbostock/8027637 but tweaked it to work nice with `TypeScript` and `Konva`.

### Improvements

- The function to generate a polygon is fixed; 6-Sided Hexagon only. It would be better to have a single function that can generate polygons of n-side.
- Add more tests that targets the Canvas and SVG data.

## Deploy 
- Run `yarn build` to make a production build

## Testing 
Uses React testing library and jest

`yarn test`
