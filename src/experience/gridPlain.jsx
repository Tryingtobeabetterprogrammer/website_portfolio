import React from 'react';
import { GridHelper } from 'three';

const Grid = ({ row, col, planeDepth, planewidth, spacing, visible }) => {

  if (!visible) return null; 


  return (

    <GridHelper args={[row, col, planeDepth, planewidth, spacing]} />

  );

};

export default Grid;