const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav")
const dots = Array.from(dotsNav.children);


//vidden av en bild i karusellen
const slideWidth = slides[0].getBoundingClientRect().width;



//Hur långt karusellen ska åka åt sidan när vi trycker på pilarna
const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
	// flytta till nästa slide
	track.style.transform = "translateX(-" + targetSlide.style.left + ")";

	//flytta current-slide-klassen till den aktuella bilden
	currentSlide.classList.remove("current-slide");
	targetSlide.classList.add("current-slide");
}

//Punkterna ändrar opacitet beroende på vilken som är vald
const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove("current-slide");
	targetDot.classList.add("current-slide");
}

//Göm pilarna på sidan när det inte finns mer bilder åt det hållet
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
	if (targetIndex === 0) {
		prevButton.classList.add("is-hidden");
		nextButton.classList.remove("is-hidden");
	} else if (targetIndex === slides.length - 1) {
		prevButton.classList.remove("is-hidden");
		nextButton.classList.add("is-hidden");
	} else {
		prevButton.classList.remove("is-hidden");
		nextButton.classList.remove("is-hidden");
	}
}


//När jag klickar på vänsterpilen -> flytta slides åt vänster
prevButton.addEventListener("click", e => {
	const currentSlide = track.querySelector(".current-slide")
	const prevSlide = currentSlide.previousElementSibling;
	const currentDot = dotsNav.querySelector(".current-slide");
	const prevDot = currentDot.previousElementSibling;
	const prevIndex = slides.findIndex(slide => slide === prevSlide);

	moveToSlide(track, currentSlide, prevSlide);
	updateDots(currentDot, prevDot);
	hideShowArrows(slides, prevButton, nextButton, prevIndex);
})


//När jag klickar på högerpilen -> flytta slides åt höger
nextButton.addEventListener("click", e => {
	const currentSlide = track.querySelector(".current-slide")
	const nextSlide = currentSlide.nextElementSibling;
	const currentDot = dotsNav.querySelector(".current-slide");
	const nextDot = currentDot.nextElementSibling;
	const nextIndex = slides.findIndex(slide => slide === nextSlide);

	moveToSlide(track, currentSlide, nextSlide);
	updateDots(currentDot, nextDot);
	hideShowArrows(slides, prevButton, nextButton, nextIndex);
})


//När jag klickar på nav-punkterna -> gå till den bilden
dotsNav.addEventListener("click", e => {
	//inget ska hända om jag klickar utanför knapparna
	const targetDot = e.target.closest("button");

	//Om en knapp klickas på, fortsätt i funktionen, annars stanna här!
	if (!targetDot) return;

	const currentSlide = track.querySelector(".current-slide");
	const currentDot = dotsNav.querySelector(".current-slide");

	//Hitta index på knappen som trycktes på
	const targetIndex = dots.findIndex(dot => dot === targetDot);

	//Gå till bilden med det index som matchar med knappen
	const targetSlide = slides[targetIndex];

	moveToSlide(track, currentSlide, targetSlide);
	updateDots(currentDot, targetDot);
	hideShowArrows(slides, prevButton, nextButton, targetIndex);

})