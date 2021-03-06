renderer = (function(){
  let API = {}
  API.checkInDayPrompt = function(){
    const checkBoxes = weekDays.map((ele, index)=>{
      const option = `
      <option value=${index} ${state.checkInDay===index ? 'selected="selected"' : ''}>
        ${ele}
      </option>`
      return option
    })
    console.log(checkBoxes)
    const form = `Check in on <br><select>
    ${checkBoxes.join('')}
    </select>`
    return form
  }

  API.updateCheckInDay = function(){
    const selectedOption = document.querySelector(
      `#jsCheckInDiv option[value="${state.checkInDay}"]`
      );
    selectedOption.selected = 'selected';
  }

  API.emptyGoalField = function(){
    const firstLi = document.querySelector('.goals_input .goal_field')
    let newLi = firstLi.cloneNode(true);
    newLi.children.description.value = ''
    newLi.children.plan.value = ''
    newLi.children.nonZeroThreshold.value = ''
    return newLi
  }

  API.setGoalFormData = function(){
    const impendingMonth = utils.nextEmptyMonth();
    let nextGoalSpan = document.querySelector('#jsNextGoals');
    nextGoalSpan.innerHTML = `${impendingMonth.year}-${impendingMonth.month+1}`;
    nextGoalSpan.dataset['year'] = impendingMonth.year;
    nextGoalSpan.dataset['month'] = impendingMonth.month;
    const stateKey = `y${impendingMonth.year}m${impendingMonth.month}`
    nextGoalSpan.dataset['dateTag'] = stateKey;
    document.querySelector('#jsNewGoals form').dataset['dateTag']=stateKey;
  }

  API.renderCurrentGoals = function(){
    let monthData = state[utils.currentMonth()]
    const currentWeek = utils.nthWeek(new Date(), state.checkInDay)
    if(monthData.weeks[currentWeek]===undefined){
      utils.stateMaintainer()
      monthData = state[utils.currentMonth()]
    }
    const currentMonthDiv = document.querySelector('#jsCurrentMonth')
    currentMonthDiv.dataset['datetag'] = utils.currentMonth()
    const goalsList = currentMonthDiv.querySelector('.currentGoals ul')
    const goalsText = monthData.goals.map((goal)=>{
      return `
      <li>
        <h4>${goal.description}</h4>
        <p>${goal.plan}:<span>average of ${goal.nonZeroThreshold} minutes a day</span></p>
      </li>`
    }).join('')
    goalsList.innerHTML = goalsText
    let weeksItems = API.weeksRender(monthData.weeks, currentWeek)
    let weeksList = document.querySelector('.weeks ul')
    for(let week=0; week < weeksItems.length; week++){
      weeksList.appendChild(weeksItems[week])
    }
  }

  API.weeksRender = function(weeks, currentWeek){
    let weeksElements = weeks.map((week, index)=>{
      return API.weekRender(week, index, currentWeek)
    })
    return weeksElements
  }

  API.weekRender = function(week, index, currentWeek){
    let weekLi = document.createElement('li');
    weekLi.dataset['weeknum'] = index;
    let weekH4 = document.createElement('h4');
    weekH4.innerHTML = `state of week ${index}`;
    weekLi.appendChild(weekH4);

    let goalList = document.createElement('ul');
    let weekItemTexts = [];
    const goals = state[utils.currentMonth()].goals

    for(let goalIndex = 0; goalIndex< week.dailyChecks.length; goalIndex++){
      let checkBoxes = week.dailyChecks[goalIndex].map((progress, index)=>{
        return `<input type='checkbox' data-dayNum='${index}' ${progress ? "checked='checked'": ''}>`
      }).join('')
      weekItemTexts.push(`
        <li data-goalNum=${goalIndex}>
          <span>${goals[goalIndex].description}</span>
          <div class='dailyCheck'>${checkBoxes}</div>
          <select>
            <option value = 0 ${week.weeklyProgress[goalIndex]===0 ? 'selected="selected"' : ''}>No progress</option>
            <option value = 1 ${week.weeklyProgress[goalIndex]===1 ? 'selected="selected"' : ''}>Partial Progress</option>
            <option value = 2 ${week.weeklyProgress[goalIndex]===2 ? 'selected="selected"' : ''}>Adequate Progress</option>
          </select>
          <input type='text' placeholder='weekly reflection'
          value='${week.weeklyReflection[goalIndex]}'>
        </li>
        `)
    }
    goalList.innerHTML = weekItemTexts.join('')
    weekLi.appendChild(goalList)
    return weekLi
  }

  API.initialize = function(){
    API.setGoalFormData()
    if(typeof state.checkInDay != 'undefined'){
      API.updateCheckInDay();
      document.querySelector('#jsCheckInDiv button').click()
    }
    if(typeof state[currentMonth] != 'undefined'){
      API.renderCurrentGoals();
    }
  }
  return API
})()
console.log('render loaded')
function viewInitialize(){
  if(typeof state.checkInDay === 'undefined'){
    // do checkInDay prompt
    document.querySelector('#jsCheckInDiv').innerHTML = renderer.checkInDayPrompt()
    return
  }
  if(typeof state[currentMonth()]==='undefined'){
    // do set goals prompt
    return
  }
  if(setNextMonthsGoalsCheck()){
    //
    return
  }
}
