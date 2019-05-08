/*
SECTION: Set variables and base values
*/
var lang = "fr";
if (document.documentElement.lang == "nl-BE") {
  lang = "nl";
}

var locales2 = {
  fr: {
    highlightEmploymentStatus:
      " Ce statut professionnel a des conditions spéciales pour les taux. Nous afficherons les taux standards mais le courtier sera informé de votre statut afin de vous proposer le meilleur taux.",
    highlightLTV:
      " Vous ne disposez pas de suffisamment de fonds propres pour financer votre projet. Peu de banques accordent un prêt hypothécaire avec une quotité  supérieure à 100%.",
    disclaimerTopHC:
      "Vos données seront envoyées à et traitées par HypoConnect SA, courtier en crédit hypothécaire, pour fournir un TAEG plus précis et une éligibilité préliminaire testée auprès des 15+ banques partenaires de HypoConnect. En soumettant votre recherche, vous donnez implicitement votre accord pour l’utilisation de vos données à ces fins. Après avoir soumis vos informations, vous aurez accès en temps réel aux taux personnalisés et votre éligibilité auprès de ces banques.",
    disclaimerBottomHC:
      "Cette page, qui est sous la responsabilité de HypoConnect SA, est hébergée par TopCompare Information Services Belgium.",
    disclaimerResultsHC:
      "Cet aperçu des produits est hébergé par TopCompare Information Services Belgium BVBA. HypoConnect SA propose des produits de banques disponibles via courtier (couleur mauve), indiquant votre probabilité d'éligibilité et un TAEG adapté selon vos informations personnelles et financières. Toute indication du TAEG ou de la probabilité d'éligibilité n'est pas contraignante, les conditions finales de la souscription au crédit hypothécaire sont la responsabilité ultime de la banque. TopCompare Information Services Belgium BVBA propose des produits de banques disponibles sans courtier, en utilisant uniquement les informations relatives à votre projet hypothécaire. Le calcul du TAEG présenté dans le tableau de résultats se fonde sur les hypothèses et montants suivants:<br>- le montant total des intérêts qui sont payés ;<br>- les frais de dossier entre 0 et 500 EUR en fonction de la banque ;<br>- les frais d’expertise d'une valeur moyenne de 250 EUR pour faire estimer la valeur de votre habitation par un expert ;<br>- les frais de notaire (autres que les honoraires) estimés pour l’établissement d’une inscription hypothécaire totale du montant de votre prêt ;<br>- la prime unique d’assurance solde restant dû,calculée sur base du taux sur le marché pour une personne non fumeur de 30 ans;<br>- le total des primes d’assurance habitation en tant que propriétaire, la prime annuelle moyenne du marché étant estimée à 320 EUR pour une habitation standard."
  },
  nl: {
    highlightEmploymentStatus:
      " Deze professionele status heeft speciale voorwaarden voor tarieven. Wij geven de standaardtarieven weer, maar de makelaar wordt op de hoogte gebracht van uw status om u het beste tarief aan te bieden.",
    highlightLTV:
      " U beschikt niet over voldoende eigen vermogen om uw project te financieren. Weinig banken verstrekken een hypothecair krediet met een quotiteit hoger dan 100%. Wij geven de standaardtarieven weer, maar de makelaar wordt op de hoogte gebracht van uw situatie om u het beste tarief aan te bieden.",
    disclaimerTopHC:
      "Uw gegevens worden verzonden naar en verwerkt door HypoConnect hypotheekmakelaar om een nauwkeuriger JKP en voorlopige geschiktheid getest met de 15+ partner banken van HypoConnect. Door het indienen van uw simulatie gaat u impliciet akkoord met het gebruik van uw gegevens voor deze doeleinden. Na het invoeren van uw gegevens heeft u in realtime toegang tot gepersonaliseerde tarieven en uw geschiktheid bij deze banken",
    disclaimerBottomHC:
      "Deze webpagina, die onder de verantwoordelijkheid van HypoConnect NV valt, wordt gehost door TopCompare Information Services Belgium.",
    disclaimerResultsHC:
      "Dit productoverzicht wordt gehost door TopCompare Information Services Belgium BVBA. HypoConnect NV beschikt over producten van makelaarsbanken (paarse kleur) die uw waarschijnlijkheid van goedkeuring en een meer gepersonaliseerde JKP met behulp van uw persoonlijke en financiële informatie aangeven. Elke indicatie van een JKP of waarschijnlijkheid van goedkeuring is niet bindend, de uiteindelijke voorwaarden zijn de verantwoordelijkheid van de bank. TopCompare Information Services Belgium BVBA bevat producten van niet-makelaarsbanken en gebruikt alleen de informatie over uw hypotheekproject voor dit doel. Het jaarlijks kostenpercentage (JKP) vertegenwoordigt de kostprijs van de lening op jaarbasis en houdt rekening met de verschillende kosten verbonden aan een hypothecaire lening. De berekening van het JKP in de resultatentabel is gebaseerd op de volgende veronderstellingen en bedragen:<br>- het totale bedrag aan rente dat wordt betaald;<br>- de administratieve kosten tussen 0 en 500 EUR, afhankelijk van de bank;<br>- de kosten van een expertiseschatting met een gemiddelde waarde van 250 EUR om de waarde van uw woning door een expert te laten schatten;<br>- de geschatte notariskosten (andere dan honoraria) voor het vaststellen van een totale hypotheekregistratie van het bedrag van uw lening;<br>- de eenmalige premie voor de schuldsaldoverzekering, berekend op basis van het markttarief voor een niet-roker van 30 jaar;<br>- de totale woningverzekeringspremies als eigenaar, waarbij de gemiddelde jaarlijkse marktpremie wordt geschat op 320 euro voor een standaardwoning."
  }
};

var highlightEmploymentStatus =
  '<div class="cgg-global-input--error-notification ng-binding ng-hide" ng-show="showErrorMessage" style="margin-top: -10px; margin-bottom: 10px" id="highlightEmploymentStatus"><span class="cgg-has-error-msg-icn m-cgg js-newsletter-submit-icon m-cgg-icon--warning"></span>' +
  locales2[lang]["highlightEmploymentStatus"] +
  "</div>";
var highlightLTV =
  '<div class="cgg-global-input--error-notification ng-binding ng-hide" ng-show="showErrorMessage" style="margin-top: -10px; margin-bottom: 10px" id="highlightLTV"><span class="cgg-has-error-msg-icn m-cgg js-newsletter-submit-icon m-cgg-icon--warning"></span>' +
  locales2[lang]["highlightLTV"] +
  "</div>";

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Send email capture form to GetSiteControl
function registerNewsletterToWidget() {
	var analyticsID = readCookie("analytics_id");
	var emailAddress = document.forms["newsletterForm"].elements["email"].value;
	var location = window.location.href;
	var data = '{"form_info":{"form_uid":"fbfbec69-c00d-4b01-9e3c-10a08a168d75","form_page":1,"form_pages":1},"form":{"email":[{"value":"'+emailAddress+'"}]},"user":{"analytics_id":"'+analyticsID+'"},"widget":379802,"location":"'+location+'"}'; 

	if (/\S+@\S+\.\S+/.test(emailAddress)) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://app.getsitecontrol.com/api/v1/submit?ts=1549994397112", true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	// Override the Salesforce email capture form
	if (typeof document.forms['newsletterForm'] != 'undefined') {
	    document.forms['newsletterForm'].onsubmit = registerNewsletterToWidget;
	}
	
	// Adapt the loan duration for low amounts (<5000 EUR)
	var lang = document.documentElement.lang;	
	var tc_touched = false;
	var loanTenureUpdate = function(element) {
		var target = element.currentTarget;
		var loanAmount = target.value;
		if (!!document.getElementById("loan-amount") && !tc_touched) {
			/* Show popup to push cross-selling to CC
			if (loanAmount < 2500) {
				if (lang == "nl-BE") { _gscq.push(["show", 390737]); }          
				else { _gscq.push(["show", 388445]); }
			}*/
			if (loanAmount <= 500) $('#loan-tenure').val(18);
			else if (loanAmount <= 5000) $('#loan-tenure').val(24);
			else if (loanAmount < 10000) $('#loan-tenure').val(36);
			else if (loanAmount >= 10000) $('#loan-tenure').val(48);
		}
		document.getElementById("loan-tenure").dispatchEvent(new Event('change'));
	};
	$("#loan-amount").change(loanTenureUpdate);
	$("#loan-slider").change(loanTenureUpdate);
	// disable script once user manually inputs the loan duration 
	$('#loan-tenure').keydown(function() {
 		tc_touched = true;
	});
	
	// Change logos on the front page
	if (window.location.pathname == "/fr" || window.location.pathname == "/nl" ) {
	    $(".cc-provider__list").find("img").eq(4).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/kbc.png");
	    $(".cc-provider__list").find("img").eq(8).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/bpostBank.png");
	    $(".cc-provider__list a[href='/fr/fournisseurs/bnp-paribas-fortis']").attr("href", "/fr/fournisseurs/kbc");
	    $(".cc-provider__list a[href='/fr/fournisseurs/elantis']").attr("href", "/fr/fournisseurs/bpost-bank");
	    $(".cc-provider__list a[href='/nl/aanbieders/bnp-paribas-fortis']").attr("href", "/nl/aanbieders/kbc");
	    $(".cc-provider__list a[href='/nl/aanbieders/elantis']").attr("href", "/nl/aanbieders/bpost-bank");
	    $(".cc-provider__list").find("img").eq(4).prop("alt", "KBC");
	    $(".cc-provider__list").find("img").eq(8).prop("alt", "bpost bank");
	}
	
	// make cookie consent bar trackable for a/b tests
	$(".cookies-apply-button").attr("ga-category", "ab").attr("ga-label", "click").attr("ga-action","Clicked-accept").addClass("btn-trackable");
	
	}, false);

	var checkExist = setInterval(function() {
		if (window.location.href.indexOf("etapes") + window.location.href.indexOf("stappen") > -1 ) {
 			// The financial plan is loaded separately but does not refresh itself. Use this to do so (binding to the input events is more cumbersome and unstable than refreshing periodically)
   	 		updateFP();
		}
		// Hide back button in step 2 for as long as there is no other purpose
		if (window.location.href.indexOf("step/2") > - 1 ) {
			if ($(".go-back-button.ng-scope").is(":visible")) $(".go-back-button.ng-scope").hide();
		} else {
			$(".go-back-button.ng-scope").show();
		}

		// Apply HypoConnect branding
		if (window.location.href.indexOf("step/4") + window.location.href.indexOf("step/5") + window.location.href.indexOf("step/6") > -1 ) {
			$("body").addClass("hypoconnect");
			if ($("#disclaimerHC").length == 0) {
				$("[ng-switch-when='cgg-headline-description']").after('<span id="disclaimerHC" style="display: block; margin: -10px 0 20px 0">' + locales2[lang]["disclaimerTopHC"] + "<br></span>");
			}
			$("application-skip-link").text(locales2[lang]["disclaimerBottomHC"]);
		} else {
			$("body").removeClass("hypoconnect");
		}

		// Notify for employment special cases
		if ( window.location.href.indexOf("step/7") > -1 && $("#highlightEmploymentStatus").length == 0 ) {
			$('select[name="employmentStatus"]').parent().after(highlightEmploymentStatus);
			if ( /independent|liberal_professional|company_manager/.test($('select[name="employmentStatus"] option:selected').val()) ) {
				$("#highlightEmploymentStatus").removeClass("ng-hide");
			} else {
				$("#highlightEmploymentStatus").addClass("ng-hide");
			}
		}
		// Notify for LTV > 100%
		if ( window.location.href.indexOf("step/3") > -1 && $("#highlightLTV").length == 0 ) {
			$('input[name="ownFunds"]').parent().parent().parent().parent().after(highlightLTV);
			if ( $("input[name=ownFunds]").val() != "" && totalAmount / propertyValue > 1.05 ) {
				$("#highlightLTV").removeClass("ng-hide");
			} else {
				$("#highlightLTV").addClass("ng-hide");
			}
		}

	    // Load results table hacks
	    if ( window.location.href.indexOf("pret-hypothecaire/tous/results") + window.location.href.indexOf("hypothecaire-lening/alle/results") > -1 ) {
	    	$("body").addClass("hl-rt");

	      // Use the exclusivity banner to mark the HypoConnect products
	      if (!$("#eligible-products").hasClass("tc-touched") && $(".card-container").length) {
		for (var i =0; i< $(".card-container").length; i++) {
		  if($(".card-container").eq(i).find(".product-label:contains('Excl')").length) {
			$(".card-container").eq(i).find(".banner-title.exclusive").text("HypoConnect");
			$(".card-container").eq(i).find(".product-label:contains('Exclu')").text("HypoConnect");
			$(".card-container").eq(i).find(".product-label:contains('HypoConnect')").parent().parent().addClass("hc");
		  }else{ 
		    // make sure the remaining empty span box is not visibile  
		    $(".card-container").eq(i).find(".product-label").get(0).setAttribute("style", "background-color: transparent !important");
		    // hide the apply click button
		    $(".card-container").eq(i).find("button").hide();
		    /* // remove the eligibility score and text
		    $(".card-container").eq(i).find(".footer-container img").hide();
		    $(".card-container").eq(i).find(".footer-primary").hide(); */        
		  }
		}
		// Add APR/TAEG assumption in the disclaimer
		$(".cgg-category-disclaimer").html(locales2[lang]["disclaimerResultsHC"]);
		// trigger popup if there is not eligible product
		if ($("#eligible-products").find(".card-holder").children().length == 0 && $('input[name="provider"]:checked').length == 0) {
		  if (lang == "nl") { _gscq.push(["show", 390380]); }          
		  else { _gscq.push(["show", 390379]); }
		}

		// set a class to tell it has been touched
		$("#eligible-products").addClass("tc-touched");
	      } 
	    }
  }, 100);
