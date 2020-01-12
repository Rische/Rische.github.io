function InitializeMenu(projectPage){
	
	var userLang = localStorage.getItem("lang");
	if(userLang === null){
		userLang = navigator.language || navigator.userLanguage;
		localStorage.setItem("lang", userLang);
	}
		
	
	var container = document.getElementsByClassName("body")[0];
	
	/*
	<!--MENU-->
	<nav class="flex">
		 <nav class="menuText" onclick="location.href='index.html';">
			<p>
				PROFIL
			</p>
		 </nav>
		 <nav class="menuText" onclick="location.href='Projects.html';">
			<p>
				PROJETS
			</p>
		 </nav>
		 <nav class="menuText" onclick="location.href='CV_Gaetan_Rische_Fr.pdf';">
			<p>
				CV
			</p>
		 </nav>
	</nav>
	*/
	
	var nav = htmlToElement('<nav>');
	nav.className = "flex";
	
	container.prepend(nav);
	
	var menus = [ [["PROFIL","PROFILE"],'index.html' ], [["PROJETS","PROJECTS"],'Projects.html' ], [["CV","RESUME"],'CV_Gaetan_Rische_Fr.pdf' ] ];
	
	Array.prototype.forEach.call(menus, ele => {
		var tab = htmlToElement('<nav>');
		tab.className = "menuText";
		tab.onclick = function() {window.location.href = (projectPage ? "../" : "") + ele[1]};
		var txt = htmlToElement('<p>');
		txt.textContent = ele[0][userLang === "fr" ? 0 : 1];
		nav.append(tab);
		tab.append(txt);
	});
	
	/*
	<div>
		<p>Gaétan Rische</p>
		<p>VIDEO GAME PROGRAMMER</p>
		<div></div>
		<p><a>🇫🇷<a onclick=setLang("fr")><h> </h><a>🇬🇧<a onclick=setLang("en")></p>
	</div>
	*/
	container.prepend(htmlToElement('<div>'));
	
	var name = htmlToElement('<p>');
	name.textContent = "Gaétan Rische";
	container.childNodes[0].append(name);
	
	var job = htmlToElement('<p>');
	job.textContent = "VIDEO GAME PROGRAMMER";
	container.childNodes[0].append(job);
	
	container.childNodes[0].append(htmlToElement('<div>'));
	
	var flags = htmlToElement('<p>');
	container.childNodes[0].append(flags);
	
	var fr = htmlToElement('<a>');
	fr.textContent = "🇫🇷";
	fr.onclick = function() {setLang("fr")};
	flags.append(fr);
	
	flags.append(htmlToElement('<h>'));
	flags.childNodes[1].textContent = " ";
	flags.childNodes[1].setAttribute("style", "-moz-user-select: none; -webkit-user-select: none;");
	
	var en = htmlToElement('<a>');
	en.textContent = "🇬🇧";
	en.onclick = function() {setLang("en")};
	flags.append(en);
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

function setLang(lang){
	localStorage.setItem("lang", lang);
	document.location.reload(true);
}