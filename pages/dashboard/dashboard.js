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
let pointsAllocation = {
    1: "LOK5E3BM2F",
    2: "D9I6M85RAP",
    3: "OM6GIQ5PRT",
    4: "JC7IDMGE6Y",
    5: "WJUE48FLR3",
    6: "0HFZ2LQ7WU",
    7: "JGO6S3DFYA",
    8: "NAWH2ZF1QG",
    9: "MHV1NXEBOJ",
    10: "HRW94VU65Z",
    11: "7GMPVD30HE",
    12: "T469IXADFU",
    13: "SDZ41KJ2OT",
    14: "RXBJG3M1N8",
    15: "KR48639FW0",
    16: "ECFZOTV589",
    17: "01CZXA35Y8",
    18: "KI6LRFS7ZB",
    19: "E3SQVM9XIW",
    20: "0IH8QU57M3",
    21: "ICQ74BG25T",
    22: "GH85YKF0AU",
    23: "TXC03WMJ5N",
    24: "5UHMIJAW6P",
    25: "6QPI9NOETR",
    26: "MIDELZRN6F",
    27: "SDY0IL82EX",
    28: "OXBWTLK470",
    29: "0OXZ9Q8EST",
    30: "6H8KDSTN9L",
    31: "9SJTZFQ1C4",
    32: "VRI93KPDCX",
    33: "OFX7KVDA8Q",
    34: "48J5M2WAXF",
    35: "7L6URZ25KJ",
    36: "GS8HV2QKIU",
    37: "AEZ5T1XY9W",
    38: "RIPO61UJDM",
    39: "RK2WS1AXEI",
    40: "NLEA0IVQFO",
    41: "F9PU68A2RW",
    42: "TKY1FBO53I",
    43: "0VYNJQ928L",
    44: "WT8ESBGOIR",
    45: "KDCEMSFX52",
    46: "HPNGR4L89J",
    47: "QRNJYT7X1C",
    48: "ZYCWH4EIOP",
    49: "2P8AMHQDWV",
    50: "78VRC5FBUN"

}
document.getElementById("signUpActual2").addEventListener("click", () => {
    userRef.update({
        Online: false,
    })
    localStorage.clear()
    window.location.assign("index.html")
})
document.getElementById("signUpActual10").addEventListener("click", () => {
    userRef.update({
        Online: false,
    })
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

        document.title = `${JSON.parse(userInfo).Name.substring(0, JSON.parse(userInfo).Name.indexOf(" "))}'s Dashboard`
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
        var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
        userRef.update({
            Online: true,
        })
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
            document.getElementById("streak").innerText = doc.data().Streak
            document.getElementById('uniqueId').innerHTML = 'Your unique code: ' + doc.data().FriendId
            let j = 0
            if (doc.exists) {
                userInfoDatabase = doc.data()
                var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                if (userInfoDatabase.Recievers == null || userInfoDatabase.Recievers == undefined) {
                    userRef.update({
                        Recievers: []
                    })
                }
                if (userInfoDatabase.Requests == null || userInfoDatabase.Requests == undefined) {
                    userRef.update({
                        Requests: []
                    })
                }
                if (userInfoDatabase.Requests == null || userInfoDatabase.Requests == undefined) {
                    userRef.update({
                        Requests: []
                    })
                }
                if (userInfoDatabase.LastLogin != undefined) {
                    if (d.getDate() - userInfoDatabase.LastLogin.toDate().getDate() == 1 && d.getMonth() == userInfoDatabase.LastLogin.toDate().getMonth() && d.getFullYear() == userInfoDatabase.LastLogin.toDate().getFullYear()) {
                        userRef.update({
                            Streak: firebase.firestore.FieldValue.increment(1),
                            LastLogin: new Date()
                        })

                    } else {
                        userRef.update({
                            LastLogin: new Date()
                        })
                    }
                } else {
                    userRef.update({
                        Streak: firebase.firestore.FieldValue.increment(1),
                        LastLogin: new Date()
                    })
                }
                docRef.get().then((doc) => {
                    userInfoDatabase = doc.data()
                    document.getElementById("streak").innerText = doc.data().Streak

                })
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
                    option.value = userInfoDatabase.Tasks[i].Name
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
                    option.value = userInfoDatabase.Tasks[i].Name
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
            document.getElementById("addNewTask2").addEventListener("click", () => {
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
            document.getElementById("goalAdder").addEventListener("click", () => {
                window.scrollTo(0, 0)
                document.body.style.padding = 0
                document.body.style.overflowY = "hidden"
                document.getElementById("floater").style.display = "flex";
                document.getElementById("addGoal").style.display = "block";
                document.getElementById("cancel4").addEventListener("click", () => {
                    document.getElementById("floater").style.display = "none";
                    document.getElementById("addGoal").style.display = "none";
                    document.getElementById("goal").value = ""
                    document.body.style.overflowY = "auto"
                })
                document.getElementById("signUpActual4").addEventListener('click', () => {
                    let Goal = document.getElementById("goal").value
                    let taskManager = {
                        Goal: false,
                    }
                    if (Goal == "") {
                        taskManager.Goal = false
                    } else {
                        taskManager.Goal = true
                    }
                    if (!taskManager.Goal && document.getElementById("Invalid goal") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid goal`
                        errorNode.id = "Invalid goal"
                        errorBox.appendChild(errorNode)
                    } else if (taskManager.Goal && document.getElementById("Invalid goal") != undefined) {
                        errorBox.removeChild(document.getElementById("Invalid goal"))
                    }

                    let errorBox = document.getElementById("errors4")
                    if (taskManager.Goal) {
                        var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                        // Set the "capital" field of the city 'DC'
                        return userRef.update({
                            Goal: firebase.firestore.FieldValue.arrayUnion({
                                GoalTitle: Goal,
                                id: userInfoDatabase.Goal == null || userInfoDatabase.Goal == undefined ? 0 : userInfoDatabase.Goal.length
                            })
                        })
                            .then(() => {
                                let errorNode = document.createElement("p")
                                errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">check</span>Successfully added goal`
                                errorNode.id = "success"
                                errorBox.appendChild(errorNode)
                                setTimeout(() => {
                                    errorBox.removeChild(document.getElementById("success"))
                                    document.getElementById("floater").style.display = "none";
                                    document.getElementById("goal").style.display = "";
                                    document.getElementById("addGoal").style.display = "none";
                                    document.body.style.overflowY = "auto"
                                    updateGoalList()
                                }, 1000)
                            }).then(() => {
                                emptyFriends("goals", "")
                            })
                    }
                })

            })
        }).then(() => {
            emptyFriends("users", "noFriends")

            updateFriendUI()

            emptyFriends("goals", "").then(() => { updateGoalList() })
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
        function clearGoal(id) {
            userRef.update({
                Goal: firebase.firestore.FieldValue.arrayRemove(userInfoDatabase.Goal[id])
            })
            document.getElementById("goal" + id).style.textDecoration = "line-through"
            setTimeout(() => {
                updateGoalList()
            }, 800)

        }
        function updateGoalList() {
            emptyFriends("goals", "").then(() => {
                var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                docRef.get().then((doc) => {
                    userInfoDatabase = doc.data()
                    if (doc.exists && doc.data().Goal != undefined) {
                        let goalBox = document.getElementById("goals")
                        for (i = 0; i < doc.data().Goal.length; i++) {
                            let goal = document.createElement('div')
                            goal.classList.add("goal")
                            goal.id = i
                            goal.innerHTML = `<div>
                        <input onclick="clearGoal('${userInfoDatabase.Goal[i].id}')" type="checkbox" for="goal${userInfoDatabase.Goal[i].id}">
                        <label name="goal${userInfoDatabase.Goal[i].id}" class="poppins-regular" id="goal${userInfoDatabase.Goal[i].id}">${userInfoDatabase.Goal[i].GoalTitle}</label>
                    </div>`
                            goalBox.appendChild(goal)
                        }
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
                    document.getElementById("TopPoints").innerHTML = userInfoDatabase.Points + "$"
                } else {
                    document.getElementById("TopPoints").innerHTML = 0 + "$"
                }
            })
        }
        function updateFriendUI() {
            emptyFriends("output", "NoUsers2")
            let h = 0
            emptyFriends("output", "NoUsers2").then(() => {
                for (i = 0; i < userInfoDatabase.Friends.length; i++) {
                    if (document.getElementById(userInfoDatabase.Friends[i]) == undefined) {
                        var docRef = db.collection("users").doc(userInfoDatabase.Friends[i]);
                        let FriendInfo;
                        let FriendId
                        docRef.get().then((doc) => {
                            if (doc.exists) {
                                FriendInfo = doc.data()
                                FriendId = doc.id
                            } else {
                                userRef.update({
                                    Friends: firebase.firestore.FieldValue.arrayRemove(userInfoDatabase.Friends[i])
                                })
                            }
                        }).then(() => {
                            h += 1;
                            let friendBox = document.getElementById("output");
                            var friendElement = document.createElement('div')
                            friendElement.classList.add('userBox2')
                            friendElement.id = userInfoDatabase.Friends[i]
                            friendElement.innerHTML = `<div class="user2">
                            <div id="FriendHolder">
                                <div class="profilePictureLeader" style="background-image: url(${FriendInfo.ProfilePicture});"></div>
                                <p class="poppins-bold">${FriendInfo.Name}</p>
                            </div>
                            <div class="onlineHolder">
                                <div class="${FriendInfo.Online ? 'online' : 'offline'}"></div>
                                <p>${FriendInfo.Online ? 'Online' : 'Offline'}</p>
                            </div>
                            <button style="background-color: #ff4d4d;" onclick='RemoveFriend("${FriendId}")'>-</button>
                        </div>`
                            friendBox.appendChild(friendElement)
                        }).then(() => {
                            if (h == 0) {
                                document.getElementById("NoUsers2").style.display = "block"
                            } else {
                                document.getElementById("NoUsers2").style.display = "none"
                            }
                        })
                    }
                }
                if (h == 0) {
                    document.getElementById("NoUsers2").style.display = "block"
                } else {
                    document.getElementById("NoUsers2").style.display = "none"
                }
            })
            emptyFriends("output3", "")
            let t = 0
            emptyFriends("output3", "").then(() => {
                for (i = 0; i < userInfoDatabase.Recievers.length; i++) {
                    if (document.getElementById(userInfoDatabase.Recievers[i] + "Recievers") == undefined) {
                        var docRef = db.collection("users").doc(userInfoDatabase.Recievers[i]);
                        let FriendInfo;
                        let FriendId;
                        docRef.get().then((doc) => {
                            if (doc.exists) {
                                FriendInfo = doc.data()
                                FriendId = doc.id
                            } else {
                                userRef.update({
                                    Requests: firebase.firestore.FieldValue.arrayRemove(userInfoDatabase.Recievers[i])
                                })
                            }
                        }).then(() => {
                            t += 1;
                            let friendBox = document.getElementById("output3");
                            var friendElement = document.createElement('div')
                            friendElement.classList.add('userBox3')
                            friendElement.style.width = "55%"
                            friendElement.id = userInfoDatabase.Recievers[i] + "Sent"
                            friendElement.innerHTML = ` <div class="user2">
                            <div id="FriendHolder">
                                <div class="profilePictureLeader" style="background-image: url(${FriendInfo.ProfilePicture});"></div>
                                <p class="poppins-bold">${FriendInfo.Name}</p>
                            </div>
                            <div class="onlineHolder">
                                <div class="${FriendInfo.Online ? 'online' : 'offline'}"></div>
                                <p>${FriendInfo.Online ? 'Online' : 'Offline'}</p>
                            </div>
                            <div>
                                <button style="background-color: #32ce2a;" onclick='AcceptRequest("${FriendId}")'>Accept</button>
                                <button style="background-color: #ff4d4d;" onclick='RejectRequest("${FriendId}")'>Reject</button>
                            </div>
                        </div>`
                            friendBox.appendChild(friendElement)
                        }).then(() => {
                            if (t == 0) {
                                document.getElementById("Requests").style.display = "none"
                                document.getElementById("output3").style.display = "none"
                            } else {
                                document.getElementById("Requests").style.display = "block"
                                document.getElementById("output3").style.display = "flex"
                            }
                        })
                    }
                } if (t == 0) {
                    document.getElementById("Requests").style.display = "none"
                    document.getElementById("output3").style.display = "none"
                } else {
                    document.getElementById("Requests").style.display = "block"
                    document.getElementById("output3").style.display = "flex"
                }
            })

            emptyFriends("output4", "")
            let u = 0
            emptyFriends("output4", "").then(() => {
                for (i = 0; i < userInfoDatabase.Requests.length; i++) {
                    if (document.getElementById(userInfoDatabase.Requests[i] + "Sent") == undefined) {
                        var docRef = db.collection("users").doc(userInfoDatabase.Requests[i]);
                        let FriendInfo;
                        let FriendId;
                        docRef.get().then((doc) => {
                            if (doc.exists) {
                                FriendInfo = doc.data()
                                FriendId = doc.id
                            } else {
                                userRef.update({
                                    Requests: firebase.firestore.FieldValue.arrayRemove(userInfoDatabase.Requests[i])
                                })
                            }
                        }).then(() => {
                            u += 1;
                            let friendBox = document.getElementById("output4");
                            var friendElement = document.createElement('div')
                            friendElement.classList.add('userBox3')
                            friendElement.style.width = "50%"
                            friendElement.id = userInfoDatabase.Requests[i] + "Sent"
                            friendElement.innerHTML = `<div class="user2">
                            <div id="FriendHolder">
                                <div class="profilePictureLeader" style="background-image:url('${FriendInfo.ProfilePicture}')"></div>
                                <p class="poppins-bold">${FriendInfo.Name}</p>
                            </div>
                            <div class="onlineHolder">
                                <div class="pending"></div>
                                <p>Pending</p>
                            </div>
                            <div>
                                <button style="background-color: #ff4d4d;" onclick='cancelRequest("${FriendId}")'>Cancel</button>
                            </div>
                        </div>`
                            friendBox.appendChild(friendElement)
                        }).then(() => {
                            if (u == 0) {
                                document.getElementById("YourRequests").style.display = "none"
                                document.getElementById("output4").style.display = "none"
                            } else {
                                document.getElementById("YourRequests").style.display = "block"
                                document.getElementById("output4").style.display = "flex"
                            }
                        })
                    }
                }
                if (u == 0) {
                    document.getElementById("YourRequests").style.display = "none"
                    document.getElementById("output4").style.display = "none"
                } else {
                    document.getElementById("YourRequests").style.display = "block"
                    document.getElementById("output4").style.display = "flex"
                }
            })
            updateMainFriendUI()
        }
        function updateMainFriendUI() {
            emptyFriends("users", "noFriends")
            let o = 0
            emptyFriends("users", "noFriends").then(() => {
                let Friends = userInfoDatabase.Friends.sort((a, b) => {

                    var docRef = db.collection("users").doc(a);
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            a = doc.data()
                        } else {
                            userRef.update({
                                Friends: firebase.firestore.FieldValue.arrayRemove(Friends[i])
                            })
                        }
                    })
                    var docRefB = db.collection("users").doc(b);
                    docRefB.get().then((doc) => {
                        if (doc.exists) {
                            b = doc.data()
                        } else {
                            userRef.update({
                                Friends: firebase.firestore.FieldValue.arrayRemove(Friends[i])
                            })
                        }
                    })
                    return a.Points - b.Points;
                })
                for (i = 0; i < Friends.length; i++) {
                    if (document.getElementById(Friends[i]) == undefined) {
                        var docRef = db.collection("users").doc(Friends[i]);
                        let FriendInfo2;
                        let FriendId2
                        docRef.get().then((doc) => {
                            if (doc.exists) {
                                FriendInfo2 = doc.data()
                                FriendId2 = doc.id
                            } else {
                                userRef.update({
                                    Friends: firebase.firestore.FieldValue.arrayRemove(Friends[i])
                                })
                            }
                        }).then(() => {
                            o += 1;

                            let friendBox = document.getElementById("users");
                            var friendElement = document.createElement('div')
                            friendElement.classList.add('user')
                            friendElement.id = Friends[i]
                            friendElement.innerHTML = `<div class="user">
                        <div id="FriendHolder">
                        <p class="rank">${Friends.indexOf(FriendId2) + 1}</p>
                            <div class="profilePictureLeader" style="background-image: url(${FriendInfo2.ProfilePicture});"></div>
                            <p class="poppins-bold">${FriendInfo2.Name}</p>
                        </div>
                        <div class="onlineHolder">
                            <div class="${FriendInfo2.Online ? 'online' : 'offline'}"></div>
                            <p>${FriendInfo2.Online ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>`
                            friendBox.appendChild(friendElement)
                        }).then(() => {
                            if (o == 0) {
                                document.getElementById("noFriends").style.display = "block"
                            } else {
                                document.getElementById("noFriends").style.display = "none"
                            }
                        })
                    }
                }
                if (o == 0) {
                    document.getElementById("noFriends").style.display = "block"
                } else {
                    document.getElementById("noFriends").style.display = "none"
                }
            })
        }
        async function emptyFriends(boxToEmpty, ErrorNode) {
            for (i = 0; i < document.getElementById(boxToEmpty).children.length; i++) {
                if (document.getElementById(boxToEmpty).children.item(i) != document.getElementById(ErrorNode)) {
                    document.getElementById(boxToEmpty).removeChild(document.getElementById(boxToEmpty).children.item(i))
                }
            }
            return "Done"
        }


        function cancelRequest(id) {
            var friendRef = db.collection("users").doc(id)
            friendRef.update({
                Recievers: firebase.firestore.FieldValue.arrayRemove(JSON.parse(userInfo).Email)
            })
            userRef.update({
                Requests: firebase.firestore.FieldValue.arrayRemove(id)
            })
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
            }).then(() => {
                updateFriendUI()
            })
        }
        function RejectRequest(id) {
            var friendRef = db.collection("users").doc(id)
            friendRef.update({
                Requests: firebase.firestore.FieldValue.arrayRemove(JSON.parse(userInfo).Email)
            })
            userRef.update({
                Recievers: firebase.firestore.FieldValue.arrayRemove(id)
            })
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
            }).then(() => {
                updateFriendUI()
            })
        }
        function AcceptRequest(id) {
            var friendRef = db.collection("users").doc(id)
            friendRef.update({
                Requests: firebase.firestore.FieldValue.arrayRemove(JSON.parse(userInfo).Email),
                Friends: firebase.firestore.FieldValue.arrayUnion(JSON.parse(userInfo).Email)
            })
            userRef.update({
                Recievers: firebase.firestore.FieldValue.arrayRemove(id),
                Friends: firebase.firestore.FieldValue.arrayUnion(id)
            })
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
            }).then(() => {
                updateFriendUI()
            })
        }
        function RemoveFriend(id) {
            var friendRef = db.collection("users").doc(id)
            friendRef.update({
                Friends: firebase.firestore.FieldValue.arrayRemove(JSON.parse(userInfo).Email)
            })
            userRef.update({
                Friends: firebase.firestore.FieldValue.arrayRemove(id)
            })
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
            }).then(() => {
                updateFriendUI()
            })
        }
        function addFriend(FriendId) {
            let FriendIdInput = document.getElementById(FriendId + "UniqueId").value
            var docRef = db.collection("users").doc(FriendId);
            var docRefSelf = db.collection("users").doc(JSON.parse(userInfo).Email)
            docRef.get().then((doc) => {
                if (doc.data().FriendId == FriendIdInput) {
                    docRefSelf.update({
                        Requests: firebase.firestore.FieldValue.arrayUnion(
                            FriendId
                        )
                    })

                    docRef.update({
                        Recievers: firebase.firestore.FieldValue.arrayUnion(
                            JSON.parse(userInfo).Email)
                    })

                    docRefSelf.get().then((doc) => {
                        if (doc.exists) {
                            userInfoDatabase = doc.data()
                        }
                    }).then(() => {
                        updateFriendUI()
                    })
                    var errorBox = document.getElementById("errors3")
                    if (document.getElementById("Your friend has not completed onboarding") != undefined) {
                        errorBox.removeChild(document.getElementById("Your friend has not completed onboarding"))
                    }
                    if (document.getElementById("Incorrect friend user id") != undefined) {
                        errorBox.removeChild(document.getElementById("Incorrect friend user id"))
                    }
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">check</span>Successfully sent request`
                    errorNode.id = "success"
                    errorBox.appendChild(errorNode)
                    setTimeout(() => {
                        document.getElementById("search").value = ""
                        errorBox.removeChild(document.getElementById("success"))
                    }, 500)
                    if (document.getElementById("Incorrect friend user id") != undefined) {
                        var errorBox = document.getElementById("errors3")
                        errorBox.removeChild(document.getElementById("Incorrect friend user id"))
                    }
                    if (document.getElementById("Your friend has not completed onboarding") != undefined) {
                        var errorBox = document.getElementById("errors3")
                        errorBox.removeChild(document.getElementById("Your friend has not completed onboarding"))
                    }
                    document.getElementById("Results").style.display = "none"
                    document.getElementById("output2").style.display = "none"
                    document.getElementById("Your-Friends").style.display = "block"
                    document.getElementById("output").style.display = "flex"
                    document.getElementById("Requests").style.display = "block"
                    document.getElementById("output3").style.display = "flex"
                    document.getElementById("YourRequests").style.display = "block"
                    document.getElementById("output4").style.display = "flex"



                } else if (doc.data().FriendId == undefined || doc.data().FriendId == null) {
                    var errorBox = document.getElementById("errors3")
                    if (document.getElementById("Your friend has not completed onboarding") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Your friend has not completed onboarding`
                        errorNode.id = "Your friend has not completed onboarding"
                        errorBox.appendChild(errorNode)
                    } else if (document.getElementById("Your friend has not completed onboarding") != undefined) {
                        errorBox.removeChild(document.getElementById("Your friend has not completed onboarding"))
                    }
                } else {
                    var errorBox = document.getElementById("errors3")
                    if (document.getElementById("Incorrect friend user id") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Incorrect code`
                        errorNode.id = "Incorrect friend user id"
                        errorBox.appendChild(errorNode)
                    } else if (document.getElementById("Incorrect friend user id") != undefined) {
                        errorBox.removeChild(document.getElementById("Incorrect friend user id"))
                    }
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
            document.getElementById("YourRequests").style.display = "block"
            document.getElementById("output4").style.display = "flex"
            document.getElementById("search").value = ""
            window.scrollTo(0, 0)
            document.body.style.overflowY = "hidden"
            updateFriendUI()

            document.getElementById("search").addEventListener('change', () => {
                empty()
                let g = 0;
                if (document.getElementById("Incorrect friend user id") != undefined) {
                    var errorBox = document.getElementById("errors3")
                    errorBox.removeChild(document.getElementById("Incorrect friend user id"))
                }
                if (document.getElementById("Your friend has not completed onboarding") != undefined) {
                    var errorBox = document.getElementById("errors3")
                    errorBox.removeChild(document.getElementById("Your friend has not completed onboarding"))
                }

                async function empty() {
                    for (i = 0; i < document.getElementById("output2").children.length; i++) {
                        if (document.getElementById("output2").children.item(i) != document.getElementById("NoUsers")) {
                            document.getElementById("output2").removeChild(document.getElementById("output2").children.item(i))
                        }
                    }
                    return "Done"
                }

                empty().then(() => {
                    if (document.getElementById("search").value.trim() != "") {
                        var userBox = document.getElementById("output2")
                        document.getElementById("Results").style.display = "block"
                        document.getElementById("output2").style.display = "flex"
                        document.getElementById("Your-Friends").style.display = "none"
                        document.getElementById("output").style.display = "none"
                        document.getElementById("Requests").style.display = "none"
                        document.getElementById("output3").style.display = "none"
                        document.getElementById("YourRequests").style.display = "none"
                        document.getElementById("output4").style.display = "none"
                        var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);

                        docRef.get().then((doc) => {
                            if (doc.exists) {
                                userInfoDatabase = doc.data()
                            }
                        })
                        db.collection("users").get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (doc.data().Name.toUpperCase().includes(document.getElementById("search").value.toUpperCase()) && doc.data().Name != userInfoDatabase.Name && !userInfoDatabase.Requests.includes(doc.id) && !userInfoDatabase.Recievers.includes(doc.id)) {
                                    g += 1;
                                    var user = document.createElement('div')
                                    user.classList.add('userBox')
                                    user.id = doc.id
                                    user.innerHTML = `<div class="user2">
                            <div id="FriendHolder">
                                <div class="profilePictureLeader" style="background-image:url(${doc.data().ProfilePicture})"></div>
                                <p class="poppins-bold">${doc.data().Name}</p>
                            </div>
                            <div class="onlineHolder">
                                <div class="${doc.data().Online == true ? 'online' : 'offline'}"></div>
                                <p>${doc.data().Online == true ? 'Online' : 'Offline'}</p>
                            </div>
                            <button onclick="addFriend('${doc.id}')">+</button>
                        </div>
                        <div class="input">
                            <input name="${doc.id}UniqueId" id="${doc.id}UniqueId" type="text" placeholder="Friends unique code">
                        </div>`
                                    if (document.getElementById(user.id) == null) {
                                        userBox.appendChild(user)
                                    }
                                }
                            })
                                ;
                        }).then(() => {
                            if (g == 0) {
                                document.getElementById("NoUsers").style.display = "block"
                            } else {
                                document.getElementById("NoUsers").style.display = "none"
                            }
                        })
                    } else {
                        updateFriendUI()
                        document.getElementById("Results").style.display = "none"
                        document.getElementById("output2").style.display = "none"
                        document.getElementById("Your-Friends").style.display = "block"
                        document.getElementById("output").style.display = "flex"
                        document.getElementById("Requests").style.display = "block"
                        document.getElementById("output3").style.display = "flex"
                        document.getElementById("YourRequests").style.display = "block"
                        document.getElementById("output4").style.display = "flex"
                    }
                })

            })
        })

        document.getElementById("cancel3").addEventListener('click', () => {
            document.getElementById("floater").style.display = "none"
            document.getElementById("addingFriends").style.display = "none"
            document.body.style.overflowY = "auto"
        })
        document.getElementById("cancel6").addEventListener('click', () => {
            document.body.removeChild(getElementById("timer"))
            document.getElementById("timer").innerHTML = ''
            document.getElementById("BankPoints").innerHTML = ''
            document.getElementById("stellarPoints").value = ''
            document.getElementById("floater").style.display = "none"
            document.getElementById("Bank").style.display = "none"
            document.body.style.overflowY = "auto"
        })
        document.getElementById("stellarPoints").addEventListener(`change`, () => {

            let taskManager = {
                amount: false
            }
            var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
            })

            if (document.getElementById("stellarPoints").value > userInfoDatabase.Points || document.getElementById("stellarPoints").value > 300000) {
                taskManager.amount = false;
                let errorBox = document.getElementById("errors5")
                if (document.getElementById("Invalid amount") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid amount`
                    errorNode.id = "Invalid amount"
                    errorBox.appendChild(errorNode)
                } else {
                    errorBox.removeChild(document.getElementById("Invalid amount"))

                }
            } else {
                document.getElementById("BankPoints").innerHTML = document.getElementById("stellarPoints").value + 'SP = ' + "$" + Math.floor(document.getElementById("stellarPoints").value / 6000)
                taskManager.amount = true
            }
            document.getElementById("signUpActual5").addEventListener('click', () => {
                if (taskManager.amount && document.getElementById("stellarPoints").value > 0) {
                    userRef.update({
                        Points: firebase.firestore.FieldValue.increment(-1 * parseInt(document.getElementById("stellarPoints").value))
                    }).then(() => {
                        document.getElementById("BankPoints").innerHTML = `Your promo code is ${pointsAllocation[Math.floor(document.getElementById("stellarPoints").value / 6000)]}`
                        let time = 5
                        setInterval(() => {
                            document.getElementById("timer").innerHTML = "This will close in " + time + "s"
                            time--;
                            if (time == 0) {
                                window.clearInterval()
                                window.
                                document.getElementById("timer").innerHTML = ''
                                document.getElementById("BankPoints").innerHTML = ''
                                document.getElementById("stellarPoints").value  = ''
                                document.getElementById("floater").style.display = "none"
                                document.getElementById("Bank").style.display = "none"
                                document.body.style.overflowY = "auto"
                            }
                        }, 1000)
                    }).then(() => {
                        updatePoints()
                    })
                }

            })
        })
        document.getElementById("BankApp").addEventListener('click', () => {
            document.getElementById("floater").style.display = "flex"
            document.getElementById("Bank").style.display = "flex"
            window.scrollTo(0, 0)
            document.body.style.overflowY = "hidden"
            document.getElementById("BankPoints").innerHTML = 6000 + "SP = " + "$" + 1 + " - Only whole dollars are calculated"
        })

        document.getElementById("ProfileApp").addEventListener('click', () => {
            document.getElementById("floater").style.display = "flex"
            document.getElementById("profileView").style.display = "flex"
            document.getElementById("profilePicture2").style.backgroundImage =`url("${JSON.parse(userInfo).ProfilePicture}")`
            document.getElementById("header2").style.backgroundImage = `${JSON.parse(userInfo).Name}`
            window.scrollTo(0, 0)
            document.body.style.overflowY = "hidden"
        })

        document.getElementById("cancel5").addEventListener('click', () => {
            db.collection("users").doc(JSON.parse(userInfo).Email).delete().then(() => {
                localStorage.clear()
                window.location.assign('index.html')
            })

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


