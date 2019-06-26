/* This is a custom script and contains the following features:
- HL funnel: Adds a validation message to the LTV and Employment status fields
- HL funnel: Removes "back" button if in step 2
- HL funnel: Adds HC branding (defined in separate css file) and disclaimers
- HL results table: Use the exclusivity banner to mark the HypoConnect products
- HL results table: Add APR/TAEG assumption in the disclaimer
- All results tables: Adds automatic adjustment of the loan tenure according to the loan amount
- Other: Sends the newsletter subscriptions to GetSiteControl widget (as Salesforce integration is deprecated)
- Other: Changes a couple of provider icons on the homepage (requested visibilty)
 */

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
		" Vous ne disposez pas de suffisamment de fonds propres pour financer votre projet. Peu de banques accordent un prêt hypothécaire avec une quotité  supérieure à 105%.",
		disclaimerTopHC:
		"Les données que vous communiquez permettent à notre partenaire courtier, HypoConnect SA, de calculer directement votre <b>taux personnalisé</b> et votre <b>éligibilité</b> auprès de 18 institutions bancaires partenaires. En soumettant votre recherche, vous donnez implicitement votre accord pour l’utilisation de vos données à ces fins. ",
		disclaimerBottomHC:
		"Cette page, qui est sous la responsabilité de HypoConnect SA, est hébergée par TopCompare Information Services Belgium SPRL.",
		disclaimerResultsHC:
		"Cet aperçu des produits est hébergé par TopCompare Information Services Belgium SPRL et contient deux catégories de résultats. Premièrement, les produits d'institutions disponibles via courtier (HypoConnect SA) indiquent votre éligibilité sur base de vos informations personnelles et financières. De plus, vous obtenez également une indication personnalisée de votre TAEG (Taux annuel effectif global, comprenant tous les coûts annuels associés à l'ouverture de votre hypothèque). Cette estimation du TAEG et votre probabailité d'éligibilité ne sont pas contraignantes. Les conditions finales d'octroi du prêt restent sous la responsabilité utltime de l'établissement de crédit. Deuxièmement, les produits d'institutions disponibles  sans courtier sont montrés, utilisant seulement les informations relatives à votre projet immobilier et non personnalisées. Le calcul du TAEG présenté dans le tableau de résultats est basé sur les hypothèses et montants suivants:<br>- le montant total des intérêts payés ;<br>- les frais de dossier qui s'élèvent en moyenne à 500 EUR;<br>- les frais d’expertise d'une valeur moyenne de 250 EUR (estimation de votre propriété par un expert) ;<br>- les frais de notaire (autres que les honoraires) estimés pour l’établissement d’une inscription hypothécaire totale du montant de votre prêt ;<br>- la prime unique d’assurance solde restant dû,calculée sur base du taux sur le marché pour un non fumeur de 30 ans;<br>- le total des primes d’assurance habitation en tant que propriétaire, la prime annuelle moyenne du marché étant estimée à 320 EUR pour une habitation standard."
	},
	nl: {
		highlightEmploymentStatus:
		" Aan je beroepsstatuut zijn speciale voorwaarden voor tarieven gekoppeld. Wij geven de standaardtarieven weer, maar een makelaar geeft je gerichter advies. Zo krijg je, op basis van je situatie, het beste tarief aangeboden.",
		highlightLTV:
		" Je hebt niet voldoende eigen vermogen om je project te financieren. Weinig banken verstrekken een hypothecair krediet met een quotiteit (de procentuele verhouding tussen de lening die je aangaat voor je woning en de waarde van de woning) hoger dan 105%. Wij geven de standaardtarieven weer, maar een makelaar geeft je gerichter advies. Zo krijg je, op basis van je situatie, het beste tarief aangeboden.",
		disclaimerTopHC:
		"Op basis van je gegevens kan onze makelaarspartner, HypoConnect NV, onmiddellijk je <b>persoonlijke tarief</b> en <b>geschiktheid</b> berekenen bij 18 partnerkredietgevers. Door verder te gaan, ga je impliciet akkoord met het gebruik van je gegevens voor dit doel.",
		disclaimerBottomHC:
		"Deze webpagina, waarvoor HypoConnect NV verantwoordelijk is, wordt gehost door TopCompare Information Services Belgium BVBA.",
		disclaimerResultsHC:
		"Dit productoverzicht wordt gehost door TopCompare Information Services Belgium BVBA en bevat twee soorten resultaten. Ten eerste zijn er de producten van makelaarskantoren (via HypoConnect NV) waarbij wordt aangegeven wat de waarschijnlijkheid is dat je aanvraag wordt goedgekeurd op basis van je persoonlijke en financiële informatie. Daarnaast krijg je een meer gepersonaliseerde indicatie van je JKP (Jaarlijks KostenPercentage, de kosten op jaarbasis die samenhangen met het afsluiten van een hypothecaire lening). Deze indicatie van een JKP en de waarschijnlijkheid van goedkeuring zijn niet bindend. De uiteindelijke voorwaarden zijn de verantwoordelijkheid van de bank. Ten tweede zijn er de producten die beschikbaar zijn zonder makelaar waarbij enkel gebruik wordt gemaakt van de informatie over je hypotheekproject. De berekening van het JKP, zoals weergegeven in de resultatentabel, is gebaseerd op de volgende veronderstellingen en bedragen: <br>- het totale bedrag aan rente dat wordt betaald; <br>- de administratieve kosten die gemiddelde €500 bedragen; <br>- de kosten van een expertiseschatting (het laten schatten van de waarde van uw woning door een expert) die gemiddelde €250 bedragen; <br>- de geschatte notariskosten (andere kosten dan honoraria) voor het vaststellen van een totale hypotheekregistratie, wat afhankelijk is van het bedrag van uw lening; <br>- de eenmalige premie voor de schuldsaldoverzekering, wat berekend wordt op basis van het markttarief voor een niet-roker van dertig jaar; <br>- de totale woningverzekeringspremies als eigenaar, waarbij de gemiddelde jaarlijkse marktpremie wordt geschat op €320 voor een standaardwoning."
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
		while (c.charAt(0) == " ")
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

// Send email capture form to GetSiteControl
function registerNewsletterToWidget() {
	var analyticsID = readCookie("analytics_id");
	var emailAddress = document.forms["newsletterForm"].elements["email"].value;
	var location = window.location.href;
	var data = '{"form_info":{"form_uid":"fbfbec69-c00d-4b01-9e3c-10a08a168d75","form_page":1,"form_pages":1},"form":{"email":[{"value":"' + emailAddress + '"}]},"user":{"analytics_id":"' + analyticsID + '"},"widget":379802,"location":"' + location + '"}';

	if (/\S+@\S+\.\S+/.test(emailAddress)) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://app.getsitecontrol.com/api/v1/submit?ts=1549994397112", true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	// Override the Salesforce email capture form
	if (typeof document.forms['newsletterForm'] != 'undefined') {
		document.forms['newsletterForm'].onsubmit = registerNewsletterToWidget;
	}

	// Adapt the loan duration for low amounts (<5000 EUR)
	var tc_touched = false;
	var loanTenureUpdate = function (element) {
		var target = element.currentTarget;
		var loanAmount = target.value;
		if (!!document.getElementById("loan-amount") && !tc_touched) {
			if (loanAmount <= 500)
				$('#loan-tenure').val(18);
			else if (loanAmount <= 5000)
				$('#loan-tenure').val(24);
			else if (loanAmount < 10000)
				$('#loan-tenure').val(36);
			else if (loanAmount >= 10000)
				$('#loan-tenure').val(48);
		}
		document.getElementById("loan-tenure").dispatchEvent(new Event('change'));
	};
	$("#loan-amount").change(loanTenureUpdate);
	$("#loan-slider").change(loanTenureUpdate);
	// disable script once user manually inputs the loan duration
	$('#loan-tenure').keydown(function () {
		tc_touched = true;
	});

	// Change logos on the front page
	if (window.location.pathname == "/fr" || window.location.pathname == "/nl") {
		$(".cc-provider__list").find("img").eq(4).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/kbc.png");
		$(".cc-provider__list").find("img").eq(8).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/bpostBank.png");
		$(".cc-provider__list a[href='/fr/fournisseurs/bnp-paribas-fortis']").attr("href", "/fr/fournisseurs/kbc");
		$(".cc-provider__list a[href='/fr/fournisseurs/elantis']").attr("href", "/fr/fournisseurs/bpost-bank");
		$(".cc-provider__list a[href='/nl/aanbieders/bnp-paribas-fortis']").attr("href", "/nl/aanbieders/kbc");
		$(".cc-provider__list a[href='/nl/aanbieders/elantis']").attr("href", "/nl/aanbieders/bpost-bank");
		$(".cc-provider__list").find("img").eq(4).prop("alt", "KBC");
		$(".cc-provider__list").find("img").eq(8).prop("alt", "bpost bank");
		/* Add HL hero button to homepage and rename loans to consumer loans
		if (lang == "fr") {
			$(".outer.hero-btns-wrapper-5").prepend('<li class="hero-btn"> <a class="btn-trackable" ga-action="Front Page Buttons" ga-category="home.herobanner.ga.mg" ga-label="Prêts hypothécaires" id="hero-mg-btn" href="/fr/pret-hypothecaire"> <span class="icon-wrap"> <img src="/s3/belgium/topcompare.be/production/be/images/general/icon-mo.svg" alt="Prêts hypothécaires"> </span> <span class="hero-item-txt">Prêts hypothécaires</span> </a> </li>');
			$("#hero-pl-btn").find(".hero-item-txt").text("Prêts à tempérament");
		}
		if (lang == "nl") {
			$(".outer.hero-btns-wrapper-5").prepend('<li class="hero-btn"> <a class="btn-trackable" ga-action="Front Page Buttons" ga-category="home.herobanner.ga.mg" ga-label="Hypothecaire leningen" id="hero-mg-btn" href="/nl/hypothecaire-lening"> <span class="icon-wrap"> <img src="/s3/belgium/topcompare.be/production/be/images/general/icon-mo.svg" alt="Hypothecaire leningen"> </span> <span class="hero-item-txt">Hypothecaire leningen</span> </a> </li>');
			$("#hero-pl-btn").find(".hero-item-txt").text("Leningen op afbetaling");
		}
		// Remove TA hero button
		$("#hero-ta-btn").parent().remove();
		*/
	}

	// make cookie consent bar trackable for a/b tests
	$(".cookies-apply-button").attr("ga-category", "ab").attr("ga-label", "click").attr("ga-action", "Clicked-accept").addClass("btn-trackable");

}, false);

var checkExist = setInterval(function () {
		if (window.location.href.indexOf("etapes") + window.location.href.indexOf("stappen") > -1 ) {
			// The financial plan is loaded separately but does not refresh itself. Use this to do so (binding to the input events is more cumbersome and unstable than refreshing periodically)
   	 		if (typeof updateFP === "function") updateFP();
			// Bring desktop buttons to mobile
			if ($(".continue-button").parent().parent().hasClass("desktop-only")) {
			    // hide mobile only button bar
			    $(".cgg-bottom-button-container").hide();
			    // make desktop buttons appear on mobile
			    $(".continue-button").parent().parent().removeClass("desktop-only");
			    $(".go-back-button").parent().removeClass("desktop-only");
			    // resize the continue button
			    $(".continue-button").parent().removeClass("cgg-col-xs-12");
			    $(".continue-button").parent().addClass("col-xs-6");
			    // resize the back button
			    $(".go-back-button").parent().addClass("col-xs-6");
			}
		}
		// Hide back button in step 2 for as long as there is no other purpose
		if (window.location.href.indexOf("step/2") >  - 1) {
			if ($(".go-back-button.ng-scope").is(":visible"))
				$(".go-back-button.ng-scope").hide();
		} else {
			$(".go-back-button.ng-scope").show();
		}

		// Apply HypoConnect branding
		if (window.location.href.indexOf("step/4") + window.location.href.indexOf("step/5") + window.location.href.indexOf("step/6") > -1) {
			$("body").addClass("hypoconnect");
			if ($("#disclaimerHC").length == 0) {
				$("[ng-switch-when='cgg-headline-description']").after('<span id="disclaimerHC" style="display: block; margin: -10px 0 20px 0">' + locales2[lang]["disclaimerTopHC"] + "<br></span>");
			}
			$("application-skip-link").text(locales2[lang]["disclaimerBottomHC"]);
		} else {
			$("body").removeClass("hypoconnect");
		}

		// Notify for employment special cases
		if (window.location.href.indexOf("step/7") > -1 ) {
			if ($("#highlightEmploymentStatus").length == 0) $('select[name="employmentStatus"]').parent().after(highlightEmploymentStatus);
			if (/independent|liberal_professional|company_manager/.test($('select[name="employmentStatus"] option:selected').val())) {
				$("#highlightEmploymentStatus").removeClass("ng-hide");
			} else {
				$("#highlightEmploymentStatus").addClass("ng-hide");
			}
		}
		// Notify for LTV > 100% or if own funds >50% of propertyValue
		if (window.location.href.indexOf("step/3") > -1 && typeof totalAmount !== "undefined") {
			if ($("#highlightLTV").length == 0) $('input[name="ownFunds"]').parent().parent().parent().parent().after(highlightLTV);
			if ($("input[name=ownFunds]").val() != "" && totalAmount / propertyValue > 1.05) {
				$("#highlightLTV")[0].lastChild.nodeValue = locales2[lang]["highlightLTV"];
				$("#highlightLTV").removeClass("ng-hide");
			//} else if (parseFloat($("input[name=ownFunds]").val().replace(/[^\d\.]/g,'')) / propertyValue > 0.5) { 
			//	$("#highlightLTV")[0].lastChild.nodeValue = locales2[lang]["highlightOwnFunds"];
			//	$("#highlightLTV").removeClass("ng-hide");
			} else {
				$("#highlightLTV").addClass("ng-hide");
			}
		}
	
		// Remove hint box for email
		if (window.location.href.indexOf("step/7") > -1 && $(".cgg-help.ng-scope").length == 1) {
			$(".cgg-help.ng-scope").remove();
		}
	
		// Load results table hacks
		if (window.location.href.indexOf("pret-hypothecaire/tous/results") + window.location.href.indexOf("hypothecaire-lening/alle/results") > -1) {
			$("body").addClass("hl-rt");

			// Use the exclusivity banner to mark the HypoConnect products
			if (!$("#eligible-products").hasClass("tc-touched") && $(".card-container").length) {
				for (var i = 0; i < $(".card-container").length; i++) {
					if ($(".card-container").eq(i).find(".product-label:contains('Excl')").length) {
						$(".card-container").eq(i).find(".banner-title.exclusive").text("HypoConnect");
						$(".card-container").eq(i).find(".product-label:contains('Exclu')").text("HypoConnect");
						$(".card-container").eq(i).find(".product-label:contains('HypoConnect')").parent().parent().addClass("hc");
					} else {
						// make sure the remaining empty span box is not visible
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

				// Show sorry notice when no results found
				if ($("#eligible-products").find(".card-container").length == 0 && $("#eligible-under-conditions-products").find(".card-container").length == 0) {
					$("#approved-products").show();
				}
				
				// set a class to tell it has been touched
				$("#eligible-products").addClass("tc-touched");
			}
			
			// Add the rate type to the small tiles of unknown eligibility products
			if ($(".rate-type").length == 0) {
				$("#unknown-eligibility-products .card-container").each(function(index){
					let text, label;
					if (lang == "fr") {
						let type = $(".product-name",this).text().split("variable ");
						text = "Fixe";
						label = "Variabilité";
						if (type.length > 1) text = type.pop();
					} else {
						let type = $(".product-name",this).text().split("rentevoet ");
						text = "Vast";
						label = "Type rente";
						if (type.length > 1) text = type.pop();
					}
					//console.debug(text);
					let html = '<div class="card-column clickable rate-type" data-col-title="apr"> <div class="column-secondary card-column__before_text"> </div> <div class="column-primary card-column__value">'+text+ '</div> <div class="column-secondary card-column__title">'+label+'</div> <div class="column-secondary card-column__description"></div> </div>';
					$("[data-col-title=apr]",this).before(html);
				});
			}
			
		}
	}, 100);
