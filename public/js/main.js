const keyboardList = [
    {type:'command',value:'clear',label:'C'},
    {type:'command',value:'toggle-minus',label:'+/-'},
    {type:'command',value:'percentage',label:'%'},
    {type:'operation',value:'division',label:'÷'},
    {type:'number',value:'7',label:'7'},
    {type:'number',value:'8',label:'8'},
    {type:'number',value:'9',label:'9'},
    {type:'operation',value:'multiple',label:'×'},
    {type:'number',value:'4',label:'4'},
    {type:'number',value:'5',label:'5'},
    {type:'number',value:'6',label:'6'},
    {type:'operation',value:'minus',label:'-'},
    {type:'number',value:'1',label:'1'},
    {type:'number',value:'2',label:'2'},
    {type:'number',value:'3',label:'3'},
    {type:'operation',value:'plus',label:'+'},
    {type:'number',value:'0',label:'0'},
    {type:'command',value:'.',label:'.'},
    {type:'command',value:'equal',label:'='},
]

const keyboardElement = document.querySelector('#keyboard-area')
let lastNumber = 0;
let operationNumber = 0;
let lastOperation = '';
let isLastKeyOperation = false;
buildKeyboard()
function buildKeyboard(){
    keyboardList.forEach(item=>{
        const element = document.createElement('div')
        element.dataset.type = item.type
        element.dataset.value = item.value
        element.classList.add('key')
        element.classList.add(item.value)
        element.textContent = item.label
        element.addEventListener('click',clickkey)
        keyboardElement.appendChild(element)
    })
}
function clickkey(e) { 
    const dataset = e.target.dataset
    switch (dataset.type) {
        case 'command':
            handleCommand(dataset.value);
            break;
        case 'operation':
            handleOperation(dataset.value);
            break;
        case 'number':
            handleNumber(dataset.value);
            break;
        default:
            throw new Error('当前类型不存在！')
    }
}

const resultElement = document.querySelector('#result')
function handleCommand(value) { 
    switch(value){
        case 'clear': clear();break;
        case 'toggle-minus' : resultElement.textContent = - Number.
        parseFloat(resultElement.textContent);break
        case 'percentage' : resultElement.textContent = Number.parseFloat
        (resultElement.textContent)/100;break
        case '.' : resultElement.textContent.indexOf('.') !== -1 || 
        (resultElement.textContent += '.'); break;
        case 'equal':calculate() ;break;
        default:throw new Error('命名不存在！');
        
    }
}
function clear(){
    resultElement.textContent = '0';
    lastNumber = 0;
    operationNumber = 0;
    lastOperation = '';
    isLastKeyOperation = false;
}
function handleNumber(value) { 
    if (resultElement.textContent === '0' || isLastKeyOperation ) {
        resultElement.textContent = value;
        isLastKeyOperation = false
    } else{
        resultElement.textContent += value;
    }
    operationNumber = Number.parseFloat(resultElement.textContent)
}
function handleOperation(value) { 
    if (lastNumber !== 0 && operationNumber !==0) {
        calculate()
    }
    lastNumber = Number.parseFloat(resultElement.textContent)
    lastOperation = value
    isLastKeyOperation = true
}
function calculate(){
    let result = ''
    switch(lastOperation){
        case 'plus' : result = lastNumber + operationNumber;break; 
        case 'minus' : result = lastNumber - operationNumber;break;
        case 'multiple' : result = lastNumber * operationNumber;break;
        case 'division' : result = lastNumber / operationNumber;break;
        default: throw new Error("操作不存在");
    }
    resultElement.textContent = result
    lastNumber = result
}