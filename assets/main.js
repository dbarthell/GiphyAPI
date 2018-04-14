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

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var failDiv = $("<div class='fail'>");

            var rating = results[i].rating;
            var displayRating = $("<p>").text("Rating: " + rating);
            failDiv.append(displayRating);

            var failImage = $("<img>");
            failImage.attr("src", results[i].images.fixed_height_still.url);
            failDiv.append(failImage);


            $("#gifs-appear-here").append(failDiv);
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

    var fail = $("#fail-input").val().trim();

    fails.push(fail);

    renderButtons();

});

$(document).on("click", ".fail", displayFailInfo);

renderButtons();