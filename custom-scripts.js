/* This is a custom script and contains the following features:
- HL funnel: Adds a validation message to the LTV and Employment status fields
- HL funnel: Removes "back" button if in step 2
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
		highlightOwnFunds: " Vous avez indiqué des fonds propres couvrant plus de 50% de la valeur de votre bien, veuillez vérifier qu’il n’y a pas de faute de frappe dans les montants."
	},
	nl: {
		highlightEmploymentStatus:
		" Aan je beroepsstatuut zijn speciale voorwaarden voor tarieven gekoppeld. Wij geven de standaardtarieven weer, maar een makelaar geeft je gerichter advies. Zo krijg je, op basis van je situatie, het beste tarief aangeboden.",
		highlightLTV:
		" Je hebt niet voldoende eigen vermogen om je project te financieren. Weinig banken verstrekken een hypothecair krediet met een quotiteit (de procentuele verhouding tussen de lening die je aangaat voor je woning en de waarde van de woning) hoger dan 105%. Wij geven de standaardtarieven weer, maar een makelaar geeft je gerichter advies. Zo krijg je, op basis van je situatie, het beste tarief aangeboden.",
		highlightOwnFunds: " Je hebt een eigen vermogen ingevuld dat meer dan 50% van de waarde van je onroerend goed dekt, controleer of er geen typefouten in de bedragen staan."
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

// Send email capture form to GetSiteControl
function registerNewsletterToWidget() {
	var analyticsID = Cookies.get('analytics_id');
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
			if (loanAmount <= 500 && $('#loan-tenure').val() != 18)
				$('#loan-tenure').val(18);
			else if (loanAmount <= 5000 && $('#loan-tenure').val() != 24)
				$('#loan-tenure').val(24);
			else if (loanAmount < 10000 && $('#loan-tenure').val() != 36)
				$('#loan-tenure').val(36);
			else if (loanAmount >= 10000 && $('#loan-tenure').val() != 48)
				$('#loan-tenure').val(48);
		}
		// trigger the event because the RT is reloaded before the new tenure is attached to the API call
		document.getElementById("loan-tenure").dispatchEvent(new Event('change'));
	};
	$("#loan-amount").keyup(loanTenureUpdate);
	$("#loan-slider").change(loanTenureUpdate);
	// disable script once user manually inputs the loan duration
	$('#loan-tenure').keydown(function () {
		tc_touched = true;
	});
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

		// Notify for LTV > 100% or if own funds >50% of propertyValue
		if (window.location.href.indexOf("step/3") > -1 ) {
			if ($("#highlightLTV").length == 0) $('input[name="ownFunds"]').parent().parent().parent().parent().after(highlightLTV);
			if ($("input[name=ownFunds]").val() != "" && totalAmount / propertyValue > 1.05) {
				$("#highlightLTV")[0].lastChild.nodeValue = locales2[lang]["highlightLTV"];
				$("#highlightLTV").removeClass("ng-hide");
			} else if (ownFunds / propertyValue > 0.5) { 
				$("#highlightLTV")[0].lastChild.nodeValue = locales2[lang]["highlightOwnFunds"];
				$("#highlightLTV").removeClass("ng-hide");
			} else {
				$("#highlightLTV").addClass("ng-hide");
			}
		}
		
		// Notify for employment special cases
		if (window.location.href.indexOf("step/4") > -1 ) {
			if ($("#highlightEmploymentStatus").length == 0) $('select[name="employmentStatus"]').parent().after(highlightEmploymentStatus);
			if (/independent|liberal_professional|company_manager/.test($('select[name="employmentStatus"] option:selected').val())) {
				$("#highlightEmploymentStatus").removeClass("ng-hide");
			} else {
				$("#highlightEmploymentStatus").addClass("ng-hide");
			}
			
			if($('option').eq(0).prop('disabled') == true){
				$("option:disabled").eq(0).insertAfter($('option[value="mg.funnel.config.stepInfo[3].templateOption.template[12].data.worker"]'));
			}
		}
	
		// Remove hint box for email
		if (window.location.href.indexOf("step/7") > -1 && $(".cgg-help.ng-scope").length == 1) {
			$(".cgg-help.ng-scope").remove();
		}
	
		// Load results table hacks
		if (window.location.href.indexOf("pret-hypothecaire/tous/results") + window.location.href.indexOf("hypothecaire-lening/alle/results") > -1) {
			$("body").addClass("hl-rt");

			if (!$("#eligible-products").hasClass("tc-touched") && $(".card-container").length) {
				// remove button from results in unknown section
				var elements =  $('#unknown-eligibility-products .card-container');
				for(var i = 0; i < elements.length; i++) {
					elements.eq(i).find(".product-label").get(0).setAttribute("style", "background-color: transparent !important");
					// hide the apply click button
					elements.eq(i).find("button").hide();
				}

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
