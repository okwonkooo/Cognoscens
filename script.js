//We can add the resolution at the end of the url but we first have to find out whether the user is using a phone or not
const rawUnsplashedUrl = "https://source.unsplash.com/random";
const countdownminutes = 5;
let time = countdownminutes * 60; 
const countdownEl = document.getElementById("countdown");
var unsplashedUrl = "";

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
    function getImages() {
        // If the user is using a phone, get images with the resolution 350x75, otherwise 1280x1024. The date is there so that urls are different (otherwise it'll be stored in the cache and the images would repeat)
        var random = Math.floor(Math.random() * 10); // don't want 10 numbers to avoid adding making the resolution in the 1000's.
        if(phone == true) {
            console.log("PHONE!");
            var unsplashedUrl = rawUnsplashedUrl + "/" + "350x75" + random;
        } else {
            var unsplashedUrl = rawUnsplashedUrl + "/" + "1280x102" + random;
        }
        
        return unsplashedUrl;
    }

    // Countdown
    const timersDurationInMilliseconds = 1000 * 60 * 5; // for 5 minutes do: 1000 * 60 * 5

    // rendering initial timer content
    RenderTimer('countdown1', timersDurationInMilliseconds);
    RenderTimer('countdown2', timersDurationInMilliseconds);
    RenderTimer('countdown3', timersDurationInMilliseconds);

    //Start the countdown and then start the other ones
    countDown(timersDurationInMilliseconds, 'countdown1')
    .then(() => countDown(timersDurationInMilliseconds, 'countdown2'))
    .then(() => countDown(timersDurationInMilliseconds, 'countdown3'))
    .then(() => alert('All timers finished!'));


    // required functions
    function countDown(durationInMilliseconds, elementId) {
    return new Promise((resolve, reject) => {
        const updateFrequencyInMilliseconds = 10;
        const currentTimeInMilliseconds = new Date().getTime();
        const endTime = new Date(currentTimeInMilliseconds + durationInMilliseconds);
        
        function updateTimer(elementId) {
        let timeLeft = endTime - new Date();
        if (timeLeft > 0) {
            // We're not done yet!
            setTimeout(updateTimer, updateFrequencyInMilliseconds, elementId);
        } else {
            resolve();
            
            // depending on update frequency, timer may lag behind and stop few milliseconds too late
            // this will cause timeLeft to be less than 0
            // let's reset it back to 0, so it renders nicely on the page
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

    var img1, img2, img3; 
    var img1Child, img2Child, img3Child;
    img1 = document.createElement("img");
    img1.src=getImages();
    img1Child = document.getElementById("img1");
    img1Child.appendChild(img1);

    img2 = document.createElement("img");
    img2.src=getImages();
    img2Child = document.getElementById("img2");
    img2Child.appendChild(img2);

    img3 = document.createElement("img");
    img3.src=getImages();
    img3Child = document.getElementById("img3");
    img3Child.appendChild(img3);

}

