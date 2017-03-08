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
    if(state[form.dataset['dateTag']] === undefined){
      state[form.dataset['dateTag']]={weeks:[]}
    }
    state[form.dataset['dateTag']].goals=goals;
    utils.saveState()
    // save goals
    // hide form
    // render goals if not rendered
    // const goals = fields.
    // console.log(fields)
  }
  API.hideSibling = function(event){
    event.preventDefault()
    if(event.target.parentElement.children[1].style.display===''){
      event.target.parentElement.children[1].style.display = 'none'
    } else{
      event.target.parentElement.children[1].style.display = ''
    }
  }

  API.checkInUpdate = function(event){
    state.checkInDay = parseInt(event.target.value)
  }
  API.currentMonthParser = function(event){
    // check box, I need month ID, week #, goal #, day #
    // drop down and text, I need month ID, week #, goal #
    const ele = event.target;
    const goalEle = ele.closest('li');
    const weekEle = goalEle.parentElement.closest('li');
    const month = document.querySelector('#jsCurrentMonth').dataset['datetag']
    const weekNum = weekEle.dataset['weeknum'];
    const goalNum = goalEle.dataset['goalnum'];
    const dayNum = ele.dataset.daynum;
    const week = state[month].weeks[weekNum]
    if(dayNum !== undefined){
      console.log('checked', ele.checked)
      week.dailyChecks[goalNum][dayNum] = ele.checked
      return
    };
    if(ele.nodeName==='SELECT'){
      console.log('progressed', parseInt(ele.value))
      week.weeklyProgress[goalNum] = parseInt(ele.value)
      return
    }
    console.log('reviewed', ele.value)
    week.weeklyReflection[goalNum] = ele.value
    // debugger
  }
  return API
})()

