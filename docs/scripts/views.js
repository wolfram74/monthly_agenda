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

  API.emptyGoalField = function(){
    const firstLi = document.querySelector('.goals_input .goal_field')
    let newLi = firstLi.cloneNode(true);
    newLi.children.description.value = ''
    newLi.children.plan.value = ''
    newLi.children.nonZeroThreshold.value = ''
    return newLi
  }

  return API
})()
console.log('render loaded')
