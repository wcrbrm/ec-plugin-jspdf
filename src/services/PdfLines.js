export const drawDottedLine = (gen, xFrom, yFrom, xTo, yTo, segmentLength) => {
  // Calculate line length (c)
  const a = Math.abs(xTo - xFrom);
  const b = Math.abs(yTo - yFrom);
  const c = Math.sqrt((a ** 2) + (b ** 2));
  // Make sure we have an odd number of line segments (drawn or blank)
  // to fit it nicely
  const fractions = c / segmentLength;
  const adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ?
    (c / Math.ceil(fractions)) : (c / Math.floor(fractions));
  // Calculate x, y deltas per segment
  const deltaX = adjustedSegmentLength * (a / c);
  const deltaY = adjustedSegmentLength * (b / c);
  let curX = xFrom;
  let curY = yFrom;
  while (curX <= xTo && curY <= yTo) {
    gen.getDoc().line(curX, curY, curX + deltaX, curY + deltaY);
    curX += 2 * deltaX;
    curY += 2 * deltaY;
  }
  return false;
};

export default {
  drawDottedLine
};
