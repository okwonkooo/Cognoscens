// https://source.unsplash.com/random/1280x1024
//will use onclick() for input on that button that's going to show the images

//We can add the resolution at the end of the url but we first have to find out whether the user is using a phone or not
var baseUnsplashedUrl = "https://source.unsplash.com/random/"
var unsplashedUrl = "";
//Checks whether the user is using a phone, using Mobi as instructed on MDN (https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent)
var phone = false;
function checkDevice(){
    if (/Mobi/.test(navigator.userAgent)) {
        phone = true;
    }
    return phone
}


function showImages(){
    //Makes the div that has the images, timer and text-boxes visible after the "circle-down" button is clicked
    document.getElementById("images").style.display = "block";
    
    //Getting the images themselves

    //If the user is using a phone, get images with the resolution 640x320, otherwise 1280x1024
    if(phone == true) {
        unsplashedUrl = baseUnsplashedUrl + "640x320";
    } else {
        unsplashedUrl = baseUnsplashedUrl + "1280x1024";
    }

    var img1, img2, img3; 
    var img1Child, img2Child, img3Child;
    img1 = document.createElement("img");
    img1.src=unsplashedUrl;
    img1Child = document.getElementById("img1");
    img1Child.appendChild(img1);

}

