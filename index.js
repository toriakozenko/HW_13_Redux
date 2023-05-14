const store = createStore(reducer);

let cash = 0;
let quantity = 0;
let product = '';

const beerQuantity = document.querySelector('.beer-quantity');
const beerPrice = document.querySelector('.beer-price');
beerPrice.innerText = `${store.getState().beer.cost}`;


const cigarettesQuantity = document.querySelector('.cigarettes-quantity');
const cigarettesPrice = document.querySelector('.cigarettes-price');
cigarettesPrice.innerText = `${store.getState().cigarettes.cost}`;

const chipsQuantity = document.querySelector('.chips-quantity');
const chipsPrice = document.querySelector('.chips-price');
chipsPrice.innerText = `${store.getState().chips.cost}`;

const selectOfGoods = document.querySelector('.select-goods');
const quantityOfGoods = document.querySelector('.quantity');
const userMoney = document.querySelector('.cost');

const button = document.querySelector('.shopping-button');
const text = document.querySelector('.text');
const profit = document.querySelector('.profit');

selectOfGoods.addEventListener('change', function(event){
  product = event.target.value;
})

quantityOfGoods.addEventListener('change', function(event){
  quantity = +event.target.value;
})

userMoney.addEventListener('change', function(event){
  cash = +event.target.value;
})


function createStore(reducer){
  let state  = reducer(undefined, {});
  let cbs = [];               
  
  const getState  = () => state;            
  const subscribe = cb => (cbs.push(cb),() => cbs = cbs.filter(c => c !== cb)) 
                           
  const dispatch  = action => { 
    const newState = reducer(state, action) 
    if (newState !== state){ 
      state = newState; 
      for (let cb of cbs)  cb() 
    }
  }
  
  return {
      getState, 
      dispatch,
      subscribe 
  }
}


function reducer(state, {type, what, quantity, cash}){ 

  if(!state){
    return {
      beer: {
        quantity: 100,
        cost: 10
      },
      cigarettes: {
        quantity: 140,
        cost: 20
      },
      chips: {
        quantity: 200,
        cost: 50
      },
      cashRegister: 0,
    }
  }

  const unit = state[what].quantity;
  const price = state[what].cost;
  const totalPrice = price * quantity;
  const cashRegister = 0;

  if (type === 'buy'){ 
    if(unit < quantity){
      alert("Sorry, but we haven't enough goods. Come later.!")
      return {
        ...state
      }
    }
    if(cash < totalPrice){
      alert('Not enough money. You must earn the money somewhere and come again!')
      return {
        ...state
      }
    }
    if(cash >= totalPrice){
      alert('Here is your goods, friend!');
      return {
        ...state, 
        [what]: {...state[what], quantity: unit - quantity},
        cashRegister: totalPrice + cashRegister
      }
    }
    
  }
  return state;
}

const actionCreator = (type, what, quantity, cash) => ({
  type,
  what,
  quantity,
  cash,
});

button.addEventListener('click', function(){
  store.dispatch(actionCreator('buy', product, quantity, cash));

  userMoney.value = '';
  quantityOfGoods.value = '';
  selectOfGoods.value = 'Products';
});


function updateDocument(){
  beerQuantity.innerText = `${store.getState().beer.quantity}`;
  cigarettesQuantity.innerText = `${store.getState().cigarettes.quantity}`;
  chipsQuantity.innerText = `${store.getState().chips.quantity}`;
  profit.innerText = `Our profit: ${store.getState().cashRegister}`;
  document.title = `Our profit: ${store.getState().cashRegister}`;
}

store.subscribe(updateDocument);
updateDocument();
