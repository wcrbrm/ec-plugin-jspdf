import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getValue, Logger } from 'ec-react15-lib';
import { getPdfElementsList, renderPdfContainer } from './../../services/TplPdfLoader';

const PdfContainer = ({ gen, props, context }) => {
  const elementData = getValue(props, 'elementData', context);
  const elementsList = getPdfElementsList(context);
  Logger.of('TplPdfLoader.PdfContainer').warn('props=', props);
  if (elementData && elementData.length) {
    // if props.elementData, map the data
    if (props.container) {
      // add page for every element there
      props.container.forEach((pageProps) => {
        // merge context with pageProperties
        const ctx = { ...context, row: pageProps };
        renderPdfContainer(gen, props.container, ctx);
      });
    }
  } else if (props.container) {
    // if we have just a single page to be added
    renderPdfContainer(gen, props.container, context);
  }
  return false;
};

export default PdfContainer;
