export default class View {
  _data;
  _parentElement;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
