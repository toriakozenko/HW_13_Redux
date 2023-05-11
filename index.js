
const beerQuantity = document.querySelector('.beer-quantity');
const beerPrice = document.querySelector('.beer-price');

const cigarettesQuantity = document.querySelector('.cigarettes-quantity');
const cigarettesPrice = document.querySelector('.cigarettes-price');

const chipsQuantity = document.querySelector('.chips-quantity');
const chipsPrice = document.querySelector('.chips-price');

const selectOfGoods = document.querySelector('.select-goods');
const quantityOfGoods = document.querySelector('.quantity');
const costOfGoods = document.querySelector('.cost');


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

const store = createStore(reducer);


function reducer(state, {type, what, quantity, cost}){ 
 
  if (!state){ 
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
        profit: 0
      }
  }
  
  let unit = state[what].quantity;
  let price = state[what].cost;

  if (type === 'buy'){ 
      return {
        ...state, 
        [what]: state[what] - cost
      }
  }
  return state;
}

