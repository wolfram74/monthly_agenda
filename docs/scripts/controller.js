listeners = (function(){
  let API = {};
  API.checkInListener = function(){

  }
  API.addGoal = function(event){
    if(!event.target.matches('#jsAddGoal')){return};
    event.preventDefault();
    const goals = event.target.parentElement.querySelector('ul')
    const goal = renderer.emptyGoalField()
    goals.appendChild(goal)
    console.log('adding', goals);
  }
  API.deleteGoal = function(event){
    if(!event.target.matches('button')){return};
    event.preventDefault();
    const goal = event.target.parentElement
    goal.parentElement.removeChild(goal)
    console.log('deleting');
  }
  API.parseGoalForm = function(event){
    event.preventDefault()
    const form = event.target;
    const fields = form.querySelectorAll('li');
    console.log(fields);
    console.log([...fields]);
    const goals = [...fields].map((ele, ind)=>{
      return {
        description: ele.children.description.value,
        plan: ele.children.plan.value,
        nonZeroThreshold: ele.children.nonZeroThreshold.value,
      }
    });
    console.log(goals)
    // const goals = fields.
    // console.log(fields)
  }
  return API
})()

