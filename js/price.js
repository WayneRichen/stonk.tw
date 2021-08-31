let price = 0;
let days = 0;
let max = 0;
let min = 0;
let nextPrice = 0;
const level = {'level1':{'unit':0.01, 'max':10, 'nextUnit':0.05}, 'level2':{'unit':0.05, 'max':50, 'nextUnit':0.1}, 'level3':{'unit':0.1, 'max':100, 'nextUnit':0.5}, 'level4':{'unit':0.5, 'max':500, 'nextUnit':1}, 'level5':{'unit':1, 'max':1000, 'nextUnit':5}, 'level6':{'unit':5}};
let arr = new Array();

function getUpList(cusStart, cusEnd, cusPrice, cusMin, cusMax){
    arr = [];
    arr.push(parseFloat(cusPrice, 10).toFixed(2))
    price = parseFloat(cusPrice);
    days = (new Date(cusEnd) - new Date(cusStart)) / 86400000;
    min = parseInt(cusMin);
    max = parseInt(cusMax);
    for (let index = 0; index < days; index++) {
        nextPriceApproximate = getNextPriceApproximate(price, "up");
        realNextPrice = getRealNextPrice(nextPriceApproximate, "up");
        arr.push(parseFloat(realNextPrice, 10).toFixed(2));
    }
    return arr;
}

function getDownList(cusStart, cusEnd, cusPrice, cusMin, cusMax){
    arr = [];
    arr.push(parseFloat(cusPrice, 10).toFixed(2))
    price = parseFloat(cusPrice);
    days = (new Date(cusEnd) - new Date(cusStart)) / 86400000;
    min = parseInt(cusMin);
    max = parseInt(cusMax);
    for (let index = 0; index < days; index++) {
        nextPriceApproximate = getNextPriceApproximate(price);
        realNextPrice = getRealNextPrice(nextPriceApproximate);
        arr.push(parseFloat(realNextPrice, 10).toFixed(2));
    }
    return arr;
}

function getNextPriceApproximate(price, upOrDown) {        
    let range = max - min + 1;
    rangePercent = Math.floor( Math.random() * range ) + min;
    
    if (upOrDown == "up"){
        return price + price * (rangePercent/100);
    }
    else {
        return price - price * (rangePercent/100);
    }
}

function getRealNextPrice(nextPriceApproximate, upOrDown){
    let realNextPrice = 0;
    if (nextPriceApproximate > 1000) {
        realNextPrice = upOrDown ? getUpRangePrice('level6', nextPriceApproximate) : getDownRangePrice('level6', nextPriceApproximate);
    } else if (nextPriceApproximate > 500){
        realNextPrice = upOrDown ? getUpRangePrice('level5', nextPriceApproximate) : getDownRangePrice('level5', nextPriceApproximate);
    } else if (nextPriceApproximate > 100){        
        realNextPrice = upOrDown ? getUpRangePrice('level4', nextPriceApproximate) : getDownRangePrice('level4', nextPriceApproximate);            
    } else if (nextPriceApproximate > 50){
        realNextPrice = upOrDown ? getUpRangePrice('level3', nextPriceApproximate) : getDownRangePrice('level3', nextPriceApproximate);
    } else if (nextPriceApproximate > 10){
        realNextPrice = upOrDown ? getUpRangePrice('level2', nextPriceApproximate) : getDownRangePrice('level2', nextPriceApproximate);
    } else{
        realNextPrice = upOrDown ? getUpRangePrice('level1', nextPriceApproximate) : getDownRangePrice('level1', nextPriceApproximate);
    }

    return realNextPrice;
}

function getUpRangePrice(levelNumber, nextPriceApproximate) {
    let rangePrice = new Array();
    for (let index = price; index <= nextPriceApproximate; index = accAdd(index, level[levelNumber]['unit'])) {                        
        if (index!=price && index > level[levelNumber]['max'] && !Number.isInteger(accDiv(index, level[levelNumber]['nextUnit']))) {                
            continue;
        }
        rangePrice.push(index);
    }
    price = rangePrice[rangePrice.length - 1];

    return rangePrice[rangePrice.length - 1];
}

function getDownRangePrice(levelNumber, nextPriceApproximate) {
    let rangePrice = new Array();
    for (let index = price; index >= nextPriceApproximate; index = accSubtr(index, level[levelNumber]['unit'])) {                        
        if (index!=price && index > level[levelNumber]['max'] && !Number.isInteger(accDiv(index, level[levelNumber]['nextUnit']))) {                
            continue;
        }
        rangePrice.push(index);
    }
    price = rangePrice[rangePrice.length - 1];

    return rangePrice[rangePrice.length - 1];
}