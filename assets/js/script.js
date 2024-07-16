window.onload = () => {
  const formValues = JSON.parse(localStorage.getItem("form_values"));
  if (!formValues || formValues.length === 0 || formValues == undefined) {
    document.getElementById("my_table").style.visibility = "hidden";
    document.getElementById("no-data").style.visibility = "visible";
  } else {
    document.getElementById("my_table").style.visibility = "visible";
    document.getElementById("no-data").style.visibility = "hidden";
    formValues.map((i) => {
      const table = document.getElementById("table-datas");
      const row = table.insertRow();
      row.className = "rows";
      row.id = `${formValues.indexOf(i)}`;
      row.innerHTML = `<tr>
                        <td>${i.name}</td>
                        <td>${i.email}</td> 
                        <td>${i.phone}</td>  
                        <td>${i.password}</td> 
                        <td> 
                          <div class="icons"> 
                              <span><button onclick="deleteButton(event)" id=${formValues.indexOf(i) + "-d"}></button></span>
                              <span><button onclick="editButton(event)" id=${formValues.indexOf(i) + "-e"}></button></span>
                          </div>
                      </td>      
                  </tr>`;
    });
  }
};

const deleteButton = async (event) => {
  if(confirm("Do you really want to delete this item??")){
    let values = JSON.parse(localStorage.getItem("form_values"));
    const delete_id = `${event.target.id}`.replace("-d", "");
    values.splice(delete_id, 1);
    localStorage.setItem("form_values", JSON.stringify(values));

    document.getElementById(delete_id).remove();

    const tableRows = document.querySelectorAll("#table-datas .rows");
    tableRows.forEach((row, index) => {
      row.id = index;
      const deleteButton = row.querySelector(`button[id*="-d"]`);
      const editButton = row.querySelector(`button[id*="-e"]`);
      deleteButton.id = `${index}-d`;
      editButton.id = `${index}-e`;
    });

    if (values.length === 0) {
      document.getElementById("my_table").style.visibility = "hidden";
      document.getElementById("no-data").style.visibility = "visible";
    }
  }
};

function editButton(event) {
  if(confirm("Do you want to edit this data")){
    const form_data = JSON.parse(localStorage.getItem("form_values"));
    form_data[`${event.target.id}`.replace("-e", "")] = formData;
    if (checkSubmit()){
      localStorage.setItem("form_values", JSON.stringify(form_data));   
  
    document.getElementById(`${event.target.id}`.replace("-e", "")
    ).innerHTML = `<td>${formData.name}</td>
                                   <td>${formData.email}</td> 
                                   <td>${formData.phone}</td>  
                                   <td>${formData.password}</td> 
                                   <td> 
                                      <div class="icons"> 
                                          <span><button onclick="deleteButton(event)" id=${`${event.target.id}`.replace("-e","") + "-d"}></button></span>
                                          <span><button onclick="editButton(event)" id=${`${event.target.id}`}></button></span>
                                      </div>
                                      
                                  </td>`;
   }
  }
}

const handleOnChange = (event) => {
  document.getElementById('confirm-msg').style.visibility = "hidden"; 
  validate(event.target.id);
  updateData(event);
};

let formData = {};

function updateData(event) {
  formData[event.target.id] = event.target.value.trim();
}

const handleOnSubmit = async (event) => {
  event.preventDefault();
  if(checkSubmit() && confirm("Do you want to submit the form")){
    const count = localStorage.getItem("form_values")
    ? JSON.parse(localStorage.getItem("form_values")).length
    : 0;

  if (
    !localStorage.getItem("form_values") ||
    JSON.parse(localStorage.getItem("form_values")).length === 0
  ) {
    localStorage.setItem("form_values", JSON.stringify([formData]));
    const table = document.getElementById("table-datas");
    const row = table.insertRow();
    row.className = "rows";
    row.id = count;
    row.innerHTML = `<tr>
                                <td>${formData.name}</td>
                                <td>${formData.email}</td> 
                                <td>${formData.phone}</td>  
                                <td>${formData.password}</td> 
                                <td> 
                                    <div class="icons"> 
                                        <span><button onclick="deleteButton(event)" id=${count + "-d"}></button></span>
                                        <span><button onclick="editButton(event)" id=${count + "-e"}></button></span>
                                    </div></td> 
                                </tr>`;
  } else {
    const values = JSON.parse(localStorage.getItem("form_values"));
    const table = document.getElementById("table-datas");
    localStorage.setItem(
      "form_values",
      JSON.stringify(values.concat([formData]))
    );

    const row = table.insertRow();
    row.className = "rows";
    row.id = count;
    row.innerHTML = `<tr>
                        <td>${formData.name}</td>
                        <td>${formData.email}</td> 
                        <td>${formData.phone}</td>  
                        <td>${formData.password}</td> 
                        <td> 
                            <div class="icons"> 
                                <span><button onclick="deleteButton(event)" id=${count + "-d"}></button></span>
                                <span><button onclick="editButton(event)" id=${count + "-e"}></button></span>
                            </div></td> 
                      </tr>`;
  }
  document.getElementById("my_table").style.visibility = "visible";
  document.getElementById("no-data").style.visibility = "hidden";
  document.querySelectorAll("input").forEach((input) => {
  input.value = "";
  });
  formData = {};
    document.getElementById('confirm-msg').style.visibility = "visible";  
  }
  
};

const validate = (id) => {
  switch (id) {
    case "name":
      if (!/^[a-zA-Z\s]+$/.test(document.getElementById(id).value)) {
        document.getElementById(`${id}-error`).style.visibility = "visible";
        return false;
      } else {
        document.getElementById(`${id}-error`).style.visibility = "hidden";
        return true;
      }
      break;

    case "email":
      if (
        !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          document.getElementById(id).value
        )
      ) {
        document.getElementById(`${id}-error`).style.visibility = "visible";
        return false;
      } else {
        document.getElementById(`${id}-error`).style.visibility = "hidden";
        return true;
      }
      break;

    case "phone":
      if (!/^\d{10}$/.test(document.getElementById(id).value)) {
        document.getElementById(`${id}-error`).style.visibility = "visible";
        return false;
      } else {
        document.getElementById(`${id}-error`).style.visibility = "hidden";
        return true;
      }
      break;

    case "password":
      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(document.getElementById(id).value))) {
        document.getElementById(`${id}-error`).style.visibility = "visible";
        return false;
      } else {
        document.getElementById(`${id}-error`).style.visibility = "hidden";
        return true;
      }
      break;

    default:
      break;
  }
};
function checkSubmit () {
  if(validate('name') && validate('email') && validate('phone')  && validate('password')){
    return true
  }
  else{
    return false
  }
}
