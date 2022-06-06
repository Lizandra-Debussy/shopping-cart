const fetchItem = async (item) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${item}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
      return data;
  } catch (error) {
      return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
// fetchItem();