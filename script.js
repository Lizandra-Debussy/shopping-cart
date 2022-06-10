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

// Requisito 8 (incompleta)
const getLocalStorage = () => {
  const localStorage = getSavedCartItems();
  console.log(localStorage);
  // cartItems.innerHTML = localStorage;
  // cartItems.childNodes.forEach((child) => {
  //   child.addEventListener('click', cartItemClickListener);
  // });
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
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', function () {
    cartItems.innerHTML = '';
    sumItem = 0;
    span.innerText = sumItem;
  saveCartItems(cartItems.innerHTML);
  });
};

// Requisito 11: (incompleta)
// const elementCarregando = document.createElement('span');
// elementCarregando.className = 'loading';
// elementCarregando.innerText = 'carregando';
// console.log(elementCarregando);

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText

window.onload = () => {
getProduct('computador');
getLocalStorage();
emptyCart();
};
