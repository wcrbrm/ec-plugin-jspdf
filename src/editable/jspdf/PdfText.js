import { Logger, getValue } from 'ec-react15-lib';

const getPdfTextAlign = (textAlign) => {
  if (!textAlign) return 'L';
  return textAlign.substring(0, 1).toUpperCase();
};

const PdfText = ({ gen, props, context }) => {
  // Logger.of('PdfText.render').warn('props=', props, 'context=', context);
  const fontSize = props.fontSize || 10;
  const value = getValue(props, 'value', context);
  const textAlign = getPdfTextAlign(props.textAlign || 'left');
  if (props.textColor) gen.setTextColor(props.textColor);
  if (props.drawColor) gen.setDrawColor(props.drawColor);
  gen.setFont(fontSize, 'normal');
  const lineHeight = fontSize / 2;
  let y = 0;
  if (props.marginTop) { y += props.marginTop; }
  if (value.indexOf('\n') === -1) {
    gen.drawAlignedText(context.x, context.y + y, context.width, textAlign, value);
    y += lineHeight;
  } else {
    // multiline text
    const w = context.width;
    const lines = gen.doc.splitTextToSize(value, w);
    for (let i = 0, l = lines.length; i < l; i += 1) {
      gen.drawAlignedText(context.x, context.y + y, context.width, textAlign, lines[i]);
      y += lineHeight;
    }
  }
  if (props.marginBottom) { y += props.marginBottom; }
  gen.addY(y);
  return false;
};

export default PdfText;
