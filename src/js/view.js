const renderList = (datalist, cities) => {
  datalist.textContent = '';
  cities.forEach(({ name, region }) => {
    const element = document.createElement('option');
    element.setAttribute('value', name + region);
    datalist.append(element);
  });
};

const render = (elements) => (path, value) => {
  renderList(elements.list, value);
};

export default render;
