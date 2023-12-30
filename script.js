const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown = document.querySelectorAll('.dropdown select')
const btn = document.querySelector('form button')
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')
const loader = document.getElementsByClassName('loader')[0]
const mainBox = document.querySelector('.container')

window.addEventListener("load", () => {
    updateExchangeValue()
})

for(let select of dropdown){
    for (currCode in countryList)
{
    let newOption = document.createElement('option')
    newOption.innerText = currCode
    newOption.value = currCode
    if(select.name == 'from' && currCode == 'USD'){
        newOption.selected='selected'
    }else if(select.name == 'to' && currCode == 'INR'){
        newOption.selected='selected'
    }
    select.appendChild(newOption)
}
select.addEventListener('change', (event) => {
    updateFlag(event.target)
})
}

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let imgFlag = element.parentElement.querySelector('img')
    imgFlag.src = newSrc
}

btn.addEventListener("click", (event) => {
    event.preventDefault()
    updateExchangeValue()
})
const updateExchangeValue = async () => {
    let amount = document.querySelector('.amount input')
    let amtval = amount.value
    if(amtval == "" || amtval < 1){
        amtval = 1
        amount.value = "1"
    }

    console.log(fromCurr)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    loader.style.display = 'block'
    mainBox.style.display = 'none'
    let response = await fetch(URL)
    let data = await response.json()
    mainBox.style.display = 'block'
    loader.style.display = 'none'
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = amtval*rate
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}