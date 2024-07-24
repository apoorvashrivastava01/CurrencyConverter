const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/inr.json";
const dropdowns = document.querySelectorAll(".dropdown select") ;
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if(select.name == "from" && currCode == "USD"){
        newOption.selected = "selected";
    } else if(select.name == "to" && currCode == "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

//change flag of countries//
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

//Get exchange rate//
btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); //it will not change by default on refreshing
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    async function fetchCurrencyData() {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`);
        const data = await response.json();
        return data;
    }
    function currencyConversion(data) {
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
   }
   fetchCurrencyData().then(data => currencyConversion(data));
   }); 