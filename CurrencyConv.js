const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".Dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");

const msg = document.querySelector(".Msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if (select.name === "From" && currCode === "USD") newOpt.selected = true;
        if (select.name === "To" && currCode === "INR") newOpt.selected = true;
        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (Element) => {
    let currCode = Element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    Element.parentElement.querySelector("img").src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let Amount = document.querySelector(".Amount input").value;
    //let AmtVal = document.querySelector(".Amount input").value;
    if(Amount === "" || Amount < 1 ){
        Amount = 1;
        document.querySelector(".Amount input").value ="1";
    }

    //console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let Result = await fetch(URL);
    let Data = await Result.json();
    let Rate = Data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(Rate);

    let FinalAm = Amount * Rate;
    msg.innerText = `${Amount} ${fromCurr.value} = ${FinalAm} ${toCurr.value}`;


});