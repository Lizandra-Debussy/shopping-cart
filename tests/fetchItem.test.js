require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Se fetchItem é uma função', async () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Com o argumento "MLB1615760527", a função fetch deve ser chamada', async () => {
    expect.assertions(1);
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  it('Com o argumento "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);
    expect(await fetchItem()).toEqual('You must provide an url');
  });

});
