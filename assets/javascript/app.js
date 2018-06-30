//initial array of buttons. this is also the array that new buttons will be added to
var arrayOfGifs = ["dog", "cat", "fish", "lizard"];


$(".btn-success").on("click", function() {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/trending?api_key=cI7z9mxO0oCAliWhtbJnkJSyzmGh5kNu&limit=5",
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
})