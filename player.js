//IIFE here
var PLAYER = (function () {
  let videoTag;
  let videoTagCanvas;
  let imageTag;
  let imageTagCanvas;

  console.log("player.js");
  let videoParent = document.getElementById("videoPlayer");
  function createVideoElement() {
    videoTag = document.createElement("video");
    videoTag.setAttribute("id", "videoTag");
    videoTag.setAttribute("controls", "");
    videoTag.setAttribute("autoplay", "");
    //muted
    videoTag.setAttribute("muted", "");
    //loop true
    videoTag.setAttribute("loop", "");
    videoParent.appendChild(videoTag);
    createVideoElementCanvas();
    createImageTag();
    //addEventListener to videoTag
    videoTag.addEventListener("timeupdate", videoProgress);
  }

  function videoProgress(event) {
    let currentTime = videoTag.currentTime;
    console.log("currentTime: " + currentTime, event);
    updateCanvas();
  }

  function updateCanvas() {
    let canvasContext = videoTagCanvas.getContext("2d");
    canvasContext.drawImage(
      videoTag,
      0,
      0,
      videoTagCanvas.width,
      videoTagCanvas.height
    );
    analyseFrame(canvasContext);
  }

  function createVideoElementCanvas() {
    videoTagCanvas = document.createElement("canvas");
    videoTagCanvas.width = videoTag.offsetWidth;
    videoTagCanvas.height = videoTag.offsetHeight;
    videoTagCanvas.setAttribute("id", "videoTagCanvas");
    videoParent.appendChild(videoTagCanvas);
  }

  function createImageTag() {
    imageTag = document.createElement("img");
    imageTag.setAttribute("id", "imageTag");
    imageTag.setAttribute("src", "video/bottle.jpeg");
    imageTag.onload = function () {
      console.log("imageTag.onload");
      createImageTagCanvas();
    };
    videoParent.appendChild(imageTag);
  }

  function createImageTagCanvas() {
    imageTagCanvas = document.createElement("canvas");
    imageTagCanvas.setAttribute("id", "imageTagCanvas");
    imageTagCanvas.width = imageTag.offsetWidth;
    imageTagCanvas.height = imageTag.offsetHeight;
    //render image in canvas

    imageTagCanvas.getContext("2d").drawImage(imageTag, 0, 0);
    let canvasContext = videoTagCanvas.getContext("2d");

    canvasContext.drawImage(
      imageTag,
      0,
      0,
      videoTagCanvas.width,
      videoTagCanvas.height
    );

    videoParent.appendChild(imageTagCanvas);
  }

  function analyseFrame() {
    let imageCanvasContext = imageTagCanvas.getContext("2d");
    let videoCanvasContext = videoTagCanvas.getContext("2d");

    let videoData = videoCanvasContext.getImageData(
      0,
      0,
      videoTagCanvas.width,
      videoTagCanvas.height
    );

    let imageData = imageCanvasContext.getImageData(
      0,
      0,
      imageTagCanvas.width,
      imageTagCanvas.height
    );

    let vidoeDataArray = videoData.data;
    let imageDataArray = imageData.data;

    debugger;
    for (let i = 0; i < vidoeDataArray.length; i += 4) {
      let red = vidoeDataArray[i];
      let green = vidoeDataArray[i + 1];
      let blue = vidoeDataArray[i + 2];
      let alpha = vidoeDataArray[i + 3];
      if (
        red >= 0 &&
        red <= 120 &&
        green >= 120 &&
        green <= 255 &&
        blue >= 8 &&
        blue <= 100
      ) {
        vidoeDataArray[i] = imageDataArray[i];
        vidoeDataArray[i + 1] = imageDataArray[i + 1];
        vidoeDataArray[i + 2] = imageDataArray[i + 2];
        // vidoeDataArray[i + 3] = 0;
      }
    }
    videoCanvasContext.putImageData(videoData, 0, 0);
  }

  function setSource(url) {
    videoTag.setAttribute("src", url);
  }
  createVideoElement();
  return {
    createVideoElement: createVideoElement,
    setSource: setSource,
  };
})();
