const photo = document.querySelector('.photo');
const photoClicking = document.querySelector('.Photo_clicking');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let velocity = 0;
let momentumActive = false;
const images = document.querySelectorAll('.image');
const containerWidth = photo.offsetWidth;
const totalImagesWidth = Array.from(images).reduce((totalWidth, img) => totalWidth + img.offsetWidth + 4 * containerWidth / 100, 0);
function updateObjectPosition(translate) {
    let percentage = (translate / totalImagesWidth*0.58) *100;
    percentage=Math.min(50,percentage)
    images.forEach((image) => {
        const nextPercentage = percentage + 50;
        image.animate(
            [
                { objectPosition: `${50 + percentage}% center` },  
                { objectPosition: `${nextPercentage}% center` }    
            ],
            {
                duration: 900, 
                fill: "forwards",
                easing: "ease-out",
            }
        );
        image.style.objectPosition = `${nextPercentage}% center`;
    });
}
let width=16;
images.forEach((image) => { 
    image.style.left=`${width}px`;
});
photo.addEventListener('mousedown', (event) => {
    isDragging = true;
    startPosition = event.clientX;
    velocity = 0;
    cancelMomentum();
    photoClicking.style.transition = "transform 0s";
    photoClicking.style.cursor = 'grabbing';
});
photo.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const currentPosition = event.clientX;
    const movement = currentPosition - startPosition;
    currentTranslate = prevTranslate + movement;
    photoClicking.style.transform = `translateX(${currentTranslate}px)`;
    updateObjectPosition(currentTranslate); 
    velocity = movement;
});
window.addEventListener('mouseup', () => {
    isDragging = false;
    prevTranslate = currentTranslate;
    photoClicking.style.cursor = 'grab';
    startMomentum();
});
photo.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault(); 
        cancelMomentum();

        const scrollMovement = event.deltaX * -1; // Reverse for natural scrolling
        currentTranslate += scrollMovement;
        currentTranslate=Math.min(currentTranslate,window.innerWidth/2.4)
        currentTranslate=Math.max(currentTranslate,-(totalImagesWidth*0.89))
        // Apply translation to the entire Photo_clicking container
        photoClicking.style.transition = "transform 0.3s ease-out"; // Smooth transition
        photoClicking.style.transform = `translateX(${currentTranslate}px)`;
        updateObjectPosition(currentTranslate); // Update object-position for each image
        prevTranslate = currentTranslate;
    }
});
function startMomentum() {
    momentumActive = true;
    const friction = 0.98; 
    const step = () => {
        photoClicking.style.transform = `translateX(${currentTranslate}px)`;
        updateObjectPosition(currentTranslate); 
        prevTranslate = currentTranslate;
    };
    step();
}
function cancelMomentum() {
    if (momentumActive) {
        momentumActive = false;
    }
}
window.addEventListener('scroll', () => {
    const skillDiv = document.querySelector('.skill');
    const skillRect = skillDiv.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (skillRect.top < windowHeight / 1.5 && skillRect.bottom > windowHeight / 2) {
      document.querySelector('.react_class').style.transform = 'translateY(0) rotateZ(-1.4deg)';
      document.querySelector('.node_class').style.transform = 'translateY(100% ) rotateZ(1.4deg)';
      document.querySelector('.css_class').style.transform = 'translateY(200%) rotateZ(-1.4deg)';
      document.querySelector('.mongo_class').style.transform = 'translateY(300%) rotateZ(1.4deg)';
    } else {
      document.querySelector('.react_class').style.transform = 'translatey(0) rotateZ(-1.4deg)';
      document.querySelector('.node_class').style.transform = 'translatey(0) rotateZ(1.4deg)';
      document.querySelector('.css_class').style.transform = 'translatey(0) rotateZ(-1.4deg)';
      document.querySelector('.mongo_class').style.transform = 'translatey(0) rotateZ(1.4deg)';
    }
});
  window.addEventListener('scroll', () => {
    const platDiv = document.querySelector('.platform');
    const platRect = platDiv.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (platRect.top >0 && platRect.bottom<windowHeight ) {
        document.querySelector('.codechef').style.opacity = 1;
        document.querySelector('.code_forces').style.opacity = 1;
        document.querySelector('.Leetcode').style.opacity = 1;
        document.querySelector('.codechef').style.transform ='scale(1) translateY(0px)';
        document.querySelector('.code_forces').style.transform ="scale(1) translateY(0px)";
        document.querySelector('.Leetcode').style.transform ="scale(1) translateY(0px)";
    }
    else{
        document.querySelector('.codechef').style.opacity = 0.1;
        document.querySelector('.code_forces').style.opacity = 0.1;
        document.querySelector('.Leetcode').style.opacity = 0.1;
        document.querySelector('.codechef').style.transform ='scale(0.5) translateY(200px)';
        document.querySelector('.code_forces').style.transform ="scale(0.5) translateY(200px)";
        document.querySelector('.Leetcode').style.transform ="scale(0.5) translateY(200px)";
    }
});
