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
    let li = document.createElement('li')
    li.classList.add('goal_field')

    const innerText = `
          Description <input type ='text' class='description' name='description'> <br>
          Plan <input type ='text' class='plan' name='plan'><br>
          Daily goal in minutes<input type ='number' class='nonZeroThreshold' name='nonZeroThreshold'>
          <button>Remove goal</button>
    `;
    li.innerHTML = innerText;
    console.log('making shit', li, innerText)
    return li
  }

  return API
})()
console.log('render loaded')
