import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Logger } from 'ec-react15-lib';
import { getPdfElementsList } from './../../services/TplPdfLoader';

const PdfFlex = ({ gen, props, context }) => {
  const elementsList = getPdfElementsList(context);
  if (props.container) {
    props.container.forEach((child) => {
      // basically we are outlining container - where the component will be rendered
      const ctx = {
        ...context,
        x: gen.getX(),
        y: gen.getY(),
        width: gen.getDocWidth() - gen.margin.right - gen.getX(),
        height: gen.getDocHeight() - gen.margin.bottom - gen.getY()
      };

      if (typeof elementsList[child.type] === 'function') {
        Logger.of('TplPdfLoader.PdfFlex').warn('props=', child);
        if (child.marginLeft) { gen.addX(child.marginLeft); }
        // there is no merged context, as chilren typically are PdfPage's
        ReactDOMServer.renderToString(React.createElement(elementsList[child.type], {
          gen, props: child, context: ctx
        }));
        if (child.width) { gen.addX(child.width); }
        if (child.marginRight) { gen.addX(child.marginRight); }
      } else {
        Logger.of('TplPdfLoader.PdfFlex').error('Cannot render PDF element of type', child.type);
      }
    });
  }
  return false;
};

export default PdfFlex;
