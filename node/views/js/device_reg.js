$(document).ready(function() {
  $("#regis_button").click(function(event){
       alert("hi");
       var owner = <%- JSON.stringify(username) %>; 
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
            var profile_url = "//localhost:3001/profile/" + obj.username ; 
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
                            $('.container').html(data);
                        }
                    })
            } //obj.success

                //window.location.replace("http://localhost:3001/views/profile.html");} 
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
        }); //ajax
    }); //register
}) //docuemnt 