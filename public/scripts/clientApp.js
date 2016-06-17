$(document).ready(function(){
  console.log('Doge');

  $('#zooInputField').on('click', '#animalSub', function(){
    var logMe = $('#animalIn').val();
    console.log("So, we have just captured " + logMe);

    var exportAnimal={
      "newAnimalIn": logMe
    };
$.ajax({
  type: 'POST',
  url:'/newAnimal',
  data: exportAnimal,
  success: function(){
    console.log("Huzzah! Ajax success!");
  },
  error: function(){
    console.log("Argh, the seas are stormy today. Ajax failed.");
  }
});

  });
});
