/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/footnote-list.js":
/*!*************************************!*\
  !*** ./src/blocks/footnote-list.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('wholesome/footnote-list', {
  apiVersion: 2,
  category: 'design',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('A list of this posts footnotes.', 'wholesome-footnote'),
  edit: () => {
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'wholesome-footnote-list'
    });
    const meta = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').getEditedPostAttribute('meta'));
    let footnotes = meta.wholesome_footnotes || [];

    if (!footnotes) {
      return null; // @todo: put a message here.
    }

    footnotes = footnotes.sort((a, b) => a.order - b.order);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      id: "wholesome-footnote-list__heading",
      className: "screen-reader-text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footnotes')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ol", null, footnotes.map(note => {
      const tags = note.footnote.match(/<.+?>/ig);
      const backLink = ' <a class="wholesome-footnote-list__item-back" href="#${ note.uid }" aria-label="${__(\'Back to content\')}" title="${__(\'Back to content\')}">↵</a>';
      let footnote = note.footnote + backLink;

      if (tags) {
        let endTag = tags.at(-1);

        if (endTag === '</ul>' || endTag === '</ol>') {
          endTag = tags[tags.length - 2];
        }

        footnote = note.footnote.replace(new RegExp(`${endTag}$`), backLink + endTag);
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        id: 'footnote-' + note.uid,
        className: "wholesome-footnote-list__item",
        key: note.uid,
        dangerouslySetInnerHTML: {
          __html: footnote
        }
      });
    })));
  },
  icon: 'editor-ol',
  save: () => {},
  supports: {
    align: true
  },
  textdomain: 'wholesome-footnote',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footnote List', 'wholesome-footnote')
});

/***/ }),

/***/ "./src/components/WysiwygControl.js":
/*!******************************************!*\
  !*** ./src/components/WysiwygControl.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/keycodes */ "@wordpress/keycodes");
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);


/**
 * WYSIWYG Control.
 *
 * Forked from https://github.com/TomodomoCo/wp-wysiwyg-control/.
 *
 * "The repo is not designed to be used out of the box, but rather as a starting point for
 * your own integration. As such, you can't "install" it via npm or another package manager;
 * instead, you should copy the files to your project."
 */

/**
 * WordPress dependencies
 */





/**
 * External dependencies
 */


const {
  wp
} = window;
/**
 * Is TMCE Empty?.
 *
 * @param object editor Editor.
 * @returns bool
 */

function isTmceEmpty(editor) {
  // When tinyMce is empty the content seems to be:
  // <p><br data-mce-bogus="1"></p>
  // avoid expensive checks for large documents
  const body = editor.getBody();

  if (body.childNodes.length > 1) {
    return false;
  }

  if (body.childNodes.length === 0) {
    return true;
  }

  if (body.childNodes[0].childNodes.length > 1) {
    return false;
  }

  return /^\n?$/.test(body.innerText || body.textContent);
}

class WysiwygControl extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.initialize = this.initialize.bind(this);
    this.onSetup = this.onSetup.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    const {
      baseURL,
      suffix
    } = window.wpEditorL10n.tinymce;
    window.tinymce.EditorManager.overrideDefaults({
      base_url: baseURL,
      suffix
    });
    _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4___default()(() => this.initialize());
  }

  componentWillUnmount() {
    const {
      slug
    } = this.props;
    window.addEventListener('DOMContentLoaded', this.initialize);
    wp.oldEditor.remove(`editor-${slug}`);
  }

  componentDidUpdate(prevProps) {
    const {
      slug,
      value
    } = this.props;
    const editor = window.tinymce.get(`editor-${slug}`);

    if (prevProps.value !== value) {
      editor.setContent(value || '');
    }
  }

  initialize() {
    const {
      settings = {
        plugins: 'charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview',
        external_plugins: [],
        classic_block_editor: true
      },
      slug,
      toolbars = {
        toolbar1: 'formatselect,wp_add_media,wp_adv,bold,italic,bullist,numlist,strikethrough,link',
        toolbar2: 'pastetext,removeformat,charmap,undo,redo,wp_help',
        toolbar3: '',
        toolbar4: ''
      },
      formats = 'Paragraph=p;Heading=h2;Subheading=h3'
    } = this.props;
    const editorSettings = { ...settings,
      ...toolbars,
      block_formats: formats
    };
    wp.oldEditor.initialize(`editor-${slug}`, {
      tinymce: { ...editorSettings,
        inline: true,
        content_css: false,
        fixed_toolbar_container: `#toolbar-${slug}`,
        setup: this.onSetup
      }
    });
  }

  onSetup(editor) {
    const {
      onChange,
      value
    } = this.props;
    const {
      ref
    } = this;
    let bookmark;
    this.editor = editor;

    if (value) {
      editor.on('loadContent', () => editor.setContent(value));
    }

    editor.on('blur', () => {
      bookmark = editor.selection.getBookmark(2, true);
      onChange(editor.getContent());
      editor.once('focus', () => {
        if (bookmark) {
          editor.selection.moveToBookmark(bookmark);
        }
      });
      return false;
    });
    editor.on('mousedown touchstart', () => {
      bookmark = null;
    });
    editor.on('keydown', event => {
      const {
        altKey
      } = event;
      /*
       * Prevent Mousetrap from kicking in: TinyMCE already uses its own
       * `alt+f10` shortcut to focus its toolbar.
       */

      if (altKey && event.keyCode === _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.F10) {
        event.stopPropagation();
      }
    });
    editor.on('init', () => {
      const rootNode = this.editor.getBody(); // Create the toolbar by refocussing the editor.

      if (document.activeElement === rootNode) {
        rootNode.blur();
        this.editor.focus();
      }
    });
  }

  focus() {
    if (this.editor) {
      this.editor.focus();
    }
  } // eslint-disable-next-line class-methods-use-this


  onToolbarKeyDown(event) {
    // Prevent WritingFlow from kicking in and allow arrows navigation on the toolbar.
    event.stopPropagation(); // Prevent Mousetrap from moving focus to the top toolbar when pressing `alt+f10` on this block toolbar.

    event.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const {
      slug
    } = this.props; // Disable reasons:
    //
    // jsx-a11y/no-static-element-interactions
    //  - the toolbar itself is non-interactive, but must capture events
    //    from the KeyboardShortcuts component to stop their propagation.

    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, this.props, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wysiwyg-control"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: "toolbar",
      id: `toolbar-${slug}`,
      ref: ref => {
        this.ref = ref;
      },
      className: "block-library-classic__toolbar wysiwyg-control__toolbar",
      onClick: this.focus,
      "data-placeholder": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Click to edit'),
      onKeyDown: this.onToolbarKeyDown
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: "editor",
      id: `editor-${slug}`,
      className: "wp-block-freeform block-library-rich-text__tinymce wysiwyg-control__body"
    })));
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }

}

/* harmony default export */ __webpack_exports__["default"] = (WysiwygControl);

/***/ }),

/***/ "./src/formats/footnote.js":
/*!*********************************!*\
  !*** ./src/formats/footnote.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_WysiwygControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/WysiwygControl */ "./src/components/WysiwygControl.js");
/* harmony import */ var _plugins_transformations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../plugins/transformations */ "./src/plugins/transformations.js");


/**
 * Footnotes.
 */
// Import WordPress Components.








const name = 'wholesome/footnotes';

const FootnoteBlock = (text, uid) => {
  const number = '0';
  const matches = text.match(/<a[\S\s]*? class="wholesome-footnote">[\S\s]*?<\/a>/gi);
  return `<a aria-describedby="wholesome-footnote-list__heading" title="${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footnote')}" class="wholesome-footnote" id="${uid}" href="#footnote-${uid}">${text}<sup class="wholesome-footnote__number">${number}</sup></a>`;
}; // Create Footnotes Button with Colour Selection Popover.


const FootnotesButton = props => {
  var _contentRef$current;

  const {
    contentRef,
    isActive,
    onChange,
    value
  } = props;
  const {
    activeFormats
  } = value; // State to show popover.

  const [showPopover, setShowPopover] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [footnote, setFootnote] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const meta = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').getEditedPostAttribute('meta'));
  const footnotes = meta['wholesome_footnotes'] || [];

  const getActiveFootnote = () => {
    const uid = getActiveFootnoteUID();
    const selectedFootnote = footnotes === null || footnotes === void 0 ? void 0 : footnotes.filter(footnote => uid === footnote.uid);

    if (selectedFootnote && selectedFootnote.length) {
      var _selectedFootnote$;

      return ((_selectedFootnote$ = selectedFootnote[0]) === null || _selectedFootnote$ === void 0 ? void 0 : _selectedFootnote$.footnote) || '';
    }

    return '';
  };

  const getActiveFootnoteUID = () => {
    const formats = activeFormats.filter(format => name === format.type);

    if (formats.length > 0) {
      const format = formats[0];
      const {
        attributes,
        unregisteredAttributes
      } = format;
      let appliedAttributes = unregisteredAttributes;

      if (attributes && attributes.length) {
        appliedAttributes = attributes;
      }

      if (!appliedAttributes) {
        return '';
      }

      if (Object.prototype.hasOwnProperty.call(appliedAttributes, 'id')) {
        const {
          id
        } = appliedAttributes;
        return id;
      }
    }

    return '';
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichTextToolbarButton, {
    icon: "info-outline" // key={ isActive ? 'footnote' : 'footnotes-not-active' }
    // name={ isActive ? 'footnote' : undefined }
    ,
    onClick: () => {
      setShowPopover(true);
    },
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footnote', 'wholesome-footnotes')
  }), showPopover && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    className: "footnotes-popover",
    onRequestClose: ({
      type
    }) => {
      if ('blur' !== type) {
        setShowPopover(false);
      }
    },
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footnote', 'wholesome-footnotes')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_WysiwygControl__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter Footnote:', 'wholesome-footnotes'),
    slug: `${contentRef === null || contentRef === void 0 ? void 0 : (_contentRef$current = contentRef.current) === null || _contentRef$current === void 0 ? void 0 : _contentRef$current.id}-footnote`,
    onChange: footnote => {
      setFootnote(footnote);
    },
    onLoad: setTimeout(() => {
      var _contentRef$current2;

      const tinyMce = document.querySelector(`#editor-${contentRef === null || contentRef === void 0 ? void 0 : (_contentRef$current2 = contentRef.current) === null || _contentRef$current2 === void 0 ? void 0 : _contentRef$current2.id}-footnote`);

      if (tinyMce) {
        tinyMce.focus();
      }
    }, 500),
    value: getActiveFootnote(),
    toolbars: {
      toolbar1: 'bold,italic,bullist,numlist,link,removeformat',
      toolbar2: '',
      toolbar3: '',
      toolbar4: ''
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "button button-secondary",
    onClick: () => {
      var _newFootnotes$uid;

      let text = (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5__.getTextContent)(value).substring(value.start, value.end);
      let uid = getActiveFootnoteUID();

      if (!footnote) {
        onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5__.toggleFormat)(value, {
          type: name
        })); // Remove Format.
      }

      if (footnote && !uid) {
        uid = new Date().valueOf().toString();
        onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5__.insert)(value, (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5__.create)({
          html: FootnoteBlock(text, uid)
        })));
      }

      const newFootnotes = [...footnotes];
      const key = Object.keys(newFootnotes).find(key => newFootnotes[key].uid === uid) || null;
      const order = ((_newFootnotes$uid = newFootnotes[uid]) === null || _newFootnotes$uid === void 0 ? void 0 : _newFootnotes$uid.order) || 0;
      const note = {
        uid,
        footnote,
        order
      };

      if (key) {
        newFootnotes[key] = note;
      } else {
        newFootnotes.push(note);
      }

      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/editor').editPost({
        meta: {
          wholesome_footnotes: newFootnotes,
          wholesome_footnotes_updated: new Date().valueOf().toString()
        }
      });
      setShowPopover(false);
      setFootnote('');
      (0,_plugins_transformations__WEBPACK_IMPORTED_MODULE_7__.setFootnoteNumbers)();
    },
    variant: "secondary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save', 'wholesome-footnotes'))));
}; // Register the Format.


(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_5__.registerFormatType)(name, {
  className: 'wholesome-footnote',
  edit: FootnotesButton,
  tagName: 'a',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footnote', 'wholesome-footnotes')
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _blocks_footnote_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/footnote-list */ "./src/blocks/footnote-list.js");
/* harmony import */ var _formats_footnote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formats/footnote */ "./src/formats/footnote.js");
/* harmony import */ var _plugins_transformations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plugins/transformations */ "./src/plugins/transformations.js");




 // Change footnote numbers when the block order changes.

(0,_plugins_transformations__WEBPACK_IMPORTED_MODULE_4__.setFootnotesOnOrderChange)();

/***/ }),

/***/ "./src/plugins/transformations.js":
/*!****************************************!*\
  !*** ./src/plugins/transformations.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFootnoteNumbers": function() { return /* binding */ setFootnoteNumbers; },
/* harmony export */   "setFootnotesOnOrderChange": function() { return /* binding */ setFootnotesOnOrderChange; }
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const setFootnoteNumbers = () => {
  let i = 1;
  const blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();
  const currentBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getSelectedBlock();
  const newBlocks = {};
  const meta = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor').getEditedPostAttribute('meta');
  const footnotes = meta['wholesome_footnotes'] || [];
  const uidOrder = {};
  blocks.forEach(block => {
    const {
      content
    } = block.attributes;

    if (content !== null && content !== void 0 && content.includes('class="wholesome-footnote__number"')) {
      // Remove orphans.
      const childMatches = content.match(/<sup[^<>]+"wholesome-footnote__number">[^<>]+<\/sup>\s/gi);

      if (childMatches) {
        childMatches.forEach(match => {
          const selectedBlock = newBlocks[block.clientId];

          if (selectedBlock) {
            selectedBlock.newContent = selectedBlock.newContent.replace(match, '');
          } else {
            newBlocks[block.clientId] = { ...block,
              newContent: content.replace(match, ''),
              isSelected: currentBlock && currentBlock.clientId === block.clientId
            };
          }
        });
      } // Reorder numbers.


      const matches = content.match(/<a[\S\s]*? class="wholesome-footnote">[\S\s]*?<\/a>/gi);

      if (matches) {
        matches.forEach(match => {
          const newNumber = `<sup class="wholesome-footnote__number">${i}</sup>`;
          const regex = new RegExp('id="(.*?)"', 'gi');
          const uid = regex.exec(match)[1];

          if (!match.includes(newNumber)) {
            const originalNumber = match.match(/<sup class="wholesome-footnote__number">[\S\s]*?<\/sup>/gi);
            const newMatch = match.replace(originalNumber, newNumber);
            const selectedBlock = newBlocks[block.clientId];

            if (selectedBlock) {
              selectedBlock.newContent = selectedBlock.newContent.replace(match, newMatch);
            } else {
              newBlocks[block.clientId] = { ...block,
                newContent: content.replace(match, newMatch),
                isSelected: currentBlock && currentBlock.clientId === block.clientId
              };
            }

            uidOrder[uid] = i;
          }

          i++;
        });
      }
    }
  });
  Object.values(newBlocks).forEach(block => {
    const {
      name,
      newContent,
      isSelected
    } = block;
    const newBlock = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)(name, {
      content: newContent
    });
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/block-editor').replaceBlock(block.clientId, newBlock);

    if (isSelected) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/block-editor').selectBlock(newBlock.clientId);
    }
  });
  const newFootnotes = [...footnotes];
  let hasFootnotesChanged = false; // Reorder UIDs.

  if (Object.keys(uidOrder).length > 0) {
    for (const [uid, order] of Object.entries(uidOrder)) {
      const key = Object.keys(newFootnotes).find(key => newFootnotes[key].uid === uid) || null;

      if (key) {
        newFootnotes[key] = { ...newFootnotes[key],
          order
        };
        hasFootnotesChanged = true;
      }
    }
  }

  if (hasFootnotesChanged) {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/editor').editPost({
      meta: {
        wholesome_footnotes: newFootnotes,
        wholesome_footnotes_updated: new Date().valueOf().toString()
      }
    });
  }

  return Promise.resolve();
};

const doReorderAndResubscribe = async () => {
  await setFootnoteNumbers();
  const newBlockOrder = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlockOrder(); // eslint-disable-next-line no-use-before-define

  setFootnotesOnOrderChange(newBlockOrder, newBlockOrder);
};

const setFootnotesOnOrderChange = (blockOrder = [], lastBlockOrder = []) => {
  const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
    if (!blockOrder) {
      blockOrder = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlockOrder();
    }

    const blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();
    const newBlockOrder = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlockOrder();

    if (!blocks || blockOrder === newBlockOrder) {
      return;
    }

    if (lastBlockOrder === newBlockOrder) {
      return;
    }

    lastBlockOrder = newBlockOrder; // Wait until Gutenberg has done the move.

    setTimeout(() => {
      doReorderAndResubscribe();
      unsubscribe();
    }, 500);
  });
};

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/keycodes":
/*!**********************************!*\
  !*** external ["wp","keycodes"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["keycodes"];

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["richText"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwholesome_footnotes"] = self["webpackChunkwholesome_footnotes"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map