import editableJsPdf from './editable/jspdf';
import { onDataReady } from './services/EventHandler';

export default {
  pluginName: 'jspdf',
  // callback is called when we've loaded all the data for the route
  onDataReady,
  // list of components, exporting as there might be some dependencies
  editableJsPdf
};
