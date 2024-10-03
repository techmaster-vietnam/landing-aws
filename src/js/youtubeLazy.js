document.querySelectorAll(".youtube-player").forEach(function (player) {
  player.addEventListener("click", function () {
    const videoId = this.dataset.id;
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1`
    );
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    this.innerHTML = "";
    this.appendChild(iframe);
  });
});
