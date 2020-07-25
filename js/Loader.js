class Loader {
  constructor(element) {
    this.element = element;
  }
  show() {
    this.element.classList.remove("d-none");
  }
  hide() {
    this.element.classList.add("d-none");
  }
}
