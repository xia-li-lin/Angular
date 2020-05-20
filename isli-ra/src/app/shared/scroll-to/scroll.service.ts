import { Injectable, ElementRef, RendererType2, Renderer2, RendererFactory2 } from '@angular/core';
import { scrollIntoView, util } from 'mpr-form-valid';

function computedStyle(el, prop) {
  const getComputedStyle = window.getComputedStyle;
  const style =
    // If we have getComputedStyle
    getComputedStyle
      ? // Query it
        // TODO: From CSS-Query notes, we might need (node, null) for FF
        getComputedStyle(el)
      : // Otherwise, we are in IE and use currentStyle
        el.currentStyle;
  if (style) {
    return style[
      // Switch to camelCase for CSSOM
      // DEV: Grabbed from jQuery
      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
      prop.replace(/-(\w)/gi, (word, letter) => {
        return letter.toUpperCase();
      })
    ];
  }
  return undefined;
}

function getScrollableContainer(n: Node) {
  let node = n;
  let nodeName;
  /* eslint no-cond-assign:0 */
  // tslint:disable-next-line:no-conditional-assignment
  while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
    const overflowY = computedStyle(node, 'overflowY');
    // https://stackoverflow.com/a/36900407/3040605
    if (
      node !== n &&
      (overflowY === 'auto' || overflowY === 'scroll') &&
      (node as HTMLElement).scrollHeight > (node as HTMLElement).clientHeight
    ) {
      return node;
    }
    node = node.parentNode;
  }
  return nodeName === 'body' ? node.ownerDocument : node;
}

function getWindow(node) {
  const doc = node.ownerDocument || node;
  return doc.defaultView || doc.parentWindow;
}

@Injectable()
export class ScrollService {
  private scrollTabs = [];
  private scrollElems: any = {};
  private scrollContainer: Element;
  private scrollWrap: Element;
  private scrollTop = Number.MAX_VALUE;
  private warpOffsetTop = 206;
  private compelName = ''; // 强制节点
  renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.scroll = this.scroll.bind(this);
  }

  registerScrollAnchor(scrollElem: ElementRef, scrollName: string) {
    this.scrollElems[scrollName] = scrollElem;
    if (Object.keys(this.scrollElems).length === 1) {
      let container = getScrollableContainer(scrollElem.nativeElement);
      if (container.nodeType === 9) {
        container = getWindow(container);
      }
      this.setContainerAndListenScroll(container as Element);
    }
  }

  registerScrollWrap(scrollWrap: Element) {
    this.scrollWrap = scrollWrap;
  }

  unregisterScrollAnchor(scrollName: string) {
    delete this.scrollElems[scrollName];
    if (Object.keys(this.scrollElems).length === 0) {
      this.scrollContainer.removeEventListener('scroll', this.scroll);
    }
  }

  registerScrollTab(scrollTab: ElementRef, destScroll: any) {
    const index = this.scrollTabs.findIndex((elem) => elem.scrollTab === scrollTab);
    if (index === -1) {
      this.scrollTabs.push({ scrollTab, destScroll });
    }
  }

  unregisterScrollTab(scrollTab: ElementRef) {
    const index = this.scrollTabs.findIndex((elem) => elem.scrollTab === scrollTab);
    if (index !== -1) {
      this.scrollTabs.splice(index, 1);
    }
  }

  scrollTo(scrollName: string) {
    if (!this.scrollElems[scrollName]) {
      throw new Error(`${scrollName} not exists`);
    }
    this.compelName = scrollName;
    scrollIntoView(this.scrollElems[scrollName].nativeElement, this.scrollContainer, {
      onlyScrollIfNeeded: false,
      allowHorizontalScroll: false,
      offsetTop: this.warpOffsetTop,
      alignWithTop: true
    });
  }

  setContainerAndListenScroll(constainer: Element) {
    this.scrollContainer = constainer;
    constainer.addEventListener('scroll', this.scroll);
    Promise.resolve(null).then(() => {
      this.scroll();
    });
  }

  setScrollTabActive(scrollName) {
    let index = 0;
    for (const scrollTab of this.scrollTabs) {
      index++;
      if (scrollTab.destScroll === scrollName || (!scrollName && index === 1)) {
        this.renderer.addClass(scrollTab.scrollTab.nativeElement, 'active');
      } else {
        this.renderer.removeClass(scrollTab.scrollTab.nativeElement, 'active');
      }
    }
  }

  scroll() {
    const scrollTop = util.isWindow(this.scrollContainer)
      ? util.scrollTop(this.scrollContainer)
      : util.offset(this.scrollContainer).top;
    const height = util.isWindow(this.scrollContainer)
      ? util.height(this.scrollContainer)
      : util.outerHeight(this.scrollContainer);
    const offsetHeight = scrollTop + height;
    let find = null;
    if (this.compelName || scrollTop < this.scrollTop) {
      // scrolll to up, show the first one
      const warpOffsetTop = scrollTop + this.warpOffsetTop;
      const names = Object.keys(this.scrollElems).filter((name) => {
        const offsetTop = util.offset(this.scrollElems[name].nativeElement).top;
        // console.log('up:', offsetTop, scrollTop, name, this.compelName, warpOffsetTop);
        return offsetTop >= warpOffsetTop && offsetTop < offsetHeight;
      });
      find = this.compelName ? (names.indexOf(this.compelName) !== -1 ? this.compelName : names[0]) : names[0];
      this.compelName = '';
    } else {
      const names = Object.keys(this.scrollElems).filter((name) => {
        const offsetTop = util.offset(this.scrollElems[name].nativeElement).top;
        return offsetTop < offsetHeight;
      });
      find = names.pop();
    }
    this.scrollTop = scrollTop;
    this.setScrollTabActive(find);
    // console.log('find name is', find);
  }
}
