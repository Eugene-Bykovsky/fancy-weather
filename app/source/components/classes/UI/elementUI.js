export default class ElementUI {
  constructor() {
    this.element = null;
  }

  createElement(element, className, id) {
    const tag = document.createElement(element);
    tag.className = className;
    if (id) {
      tag.id = id;
    }
    this.element = tag;
  }

  createChild(element, className) {
    const child = document.createElement(element);
    child.className = className;
    this.element.append(child);
    return child;
  }

  addChild(element) {
    this.element.append(element);
  }

  addChildNode(node) {
    this.element.innerHTML = node;
  }
}
