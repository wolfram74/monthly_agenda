listeners = (function(){
  let API = {};
  API.checkInListener = function(){

  }
  API.addGoal = function(event){
    if(!event.target.matches('#jsAddGoal')){return};
    event.preventDefault();
    console.log('adding');
  }
  API.deleteGoal = function(event){
    if(!event.target.matches('button')){return};
    event.preventDefault();
    console.log('deleting');
  }
  return API
})()
