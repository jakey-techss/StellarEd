let userInfo = window.localStorage.getItem("currentUserInfo")
let letters = {
    0: ["A", "A"],
    1: ["B", "B"],
    2: ["C", "C"],
    3: ["D", "D"],
    4: ["E", "E"],
    5: ["F", "F"],
    6: ["G", "G"],
    7: ["H", "H"],
    8: ["I", "I"],
    9: ["J", "J"],
    10: ["K", "K"],
    11: ["L", "L"],
    12: ["M", "M"],
    13: ["N", "N"],
    14: ["O", "O"],
    15: ["P", "P"],
    16: ["Q", "Q"],
    17: ["R", "R"],
    18: ["S", "S"],
    19: ["T", "T"],
    20: ["U", "U"],
    21: ["V", "V"],
    22: ["W", "W"],
    23: ["X", "X"],
    24: ["Y", "Y"],
    25: ["Z", "Z"]
}
document.getElementById("signUpActual2").addEventListener("click", () => {
    localStorage.clear()
    window.location.assign("index.html")
})
if (userInfo == null) {
    window.location.assign("index.html")
} else {
    if (JSON.parse(userInfo).Onboard == false) {
        window.location.assign("onboard.html")
    } else {
        const firebaseConfig = {
            apiKey: "AIzaSyBQ5BFUUYHArWG4nFd89maEs-MUlvFKXBA",
            authDomain: "stellared-81001.firebaseapp.com",
            projectId: "stellared-81001",
            storageBucket: "stellared-81001.firebasestorage.app",
            messagingSenderId: "175661838029",
            appId: "1:175661838029:web:2a3cb5124d97d5fc264384",
            measurementId: "G-3KZSX1RNZG"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        document.title = `${JSON.parse(userInfo).Name.substring(0, JSON.parse(userInfo).Name.indexOf(" "))}'s | Dashboard`
        google.charts.load('current', { 'packages': ['corechart'] });
        let currentDay;
        let dueDate;
        let time = ['time', 'time2', 'time3', 'time', 'time2', 'time3', 'time', 'time2', 'time3', 'time', 'time2', 'time3']
        let userInfoDatabase;
        let d = new Date()
        let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let dayOfWeek2 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let monthOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        document.getElementById("profilePicture").style.backgroundImage = `url("${JSON.parse(userInfo).ProfilePicture}")`
        document.getElementById("WelcomeMessage").innerText = `Welcome ${JSON.parse(userInfo).Name.substring(0, JSON.parse(userInfo).Name.indexOf(" ") + 2)}.`
        document.getElementById("Date").innerText = `${dayOfWeek[d.getDay()]} ${monthOfYear[d.getMonth()]} ${d.getDate()}`
        document.getElementById("time").innerText = `${d.getHours() > 12 || d.getHours() == 0 ? Math.abs(d.getHours() - 12) : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}${d.getHours() > 12 ? "PM" : "AM"}`
        let DiffRatio = {
            Easy: 0.5,
            Mid: 0.8,
            Hard: 1,
            Nightmare: 1.5,
            Other: 0.2
        }
        function drawChart(completedPercent = 100, toDo = 0, InProgress = 0) {

            // Set Data
            const data = google.visualization.arrayToDataTable([
                ['State', 'Percent'],
                ['Completed', completedPercent],
                ['To Do', toDo],

            ]);

            // Set Options
            const options = {
                fontname: 'Poppins',
                pieHole: 0.4,
                backgroundColor: "transparent",
                legend: { position: 'bottom', textStyle: { color: 'black', fontSize: 14, fontName: "Poppins" } },
                colors: ['#57C057', '#57C09F', '#B698BB'],
                chartArea: { height: "20px", backgroundColor: '#000000', top: 20, bottom: 100 },
                height: 370,
                pieSliceText: 'label',
                pieStartAngle: 60
            };

            // Draw
            const chart = new google.visualization.PieChart(document.getElementById('myChart'));
            chart.draw(data, options);

        }
        updateTasksList();
        updatePoints()
        setInterval(() => {
            let d = new Date()
            document.getElementById("time").innerText = `${d.getHours() > 12 || d.getHours() == 0 ? Math.abs(d.getHours() - 12) : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}${d.getHours() > 12 ? "PM" : "AM"}`
        }, 60000)
        setInterval(() => {
            let d = new Date()
            document.getElementById("Date").innerText = `${dayOfWeek[d.getDay()]} ${monthOfYear[d.getMonth()]} ${d.getDate()}`
        }, 6000000)
        var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);
        var EventBox = document.getElementById("Events")
        docRef.get().then((doc) => {
            let j = 0
            if (doc.exists) {
                userInfoDatabase = doc.data()
                if (userInfoDatabase.FriendId != undefined) {
                    document.getElementById("uniqueId").innerText = "Your unique code: " + userInfoDatabase.FriendId
                } else {
                    let FriendId = letters[(Math.random() * 27).toFixed()][Math.random().toFixed()] + (Math.random() * 99).toFixed() + letters[(Math.random() * 27).toFixed()][Math.random().toFixed()] + letters[(Math.random() * 27).toFixed()][Math.random().toFixed()] + (Math.random() * 40).toFixed() + letters[(Math.random() * 10).toFixed()][Math.random().toFixed()]
                    document.getElementById("uniqueId").innerText = "Your unique code: " + FriendId
                    var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);

                    return userRef.update({
                        FriendId: FriendId
                    })
                }
                for (i = 1; i <= 12; i++) {
                    if (doc.data().Tasks[i] != undefined && doc.data().Tasks[i].When.includes(dayOfWeek2[d.getDay() + 1])) {
                        j++
                        let event = document.createElement('div')
                        event.classList.add('event')
                        event.innerHTML = ` 
                        <p class="${time[i]} poppins-bold">${doc.data().Tasks[i].Start} - ${doc.data().Tasks[i].End}</p>
                    <div>
                        <p class="poppins-medium classTitle">${doc.data().Tasks[i].Name}</p>
                        <p class="poppins-light classLocation">Room: ${doc.data().Tasks[i].Where}</p>
                    </div>`
                        EventBox.appendChild(event)
                    } else {
                        document.getElementById("eventCount").innerText = `${j} Events`
                    }
                }
            }
        }).then(() => {
            let box = document.getElementById("TaskCategory")
            let box2 = document.getElementById("TC")
            for (i = 1; i < 12; i++) {
                if (userInfoDatabase.Tasks[i] != undefined) {
                    let option = document.createElement('option')
                    option.innerHTML = userInfoDatabase.Tasks[i].Name
                    option.id = userInfoDatabase.Tasks[i].Name
                    option.name = i
                    box.appendChild(option)
                }
            }
            let option = document.createElement('option')
            option.innerHTML = "Other"
            option.id = "Other2"
            box.appendChild(option)
            for (i = 1; i < 12; i++) {
                if (userInfoDatabase.Tasks[i] != undefined) {
                    let option = document.createElement('option')
                    option.innerHTML = userInfoDatabase.Tasks[i].Name
                    option.id = userInfoDatabase.Tasks[i].Name + "edit"
                    option.name = i + "edit"
                    box2.appendChild(option)
                }
            }
            let selectedItem = document.getElementById("TaskCategory").children.namedItem(document.getElementById("TaskCategory").value)
            let Difficulty = userInfoDatabase.Tasks[selectedItem.name].Difficulty
            option = document.createElement('option')
            option.innerHTML = "Other"
            option.id = "Other"
            box2.appendChild(option)
            document.getElementById("addNewTask1").addEventListener("click", () => {
                window.scrollTo(0, 0)
                document.body.style.padding = 0
                document.body.style.overflowY = "hidden"
                document.getElementById("floater").style.display = "flex";
                document.getElementById("addTask").style.display = "block";
                document.getElementById("cancel").addEventListener("click", () => {
                    document.getElementById("floater").style.display = "none";
                    document.getElementById("addTask").style.display = "none";
                    document.getElementById("date").value = ""
                    document.getElementById("TaskTitle").value = ""
                    document.body.style.overflowY = "auto"
                })
                document.getElementById("date").addEventListener('change', () => {
                    let Difficulty = userInfoDatabase.Tasks[selectedItem.name].Difficulty
                    currentDay = new Date()
                    dueDate = new Date(document.getElementById("date").value)
                    if (document.getElementById("TaskCategory").value != "Other") {
                        let selectedItem = document.getElementById("TaskCategory").children.namedItem(document.getElementById("TaskCategory").value)
                        Difficulty = userInfoDatabase.Tasks[selectedItem.name].Difficulty
                    } else if (document.getElementById("TaskCategory").value == "Other") {
                        Difficulty = "Other"
                    }
                    let points;
                    let DiffRatio = {
                        Easy: 0.5,
                        Mid: 0.8,
                        Hard: 1,
                        Nightmare: 1.5,
                        Other: 0.2
                    }
                    if (dueDate > currentDay) {
                        if (Difficulty == "Easy") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Easy * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Medium") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Mid * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Hard") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Hard * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Nightmare") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Nightmare * ((dueDate - currentDay) / 1000)))
                        } else if (Difficulty == "Other") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Other * ((dueDate - currentDay) / 10000)))
                        }
                        document.getElementById("AP").value = points
                    } else {
                        document.getElementById("AP").value = 0
                    }
                })
                document.getElementById("TaskCategory").addEventListener('change', () => {
                    Difficulty = "Easy"
                    currentDay = new Date()
                    dueDate = new Date(document.getElementById("date").value)
                    if (document.getElementById("TaskCategory").value != "Other") {
                        let selectedItem = document.getElementById("TaskCategory").children.namedItem(document.getElementById("TaskCategory").value)
                        Difficulty = userInfoDatabase.Tasks[selectedItem.name].Difficulty
                    } else if (document.getElementById("TaskCategory").value == "Other") {
                        Difficulty = "Other"
                    }
                    let points;

                    if (dueDate > currentDay) {
                        if (Difficulty == "Easy") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Easy * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Medium") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Mid * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Hard") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Hard * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Nightmare") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Nightmare * ((dueDate - currentDay) / 1000)))
                        } else if (Difficulty == "Other") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Other * ((dueDate - currentDay) / 10000)))
                        }
                        document.getElementById("AP").value = points
                    } else {
                        document.getElementById("AP").value = 0
                    }
                })
                document.getElementById("signUpActual").addEventListener('click', () => {
                    let Title = document.getElementById("TaskTitle").value
                    let taskManager = {
                        Title: false,
                        Date: false,
                    }
                    if (Title == "") {
                        taskManager.Title = false
                    } else {
                        taskManager.Title = true
                    }
                    if (Date == "" || !(dueDate > currentDay)) {
                        taskManager.Date = false
                    } else {
                        taskManager.Date = true
                    }
                    let errorBox = document.getElementById("errors")
                    if (taskManager.Date && taskManager.Title) {
                        var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                        // Set the "capital" field of the city 'DC'
                        return userRef.update({
                            ToDo: firebase.firestore.FieldValue.arrayUnion({
                                TaskTitle: Title,
                                DueDate: dueDate,
                                MaxPointsAv: document.getElementById("AP").value,
                                DiffLevel: Difficulty,
                                id: userInfoDatabase.ToDo != undefined ? userInfoDatabase.ToDo.length : 0,
                                Completed: false,
                                DoneDate: "",
                                TaskCategory: document.getElementById("TaskCategory").value
                            })
                        })
                            .then(() => {
                                let errorNode = document.createElement("p")
                                errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">check</span>Successfully added task`
                                errorNode.id = "success"
                                errorBox.appendChild(errorNode)
                                setTimeout(() => {
                                    errorBox.removeChild(document.getElementById("success"))
                                    document.getElementById("floater").style.display = "none";
                                    document.getElementById("AP").style.display = "";
                                    document.getElementById("addTask").style.display = "none";
                                    document.getElementById("date").value = ""
                                    document.getElementById("TaskTitle").value = ""
                                    document.body.style.overflowY = "auto"
                                    updateTasksList()
                                }, 1000)
                            })
                    }
                    if (!taskManager.Date && document.getElementById("Invalid Date") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid Date`
                        errorNode.id = "Invalid Date"
                        errorBox.appendChild(errorNode)
                    } else if (taskManager.Date && document.getElementById("Invalid Date") != undefined) {
                        errorBox.removeChild(document.getElementById("Invalid Date"))
                    }
                    if (!taskManager.Title && document.getElementById("Title cannot be empty") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Title cannot be empty`
                        errorNode.id = "Title cannot be empty"
                        errorBox.appendChild(errorNode)
                    } else if (taskManager.Title && document.getElementById("Title cannot be empty") != undefined) {
                        errorBox.removeChild(document.getElementById("Title cannot be empty"))
                    }
                })

            })
        })
        function updateTasksList() {
            var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);

            docRef.get().then((doc) => {
                userInfoDatabase = doc.data()
                if (doc.exists && doc.data().ToDo != undefined) {
                    let jim = doc.data().ToDo.sort((a, b) => {
                        return a.DueDate - b.DueDate
                    })
                    let Task2Box = document.getElementById("urgentTasks")
                    let tasksBox = document.getElementById("urgentTasks2")

                    for (i = 0; i < jim.length; i++) {
                        if (document.getElementById("NonUrgentTask" + jim[i].id) == undefined && (!jim[i].Completed || jim[i].Completed == 2) && d.getTime() < jim[i].DueDate.toDate().getTime()) {
                            let task = document.createElement("div")
                            task.classList.add(`${doc.exists && jim[i].DiffLevel == "Easy" || doc.exists && jim[i].DiffLevel == "Other" ? 'urgentTask2'
                                : doc.exists && jim[i].DiffLevel == "Medium" ? 'urgentTask2Mid'
                                    : doc.exists && jim[i].DiffLevel == "Hard" ? 'urgentTask2Hard' : 'urgentTask2Nightmare'}`)
                            task.id = "NonUrgentTask" + jim[i].id
                            task.innerHTML = `<div class="${doc.exists && jim[i].DiffLevel == "Easy" || doc.exists && jim[i].DiffLevel == "Other" ? 'markerEasy' : `${doc.exists && jim[i].DiffLevel == "Medium" ? 'markerMid' : doc.exists && jim[i].DiffLevel == "Hard" ? 'markerHard' : 'markerNightmare'}`}"></div>
                    <div class="allHolder">
                        <div class="textHolder">
                            <p>${jim[i].TaskTitle}</p>
                            <p>Due: ${jim[i].DueDate.toDate() - new Date() < 86400000 * 2 ? `${dayOfWeek[jim[i].DueDate.toDate().getDay()] == dayOfWeek[new Date().getDay()] ? 'Today ' : 'Tomorrow '}` +
                                    `${jim[i].DueDate.toDate().getHours() > 12 || jim[i].DueDate.toDate().getHours() == 0 ? Math.abs(jim[i].DueDate.toDate().getHours() - 12) :
                                        jim[i].DueDate.toDate().getHours()}:${jim[i].DueDate.toDate().getMinutes() < 10 ? "0" + jim[i].DueDate.toDate().getMinutes() :
                                            jim[i].DueDate.toDate().getMinutes()}${jim[i].DueDate.toDate().getHours() >= 12 ? "PM" : "AM"}` :
                                    dayOfWeek[jim[i].DueDate.toDate().getDay()] + " " + monthOfYear[jim[i].DueDate.toDate().getMonth()] + " " +
                                    jim[i].DueDate.toDate().getDate() + ` ${jim[i].DueDate.toDate().getFullYear() - d.getFullYear() >= 1 ? jim[i].DueDate.toDate().getFullYear() : ""}` + ` ${jim[i].DueDate.toDate().getHours() > 12 || jim[i].DueDate.toDate().getHours() == 0 ? Math.abs(jim[i].DueDate.toDate().getHours() - 12) :
                                        jim[i].DueDate.toDate().getHours()}:${jim[i].DueDate.toDate().getMinutes() < 10 ? "0"
                                            + jim[i].DueDate.toDate().getMinutes() : jim[i].DueDate.toDate().getMinutes()}${jim[i].DueDate.toDate().getHours() >= 12 ? "PM" : "AM"}`}</p>
                        </div>
                        <a onclick="openEditScreeen(${task.id})">Actions</a>
                    </div>`
                            tasksBox.appendChild(task)
                        }
                    }
                    for (i = 0; i < jim.length; i++) {
                        if (document.getElementById("UrgentTask" + jim[i].id) == undefined && jim[i].DueDate.toDate() - new Date() < 86400000 * 2 && (!jim[i].Completed || jim[i].Completed == 2) && d.getTime() < jim[i].DueDate.toDate().getTime()) {
                            let task = document.createElement("div")
                            task.classList.add(`urgentTask`)
                            task.id = task.id = "UrgentTask" + jim[i].id
                            task.innerHTML = `<div class="marker"></div>
                        <div class="allHolder">
                            <div class="textHolder">
                                <p>${jim[i].TaskTitle}</p>
                                <p>Due: ${dayOfWeek[jim[i].DueDate.toDate().getDay()] == dayOfWeek[new Date().getDay()] ? 'Today ' : 'Tomorrow '}
                                ${jim[i].DueDate.toDate().getHours() > 12 || jim[i].DueDate.toDate().getHours() == 0 ? Math.abs(jim[i].DueDate.toDate().getHours() - 12) :
                                    jim[i].DueDate.toDate().getHours()}:${jim[i].DueDate.toDate().getMinutes() < 10 ? "0" + jim[i].DueDate.toDate().getMinutes() :
                                        jim[i].DueDate.toDate().getMinutes()}${jim[i].DueDate.toDate().getHours() >= 12 ? "PM" : "AM"}</p>
                            </div>
                            <a onclick="openEditScreeen(${task.id})">Actions</a>
                        </div>`
                            Task2Box.appendChild(task)
                        }
                    }
                } else {
                    google.charts.setOnLoadCallback(drawChart(100 / 100, 0, 0));
                }
            }).then(() => {
                let dueAssignment = 0;
                let CompletedAssignment = 0;
                let InProgress = 0
                for (i in userInfoDatabase.ToDo) {
                    i = userInfoDatabase.ToDo[i]
                    if (i.DueDate.toDate().getTime() < new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay()), 23, 59, 59, 999) && (i.Completed == false || i.Completed == 2) && d.getTime() < i.DueDate.toDate().getTime()) {
                        dueAssignment++;
                    } else if (i.DoneDate != undefined && i.Completed == true && d.getTime() < i.DueDate.toDate().getTime()) {
                        if (i.DoneDate.toDate().getTime() < new Date(d.getFullYear(), d.getMonth(), d.getDate() + d.getDay(), 23, 59, 59, 999) && i.DoneDate.toDate().getDay() == d.getDay()) {
                            CompletedAssignment++;
                        }
                    }
                    if (i.DueDate.toDate().getTime() < new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - d.getDay()), 23, 59, 59, 999) && i.Completed == 2 && d.getTime() < i.DueDate.toDate().getTime()) {
                        InProgress++
                    }
                }
                if ((dueAssignment == 0 && CompletedAssignment == 0) || dueAssignment == 0) {
                    google.charts.setOnLoadCallback(drawChart(100 / 100, dueAssignment, InProgress));
                } else {
                    google.charts.setOnLoadCallback(drawChart(CompletedAssignment / dueAssignment, dueAssignment, InProgress));
                }
                document.getElementById("dueAssignments").innerText = dueAssignment
                document.getElementById("completedAssignments").innerText = CompletedAssignment
            });
        }

        document.getElementById("GenieAI").addEventListener(('click'), () => {
            window.location.assign("Genie AI.html")
        })

        document.getElementById("cancel2").addEventListener("click", () => {
            document.getElementById("floater").style.display = "none"
            document.getElementById("viewTask").style.display = "none"
            document.body.style.overflowY = "auto"
            lock('titleEdit')
            lock('dueDateEdit')
            lock('TC')
        })

        function openEditScreeen(id) {
            id = id.id
            document.getElementById("fileProof").value = ""
            window.scrollTo(0, 0)
            document.getElementById("proof").style.display = 'none'
            document.body.style.overflowY = "hidden"
            document.getElementById("floater").style.display = "flex"
            document.getElementById("viewTask").style.display = "block"
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
            }).then(() => {

                let ToDoData = userInfoDatabase.ToDo[id.at(id.length - 1)]
                let d = ToDoData.DueDate.toDate()
                let Difficulty = ToDoData.DiffLevel
                let currentDay = new Date()
                let dueDate = ToDoData.DueDate.toDate()
                document.getElementById("EditHeader").innerText = ToDoData.TaskTitle
                document.getElementById("titleEdit").value = ToDoData.TaskTitle
                document.getElementById("dueDateEdit").type = "text"
                document.getElementById("dueDateEdit").value = `${dayOfWeek[ToDoData.DueDate.toDate().getDay()]} ${monthOfYear[ToDoData.DueDate.toDate().getMonth()]} ${ToDoData.DueDate.toDate().getDate()} ${d.getHours() > 12 || d.getHours() == 0 ? Math.abs(d.getHours() - 12) : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}${d.getHours() > 12 ? "PM" : "AM"}`
                document.getElementById("TC").value = ToDoData.TaskCategory
                let points
                if (dueDate > currentDay) {
                    if (Difficulty == "Easy") {
                        points = 2 * Math.round(Math.sqrt(DiffRatio.Easy * ((ToDoData.DueDate.toDate() - currentDay) / 10000)))
                    } else if (Difficulty == "Medium") {
                        points = 2 * Math.round(Math.sqrt(DiffRatio.Mid * ((ToDoData.DueDate.toDate() - currentDay) / 10000)))
                    } else if (Difficulty == "Hard") {
                        points = 2 * Math.round(Math.sqrt(DiffRatio.Hard * ((ToDoData.DueDate.toDate() - currentDay) / 10000)))
                    } else if (Difficulty == "Nightmare") {
                        points = 2 * Math.round(Math.sqrt(DiffRatio.Nightmare * ((ToDoData.DueDate.toDate() - currentDay) / 1000)))
                    } else if (Difficulty == "Other") {
                        points = 2 * Math.round(Math.sqrt(DiffRatio.Other * ((ToDoData.DueDate.toDate() - currentDay) / 10000)))
                    }
                } else {
                    points = 0
                }
                document.getElementById("points").value = points
                document.getElementById("Status").value = ToDoData.Completed == false ? "false" : ToDoData.Completed == true ? "true" : "2"
                document.getElementById("TC").addEventListener('change', () => {
                    Difficulty = "Easy"
                    currentDay = new Date()
                    dueDate = ToDoData.DueDate.toDate()
                    if (document.getElementById("TC").value != "Other") {
                        let selectedItem = document.getElementById("TC").children.namedItem(document.getElementById("TC").value + "edit")
                        Difficulty = userInfoDatabase.Tasks[selectedItem.name.substring(0, selectedItem.name.indexOf("edit"))].Difficulty
                    } else if (document.getElementById("TC").value == "Other") {
                        Difficulty = "Other"
                    }
                    let points;

                    if (dueDate > currentDay) {
                        if (Difficulty == "Easy") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Easy * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Medium") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Mid * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Hard") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Hard * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Nightmare") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Nightmare * ((dueDate - currentDay) / 1000)))
                        } else if (Difficulty == "Other") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Other * ((dueDate - currentDay) / 10000)))
                        }
                        document.getElementById("points").value = points
                    } else {
                        document.getElementById("points").value = 0
                    }
                })
                document.getElementById("dueDateEdit").addEventListener('change', () => {
                    Difficulty = "Easy"
                    currentDay = new Date()
                    dueDate = new Date(document.getElementById("dueDateEdit").value)
                    if (document.getElementById("TC").value != "Other") {
                        let selectedItem = document.getElementById("TC").children.namedItem(document.getElementById("TC").value + "edit")
                        Difficulty = userInfoDatabase.Tasks[selectedItem.name.substring(0, selectedItem.name.indexOf("edit"))].Difficulty
                    } else if (document.getElementById("TC").value == "Other") {
                        Difficulty = "Other"
                    }
                    let points;
                    if (dueDate > currentDay) {
                        if (Difficulty == "Easy") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Easy * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Medium") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Mid * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Hard") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Hard * ((dueDate - currentDay) / 10000)))
                        } else if (Difficulty == "Nightmare") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Nightmare * ((dueDate - currentDay) / 1000)))
                        } else if (Difficulty == "Other") {
                            points = 2 * Math.round(Math.sqrt(DiffRatio.Other * ((dueDate - currentDay) / 10000)))
                        }
                        document.getElementById("points").value = points
                    } else {
                        document.getElementById("points").value = 0
                    }
                })
                document.getElementById("signUpActual3").addEventListener(('click'), () => {
                    let Title = document.getElementById("titleEdit").value
                    let Date = document.getElementById("dueDateEdit").value
                    let taskManager = {
                        Title: false,
                        Date: false,
                    }
                    if (Title == "") {
                        taskManager.Title = false
                    } else {
                        taskManager.Title = true
                    }
                    if (Date == "" || !(dueDate > currentDay)) {
                        taskManager.Date = false
                    } else {
                        taskManager.Date = true
                    }
                    let errorBox = document.getElementById("errors2")
                    if (taskManager.Date && taskManager.Title) {
                        var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                        // Set the "capital" field of the city 'DC'
                        userRef.update({
                            ToDo: firebase.firestore.FieldValue.arrayRemove(ToDoData),
                        })
                        userRef.update({
                            ToDo: firebase.firestore.FieldValue.arrayUnion({
                                TaskTitle: document.getElementById("titleEdit").value,
                                DueDate: dueDate,
                                MaxPointsAv: document.getElementById("points").value,
                                DiffLevel: Difficulty,
                                id: ToDoData.id,
                                Completed: document.getElementById("Status").value == "false" ? false : document.getElementById("Status").value == "true" ? true : 2,
                                DoneDate: "",
                                TaskCategory: document.getElementById("TC").value
                            })
                        })
                            .then(() => {
                                let errorNode = document.createElement("p")
                                errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">check</span>Successfully updated task`
                                errorNode.id = "success"
                                errorBox.appendChild(errorNode)
                                setTimeout(() => {
                                    errorBox.removeChild(document.getElementById("success"))
                                    setTimeout(() => {
                                        updateTasksList()
                                        document.getElementById("floater").style.display = "none";
                                        document.getElementById("viewTask").style.display = "none";
                                        document.body.style.overflowY = "auto"
                                        if (id.substring(0, 3) == "Non") {
                                            try {
                                                document.getElementById("urgentTasks2").removeChild(document.getElementById("urgentTasks2").children.namedItem(id))
                                                if (document.getElementById("urgentTasks").children.namedItem(id.substring(3)) != undefined) {
                                                    document.getElementById("urgentTasks").removeChild(document.getElementById("urgentTasks").children.namedItem(id.substring(3)))
                                                }
                                            } catch (e) {
                                            }
                                        } else {
                                            try {
                                                document.getElementById("urgentTasks").removeChild(document.getElementById("urgentTasks").children.namedItem(id))
                                                document.getElementById("urgentTasks2").removeChild(document.getElementById("urgentTasks2").children.namedItem("Non" + id))
                                            } catch (e) {

                                            }
                                        }
                                    }, 200)
                                }, 500)

                            })
                    }
                    if (!taskManager.Date && document.getElementById("Invalid Date") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid Date`
                        errorNode.id = "Invalid Date"
                        errorBox.appendChild(errorNode)
                    } else if (taskManager.Date && document.getElementById("Invalid Date") != undefined) {
                        errorBox.removeChild(document.getElementById("Invalid Date"))
                    }
                    if (!taskManager.Title && document.getElementById("Title cannot be empty") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Title cannot be empty`
                        errorNode.id = "Title cannot be empty"
                        errorBox.appendChild(errorNode)
                    } else if (taskManager.Title && document.getElementById("Title cannot be empty") != undefined) {
                        errorBox.removeChild(document.getElementById("Title cannot be empty"))
                    }
                })
                document.getElementById("Status").addEventListener('change', () => {
                    if (document.getElementById("Status").value == "true") {
                        document.getElementById("proof").style.display = "flex"
                        document.getElementById('completed').style.display = "block"
                        document.getElementById("signUpActual3").style.display = "none"
                    } else {
                        document.getElementById("proof").style.display = "none"
                        document.getElementById('completed').style.display = "none"
                        document.getElementById("signUpActual3").style.display = "block"
                    }
                })
                document.getElementById("Delete").addEventListener('click', () => {
                    var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                    userRef.update({
                        ToDo: firebase.firestore.FieldValue.arrayRemove(ToDoData),
                    }).then(() => {
                        let errorBox = document.getElementById("errors2")
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">check</span>Successfully removed task`
                        errorNode.id = "success"
                        errorBox.appendChild(errorNode)
                        updateTasksList()
                        setTimeout(() => {

                            errorBox.removeChild(document.getElementById("success"))
                            document.getElementById("floater").style.display = "none";
                            document.getElementById("viewTask").style.display = "none";
                            document.body.style.overflowY = "auto";
                            if (id.substring(0, 3) == "Non") {
                                try {
                                    document.getElementById("urgentTasks2").removeChild(document.getElementById("urgentTasks2").children.namedItem(id))
                                    if (document.getElementById("urgentTasks").children.namedItem(id.substring(3)) != undefined) {
                                        document.getElementById("urgentTasks").removeChild(document.getElementById("urgentTasks").children.namedItem(id.substring(3)))
                                    }
                                } catch (e) {
                                }
                            } else {
                                try {
                                    document.getElementById("urgentTasks").removeChild(document.getElementById("urgentTasks").children.namedItem(id))
                                    document.getElementById("urgentTasks2").removeChild(document.getElementById("urgentTasks2").children.namedItem("Non" + id))
                                } catch (e) {

                                }
                            }
                        }, 500)

                    })
                })
                document.getElementById("completed").addEventListener('click', () => {
                    let Title = document.getElementById("titleEdit").value
                    let Date = document.getElementById("dueDateEdit").value
                    let Proof = document.getElementById("fileProof").value
                    console.log(Proof)
                    let taskManager = {
                        Title: false,
                        Date: false,
                        Proof: false
                    }
                    if (Title == "") {
                        taskManager.Title = false
                    } else {
                        taskManager.Title = true
                    }
                    if (Date == "" || !(dueDate > currentDay)) {
                        taskManager.Date = false
                    } else {
                        taskManager.Date = true
                    }
                    if (Proof == "") {
                        taskManager.Proof = false
                    } else {
                        taskManager.Proof = true
                    }
                    let errorBox = document.getElementById("errors2")
                    if (taskManager.Date && taskManager.Title && taskManager.Proof) {
                        var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                        // Set the "capital" field of the city 'DC'
                        userRef.update({
                            ToDo: firebase.firestore.FieldValue.arrayRemove(ToDoData),
                        })
                        userRef.update({
                            ToDo: firebase.firestore.FieldValue.arrayUnion({
                                TaskTitle: document.getElementById("titleEdit").value,
                                DueDate: dueDate,
                                MaxPointsAv: document.getElementById("points").value,
                                DiffLevel: Difficulty,
                                id: ToDoData.id,
                                Completed: document.getElementById("Status").value == "false" ? false : document.getElementById("Status").value == "true" ? true : 2,
                                DoneDate: currentDay,
                                TaskCategory: document.getElementById("TC").value
                            }),
                            Points: firebase.firestore.FieldValue.increment(parseInt(document.getElementById("points").value))
                        })
                            .then(() => {
                                let errorNode = document.createElement("p")
                                errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">check</span>Successfully completed task`
                                errorNode.id = "success"
                                errorBox.appendChild(errorNode)
                                updatePoints()
                                updateTasksList()
                                setTimeout(() => {
                                    errorBox.removeChild(document.getElementById("success"))
                                    setTimeout(() => {
                                        document.getElementById("floater").style.display = "none";
                                        document.getElementById("viewTask").style.display = "none";
                                        document.body.style.overflowY = "auto"
                                        if (id.substring(0, 3) == "Non") {
                                            try {
                                                document.getElementById("urgentTasks2").removeChild(document.getElementById("urgentTasks2").children.namedItem(id))
                                                if (document.getElementById("urgentTasks").children.namedItem(id.substring(3)) != undefined) {
                                                    document.getElementById("urgentTasks").removeChild(document.getElementById("urgentTasks").children.namedItem(id.substring(3)))
                                                }
                                            } catch (e) {
                                            }
                                        } else {
                                            try {
                                                document.getElementById("urgentTasks").removeChild(document.getElementById("urgentTasks").children.namedItem(id))
                                                document.getElementById("urgentTasks2").removeChild(document.getElementById("urgentTasks2").children.namedItem("Non" + id))
                                            } catch (e) {

                                            }
                                        }
                                    }, 200)
                                }, 500)

                            })
                    }
                    if (!taskManager.Date && document.getElementById("Invalid Date") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid Date`
                        errorNode.id = "Invalid Date"
                        errorBox.appendChild(errorNode)
                    } else if (taskManager.Date && document.getElementById("Invalid Date") != undefined) {
                        errorBox.removeChild(document.getElementById("Invalid Date"))
                    }
                    if (!taskManager.Title && document.getElementById("Title cannot be empty") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Title cannot be empty`
                        errorNode.id = "Title cannot be empty"
                        errorBox.appendChild(errorNode)
                    } else if (taskManager.Title && document.getElementById("Title cannot be empty") != undefined) {
                        errorBox.removeChild(document.getElementById("Title cannot be empty"))
                    }
                })
            })

        }

        function updatePoints() {
            var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
                if (userInfoDatabase.Points != undefined) {
                    document.getElementById("TopPoints").innerHTML = userInfoDatabase.Points
                } else {
                    document.getElementById("TopPoints").innerHTML = 0
                }
            })
        }

        document.getElementById("addFriends").addEventListener('click', () => {
            document.getElementById("Results").style.display = "none"
            document.getElementById("output2").style.display = "none"
            document.getElementById("Your-Friends").style.display = "block"
            document.getElementById("output").style.display = "flex"
            document.getElementById("Requests").style.display = "block"
            document.getElementById("output3").style.display = "flex"
            document.getElementById("floater").style.display = "flex"
            document.getElementById("addingFriends").style.display = "block"
            document.getElementById("search").value = ""
            window.scrollTo(0, 0)
            document.body.style.overflowY = "hidden"

            document.getElementById("search").addEventListener('change', () => {
                if (document.getElementById("search").value.trim() != "") {
                    var userBox = document.getElementById("output2")
                    document.getElementById("Results").style.display = "block"
                    document.getElementById("output2").style.display = "flex"
                    document.getElementById("Your-Friends").style.display = "none"
                    document.getElementById("output").style.display = "none"
                    document.getElementById("Requests").style.display = "none"
                    document.getElementById("output3").style.display = "none"
                    db.collection("users").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().Name.toUpperCase().includes(document.getElementById("search").value.toUpperCase()) && doc.data().Name != userInfoDatabase.Name) {
                                var user = document.createElement('div')
                                user.classList.add('userBox')
                                user.innerHTML = `<div class="user2">
                            <div id="FriendHolder">
                                <div class="profilePictureLeader" style="background-image:url(${doc.data().ProfilePicture})"></div>
                                <p class="poppins-bold">${doc.data().Name}</p>
                            </div>
                            <div class="onlineHolder">
                                <div class="online"></div>
                                <p>Online</p>
                            </div>
                            <button>+</button>
                        </div>
                        <div class="input">
                            <input name="title" id="titleEdit" type="text" placeholder="Friends unique code">
                        </div>`
                        userBox.appendChild(user)
                            }
                        });
                    })
                } else {
                    document.getElementById("Results").style.display = "none"
                    document.getElementById("output2").style.display = "none"
                    document.getElementById("Your-Friends").style.display = "block"
                    document.getElementById("output").style.display = "flex"
                    document.getElementById("Requests").style.display = "block"
                    document.getElementById("output3").style.display = "flex"
                }
            })
        })

        document.getElementById("cancel3").addEventListener('click', () => {
            document.getElementById("floater").style.display = "none"
            document.getElementById("addingFriends").style.display = "none"
            document.body.style.overflowY = "auto"
        })
    }
}

function unlock(id) {
    document.getElementById(id).readOnly = false
    document.getElementById(id).focus()
    if (id == "dueDateEdit") {
        document.getElementById(id).type = "datetime-local"
    }
    document.getElementById(id).disabled = false
}

function lock(id) {
    document.getElementById(id).readOnly = true
    document.getElementById(id).disabled = true
}
