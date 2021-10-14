import './editor.scss';
import './style.scss';

import './blocks/footnote-list';
import './formats/footnote';
import { setFootnotesOnOrderChange } from './plugins/transformations';

// Change footnote numbers when the block order changes.
setFootnotesOnOrderChange();
