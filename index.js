

function askName(){
    let username = prompt("please enter your name.");
    if (username != null) {
        document.getElementById("user").innerHTML = username+ `'s Reminder!`;
    } 
  }

  window.onload=()=>{
    const dateBox= document.querySelector('.date');
    const date= new Date();
    const day=date.getDate();
    const month= date.getMonth()+1;
    const year= date.getFullYear();
    dateBox.innerHTML='Date:<span>'+day+ '-'+ month + '-' + year + '</span>';
 }

  let id = 0;
let intervalsList = []
let reminders_list = []
const REMINDERS_LOCAL_STORAGE_KEY = "reminders" 

const addItemToList = (reminderInterval, display_message) => {
  const li = document.createElement("li");
  li.id = "li" + reminderInterval
  const txtNodeLi = document.createTextNode(display_message);
  li.appendChild(txtNodeLi);

  document.getElementById("ul").appendChild(li);

  const span = document.createElement("SPAN");
  const txtNodeSpan = document.createTextNode("\u00D7");
  span.appendChild(txtNodeSpan);
  const cancelReminderButton = document.createElement("BUTTON");
  cancelReminderButton.innerHTML = "Remove"
  cancelReminderButton.onclick = () => cancelReminder(reminderInterval);
  li.appendChild(span);
  li.appendChild(cancelReminderButton);
}

const initiateRemindersOnReload = () => {
  reminders_list = localStorage.getItem(REMINDERS_LOCAL_STORAGE_KEY);
  if (reminders_list === null || reminders_list==undefined) {
    reminders_list = []
    return null;
  }
  let li = JSON.parse("[" + reminders_list + "]")
  for(let reminder of li){
    const message = reminder["message"];
    const time = reminder["time"];
    const display_message = reminder["display_message"]
    const reminderInterval = setInterval(() => {
      alert(message)}, time
    );
    intervalsList.push(reminderInterval);
    addItemToList(reminderInterval, display_message);
  };
}

const cancelAllReminders = () =>{
  if(intervalsList.length === 0) {
    alert("No reminders are present!!");
    return;
  }
  localStorage.clear();
  intervalsList.forEach(clearInterval);
  for(let i=0; i < intervalsList.length; i++){
    document.getElementById("ul").removeChild(
      document.getElementById("li"+intervalsList[i])
    )
  }
  intervalsList = []
  alert("All reminders deleted!!!");
}

const cancelReminder = (reminderInterval) =>
 {
  const index = intervalsList.indexOf(reminderInterval);
  if(index !== -1) {
    intervalsList.splice(index, 1);
    clearInterval(reminderInterval);
    const list = document.getElementById("ul");
    list.removeChild(document.getElementById("li" + reminderInterval));
    let li = JSON.parse("[" + reminders_list + "]")
    let tempList = []
    for(let i=0; i< li.length; i++){
      if(li[i]['reminder_id'] === reminderInterval)
        continue;
      tempList.push(JSON.stringify({
        "reminder_id": li[i]["reminder_id"],
        "message": li[i]["message"],
        "time": li[i]["time"],
        "display_message":li[i]["display_message"]
      }));
    }
    localStorage.setItem(REMINDERS_LOCAL_STORAGE_KEY, tempList)
    alert('Reminder Deleted!!');
  } else {
    alert('Oops!! Reminder does not exists');
  }
}

const reminder = () => {
    let time = document.getElementById("time").value;
    const message = document.querySelector("input").value;
    time = time * 1000;

    if(message === null || message === ""){
        alert("Please Write Something!!");
    }
    else {
        const reminderInterval = setInterval(() => {alert(message)}, time);
        intervalsList.push(reminderInterval);
        const date = new Date();
        const display_time = date.toLocaleTimeString()
        let display_message = message + " " + display_time
        reminders_list.push(JSON.stringify({
          "reminder_id": reminderInterval,
          "message": message,
          "time": time,
          "display_message":display_message
        }));
        localStorage.setItem(REMINDERS_LOCAL_STORAGE_KEY, reminders_list)
        addItemToList(reminderInterval, display_message)
    }
}

// initiateRemindersOnReload()


