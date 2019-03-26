var slideIndex = ["Slide-1"];
var slideId = [1];
showSlides(1, 1);

function createSlides(array){
	slideId = array;
	for (i = 0; i < array.length; i++) {
		slideIndex[i] = 1;
	}
}

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 0}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
	 x[i].style.display = "none";
  }
  x[slideIndex[no]-1].style.display = "block";
}