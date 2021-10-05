import './editor.scss';

// import './blocks/footnotes';
import './formats/footnote';
import { setFootnotesOnOrderChange } from './plugins/transformations';

// Change footnote numbers when the block order changes.
setFootnotesOnOrderChange();
