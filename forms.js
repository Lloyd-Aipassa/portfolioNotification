// Header
const buttonHeader = document.getElementById("header-img");
const Header = document.getElementById("header");

buttonHeader.addEventListener("click", () => {
    Header.classList.toggle("header-open");
});

// Forms
const drkBg = document.getElementById("drk-bg");
const formAddButton = document.getElementById("header-add-button");
const formAdd = document.getElementById("add-form");
const closeFormAdd = document.getElementById("close-add-form");

formAddButton.addEventListener("click", () => {
	formAdd.classList.add("visible");
	formAdd.style.opacity = "1";
	drkBg.classList.add("drk-bg");
});
closeFormAdd.addEventListener("click", () => {
	formAdd.classList.remove("visible");
	formAdd.style.opacity = "0";
	drkBg.classList.remove("drk-bg");
});

const formUpdateButton = document.getElementById("header-update-button");
const formUpdate = document.getElementById("update-form");
const closeFormUpdate = document.getElementById("close-update-form");

formUpdateButton.addEventListener("click", () => {
	formUpdate.classList.toggle("visible");
	formUpdate.style.opacity = "1";
	drkBg.classList.add("drk-bg");
	// console.log('test')
});
closeFormUpdate.addEventListener("click", () => {
	formUpdate.classList.remove("visible");
	formUpdate.style.opacity = "0";
	drkBg.classList.remove("drk-bg");
});
