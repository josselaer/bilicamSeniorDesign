


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

    }

  }

  function search_by_name(formData) {

  }

  function search_by_id(formData) {

  }

  function search_by_ethnicity(formData) {
    var form_size = formData.length;

    if(form_size <= 6) {
      alert("Pick at least one ethnicity");
    }
    else {
      var ethnicities = [];
      for(i = 6; i < form_size; i++) {
        ethnicities.push(formData[i].name);
      }
      console.log(ethnicities);
    }

  }

	$('#search_by').on('change', function() {
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


