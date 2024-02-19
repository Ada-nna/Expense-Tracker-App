const profilePicture = document.querySelector(".profilePic");
const settingsPopUpBox = document.querySelector("#profileSettingsBox");

profilePicture.addEventListener("click", (e) => {
  e.preventDefault();
  settingsPopUpBox.classList.toggle("hidden");
  settingsPopUpBox.classList.toggle("show");
});
