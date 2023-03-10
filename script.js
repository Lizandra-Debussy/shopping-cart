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

// Requisito 9
let sumItem = 0;
const cart = document.querySelector('.cart');
const span = document.createElement('span');
span.className = 'total-price';
span.innerText = sumItem;
cart.appendChild(span);

const cartItemClickListener = (event, salePrice) => {
  // cartItems.removeChild(event.target);   / Outra maneira de resolver
  event.target.remove();
  sumItem -= salePrice;
  span.innerText = Math.round(sumItem * 100) / 100;
  saveCartItems(cartItems.innerHTML);
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  
  li.addEventListener('click', (event) => {
    cartItemClickListener(event, salePrice);
  });

  sumItem += salePrice;
  span.innerText = Math.round(sumItem * 100) / 100;
  
  return li;
};

const getCartItem = async (id) => {
  const item = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(item));
  saveCartItems(cartItems.innerHTML);
};

// Requisito 8
const getLocalStorage = () => {
  const localStorage = getSavedCartItems();
  cartItems.innerHTML = localStorage;
  cartItems.childNodes.forEach((child) => {
    child.addEventListener('click', cartItemClickListener);
  });
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

// Requisito 10
const emptyCart = () => {
  const cartClass = document.querySelector('.cart');
  const button = document.createElement('button');
  button.className = 'empty-cart';
  button.innerText = 'Esvaziar carrinho';
  cartClass.appendChild(button);
  button.addEventListener('click', function () {
    cartItems.innerHTML = '';
    sumItem = 0;
    span.innerText = sumItem;
  saveCartItems(cartItems.innerHTML);
  });
};

// Requisito 11
const loading = async (computador) => {
  const itensL = document.querySelector('.items');
  const spanL = document.createElement('span');
  spanL.className = 'loading';
  spanL.innerHTML = 'carregando...';
  itensL.appendChild(spanL);
  
  const products = await fetchProducts(computador);
  document.querySelector('.loading').remove();
  products.results.forEach((item) => createProductItemElement(item));
};

window.onload = () => {
getProduct('computador');
getLocalStorage();
emptyCart();
loading();
};

// Fontes:
// Mentoria com Rosalia Oliveira
// https://pt.stackoverflow.com/questions/487605/problema-com-o-m%C3%A9todo-tofixed-javascript