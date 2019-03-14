export const storeStateMiddleWare = ({ getState }) => {
  return (next) => (action) => {
    console.log('sore state middleware')
    let returnValue = next(action);
    window.top.state = getState();
    return returnValue
  }
}