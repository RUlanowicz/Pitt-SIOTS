
$(document).ready(function() {

  // CURRENT USER
  var owner = document.getElementById('username').getAttribute('data-value');

  // CAPITALIZE USERNAME
  function capitalize()
  {
      var str = document.getElementById('username').getAttribute('data-value');
      str = str.substr(0,1).toUpperCase()+str.substr(1,str.length).toLowerCase();
      var html = "<div id=\"username\" data-value="+str+">"+
          "<p style=\"margin-left:2%;font-size:60\">"+str+"</p>"+
        "</div>";
      document.getElementById('username').innerHTML= html;
  }
  // LOGIN
  $("#login_button").click(function(event){
    //alert('hello');
    var user = {
      username: $("#username").val(),
      password:$("#password").val(),
    }
       // alert ("username: " + username + "password: " + password); 
        //console.log (user); 
    $.ajax({
      dataType: "json",
      type: "POST", 
      url: "//localhost:3001/login", 
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(user), 
      success: function (msg) {
        console.log(JSON.stringify(msg));
        var obj = JSON.parse(JSON.stringify(msg));
        //redirect the page 
        var profile_url = "//localhost:3001/profile/" + user.username; 
        //owner = user.username; 
        console.log (profile_url);
        if (obj.success) { 
            // this will load profile page with a proper username
            $.ajax({
                type:"GET",
                url: profile_url,
                error: function(data){
                  console.log("There was a problem");
                },
                success: function(data){
                  //alert("userprofile");
                  $('.container').html(data);
                  capitalize();
                } //success
              }) //ajax
         } //obj.success

          //window.location.replace("http://localhost:3001/views/profile.html");} 
        else if (!obj.success) {window.location.replace("http://localhost:3001/views/login.html");}
      } //success
    }); //ajax
    //console.log("I sent the request");
  }); // LOGIN

  // TABS-ON-PROFILE
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      console.log("fired");
      var target_url;
      var target = $(e.target).attr("href") // activated tab
      var start, end;
      console.log(target);
      switch(target){
        case "#friends":
          target_url = "//localhost:3001/friends/" + owner;
          console.log(target_url);
        break;
        case "#devices":
          start = performance.now();
          console.log("START TIME : " + start);
          target_url = "//localhost:3001/devices/" + owner;
          console.log(target_url);
        break;
        case "#thriends":
          target_url = "//localhost:3001/thriends/" + owner;
          console.log(target_url);
        break;
      }
      $.ajax({
        type:"GET",
        url: target_url,
        error: function(data){
          console.log("There was a problem");
        },
        success: function(data){
          //var modify = document.getElementById(target); 
          //modify.innerHTML = data;
          $(target).html(data);
          end = performance.now();
          console.log("END TIME : " + end);
          console.log("TIME DIFFERENCE = " + (end - start) + "\n\n");
        } //success
      }) //ajax 
    }); //TABS-ON-PROFILE

  // USER REG BUTTON
  $("#user_reg_button").click(function(event){
      var user = {
          username:   $("#username").val(),
          password:   $("#password").val(),
          email:      $("#email").val(),
          first_name: $("#first_name").val(), 
          last_name:  $("#last_name").val(),
          address:    $("#address").val(),
          city:       $("#city").val(), 
          state:      $("#state").val()
      }

      console.log ("username: " + username + "password: " + password + "email: " + email + "first name: " + first_name + "last name: " + last_name + "address: " + address + "city: " + city + "state: " + state);
      console.log (user); 
      $.ajax({
          dataType: "json",
          type: "POST", 
          url: "//localhost:3001/registration", 
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(user),

           success: function (msg) {
              window.location.replace("http://localhost:3001/views/login.html");
          //      console.log(JSON.stringify(msg));
          //      var obj = JSON.parse(JSON.stringify(msg));
          //      //redirect the page 
          //     var profile_url = "//localhost:3001/profile/" + user.username ; 
          //     console.log (profile_url);
          //     if (obj.success) { 
          // // this will load profile page with a proper username
          //         $.ajax({
          //             type:"GET",
          //             url: profile_url,
          //             error: function(data){
          //             console.log("There was a problem");
          //             },
          //             success: function(data){
          //                 $('.container').html(data);
          //             }
          //         })
          //     }
          //      else if (!obj.success) { window.location.replace("http://localhost:3001/views/registration.html");}
          //  }
        }
      }); //ajax
      console.log("I sent the request");
  }); // USER REG BUTTON

  // DEVICE REGISTRATION
  $("#regis_button").click(function(event){
    console.log ("I am in regis_button action");
    //var owner = <%- JSON.stringify(username) %>; 
    //var owner = "jieunatbosch";
     console.log ("owner :" +owner);
     
     var device = {
      device_type:$("#device_type").val(),
       brand:$("#brand").val(),
       model:$("#model").val(),
       communication:$("#communication").val(), 
       belong_to: owner,
       indoor_location:$("#indoor_location").val(),
       device_name:$("#device_name").val()
     }
   $.ajax({
     dataType: "json",
     type: "POST", 
     url: "//localhost:3001/device_reg", 
     contentType: 'application/json; charset=utf-8',
     data: JSON.stringify(device), 
     success: function (msg) {
      console.log(JSON.stringify(msg));
      var obj = JSON.parse(JSON.stringify(msg));
      //redirect the page 
      var profile_url = "//localhost:3001/devices/" + owner ; 
       console.log (profile_url);
       if (obj.success) { 
        // this will load profile page with a proper username
        $.ajax({
         type:"GET",
         url: profile_url,
         error: function(data){
          console.log("There was a problem");
         },
          success: function(data){
            $('#devices').html(data);
          }
        })
       } //obj.success
       else if (!obj.success) {
        window.location.replace("http://localhost:3001/views/login.html");
       }
      },
    error: function(e) {
      var obj=JSON.parse(JSON.stringify(e));
        if (obj.status == 200) { 
            alert ("I am 200 " + obj.status); 
         }
        else { 
          alert ("I have an error" + JSON.stringify(e));
          console.log(e);
        }
    } //error
  }); //ajax
  }); // DEVICE REGISTRATION 
  
  // FRIEND REGISTRATION
    $("#friend_reg_button").click(function(event){
        var friend = {
            user: owner,
            friend:$("#tags").val()
        };
        $.ajax({
            dataType: "json",
            type: "POST", 
            url: "//localhost:3001/friend_reg", 
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(friend),
            success: function (msg) {
                console.log(JSON.stringify(msg));
                var obj = JSON.parse(JSON.stringify(msg));
                //redirect the page 
                var friends_url = "//localhost:3001/friends/" + owner ; 
                console.log (friends_url);
                if (obj.success) { 
                        // this will load profile page with a proper username
                        $.ajax({
                            type:"GET",
                            url: friends_url,
                            error: function(data){
                                console.log("There was a problem");
                            },
                            success: function(data){
                                $('#friends').html(data);
                            }
                        })
                } //obj.success
                
                else if (!obj.success) {window.location.replace("http://localhost:3001/views/login.html");}
            }, 
            error: function(e) {
                var obj=JSON.parse(JSON.stringify(e));
                if (obj.status == 200) { 
                        alert ("I am 200 " + obj.status); 
                }
                else { 
                alert ("I have an error" + JSON.stringify(e));
                            console.log(e);
                }
            }
        });
    });

  // ADD NEW FRIEND BUTTON
  $("#add_new_friend_button").click(function(event){
    $.ajax({
        type: "GET", 
        url: "//localhost:3001/friend_reg/" + owner, 
        error: function(data){
            console.log("There was a problem");
        },
        success: function(data){
            //console.log(data);
         $('#friends').html(data);
        } //success
    }); //ajax
    var availableTags = $.ajax({
        type: "GET",
        url: "//localhost:3001/users",
        success: function(data){
          var json = JSON.parse(JSON.stringify(data));
          var myArray = [];
          for(var i=0; i<json.length;i++){
              myArray.push(json[i].username);
          }
          console.log(myArray);
          $( "#tags" ).autocomplete({
              source: myArray,
              change: function (event, ui) {
                if(!ui.item){
                  $("#tags").val("")
                }
              }
          });
        }// success
    }); // ajax
  }); // ADD NEW FRIEND BUTTON

  // ADD NEW DEVICE BUTTON
  $("#add_new_device_button").click(function(event){
        //var owner = "jieunatbosch";
      $.ajax({
          type: "GET", 
          url: "//localhost:3001/device_reg/" + owner, 
          error: function(data){
              console.log("There was a problem");
          },
          success: function(data){
              //console.log(data);
           $('#devices').html(data);
          } //success
      }) //ajax
  }); // ADD NEW DEVICE BUTTON

  // REGISTER BUTTON
  $("#register_button").click(function(event){
        //var owner = "jieunatbosch";
      $.ajax({
          type: "GET", 
          url: "//localhost:3001/registration/",
          error: function(data){
              console.log("There was a problem");
          },
          success: function(data){
              //console.log(data);
           $('.container').html(data);
          } //success
      }) //ajax
  }); // REGISTER BUTTON
 
  $(".save_device_button").click(function(event) {
      var current_device = $(this).attr("value");

      console.log(current_device);
      var device_status_id = "device" + current_device;

      //  TODO
      //var device_value = document.getElementById(device_status_id).getAttribute('value');
      //console.log(device_value); 

      var device_value = "57";

      var device_status = {
        status_id: current_device,
        status_value: device_value
      }

      $.ajax({
          type: "POST",
          url: "//localhost:3001/device_status/" + current_device,
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(device_status),
          success: function(msg){
              var obj = JSON.parse(JSON.stringify(msg));
              var profile_url = "//localhost:3001/devices/" + owner;
              if (obj.success) { 
                  // this will load profile page with a proper username
                  $.ajax({
                      type:"GET",
                      url: profile_url,
                      error: function(data){
                          console.log("There was a problem");
                      },
                      success: function(data){
                          $('#devices').html(data);
                      }
                  })
              } //obj.success
              else if (!obj.success) {
                  window.location.replace("http://localhost:3001/views/login.html");
              }
          }, // success
          error: function(e) {
              var obj=JSON.parse(JSON.stringify(e));
              if (obj.status == 200) { 
                  alert ("I am 200 " + obj.status); 
              }
              else { 
                  alert ("I have an error" + JSON.stringify(e));
                  console.log(e);
              }     
          } //error
      })  // ajax
  }); // SAVE DEVICE BUTTON

}) //document ready 
