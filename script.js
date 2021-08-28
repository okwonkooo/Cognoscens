//We can add the resolution at the end of the url but we first have to find out whether the user is using a phone or not
const rawUnsplashedUrl = "https://source.unsplash.com";
const countdownEl = document.getElementById("countdown");
var unsplashedUrl = "";
var themes = [
    // Identities
    "personal-attributes",    
    "personal-relationships",
    "relationships",
    "eating",
    "drinking",
    "well-being",

    // Experiences
    "daily-routine",
    "leisure", 
    "holidays",
    "festivals",
    "celebrations",

    // Human ingenuity
    "transport",
    "entertainment",
    "media",
    "technology",

    // Social organization
    "neighbourhood", 
    "education", 
    "workplace", 
    "social-issues",

    // Sharing the Planet
    "climate", 
    "geography", 
    "environment", 
    "global-issues"
]

// length is 23

function randomTheme() {
    var number = Math.floor(Math.random() * 23) + 1; 
    return themes[number]
}

function showImages(){
    //Checks whether the user is using a phone, using Mobi as instructed on MDN (https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent)
    var phone = false;
    function checkDevice(){
    if (/Mobi/.test(navigator.userAgent)) {
        phone = true;
    }
    return phone
    }
    checkDevice();
    //Makes the div that has the images, timer and text-boxes visible after the "circle-down" button is clicked
    document.getElementById("images").style.display = "block";
    
    //Getting the images themselves
    function getImages(x) {
        // If the user is using a phone, get images with the resolution 350x75, otherwise 950x750. The date is there so that urls are different (otherwise it'll be stored in the cache and the images would repeat)
        if(phone == true) {
            var unsplashedUrl = rawUnsplashedUrl + "/" + "350x75" + x + "/?" + randomTheme();
        } else {
            var unsplashedUrl = rawUnsplashedUrl + "/" + "950x75" + x + "/?" + randomTheme();
        }
        
        return unsplashedUrl;
    }

    // Countdown
    const timersDurationInMilliseconds = 1000 * 60 * 5; 

    // Rendering initial timer content
    RenderTimer('countdown1', timersDurationInMilliseconds);
    RenderTimer('countdown2', timersDurationInMilliseconds);
    RenderTimer('countdown3', timersDurationInMilliseconds);

    // Start the countdown and then start the other ones
    countDown(timersDurationInMilliseconds, 'countdown1')
    .then(() => countDown(timersDurationInMilliseconds, 'countdown2'))
    .then(() => countDown(timersDurationInMilliseconds, 'countdown3'))
    .then(() => alert('All timers finished!'));


    // Required functions
    function countDown(durationInMilliseconds, elementId) {
    return new Promise((resolve, reject) => {
        const updateFrequencyInMilliseconds = 10;
        const currentTimeInMilliseconds = new Date().getTime();
        const endTime = new Date(currentTimeInMilliseconds + durationInMilliseconds);
        
        function updateTimer(elementId) {
        var timeLeft = endTime - new Date();
        if (timeLeft > 0) {
            setTimeout(updateTimer, updateFrequencyInMilliseconds, elementId);
        } else {
            resolve();
           // The timer may lag behind and stop a couple of milliseconds too late because of update frequency. timeLeft is set back to 0 to avoid this 
            timeLeft = 0;
        }
        
        RenderTimer(elementId, timeLeft);
        }

        updateTimer(elementId);
    });
    }

    function padNumber(number, length) {
    return new String(number).padStart(length || 2, '0'); // adds leading zero when needed
    }

    function RenderTimer(elementId, timeLeft) {
    const hoursLeft = Math.floor(timeLeft / 1000 / 60 / 60 % 60);
    const minutesLeft = Math.floor(timeLeft / 1000 / 60 % 60);
    const secondsLeft = Math.floor(timeLeft / 1000 % 60);
    const millisecondsLeft = timeLeft % 1000;

    const counterElement = document.getElementById(elementId);
    counterElement.innerHTML = `${padNumber(minutesLeft)}:${padNumber(secondsLeft)}`;
    }

    // Making the image elements and making their source equal to the result of getImages()
    var img1, img2, img3; 
    var img1Child, img2Child, img3Child;
    img1 = document.createElement("img");
    img1.src=getImages(1);
    img1Child = document.getElementById("img1");
    img1Child.appendChild(img1);

    img2 = document.createElement("img");
    img2.src=getImages(2);
    img2Child = document.getElementById("img2");
    img2Child.appendChild(img2);

    img3 = document.createElement("img");
    img3.src=getImages(3);
    img3Child = document.getElementById("img3");
    img3Child.appendChild(img3);

    // Removing the button with an arrow pointing downwards so that the user can't click it anymore
    document.getElementById("buttonDown").remove();
    // Making the reload button visible so that the user can restart the program
    document.getElementById("spinner").style.visibility="visible";    

}

// Reloads the website once the restart button is clicked
function reload() { 
    location.reload();
    return false; // requirement for refershing after an onclick event since location.reload() provides no return value
}
