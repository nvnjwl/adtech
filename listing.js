//IIFE here
(function () {
  console.log("listing.js");

  let videoList = [
    {
      src: "video/computer.mp4",
      title: "Computer",
    },
    {
      src: "video/computer2.mp4",
      title: "Computer2",
    },
    {
      src: "video/mobile.mp4",
      title: "Mobile",
    },
  ];

  //render this list on body
  function renderList() {
    let ul = document.querySelector("ul");
    //clear the ul
    ul.innerHTML = "";
    //loop through the videoList
    for (let i = 0; i < videoList.length; i++) {
      //create a new li element
      let li = document.createElement("li");
      //create a new a element
      let a = document.createElement("a");
      //set the href attribute
      //   a.setAttribute("href", videoList[i].src);
      //set the text content
      a.textContent = videoList[i].title;
      //append the a element to the li element
      li.appendChild(a);
      //append the li element to the ul element
      ul.appendChild(li);
      a.addEventListener("click", function () {
        createPlayer(videoList[i].src);
      });
    }
  }

  function createPlayer(url) {
    PLAYER.setSource(url);
  }

  function setOptions() {
    let imageOption = document.getElementById("imageOption");
    let videoOption = document.getElementById("videoOption");
    imageOption.addEventListener("click", PLAYER.setImageOption);
    videoOption.addEventListener("click", PLAYER.setVideoOption);
  }

  renderList();
  setTimeout(setOptions, 1000);
})();
