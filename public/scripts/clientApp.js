$(document).ready(function(){
  console.log('Doge');


  $(document).on('click', '#showMe', function(){
    console.log("Show me clicked!");
    getAnimals();
  });


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
      getAnimals();
});


var getAnimals = function(){
  $.ajax({
    type: 'GET',
    url: '/getAnimals',
    success: function(data){
      // updatePage(data);
      updatePage(data);
      console.log(data);
    },
    error: function(){
      console.log("Man, the getAnimals function didn't work.");
    }
  });
var updatePage=function(data){
  console.log("Made it to update page!");
  $('#animalsInDatabase').empty();
  $('#animalsInDatabase').append('<table' + ' align="center"' );
  $('#animalsInDatabase').append('<tr><td><b>Animal</b></td>' +' <td><b>Count</b></td> </tr></b>');

  for (var i = 0; i<data.length; i++){
    $('#animalsInDatabase').append('<tr>');
    $('#animalsInDatabase').append('<td><p>' + data[i].animal_name + '</td><td>    ' + data[i].animal_count +'</td></p>');
  }
  $('#animalsInDatabase').append('</table>');

};
};

});
