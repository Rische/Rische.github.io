var slideIndex = [0,0,0,0,0,0,0,0,0,0,0,0,0];

function plusSlides(offset, slide, images) {
	slideIndex[slide] = slideIndex[slide] + offset;
	if (slideIndex[slide] < 0) { slideIndex[slide] = images.length - 1; }
	if (slideIndex[slide] >= images.length) { slideIndex[slide] = 0; }
	showSlides(slide, slideIndex[slide], images);
}

function showSlides(slide, image, images) {
  var x = document.getElementsByClassName("slideshow-container");
  x[slide].style.backgroundImage = "url("+images[image]+")";
}