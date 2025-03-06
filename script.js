const addTaskBtn = document.getElementById("addTask");
const btnText = addTaskBtn.innerText;
const usertaskTextFiled = document.getElementById("usertaskText");
const recordsDisplay = document.getElementById("records");
let userArray = [];
let edit_id = null;
let objStr = localStorage.getItem("taskname");
if (objStr!= null) {
  userArray = JSON.parse(objStr);
}
DisplayInfo();
addTaskBtn.onclick = () => {
  const name = usertaskTextFiled.value;
  if (edit_id!= null) {
    userArray.splice(edit_id,1, { 'name': name });
    edit_id=null;
  } else {
    userArray.push({ 'name': name });
  }

  SaveInfo(userArray);
  usertaskTextFiled.value = "";
  addTaskBtn.innerText = btnText;
};

// save info
function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("taskname", str);
  DisplayInfo();
}

// displayinfo
function DisplayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>${user.name}</td>
                                <td><i class="btn fa fa-trash text-white bg-danger btn-info mx-3 " onclick='DeleteInfo(${i})'> Delete</i> <i
                                        class="btn fa fa-edit fa-2x text-white btn-info bg-primary " onclick='EditInfo(${i})'>Edit</i></td>

                            </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

// edit info
function EditInfo(id) {
  edit_id = id;
  usertaskTextFiled.value = userArray[id].name;
  addTaskBtn.innerText = 'Save Changes';
}
// Delte info
// edit info
function DeleteInfo(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);
  
}
// search info
// search info
const allTr = document.querySelectorAll('#records tr');
const searchInputFiled = document.querySelector('#search');
searchInputFiled.addEventListener('input',function(e){
    const searchStr = e.target.value.toLowerCase();
    recordsDisplay.innerHTML = '';
    allTr.forEach(tr=>{
        const td_in_tr = tr.querySelectorAll('td');
        if(td_in_tr[0].innerText.toLocaleLowerCase().indexOf(searchStr)> -1){
            recordsDisplay.appendChild(tr);
        }
    });
    if(recordsDisplay.innerHTML == ''){
        recordsDisplay.innerHTML = 'No User Found';
    }
});
