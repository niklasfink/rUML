function clicked() {
    alert('I like Trains');
}

function button(){
    alert('not available');
}

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});