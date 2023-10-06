//create getName function, gets the user's name from input in html via document.getElementById
function getName() {
    let firstName = document.getElementById('firstName').value,
        middleInitial = document.getElementById('middleInitial').value,
        lastName = document.getElementById('lastName').value;


    //Greeting if else
    if (middleInitial !== '') {
        /*assign html id:greeting equal to old greeting with additional input firstName, lastName*/
        document.getElementById('greeting').innerHTML = "Welcome to Digital Dungeons," + " " + firstName + " " + middleInitial + "." + " " + lastName;
    }
    else {
        /*assign html id:greeting equal to old greeting with additional input firstName, middleInitial, lastName*/
        document.getElementById('greeting').innerHTML = "Welcome to Digital Dungeons," + " " + firstName + " " + lastName;
    };

    //create loop to output text lines 1-140
    //placeholder for loopOutput text from function
    let loopOutput = '';
    //start loop
    for (let counter = 1; counter <= 140; counter++) {
        if (counter % 3 == 0 && counter % 5 == 0) {
            loopOutput += `<p> ${counter}. Brawl Crawl</p>`;
        }
        else if (counter % 3 == 0) {
            loopOutput += `<p> ${counter}. Crawl</p>`;
        }
        else if (counter % 5 == 0) {
            loopOutput += `<p> ${counter}. Brawl</p>`;
        }
        else {
            loopOutput += `<p> ${counter}. Dungeon</p>`;
        }
    }
    //end loop
    //assign html id:loopText equal to loopOutput text from 'for' loop, with an Even or Odd statement
    document.getElementById('loopText').innerHTML = loopOutput;
}

//on submitButton click, run getName function
document.getElementById('submitButton').addEventListener('click', getName);

//create resetFunction
function resetPage() {
    document.getElementById('greeting').innerHTML = "Welcome to Digital Dungeons"; //reset html id:greeting in html to original text
    document.getElementById('loopText').innerHTML = ''; //reset html id:loopText, removing the 125 statements
}

//on resetButton click, reset the forms and loopOutput
document.getElementById('resetButton').addEventListener('click', resetPage);


/* Not In Use - part 1 saved code
  assign html id:greeting equal to old greeting with additional input firstName, middleInitial, lastName
  document.getElementById('greeting').innerHTML = "Welcome to Digital Dungeons," + " " + firstName + " " + middleInitial + "." + " " + lastName;


    //create output text lines, 1-125
    let loopOutput = '';
    for (let counter = 1; counter < 126; counter++) {
        loopOutput += `<p> ${counter}. Dungeon Crawl</p>`;
        console.log(counter + ". Dungeon Crawl");
        document.getElementById('loopText').innerHTML = loopOutput;
    };*/