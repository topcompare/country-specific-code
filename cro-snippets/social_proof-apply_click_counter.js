/* Documentation
Reference: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
Not used: https://github.com/mikeymckay/google-spreadsheet-javascript

To consider: https://gist.github.com/jalcantarab/0eb43b13c97e4f784bd0be327f6ced52
*/

// Load jQuery
var jq = document.createElement('script');
jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type (or see below for non wait option)
jQuery.noConflict();

/* CSS code
.card-social {
	padding-left: 15px;
    color: #d82e2e;
    animation: highlight 1.5s infinite alternate;
}

@keyframes highlight {
    to {
        color: white;
    }
}

:lang(fr) .social-container > .count::after {
	content: " visiteurs ont choisi ce produit aujourd'hui!";
}
:lang(nl) .social-container > .count::after {
	content: " bezoekers hebben vandaag voor dit product gekozen!";
}
*/





function modResultsTable() {
	if (!$(".cards-container").hasClass("lm-touched")) {
		$(".cards-container").addClass("lm-touched");

		// Get the latest data on AC from GSheet (https://docs.google.com/spreadsheets/d/1VmUTxSBPzuA8OILtJG74MDLHlsJqZ4LxcVVwKKwA1jw/edit#gid=0)
		$.ajax({
		  url: "https://spreadsheets.google.com/feeds/cells/1VmUTxSBPzuA8OILtJG74MDLHlsJqZ4LxcVVwKKwA1jw/3/public/full?alt=json",
		  success: function(data) {
			   displaySocialCounter(data);
			}
		});

	}
}
$( document ).ready(function() {
	modResultsTable();
	$("#results-container").bind("DOMSubtreeModified", function(e) {
		modResultsTable();
	});
});


function displaySocialCounter(jsonResult) {
	// Parse the data for each provider and put into a hash
	var hash = {};
	for (i = 0; i < jsonResult.feed.entry.length ; i++) {
		// logic: even entries are column A, odd entries are column B
		if(i % 2 == 0) {
			hash[jsonResult.feed.entry[i].content["$t"]] = jsonResult.feed.entry[i+1].content["$t"];
		}
	}

	// Add the social counter to each product card
	$(".card-top").each(function(){
		// get element ID
		var cggID = $(this).parent().data("cgg-id")
		
		if (cggID in hash && !$(this).hasClass("vwotouched")) {
			$(this).addClass("vwotouched")
			var htmlcode = '<div class="card-social"><div class="social-container"><span class="count">'+ hash[cggID] +'</span></div></div>';
			// Documentation on the dollar function: https://stackoverflow.com/a/978731
			$(this).append($(htmlcode).hide().fadeIn('slow'));
		}
	});
}
