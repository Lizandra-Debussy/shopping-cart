const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  // cartItems.removeChild(event.target); Uma das formas de resolver o requisito 5
  event.target.remove();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getCartItem = async (id) => {
  const item = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(item));
};

const addEventAddButtonCartItem = (button, id) => {
  button.addEventListener('click', async () => {
    await getCartItem(id);
  });
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttAddCart = section
  .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  addEventAddButtonCartItem(buttAddCart, sku);
  return section;
};

const getProduct = async (termo) => {
  const product = await fetchProducts(termo);
  product.results.forEach((result) => items.appendChild(createProductItemElement(result)));
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText

window.onload = () => {
getProduct('computador');
};