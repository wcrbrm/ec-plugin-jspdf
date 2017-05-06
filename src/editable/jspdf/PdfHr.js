import { drawDottedLine } from './../../services/PdfLines';

const PdfHr = ({ gen, props, context }) => {
  const height = props.height || 0.25; // 0.25mm
  let y = 0;
  if (props.marginTop) { y += props.marginTop; }
  //if (props.style === 'dotted') {
  //  if (props.color) gen.setDrawColor(props.color);
  //  drawDottedLine(gen, context.x, context.y + y, context.x + context.width, context.y + y + height, 0.5);
  //} else {
  if (props.color) gen.setFillColor(props.color);
  const w = props.width || context.width;
  const x = (context.x + (context.width / 2.0)) - (w / 2.0);
  gen.getDoc().rect(x, context.y, w, height, 'F');
  y += height;
  if (props.marginBottom) { y += props.marginBottom; }
  gen.addY(y);
  return false;
};

export default PdfHr;
