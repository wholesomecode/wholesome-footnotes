import './editor.scss';
import './style.scss';

import './blocks/footnote-list';
import './formats/footnote';
import { setFootnotesOnDeletion, setFootnotesOnOrderChange } from './plugins/transformations';

// Change footnote numbers when a footnote is deleted.
setFootnotesOnDeletion();

// Change footnote numbers when the block order changes.
setFootnotesOnOrderChange();
