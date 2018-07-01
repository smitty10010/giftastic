//initial array of buttons. this is also the array that new buttons will be added to
var arrayOfGifs = ["dog", "cat", "fish", "lizard", "bird", "otter", "fox", "bear"];


function displayGifs() {
    var query = $(this).attr("gif");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=cI7z9mxO0oCAliWhtbJnkJSyzmGh5kNu&q=" + query + "&limit=10";
    console.log("The " + query + " button was pushed.");

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        $("#gifs").empty();
        for (i = 0; i < 10; i++) {
            var gifStill = response.data[i].images.fixed_height_still.url;
            var gifPlay = response.data[i].images.original.url;
            var rating = response.data[i].rating;
            var cardDiv = $("<div class=card style=width:30%>");
            var cardBody = $("<div calss=card-body>");
            var cardText = $("<p class=card-text>");
            var images = $("<img>");
            images.attr("playFile", gifPlay);
            images.attr("stillFile", gifStill);
            images.attr("gif-state", "still");
            images.attr("src", gifStill);
            images.addClass("gif");
            cardText.append("Ratted: " + rating.toUpperCase());
            cardBody.append(cardText);
            cardDiv.append(images, cardBody);
            $("#gifs").append(cardDiv);
            // var imageFile = $("#gifs").append(images);
            // imageFile.append("<p>Rated: " + rating + "</p>");
        }
        // var rating = response.data[0].rating;
    });
}


function renderButton() {
    $("#buttons").empty();
    for (i = 0; i < arrayOfGifs.length; i++) {
        var a = $("<button type=button class=btn>")
        a.addClass("btn-success");
        a.attr("id", "gif-button")
        a.attr("gif", arrayOfGifs[i]);
        a.text(arrayOfGifs[i]);
        $("#buttons").append(a);
    }
}

$(".submit-gif").on("click", function() {
    event.preventDefault();
    var query = $("#add-gif").val().trim();
    arrayOfGifs.push(query);
    $("#add-gif").val("");
    renderButton();
})

function play() {
    console.log("Gif was pressed");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("gif-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("playFile"));
        $(this).attr("gif-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("stillFile"));
        $(this).attr("data-state", "still");
    }
}

$(document).on("click", "#gif-button", displayGifs);
renderButton();

$(document).on("click", ".gif", play);