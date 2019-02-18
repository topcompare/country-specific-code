// Adapt the loan duration for low amounts (<5000 EUR)
var loanTenureUpdate = function(element) {
	var target = element.currentTarget;
	var loanAmount = target.value;
	if (window.location.href.indexOf("/pret-personnel") > -1 || window.location.href.indexOf("/persoonlijke-lening") > -1 ) {
        if (loanAmount <= 5000) $('#loan-tenure').val(24);
        else if (loanAmount > 5000) $('#loan-tenure').val(36);
    }
    document.getElementById("loan-tenure").dispatchEvent(new Event('change'));
};
$("#loan-amount").change(loanTenureUpdate);
$("#loan-slider").change(loanTenureUpdate);

// Change logos on the front page
document.addEventListener("DOMContentLoaded", function() {
if (window.location.pathname == "/fr" > -1 || window.location.pathname == "/nl" > -1 ) {
    $(".cc-provider__list").find("img").eq(4).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/kbc.png");
    $(".cc-provider__list").find("img").eq(8).attr("src", "/s3/belgium/topcompare.be/production/be/images/providerLogos/bpostBank.png");
    $(".cc-provider__list a[href='/fr/fournisseurs/bnp-paribas-fortis']").attr("href", "/fr/fournisseurs/kbc");
    $(".cc-provider__list a[href='/fr/fournisseurs/elantis']").attr("href", "/fr/fournisseurs/bpost-bank");
    $(".cc-provider__list a[href='/nl/aanbieders/bnp-paribas-fortis']").attr("href", "/nl/aanbieders/kbc");
    $(".cc-provider__list a[href='/nl/aanbieders/elantis']").attr("href", "/nl/aanbieders/bpost-bank");
    $(".cc-provider__list").find("img").eq(4).prop("alt", "KBC");
    $(".cc-provider__list").find("img").eq(8).prop("alt", "bpost bank")
}
}, false)

