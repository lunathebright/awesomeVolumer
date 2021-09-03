const volumeContainer = document.querySelector(".volume_container");
const progress = document.querySelector(".progress");
const circle = document.querySelector(".track .circle");
const left = document.querySelector(".left");
const right = document.querySelector(".right");


const leftBox = new Hammer(left);
const rightBox = new Hammer(right);

leftBox.get("pan").set({direction: Hammer.DIRECTION_ALL});
rightBox.get("pan").set({direction: Hammer.DIRECTION_ALL});

let circleSpot = 0;

const handleDrag = (e) => {
  const { className } = e.srcEvent.target;

  if (className === "right") {
    volumeContainer.style.transform = `rotate(${e.deltaY/2}deg)`;
    if (circleSpot < 180) {
      circleSpot += e.deltaY/2;
      circle.style.left = `${circleSpot}px`;
    } 
  } 
  
  if (className === "left") {
    volumeContainer.style.transform = `rotate(-${e.deltaY/2}deg)`;
    if (circleSpot > 0) {
      circleSpot -= e.deltaY/2;
      circle.style.left = `${circleSpot}px`;
    } 
  }
  progress.style.width = `${circleSpot/180*100}%`;
}

const handleDragEnd = () => {
  volumeContainer.style.transform = "rotate(0deg)";
};



(function() {
  rightBox.on("pandown", handleDrag);
  leftBox.on("pandown", handleDrag);
  rightBox.on("panend", handleDragEnd);
  leftBox.on("panend", handleDragEnd);
})()