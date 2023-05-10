
const beerQuantity = document.querySelector('.beer-quantity');
const beerPrice = document.querySelector('.beer-price');

const cigarettesQuantity = document.querySelector('.cigarettes-quantity');
const cigarettesPrice = document.querySelector('.cigarettes-price');

const chipsQuantity = document.querySelector('.chips-quantity');
const chipsPrice = document.querySelector('.chips-price');

const selectOfGoods = document.querySelector('.select-goods'); //загальний селектор з товарами
const quantityOfGoods = document.querySelector('.quantity');
const costOfGoods = document.querySelector('.cost');

selectOfGoods.addEventListener('click', () => {
  console.log(event)
})


function reducer(state, {type, what, quantity, cost}){ 
 
  if (!state){ 
      return {
        beer: {
          quantity: 100,
          cost: 30
        },
        cigarettes: {
          quantity: 110,
          cost: 80
        },
        chips: {
          quantity: 150,
          cost: 50
        },
        profit: 0
      }
  }
  if (type === 'buy'){ 
      return {
        ...state, 
        [what]: state[what] - cost
      }
  }
  return state;
}

let state = reducer(undefined, {}) //перший виклик
console.log(state)
state  = reducer(state, {type: 'buy', what: 'beer', quantity: 5})
console.log(state)

// if () {

// }

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

