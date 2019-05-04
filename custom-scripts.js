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
			if (loanAmount < 2500) {
				if (lang == "nl-BE") { _gscq.push(["show", 390737]); }          
				else { _gscq.push(["show", 388445]); }
			}
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
				$("[ng-switch-when='cgg-headline-description']").after('<span id="disclaimerHC" style="display: block; margin: -10px 0 20px 0">' + locales[lang]["disclaimerTopHC"] + "<br></span>");
			}
			$("application-skip-link").text(locales[lang]["disclaimerBottomHC"]);
		} else {
			$("body").removeClass("hypoconnect");
		}

		// Notify for employment special cases
		if ( window.location.href.indexOf("step/7") > -1 && $("#highlightEmploymentStatus").length == 0 ) {
			$('select[name="employmentStatus"]').parent().after(highlightEmploymentStatus);
		}
		if ( /independent|liberal_professional|company_manager/.test($('select[name="employmentStatus"] option:selected').val()) ) {
			$("#highlightEmploymentStatus").removeClass("ng-hide");
		} else {
			$("#highlightEmploymentStatus").addClass("ng-hide");
		}

		// Notify for LTV > 100%
		if ( window.location.href.indexOf("step/3") > -1 && $("#highlightLTV").length == 0 ) {
			$('input[name="ownFunds"]').parent().parent().parent().parent().after(highlightLTV);
		}
		if ( $("input[name=ownFunds]").val() != "" && totalAmount / propertyValue > 1.05 ) {
			$("#highlightLTV").removeClass("ng-hide");
			//TODO: store the information in a cookie to pass over to unbounce
		} else {
			$("#highlightLTV").addClass("ng-hide");
		//TODO: remove the information from the above cookie
		}

	    // Load results table hacks
	    if ( window.location.href.indexOf("pret-hypothecaire/tous/results") + window.location.href.indexOf("hypothecaire-lening/alle/results") > -1 ) {
	    	$("body").addClass("hl-rt");

	      // Use the exclusivity banner to mark the HypoConnect products
	      if (!$("#eligible-products").hasClass("tc-touched") && $(".card-container").length) {
		for (var i =0; i< $(".card-container").length; i++) {
		  if($(".card-container").eq(i).find(".product-label:contains('Excl')").length) {
			$(".card-container").eq(i).find(".banner-title.exclusive").text(locales[lang]["bannerLabel"]);
			$(".card-container").eq(i).find(".product-label:contains('Exclu')").text(locales[lang]["bannerLabel"]);
			$(".card-container").eq(i).find(".product-label:contains('HypoConnect')").parent().parent().css('background', 'rgba(141, 22, 86, 0.15)');
		  }else{ 
		    // make sure the remaining empty span box is not visibile  
		    $(".card-container").eq(i).find(".product-label").get(0).setAttribute("style", "background-color: transparent !important");
		    // hide the apply click button
		    $(".card-container").eq(i).find("button").hide();
		    // remove the eligibility score and text
		    $(".card-container").eq(i).find(".footer-container img").hide();
		    $(".card-container").eq(i).find(".footer-primary").hide();         
		  }
		}
		// Add APR/TAEG assumption in the disclaimer
		$(".cgg-category-disclaimer").html(locales[lang]["disclaimerResultsHC"]);
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
