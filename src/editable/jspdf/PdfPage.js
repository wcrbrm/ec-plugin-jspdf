import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Logger, getValue } from 'ec-react15-lib';
import { getPdfElementsList, renderPdfContainer } from './../../services/TplPdfLoader';

const addPage = ({ gen, props }) => {
  gen.addPage('A4');
  gen.setMargins({
    top: props.marginTop,
    bottom: props.marginBottom,
    left: props.marginLeft,
    right: props.marginRight
  });
};

const PdfPage = ({ gen, props, context }) => {
  const elementData = getValue(props, 'elementData', context);
  const elementsList = getPdfElementsList(context);
  // Logger.of('PdfPage').warn('elementData=', elementData, 'container=', props.container);
  if (elementData) {
    // if props.elementData, map the data
    if (elementData.length && props.container) {
      // add page for every element there
      props.container.forEach((pageProps, index) => {
        addPage({ gen, props });
        const instance = elementData[index];
        // merge context with pageProperties
        const ctx = { ...context, row: { ...instance, index } };
        renderPdfContainer(gen, props.container, ctx);
      });
    }
  } else if (props.container) {
    // if we have just a single page to be added
    addPage({ gen, props });
    renderPdfContainer(gen, props.container, context);
  }
  return false;
};

export default PdfPage;
