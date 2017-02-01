//http://private-ca334-bilicam.apiary-mock.com

function make_csv(data) {

}

function fill_table(data) {

  console.log("here");

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
    var num1 = parseFloat(formData[4].value);
    var num2 = parseFloat(formData[5].value);
    if(isNaN(num1) || isNaN(num2)) {
      alert("Must enter a number value");
    }
    else {
      dataToSend = {
        "num1":num1,
        "num2":num2
      };
      $.ajax({
        url: '/SearchByBili',
        type: 'get',
        async: false,
        data:dataToSend,
        success: function(data) {
          alert("There are " + data.length + " results. Click download to download .csv file");
        }
      });

    }

  }

  function search_by_name(formData) {
    var firstName = formData[2].value;
    var lastName = formData[3].value;
    var name = firstName + " " + lastName;
    dataToSend = {
      "name":name
    };
    $.ajax({
      url: "/SearchByName",
      type: "get",
      async: false,
      data:dataToSend,
      success: function(data) {
        fill_table(data);
        //console.log(data);
      }
    });
  }

  function search_by_id(formData) {
    var idNum = formData[1].value;
    dataToSend = {
      "idNum":idNum
    };
    $.ajax({
      url: "/SearchById",
      type: "get",
      async: false,
      data:dataToSend,
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
      var ethnicities = [];
      var ethnicity = "";
      for(i = 6; i < form_size; i++) {
        ethnicity = formData[i].name;
        ethnicities.push(ethnicity);
      }
      dataToSend = {
        "ethnicities":ethnicities
      };
      $.ajax({
        url: "/SearchByEthnicity",
        type: "get",
        async: false,
        data:dataToSend,
        success: function(data) {
          alert("There are " + data.length + " results. Click download to download .csv file");
          console.log(data);
        }
      });


    }

  }

  function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    data = {
      "username":username,
      "password":password
    };
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url:'/',
        type:'post',
        data:dataToSend,
        success:function(res) {
          var jsonRes = JSON.parse(res);
          if(jsonRes['LoggedIn'] === "True") {
            alert("Logged in");
            window.location.href = "/Index"
          }
          else
            alert("Incorrect credentials")
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


