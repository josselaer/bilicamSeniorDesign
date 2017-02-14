//http://private-ca334-bilicam.apiary-mock.com
//connect edit user to apiary
//make doctor table
//link table to account info page
//create cookie to pass username 
//delete user apiary

function make_csv(data) {

}

function fill_table(data) {

  var id_val = data["ID"];
  var firstName = data["FirstName"];
  var lastName = data["LastName"];
  var bili1 = data["BilirubinValue1"];
  var bili2 = data["BilirubinValue2"];

  $("#table_id_number").html(id_val);
  $("#table_first_name").html(firstName);
  $("#table_last_name").html(lastName);
  $("#table_bili_range").html(bili1 + " - " + bili2);

  $("#results_table").css("display", "block");
  //$("table_ethnicity").val(id_val);

}

function search_patient() {
    var formData = $("#search_form").serializeArray();
    /* 6
    [{name: "Search By", value: "ethnicity"}, 
    {name: "ID", value: ""}, 
    {name: "first_name", value: ""}, 
    {name: "last_name", value: ""}, 
    {name: "first_number", value: ""}, 
    {name: "second_number", value: ""}]
    */
    /* 7 with one check
    [{name: "Search By", value: "ethnicity"}, 
    {name: "ID", value: ""}, 
    {name: "first_name", value: ""}, 
    {name: "last_name", value: ""}, 
    {name: "first_number", value: ""}, 
    {name: "second_number", value: ""}, 
    {name: "eWhite", value: "on"}]
    */
    var search_type = formData[0].value;
    if(search_type == "bilirubin") {
      search_by_bili(formData);
    }
    else if(search_type == "ethnicity") {
      search_by_ethnicity(formData);
    }
    else if(search_type == "by_id") {
      search_by_id(formData);
    }
    else if(search_type == "by_name") {
      search_by_name(formData);
    }

}

  function search_by_bili(formData) {
    var theUrl="http://private-ca334-bilicam.apiary-mock.com/patient/bili/";
    var num1 = parseFloat(formData[4].value);
    var num2 = parseFloat(formData[5].value);
    theUrl += num1 + "/" + num2;

    if(isNaN(num1) || isNaN(num2)) {
      alert("Must enter a number value");
    }
    else {
      $.ajax({
        url: theUrl,
        type: "get",
        async: false,
        success: function(data) {
          alert("There are " + data.length + " results. Click download to download .csv file");
          console.log(data);
        },
        error: function() {
          console.log(theUrl);
        }
      });

    }

  }

  function search_by_name(formData) {
    var theUrl = "http://private-ca334-bilicam.apiary-mock.com/patient/name/";
    var firstName = formData[2].value;
    var lastName = formData[3].value;
    theUrl += firstName + "/" + lastName;

    $.ajax({
      url: theUrl,
      type: "get",
      async: false,
      success: function(data) {
        fill_table(data);
        //console.log(data);
      }
    });
  }

  function search_by_id(formData) {
  var theUrl = "https://private-ca334-bilicam.apiary-mock.com/patient/id/";
    var idNum = formData[1].value;
    theUrl += idNum;

    $.ajax({
      url: theUrl,
      type: "get",
      async: false,
      success: function(data) {
        fill_table(data);
        //console.log(data);
      }
    });

  }

  function search_by_ethnicity(formData) {
    var form_size = formData.length;

    if(form_size <= 6) {
      alert("Pick at least one ethnicity");
    }
    else {
      var theUrl = "http://private-ca334-bilicam.apiary-mock.com/patient/ethnicity/";

      var ethnicities = [];
      var ethnicity = "";
      for(i = 6; i < form_size; i++) {
        ethnicity = formData[i].name;
        ethnicities.push(ethnicity);
        theUrl += ethnicity + "_";
      }

      $.ajax({
        url: theUrl,
        type: "get",
        async: false,
        success: function(data) {
          alert("There are " + data.length + " results. Click download to download .csv file");
          console.log(data);
        }
      });


    }

  }

  function login() {
    var theUrl = "http://private-ca334-bilicam.apiary-mock.com/login";
    $.ajax({
        url: theUrl,
        type: "post",
        async: false,
        success: function(data) {
          alert("You are now login");
          window.location.href = "index.html";

        }
      });
  }

	$('#search_by').on('change', function() {
    $("#results_table").css("display", "none");
  		curr_value = this.value;
  		//bilirubin, ethnicity, by_id, by_name
  		//bili_search, ethnicity_search, id_search, name_search
  		if(curr_value == "bilirubin") {
  			$("#bili_search").css("display", "block");
  		}
  		else {
  			$("#bili_search").css("display", "none");
  		}

  		if(curr_value == "ethnicity") {
  			$("#ethnicity_search").css("display", "block");
  		}
  		else {
  			$("#ethnicity_search").css("display", "none");
  		}

  		if(curr_value == "by_id") {
  			$("#id_search").css("display", "block");
  		}
  		else {
  			$("#id_search").css("display", "none");
  		}

  		if(curr_value == "by_name") {
  			$("#name_search").css("display", "block");
  		}
  		else {
  			$("#name_search").css("display", "none");
  		}
	})


//admin funcitons

  $('#admin_search_by').on('change', function() {
    $("#dr_results_table").css("display", "none");
      curr_value = this.value;

      if(curr_value == "by_user") {
        $("#user_search").css("display", "block");
      }
      else {
        $("#user_search").css("display", "none");
      }

      if(curr_value == "by_name") {
        $("#name_search").css("display", "block");
      }
      else {
        $("#name_search").css("display", "none");
      }
  })

  function search_doctor() {
    var formData = $("#search_form").serializeArray();
    var search_type = formData[0].value;
    if(search_type == "by_user") {
      admin_search_by_user(formData);
    }
    else if(search_type == "by_name") {
      admin_search_by_name(formData);
    }
  }

  function admin_search_by_user(formData) {
    //acount/{username}
    var theUrl = "https://private-ca334-bilicam.apiary-mock.com/account/";
    var dr_username = formData[1].value;
    theUrl += dr_username;
    $.ajax({
      url: theUrl,
      type: "get",
      async: false,
      success: function(data) {
        admin_create_table(data);
        console.log(data);
      }
    });

  }

  function admin_search_by_name(formData) {
    //account/name/{last_name}
    //http://private-ca334-bilicam.apiary-mock.com
    var theUrl = "https://private-ca334-bilicam.apiary-mock.com/account/name/";
    var dr_name = formData[1].value;
    theUrl += dr_name;

    $.ajax({
      url: theUrl,
      type: "get",
      async: false,
      success: function(data) {
        admin_create_table(data);
        console.log(data);
      }
    });

  }

  function admin_create_user() {
    var formData = $("#create_user_form").serializeArray();
    var username = formData[0].value;
    var password = formData[1].value;
    var name = formData[2].value;
    var hospital = formData[3].value;
    var hospitalAddress = formData[4].value;
    var city = formData[5].value;
    var postForm = {};
    postForm["username"] = username;
    postForm["password"] = password;
    postForm["name"] = name;
    postForm["hospital"] = hospital;
    postForm["hospitalAddress"] = hospitalAddress;
    postForm["city"] = city;
    console.log(postForm);

    var theUrl = "https://private-ca334-bilicam.apiary-mock.com/account";

    $.ajax({
      url : theUrl,
      type: "POST",
      body : formData,
      success: function(data)
      {
        alert("Create user " + username);
      },
    });

  }

  function admin_create_table(data) {
    //use cookies to pass username when user is selected
    /*
      table format: username, name, select button
      or make select button the whole table row 
      http://stackoverflow.com/questions/17147821/how-to-make-a-whole-row-in-a-table-clickable-as-a-link
    */
  }

