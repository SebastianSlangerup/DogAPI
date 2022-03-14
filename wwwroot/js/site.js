// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function getDog() {
    var selectedDog = $(".dog-selector option:selected").val();
    dogURL = selectedDog.replace(/-/g, '/');
    $.getJSON("https://dog.ceo/api/breed/" + dogURL + "/images/random", function(result) {
        $(".demo-image").html("<img src='" + result.message + "'>");
    });
}
function loadDogs() {
    $.getJSON("https://dog.ceo/api/breeds/list/all", function(result) {
        var breeds = result.message;
        firstDog = Object.keys(breeds)[0];
        $.each(breeds, function(dog, breed) {
            if (breeds[dog].length >= 1) {
                for (i = 0; i < breeds[dog].length; i++) {
                    $(".dog-selector").append('<option value="' + dog + '-' + breeds[dog][i] + '">' + breeds[dog][i] + ' ' + dog + '</option>');
                }
            }
            else if (breeds[dog].length < 1) {
                $(".dog-selector").append('<option value="' + dog + '">' + dog + '</option>');
            }
        });
        $.getJSON("https://dog.ceo/api/breed/" + firstDog + "/images/random", function(result) {
            $(".demo-image").html("<img src='" + result.message + "'>");
        });
    });
}
$(".dog-selector").change(function() {
    $(".dog-selector option:selected").each(function() {
        getDog();
    });
});
$(".get-dog").click(function() {
    getDog();
});
$(document).ready(function() {
    loadDogs();
});