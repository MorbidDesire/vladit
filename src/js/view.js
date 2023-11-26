const renderList = (datalist, cities) => {
  datalist.textContent = '';
  cities.forEach(({ name, region }) => {
    const element = document.createElement('option');
    const finalName = region ? `${name} ${region}` : name;
    element.setAttribute('value', finalName);
    datalist.append(element);
  });
};

const render = (elements) => (path, value) => {
  renderList(elements.list, value);
};

export default render;
