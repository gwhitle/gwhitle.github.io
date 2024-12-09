//create getName function, gets the user's name from input in html via document.getElementById
function getName() {
    let firstName = document.getElementById('firstname').value,
        middleInitial = document.getElementById('middleinitial').value,
        lastName = document.getElementById('lastname').value;


    //Greeting if else
    if (middleInitial !== '') {
        /*assign html id:greeting equal to old greeting with additional input firstName, lastName*/
        document.getElementById('greeting').innerHTML = "Welcome to The Wyvern's Hoard," + " " + firstName + " " + middleInitial + "." + " " + lastName + "!";
    } else if (middleInitial === '' && firstName !== '' || lastName !== '') {
        /*assign html id:greeting equal to old greeting with additional input firstName, middleInitial, lastName*/
        document.getElementById('greeting').innerHTML = "Welcome to The Wyvern's Hoard," + " " + firstName + " " + lastName + "!";
    } else {
        document.getElementById('greeting').innerHTML = "Welcome to The Wyvern's Hoard";
    }

    //Divsor Function
    function checkDivision(counter, divisor) {
        return counter % divisor === 0;
    }

    //placeholder for loopOutput text from function
    let loopOutput = '';
    //divisors for checkDivision function
    const firstDivisor = document.getElementById('firstdivisor').value;
    const secondDivisor = document.getElementById('seconddivisor').value;
    const thirdDivisor = document.getElementById('thirddivisor').value;
    const defaultOutput = document.getElementById('defaultoutput').value;
    let counterLimit = document.getElementById('counttotal').value;
    let firstOutput = document.getElementById('firstdivisoroutput').value;
    let secondOutput = document.getElementById('seconddivisoroutput').value;
    let thirdOutput = document.getElementById('thirddivisoroutput').value;

    //create loop to output text lines 1-140, use function checkDivision
    for (let counter = 1; counter <= counterLimit; counter++) {
        if (checkDivision(counter, firstDivisor) && checkDivision(counter, secondDivisor) && checkDivision(counter, thirdDivisor)) {
            loopOutput += `<p> ${counter}. ${firstOutput} ${secondOutput} ${thirdOutput}</p>`;
        } else if (checkDivision(counter, firstDivisor) && checkDivision(counter, secondDivisor)) {
            loopOutput += `<p> ${counter}. ${firstOutput} ${secondOutput}</p>`;
        } else if (checkDivision(counter, firstDivisor)) {
            loopOutput += `<p> ${counter}. ${firstOutput}</p>`;
        } else if (checkDivision(counter, secondDivisor)) {
            loopOutput += `<p> ${counter}. ${secondOutput}</p>`;
        } else if (checkDivision(counter, thirdDivisor)) {
            loopOutput += `<p> ${counter}. ${thirdOutput}</p>`;
        } else {
            loopOutput += `<p> ${counter}. ${defaultOutput}</p>`;
        }
    }
    //end loop
    //assign html id:loopText equal to loopOutput text from 'for' loop, with an Even or Odd statement
    document.getElementById('looptext').innerHTML = loopOutput;
}

//on submitButton click, run getName function
document.getElementById('submitbutton').addEventListener('click', getName);

//create resetFunction
function resetPage() {
    document.getElementById('greeting').innerHTML = "Welcome to The Wyvern's Hoard"; //reset html id:greeting in html to original text
    document.getElementById('looptext').innerHTML = ''; //reset html id:loopText, removing the 125 statements
}

//on resetButton click, reset the forms and loopOutput
document.getElementById('resetbutton').addEventListener('click', resetPage);