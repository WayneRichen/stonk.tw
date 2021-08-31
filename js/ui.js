const btn = document.querySelector("button.more-button");
const blankArea = document.querySelector("div.blankArea");
const menu = document.querySelector(".more-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

blankArea.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

const aboutLink = document.querySelector('#aboutLink');
const aboutLinkMobile = document.querySelector('#aboutLinkMobile');
const about = document.querySelector('#about');

aboutLink.addEventListener("click", ()=>{
    about.scrollIntoView({ behavior: "smooth"});
}, false);

aboutLinkMobile.addEventListener("click", ()=>{
    about.scrollIntoView({ behavior: "smooth"});
    menu.classList.toggle("hidden");
}, false);

const upLink = document.querySelector('#upLink');
const upLinkMobile = document.querySelector('#upLinkMobile');
const up = document.querySelector('#up');
const upMobile = document.querySelector('#upMobile');    

upLink.addEventListener("click", ()=>{
    up.scrollIntoView({ behavior: "smooth"});
}, false);

upLinkMobile.addEventListener("click", ()=>{
    upMobile.scrollIntoView({ behavior: "smooth"});
    menu.classList.toggle("hidden");
}, false);

const downLink = document.querySelector('#downLink');
const downLinkMobile = document.querySelector('#downLinkMobile');
const down = document.querySelector('#down');

downLink.addEventListener("click", ()=>{
    down.scrollIntoView({ behavior: "smooth"});
}, false);

downLinkMobile.addEventListener("click", ()=>{
    down.scrollIntoView({ behavior: "smooth"});
    menu.classList.toggle("hidden");
}, false);

const faqLink = document.querySelector('#faqLink');
const faqLinkMobile = document.querySelector('#faqLinkMobile');
const faq = document.querySelector('#faq');

faqLink.addEventListener("click", ()=>{
    faq.scrollIntoView({ behavior: "smooth"});
}, false);

faqLinkMobile.addEventListener("click", ()=>{
    faq.scrollIntoView({ behavior: "smooth"});
    menu.classList.toggle("hidden");
}, false);

const startButton = document.querySelectorAll("#startButton");
startButton[0].addEventListener("click", ()=>{
    up.scrollIntoView({ behavior: "smooth"});
}, false);
startButton[1].addEventListener("click", ()=>{
    up.scrollIntoView({ behavior: "smooth"});
}, false);

const startButtonMobile = document.querySelector("#startButtonMobile");
startButtonMobile.addEventListener("click", ()=>{
    upMobile.scrollIntoView({ behavior: "smooth"});
}, false);

const home = document.querySelector("#home");
home.addEventListener("click", ()=>{
    document.body.scrollIntoView({ behavior: "smooth"});
}, false);

const upMinPercent = document.querySelector('input.up-min-percent');
const upMaxPercent = document.querySelector('input.up-max-percent');
const downMinPercent = document.querySelector('input.down-min-percent');
const downMaxPercent = document.querySelector('input.down-max-percent');
upMinPercent.addEventListener('input', tenPercent);
upMaxPercent.addEventListener('input', tenPercent);
downMinPercent.addEventListener('input', tenPercent);
downMaxPercent.addEventListener('input', tenPercent);
function tenPercent(){
    if (this.value > 10){
        this.value = 10;
    } else if (this.value < 0){
        this.value = 0;
    }
}
document.querySelector('input.up-price').addEventListener('input', priceRange);
document.querySelector('input.down-price').addEventListener('input', priceRange);
function priceRange(){
    if (this.value.length > 4) {
        this.value = this.value.slice(0,5);
    }
}

const upTitle = document.querySelector('input.up-title');
const downTitle = document.querySelector('input.down-title');
const upStartDate = document.querySelector('input.up-start-date');
const upEndDate = document.querySelector('input.up-end-date');
const upPrice = document.querySelector('input.up-price');
const downPrice = document.querySelector('input.down-price');
const downStartDate = document.querySelector('input.down-start-date');
const downEndDate = document.querySelector('input.down-end-date');
const today = new Date().toISOString().slice(0,10);
upStartDate.value = today;
upStartDate.min = today;
upEndDate.min = today;
upEndDate.max = new Date(new Date(upStartDate.value).setDate(new Date(upStartDate.value).getDate() + 30)).toISOString().slice(0,10);;
downStartDate.value = today;
downStartDate.min = today;
downEndDate.min = today;
downEndDate.max = new Date(new Date(upStartDate.value).setDate(new Date(upStartDate.value).getDate() + 30)).toISOString().slice(0,10);
upStartDate.addEventListener('input', ()=>{
    upEndDate.max = new Date(new Date(upStartDate.value).setDate(new Date(upStartDate.value).getDate() + 30)).toISOString().slice(0,10);
    upEndDate.min = upStartDate.value;
    if (upEndDate.value > upEndDate.max) upEndDate.value = upEndDate.max;
    if (upEndDate.value < upEndDate.min) upEndDate.value = upEndDate.min;
    
});
downStartDate.addEventListener('input', ()=>{
    downEndDate.max = new Date(new Date(downStartDate.value).setDate(new Date(downStartDate.value).getDate() + 30)).toISOString().slice(0,10);
    downEndDate.min = downStartDate.value;
    if (downEndDate.value > downEndDate.max) downEndDate.value = downEndDate.max;
    if (downEndDate.value < downEndDate.min) downEndDate.value = downEndDate.min;
});

const closeButton = document.querySelector('button.close-button');
const xButton = document.querySelector('button.x-button');
const popupWindowBackground = document.querySelector('div.popup-window-background');
const popupWindow = document.querySelector('div.popup-window');

closeButton.addEventListener('click',()=>{
    popupWindowBackground.classList.toggle('hidden');
    popupWindow.classList.toggle('hidden');
    document.querySelector('div.loader').classList.toggle('hidden');
});

xButton.addEventListener('click',()=>{
    popupWindowBackground.classList.toggle('hidden');
    popupWindow.classList.toggle('hidden');
    document.querySelector('div.loader').classList.toggle('hidden');
});

const generateUp = document.querySelector('button.generate-up');
const generateDown = document.querySelector('button.generate-down');

const result = document.querySelector('div.result');
generateUp.addEventListener('click',()=>{
    let valid = validUpData();
    if (valid == false){
        return;
    }
    popupWindowBackground.classList.toggle('hidden');
    result.innerHTML = "";
    let html = ""
    let priceList = getUpList(upStartDate.value, upEndDate.value, upPrice.value, upMinPercent.value, upMaxPercent.value);
    let cusStartDate = new Date(upStartDate.value + "T00:00:00");
    let cusEndDate = new Date(upEndDate.value + "T00:00:00");
    let calFirstDay = new Date(cusStartDate.getFullYear(), cusStartDate.getMonth(), 1);
    if (calFirstDay.getDay() != 0){
        calFirstDay = new Date(calFirstDay.setDate(calFirstDay.getDate() - calFirstDay.getDay()));
    }

    let calEndDay = new Date(cusEndDate.getFullYear(), cusEndDate.getMonth() + 1, 0);
    if (calEndDay.getDay() != 6){
        calEndDay = new Date(calEndDay.setDate(calEndDay.getDate() + (6 - calEndDay.getDay())));
    }
    let i = 0;
    html += "<p class='text-base md:text-lg text-gray-700 pt-6 pb-1 md:pt-0'>" + cusStartDate.getFullYear() + " 年 " + (cusStartDate.getMonth() + 1) + " 月 </p>";
    html += '<div class="w-full bg-red-500 flex justify-center text-white text-base font-bold md:text-2xl py-0 md:py-1">' + upTitle.value + '</div>';
    html += "<div class='grid grid-cols-7 max-w-screen-md'>";
    let weekday = ["日","一","二","三","四","五","六"];
    for (let index = 0; index < weekday.length; index++) {
        html += "<div class='flex justify-end p-1 text-gray-700 text-sm md:text-lg'>" + weekday[index] + "</div>";
    }
    for (let index = calFirstDay; index <= calEndDay; index.setDate(index.getDate() + 1)) {
        if ((index.getMonth() >= cusStartDate.getMonth() && index.getMonth() <= cusEndDate.getMonth()) || index.getMonth() == cusEndDate.getMonth()){
            if (index.getDay() == 6 || index.getDay() == 0 || index < cusStartDate || index > cusEndDate){
                html += '<div class="relative w-full h-12 md:h-16 border flex justify-center">';
                html += '<div class="absolute right-0 top-0 text-sm md:text-lg px-1">' + index.getDate() + '</div>';            
                html += "</div>";                
            } else {
                html += '<div class="relative w-full h-full border flex justify-center">';
                html += '<div class="absolute right-0 top-0 text-sm md:text-lg px-1">' + index.getDate() + '</div>';
                html += priceList[i] == priceList[i-1] ? '<div class="text-sm md:text-2xl pt-4 pb-0 md:pb-3 text-yellow-300">' + priceList[i] + '</div>' : '<div class="text-sm md:text-2xl pt-4 pb-0 md:pb-3 text-red-500">' + priceList[i] + '</div>';
                html += "</div>";
                i++;
            }        
        } else{
                html += '<div class="relative w-full h-full border flex justify-center">';
                html += '<div class="absolute right-0 top-0 text-sm md:text-lg px-1 text-gray-400">' + index.getDate() + '</div>';
                html += "</div>";
        }
    }
    html += "</div>";
    result.innerHTML = html;
    setTimeout(() => {  popupWindow.classList.toggle('hidden'); document.querySelector('div.loader').classList.toggle('hidden');  }, 1000);
    
});

function validUpData(){
    let valid = true;
    if (upTitle.value == "" || upStartDate.value == "" || upEndDate.value == "" || upPrice.value == "" || upMaxPercent.value == "" || upMinPercent.value == "") valid = false;
    if (upTitle.value == "" ) document.querySelector('label.up-title-tip').classList.remove('hidden');
    if (upStartDate.value == "") document.querySelector('label.up-start-date-tip').classList.remove('hidden');
    if (upEndDate.value == "") document.querySelector('label.up-end-date-tip ').classList.remove('hidden');
    if (upPrice.value == "") document.querySelector('label.up-price-tip ').classList.remove('hidden');
    if (upMinPercent.value == "" || upMaxPercent.value == "") document.querySelector('label.up-percent-tip').classList.remove('hidden');

    return valid;
}

upTitle.addEventListener('change', ()=>{
    if (upTitle.value != "" ) document.querySelector('label.up-title-tip').classList.add('hidden');
});

upStartDate.addEventListener('change', ()=>{
    if (upStartDate.value != "" ) document.querySelector('label.up-start-date-tip').classList.add('hidden');
});

upEndDate.addEventListener('change', ()=>{
    if (upEndDate.value != "" ) document.querySelector('label.up-end-date-tip').classList.add('hidden');
});

upPrice.addEventListener('change', ()=>{
    if (upPrice.value != "" ) document.querySelector('label.up-price-tip').classList.add('hidden');
});

upMinPercent.addEventListener('change', ()=>{
    if (upMinPercent.value != "" && upMaxPercent.value != "") document.querySelector('label.up-percent-tip').classList.add('hidden');
});

upMaxPercent.addEventListener('change', ()=>{
    if (upMinPercent.value != "" && upMaxPercent.value != "") document.querySelector('label.up-percent-tip').classList.add('hidden');
});

generateDown.addEventListener('click',()=>{
    let valid = validDownData();
    if (valid == false){
        return;
    }
    popupWindowBackground.classList.toggle('hidden');
    result.innerHTML = "";
    let html = ""
    let priceList = getDownList(downStartDate.value, downEndDate.value, downPrice.value, downMinPercent.value, downMaxPercent.value);
    let cusStartDate = new Date(downStartDate.value + "T00:00:00");
    let cusEndDate = new Date(downEndDate.value + "T00:00:00");
    let calFirstDay = new Date(cusStartDate.getFullYear(), cusStartDate.getMonth(), 1);
    if (calFirstDay.getDay() != 0){
        calFirstDay = new Date(calFirstDay.setDate(calFirstDay.getDate() - calFirstDay.getDay()));
    }

    let calEndDay = new Date(cusEndDate.getFullYear(), cusEndDate.getMonth() + 1, 0);
    if (calEndDay.getDay() != 6){
        calEndDay = new Date(calEndDay.setDate(calEndDay.getDate() + (6 - calEndDay.getDay())));
    }
    let i = 0;
    html += "<p class='text-base md:text-lg text-gray-700 pt-6 pb-1 md:pt-0'>" + cusStartDate.getFullYear() + " 年 " + (cusStartDate.getMonth() + 1) + " 月 </p>";
    html += '<div class="w-full bg-green-500 flex justify-center text-white text-base font-bold md:text-2xl py-0 md:py-1">' + downTitle.value + '</div>';
    html += "<div class='grid grid-cols-7 max-w-screen-md'>";
    let weekday = ["日","一","二","三","四","五","六"];
    for (let index = 0; index < weekday.length; index++) {
        html += "<div class='flex justify-end p-1 pt-2 text-gray-700 text-sm md:text-lg'>" + weekday[index] + "</div>";
    }
    for (let index = calFirstDay; index <= calEndDay; index.setDate(index.getDate() + 1)) {
        if ((index.getMonth() >= cusStartDate.getMonth() && index.getMonth() <= cusEndDate.getMonth()) || index.getMonth() == cusEndDate.getMonth()){
            if (index.getDay() == 6 || index.getDay() == 0 || index < cusStartDate || index > cusEndDate){
                html += '<div class="relative w-full h-12 md:h-16 border flex justify-center">';
                html += '<div class="absolute right-0 top-0 text-sm md:text-lg px-1">' + index.getDate() + '</div>';            
                html += "</div>";                
            } else {
                html += '<div class="relative w-full h-full border flex justify-center">';
                html += '<div class="absolute right-0 top-0 text-sm md:text-lg px-1">' + index.getDate() + '</div>';
                html += priceList[i] == priceList[i-1] ? '<div class="text-sm md:text-2xl pt-4 pb-0 md:pb-3 text-yellow-300">' + priceList[i] + '</div>' : '<div class="text-sm md:text-2xl pt-4 pb-0 md:pb-3 text-green-500">' + priceList[i] + '</div>';
                html += "</div>";
                i++;
            }        
        } else{
                html += '<div class="relative w-full h-full border flex justify-center">';
                html += '<div class="absolute right-0 top-0 text-sm md:text-lg px-1 text-gray-400">' + index.getDate() + '</div>';
                html += "</div>";
        }
    }
    html += "</div>";
    result.innerHTML = html;
    setTimeout(() => {  popupWindow.classList.toggle('hidden'); document.querySelector('div.loader').classList.toggle('hidden');}, 1000);
});

function validDownData(){
    let valid = true;
    if (downTitle.value == "" || downStartDate.value == "" || downEndDate.value == "" || downPrice.value == "" || downMaxPercent.value == "" || downMinPercent.value == "") valid = false;
    if (downTitle.value == "" ) document.querySelector('label.down-title-tip').classList.remove('hidden');
    if (downStartDate.value == "") document.querySelector('label.down-start-date-tip').classList.remove('hidden');
    if (downEndDate.value == "") document.querySelector('label.down-end-date-tip ').classList.remove('hidden');
    if (downPrice.value == "") document.querySelector('label.down-price-tip ').classList.remove('hidden');
    if (downMinPercent.value == "" || downMaxPercent.value == "") document.querySelector('label.down-percent-tip').classList.remove('hidden');

    return valid;
}

downTitle.addEventListener('change', ()=>{
    if (downTitle.value != "" ) document.querySelector('label.down-title-tip').classList.add('hidden');
});

downStartDate.addEventListener('change', ()=>{
    if (downStartDate.value != "" ) document.querySelector('label.down-start-date-tip').classList.add('hidden');
});

downEndDate.addEventListener('change', ()=>{
    if (downEndDate.value != "" ) document.querySelector('label.down-end-date-tip').classList.add('hidden');
});

downPrice.addEventListener('change', ()=>{
    if (downPrice.value != "" ) document.querySelector('label.down-price-tip').classList.add('hidden');
});

downMinPercent.addEventListener('change', ()=>{
    if (downMinPercent.value != "" && downMaxPercent.value != "") document.querySelector('label.down-percent-tip').classList.add('hidden');
});

downMaxPercent.addEventListener('change', ()=>{
    if (downMinPercent.value != "" && downMaxPercent.value != "") document.querySelector('label.down-percent-tip').classList.add('hidden');
});