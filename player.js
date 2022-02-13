//IIFE here
var PLAYER = (function () {
  let videoTag;
  let videoTagCanvas;
  let imageTag;
  let imageTagCanvas;

  let adVideoTag;
  let adVideoTagCanvas;

  let currentOption = "imageOption";

  console.log("player.js");
  let videoParent = document.getElementById("videoPlayer");
  function createVideoElement() {
    videoTag = document.createElement("video");
    videoTag.setAttribute("id", "videoTag");
    videoTag.setAttribute("controls", "");
    videoTag.setAttribute("autoplay", "");
    videoTag.setAttribute("muted", "");
    videoTag.setAttribute("loop", "");
    videoParent.appendChild(videoTag);
    createVideoElementCanvas();
    createImageTag();
    createAdVideoElement();
    videoTag.addEventListener("timeupdate", videoProgress);
    videoTag.addEventListener("play", function () {
      adVideoTag.play();
    });
    videoTag.addEventListener("pause", function () {
      adVideoTag.pause();
    });
  }

  function requestAnimationFrame() {
    updateCanvas();
    window.requestAnimationFrame(requestAnimationFrame);
  }

  function videoProgress(event) {
    let currentTime = videoTag.currentTime;
    console.log("currentTime: " + currentTime, event);
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
    analyseFrame();
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
      window.requestAnimationFrame(requestAnimationFrame);
    };
    videoParent.appendChild(imageTag);
  }

  function createAdVideoElement() {
    adVideoTag = document.createElement("video");
    adVideoTag.setAttribute("id", "adVideoTag");
    adVideoTag.setAttribute("controls", "");
    adVideoTag.setAttribute("autoplay", "");
    adVideoTag.setAttribute("muted", "");
    adVideoTag.setAttribute("loop", "");
    adVideoTag.setAttribute("src", "video/car2.mp4");
    videoParent.appendChild(adVideoTag);
    createAdVideoTagCanvas();
  }
  function createAdVideoTagCanvas() {
    adVideoTagCanvas = document.createElement("canvas");
    adVideoTagCanvas.setAttribute("id", "adVideoTagCanvas");
    adVideoTagCanvas.width = imageTag.offsetWidth;
    adVideoTagCanvas.height = imageTag.offsetHeight;
    adVideoTagCanvas
      .getContext("2d")
      .drawImage(
        adVideoTag,
        0,
        0,
        adVideoTagCanvas.width,
        adVideoTagCanvas.height
      );
    videoParent.appendChild(adVideoTagCanvas);

    window.requestAnimationFrame(requestAnimationFrameAdVideo);
  }

  function requestAnimationFrameAdVideo() {
    adVideoTagCanvas
      .getContext("2d")
      .drawImage(
        adVideoTag,
        0,
        0,
        adVideoTagCanvas.width,
        adVideoTagCanvas.height
      );
    window.requestAnimationFrame(requestAnimationFrameAdVideo);
  }

  function createImageTagCanvas() {
    imageTagCanvas = document.createElement("canvas");
    imageTagCanvas.setAttribute("id", "imageTagCanvas");
    imageTagCanvas.width = imageTag.offsetWidth;
    imageTagCanvas.height = imageTag.offsetHeight;
    imageTagCanvas.getContext("2d").drawImage(imageTag, 0, 0);
    videoParent.appendChild(imageTagCanvas);
  }

  function analyseFrame() {
    let imageCanvasContext = imageTagCanvas.getContext("2d");
    if (currentOption === "videoOption") {
      imageCanvasContext = adVideoTagCanvas.getContext("2d");
    }

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

    for (let i = 0; i < vidoeDataArray.length; i += 4) {
      let red = vidoeDataArray[i];
      let green = vidoeDataArray[i + 1];
      let blue = vidoeDataArray[i + 2];
      let alpha = vidoeDataArray[i + 3];
      if (
        red >= 0 &&
        red <= 255 / 2 &&
        green >= 255 / 2 &&
        green <= 255 &&
        blue >= 0 &&
        blue <= 255 / 2
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

  function setImageOption() {
    currentOption = "imageOption";
    let imageOption = document.getElementById("imageOption");
    let videoOption = document.getElementById("videoOption");
    imageOption.classList.add("active");
    videoOption.classList.remove("active");
  }

  function setVideoOption() {
    currentOption = "videoOption";
    let imageOption = document.getElementById("imageOption");
    let videoOption = document.getElementById("videoOption");
    imageOption.classList.remove("active");
    videoOption.classList.add("active");
  }
  createVideoElement();
  return {
    createVideoElement: createVideoElement,
    setSource: setSource,
    setImageOption: setImageOption,
    setVideoOption: setVideoOption,
  };
})();
