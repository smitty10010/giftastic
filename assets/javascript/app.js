//initial array of buttons. this is also the array that new buttons will be added to
var arrayOfGifs = ["dog", "cat", "fish", "lizard", "bird", "otter", "fox", "bear"];

//function for displaying gifs

function displayGifs() {
    var query = $(this).attr("gif");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=cI7z9mxO0oCAliWhtbJnkJSyzmGh5kNu&q=" + query + "&limit=10";


    //ajax call to the gify api
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        //clearing the old gifs out
        $("#gifs").empty();

        //for loop to create new image cards for each gif
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
        }
    });
}

//function for displaying the buttons on page
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
// on click event that takes value from form and adds it to the array
$(".submit-gif").on("click", function() {
    event.preventDefault();
    var query = $("#add-gif").val().trim();
    arrayOfGifs.push(query);
    $("#add-gif").val("");
    renderButton();
})

//funciton for playing and stoping the gifs
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