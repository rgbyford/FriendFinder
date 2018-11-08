$('#submit').click(function() {
    console.log ("Submit clicked");
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/submit'
    });
});