var fails = ["Golf Fails", "Ski Fails", "Gym Fails"];

function displayFailInfo() {

    var fail = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        fail + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        $("#gifs-appear-here").empty();

        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            var stillDiv = $("<div class='fail'>");
            var animateDiv = $("<div class='fail'>");

            var rating = results[i].rating;
            var displayRating = $("<p>").text("Rating: " + rating);
            stillDiv.append(displayRating);

            var gifStill = $("<img>");
            $(gifStill).addClass("still");
            $(gifStill).removeClass("d-none");
            gifStill.attr("src", results[i].images.fixed_height_still.url);

            var gifAnimate = $("<img>");            
            gifAnimate.attr("src", results[i].images.fixed_height.url);
            $(gifAnimate).addClass("animate");
            $(gifAnimate).removeClass("d-none");

            stillDiv.append(gifStill);
            animateDiv.append(gifAnimate);

            animateDiv.hide();

            $("#gifs-appear-here").append(stillDiv);
            $("#gifs-appear-here").append(animateDiv);
        }
    });

}




function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < fails.length; i++) {

        var $btn = $("<button>");
        $btn.addClass("fail");
        $btn.attr("data-name", fails[i]);
        $btn.text(fails[i]);
        $("#buttons-view").append($btn);
    }
}


$("#add-fail").on("click", function (event) {

    event.preventDefault();
    var fail = $("#fail-input").val();
    fails.push(fail);
    renderButtons();
    $('#fail-input').val('');
});


$(document).on("click", ".fail", displayFailInfo);
renderButtons();

$("<img>").on("click", function() {
    animateDiv.show();
    stillDiv.hide();
    renderButtons();
});

