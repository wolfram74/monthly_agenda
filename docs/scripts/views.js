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
  return API
})()
console.log('render loaded')
