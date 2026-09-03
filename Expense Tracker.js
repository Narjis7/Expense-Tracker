const title=document.querySelector(".title input")
const Mtitle=document.querySelector(".title span")
const amount=document.querySelector(".amount input")
const Mamount=document.querySelector(".amount div")
const type=document.querySelector(".type select")
const category=document.querySelector(".category select")
const butt=document.querySelector(".add button")
const last=document.querySelector(".last")
const income=document.querySelector(".income h1")
const search=document.querySelector(".search input")
const expense=document.querySelector(".expen h1")
const balance=document.querySelector(".balance h1")
const selectExpense=document.querySelector(".select #exp")
const selectIncome=document.querySelector(".select #inc")
const selectAll=document.querySelector(".select #all")
const empty=document.querySelector("#empty")
const darkMode=document.querySelector(".dark-mode img")
const body=document.querySelector("body")
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const h1 = document.createElement("h1");
     if (income && expense && balance) {
           updateIncome();
           updateExpense();
           updateBalance();
              }
    if (butt) {
        
butt.addEventListener("click",function(){
    
const time= new Date();    
let id=Date.now();
let hour=time.getHours();
const period = hour >= 12 ? "PM" : "AM";
if (hour === 0) {
    hour = 12;
} else if (hour > 12) {
    hour = hour - 12;
}
if(title.value!=""&&amount.value!=""){
    if(type.value === "expense"){
    h1.textContent=`-$${amount.value}`;
    h1.style.color="#BA1A1A";

}
else if(type.value === "income"){
    h1.textContent=`+$${amount.value}`;
    h1.style.color="#006C49";

}

last.insertAdjacentHTML("afterbegin",`<div class="item" data-id="${id}">
                <div><div class="img"><img src="icons/${category.value}.png"></div>
                
                <h2>${title.value}
                    <p>${category.value} • <span>${time.toDateString()} , ${String(hour)}:${String(time.getMinutes()).padStart(2, "0")} ${period} </span></p></h2></div>
              <div class="item-type">${h1.outerHTML}<img src="icons/${type.value}delete.png"></div> 
               
               </div>`);
   
    expenses.push({
    id:id,
    title: title.value,
    amount: amount.value,
    type: type.value,
    category: category.value,
    time: time.toDateString(),
    hour:hour.toString(),
    minutes:String(time.getMinutes()).padStart(2, "0"),
    period:period.toString()});
    localStorage.setItem("expenses", JSON.stringify(expenses));
        if (income && expense && balance) {
           updateIncome();
           updateExpense();
           updateBalance();
              }
               title.value="";
               amount.value="";
               type.value="expense";
               category.value="food";   
    emptyTransactin();
}
else{
    title.style.cssText="outline: 2px solid #e73232"
    amount.style.cssText="outline: 2px solid #e73232"
    title.addEventListener("input",function(){
    title.style.cssText="border: 1px solid #C4C7C7;";
    amount.style.cssText="border: 1px solid #C4C7C7;";
    })
    amount.addEventListener("input",function(){
    title.style.cssText="border: 1px solid #C4C7C7;";
    amount.style.cssText="border: 1px solid #C4C7C7;";
    })
}
}); 
}     


       expenses.forEach(expens => {
        if (expens.type === "expense") {
        h1.textContent = `-$${expens.amount}`;
        h1.style.color = "#BA1A1A";
       
        } else if (expens.type === "income") {
        h1.textContent = `+$${expens.amount}`;
        h1.style.color = "#006C49";
        
        }

        last.insertAdjacentHTML(
        "afterbegin",
        `<div class="item" data-id="${expens.id}" >
            <div>
                <div class="img"><img src="icons/${expens.category}.png"></div>
                <h2>${expens.title}
                    <p>${expens.category} • <span>${expens.time} , ${expens.hour}:${expens.minutes} ${expens.period}</span></p>
                </h2>
            </div>
            <div class="item-type">${h1.outerHTML}<img src="icons/${expens.type}delete.png"></div>
        </div>`
    );
  
   if (income && expense && balance) {
           updateIncome();
           updateExpense();
           updateBalance();
              }
}); 

      
last.addEventListener("click", function (e) {

    if (e.target.matches(".item-type img")) {

        const item = e.target.closest(".item");

        const id = Number(item.dataset.id);

        expenses = expenses.filter(function (expense) {
            return expense.id !== id;
        });

        localStorage.setItem("expenses", JSON.stringify(expenses));

        item.remove();

        if (income && expense && balance) {
            updateIncome();
            updateExpense();
            updateBalance();
        }
    }
emptyTransactin();
});
function updateIncome() {
    let totalIncome = 0;

    expenses.forEach(expense => {
    

        if (expense.type === "income") {
            totalIncome += Number(expense.amount);
        }
    });

    

    income.textContent = `+$${totalIncome.toFixed(2)}`;
    return totalIncome;
}

function updateExpense() {
    let totalExpense = 0;

    expenses.forEach(expense => {
    

        if (expense.type === "expense") {
            totalExpense += Number(expense.amount);
        }
    });

    

    expense.textContent = `-$${totalExpense.toFixed(2)}`;
    return totalExpense;
}
function updateBalance() {
    let totalBalance = 0;

    totalBalance=updateIncome()-updateExpense();

    balance.textContent = `$${totalBalance.toFixed(2)}`;
}
search.addEventListener("input", function () {
    const filter = search.value.toLowerCase();
    const items = last.querySelectorAll(".item");

    items.forEach(function (item) {

        const id = Number(item.dataset.id);

        const currentExpense = expenses.find(function (expense) {
            return expense.id === id;
        });

        const title = currentExpense.title.toLowerCase();
        const category = currentExpense.category.toLowerCase();

        if (
            title.includes(filter) ||
            category.includes(filter)
        ) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});
selectExpense.addEventListener("click",function(){
     const items = last.querySelectorAll(".item");
     selectExpense.style.cssText=" background-color: #fff;border: 1px solid #C4C7C7;border-radius: 6px;";
     selectAll.style.cssText=" background-color: transparent;border: none;";
     selectIncome.style.cssText=" background-color: transparent; border:none;";
  items.forEach(function (item) {

    const id = Number(item.dataset.id);

    const currentExpense = expenses.find(function (expense) {
        return expense.id === id;
    });

    if (currentExpense.type === "expense") {
        item.style.display = "";
    } else {
        item.style.display = "none";
    }
});
})
selectIncome.addEventListener("click",function(){
     const items = last.querySelectorAll(".item");
     selectIncome.style.cssText=" background-color: #fff;border: 1px solid #C4C7C7;border-radius: 6px;";
     selectAll.style.cssText="background-color: transparent; border:none;";
     selectExpense.style.cssText=" background-color: transparent; border:none;";
   items.forEach(function (item) {

    const id = Number(item.dataset.id);

    const currentExpense = expenses.find(function (expense) {
        return expense.id === id;
    });

    if (currentExpense.type === "income") {
        item.style.display = "";
    } else {
        item.style.display = "none";
    }
});
})
selectAll.addEventListener("click",function(){
    selectAll.style.cssText=" background-color: #fff;border: 1px solid #C4C7C7;border-radius: 6px;";
    selectExpense.style.cssText=" background-color: transparent; border:none;";
    selectIncome.style.cssText=" background-color: transparent; border:none;";
    const items = last.querySelectorAll(".item");
      items.forEach(function (item) {
       
            item.style.display = "";
            
        
    });
})
function emptyTransactin(){
  const index = Array.from(last.children);
if(index.length!==0){
    empty.style.display="none";
     } 
    else{
        empty.style.display=""; 
     }
}
emptyTransactin();
const item=document.querySelector(".last .item")
darkMode.addEventListener("click",function(){
     
    if(body.classList.contains("dark")){
        body.classList.remove("dark")
        
        darkMode.src="icons/moon.png"
        localStorage.setItem("darkMode", "false");
    }
    
    else{
        body.classList.add("dark")
        darkMode.src="icons/light.png"
        localStorage.setItem("darkMode", "true");
    }
   
});
if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark");
    item.classList.add("dark")
    darkMode.src="icons/light.png";
}
