const fetchItem = async (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
      console.log(data);
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
