const referralLinkBtn = document.getElementById("generateReferralLink");
const referralPopupBox = document.getElementById("referralPopupBox");
const referralInputBox = document.getElementById("referralLink");
const copyIcon = document.getElementById("copy");
const doneBtn = document.getElementById("done-btn");
const dashboardContainer = document.getElementById("overallContainer");
const inviteFriendsLink = document.querySelector("#invite-friends");

function generateUniqueId() {
  return "user_" + Math.random().toString(36).substr(2, 9);
}

referralLinkBtn.addEventListener("click", () => {
  const userId = generateUniqueId();
  const referralLink = `https://www.expensemonitor.com/referral?ref=${userId}`;
  referralInputBox.value = referralLink;
});

// FOR THE COPY ICON....
copyIcon.addEventListener("click", function () {
  referralInputBox.select();
  document.execCommand("copy");
});

// FOR REMOVING THE POPUP BOX
doneBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dashboardContainer.classList.add("flex");
  dashboardContainer.classList.add("hide");
  referralPopupBox.classList.add("hid");
  referralPopupBox.classList.remove("flex");
});

inviteFriendsLink.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(referralPopupBox);
  if (
    referralPopupBox.classList.contains("hidden") ||
    referralPopupBox.classList.contains("hiddenn")
  ) {
    referralPopupBox.classList.remove("hiddenn");
    referralPopupBox.classList.remove("hidden");
    referralPopupBox.classList.add("showw");
  } else {
    referralPopupBox.classList.remove("showw");
    referralPopupBox.classList.add("hiddenn");
  }
});
