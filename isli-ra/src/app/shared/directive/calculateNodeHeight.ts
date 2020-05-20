const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'font-family',
  'font-weight',
  'font-size',
  'font-style',
  'tab-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'box-sizing'
];

export default function calculateNodeHeight(uiTextNode) {
  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  const nodeStyling = calculateNodeStyling(uiTextNode);

  if (nodeStyling === null) {
    return null;
  }

  const { paddingSize, borderSize, boxSizing, sizingStyle } = nodeStyling;

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  let height = uiTextNode.scrollHeight;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height = height - paddingSize;
  }

  return height;
}

function calculateNodeStyling(node) {
  const style = window.getComputedStyle(node);

  if (style === null) {
    return null;
  }

  const sizingStyle: any = SIZING_STYLE.reduce((obj, name) => {
    obj[name] = style.getPropertyValue(name);
    return obj;
  }, {});

  const boxSizing = sizingStyle['box-sizing'];

  // probably node is detached from DOM, can't read computed dimensions
  if (boxSizing === '') {
    return null;
  }

  const paddingSize = parseFloat(sizingStyle['padding-bottom']) + parseFloat(sizingStyle['padding-top']);

  const borderSize = parseFloat(sizingStyle['border-bottom-width']) + parseFloat(sizingStyle['border-top-width']);

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };

  return nodeInfo;
}
