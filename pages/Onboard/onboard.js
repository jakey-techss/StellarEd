
let userInfo = window.localStorage.getItem("currentUserInfo")
if (userInfo == null) {
    window.location.assign("index.html")
} else {
    if (JSON.parse(userInfo).Onboard == true) {
        window.location.assign("dashboard.html")
    }
}
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
let classNumber = 1
document.getElementById("classNumber").addEventListener("change", () => {
    let container = document.getElementById("Options")
    if (document.getElementById("classNumber").value > classNumber) {
        for (i = 0; classNumber < document.getElementById("classNumber").value; i++) {
            classNumber++
            let newClass = document.createElement('div')
            newClass.classList.add('class')
            newClass.innerHTML = `
        <div class="input" style="width: 80%;">
                        <label for="hobbies">Class #${classNumber} Name</label>
                        <input name="hobbies" type="text" id="class${classNumber}Name" placeholder="AP Language and Composition">
                    </div>
                    <div class="input">
                        <label for="days">When</label>
                        <div id="days${classNumber}" class="days">
                            <div class="day">
                                <input type="checkbox" id ="MondayCL${classNumber}" name="Monday">Monday
                            </div>
                            <div class="day">
                                <input type="checkbox" id="TuesdayCL${classNumber}" name="Tuesday">Tuesday
                            </div>
                            <div class="day">
                                <input type="checkbox" id="WednesdayCL${classNumber}" name="Wednesday">Wednesday
                            </div>
                            <div class="day">
                                <input type="checkbox" id="ThursdayCL${classNumber}" name="Thursday">Thursday
                            </div>
                            <div class="day">
                                <input type="checkbox" id="FridayCL${classNumber}" name="Friday">Friday
                            </div>
                            <div class="day">
                                <input type="checkbox" id="SaturdayCL${classNumber}" name="Saturday">Saturday
                            </div>
                            <div class="day">
                                <input type="checkbox" id="SundayCL${classNumber}" name="Sunday">Sunday
                            </div>
                        </div>
                    </div>
                    <div class="input" style="width: 80%;">
                        <label for="location">Where</label>
                        <input name="location" id="whereCL${classNumber}" type="text" placeholder="Room A311">
                    </div>
                    <div class="input">
                        <label for="time">Class #${classNumber} Start Time</label>
                        <div>
                            <input type="time" name="time" id="S-timeCL${classNumber}" style="width: 80%;">
                        </div>
                    </div>
                    <div class="input">
                        <label for="time">Class #${classNumber} End Time</label>
                        <div>
                            <input type="time" name="time" id="E-timeCL${classNumber}" style="width: 80%;">
                        </div>
                    </div>
                    <div class="input" style="width: 80%;">
                        <label for="time">Class #${classNumber} Difficulty</label>
                        <select id="diffCL${classNumber}" name="diff">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Nightmare">Nightmare</option>
                        </select>
                    </div>
                    `
            container.appendChild(newClass)
        }
    }
    else {
        for (i = classNumber; classNumber > document.getElementById("classNumber").value; i--) {
            classNumber--
            container.removeChild(container.lastElementChild)
        }
    }
}
)
document.getElementById("hobbies").addEventListener("keypress", (e) => {
    let container = document.getElementById("HobbiesHolder")
    if (e.code == "Enter") {
        //<div class="tag">Coding<span class="material-icons">close</span></div>
        if (document.getElementById("hobbies").value.trim().length > 0 && document.getElementById("HobbiesHolder").children.namedItem(document.getElementById("hobbies").value.trim().toLowerCase()) == null) {
            let hobby = document.createElement("div");
            hobby.classList.add("tag")
            hobby.id = document.getElementById("hobbies").value.trim().toLowerCase()
            hobby.innerHTML = `${document.getElementById("hobbies").value}<span class="material-icons" id="${document.getElementById("hobbies").value.trim().toUpperCase()}">close</span>`
            container.appendChild(hobby)
            document.getElementById(document.getElementById("hobbies").value.trim().toUpperCase()).addEventListener("click", () => { remove(hobby.id) })
            document.getElementById("hobbies").value = ""
        }
    }
    function remove(id) {
        document.getElementById("HobbiesHolder").removeChild(document.getElementById(id))
    }
})
let loadingMessages = [
    "Tasks loading... faster than you can say 'I'll do it tomorrow'",
    "Organizing your life... one task at a time",
    "Connecting... to the mother ship, or just the WiFi",
    "Caffeine levels: low. Tasks: many. Hang in there!",
    "Loading... don't worry, your tasks won't judge you",
    "Fetching tasks... and trying to find motivation",
    "Almost there... just like your deadlines",
    "Prioritizing... Netflix doesn't count as a task",
    "Tasks loading... don't worry, panic mode is optional",
    "Tasks ahead, anxiety optional",
    "Prioritizing: school, sleep, social life... choose two",
    "Loading... don't @ me",
    "Procrastination is an art, and you're a masterpiece",
    "Adulting hack: just pretend you know what you're doing",
    "You're not lazy, you're just on energy-saving mode"
]
let index = 0
document.getElementById("signUpActual").addEventListener("click", () => {
    let crossCheck = {
        class1: true,
        class2: 2,
        class3: 2,
        class4: 2,
        class5: 2,
        class6: 2,
        class7: 2,
        class8: 2,
        class9: 2,
        class10: 2,
        class11: 2
    }
    document.getElementById("AllContentBox").style.filter = "blur(20px)";
    document.getElementById("animationLoad").style.visibility = "visible";
    document.getElementById("signUpActual").style.backgroundColor = "hsl(261 41 31)";
    setTimeout(() => {
        document.getElementById("signUpActual").style.backgroundColor = "#5C3E94"
        window.scrollTo(0, 0)
        document.body.style.overflowY = "hidden"
    }, 70)
    setInterval(function () {
        if (index > loadingMessages.length - 1) {
            index = 0;
        }
        document.getElementById("loadingText").innerHTML = loadingMessages[index]; index++
    }, 6300)
    for (i = 1; i <= document.getElementById("classNumber").value; i++) {
        let ClassName = document.getElementById(`class${i}Name`).value
        let MondayClicked = document.getElementById(`MondayCL${i}`).checked
        let TuesdayClicked = document.getElementById(`TuesdayCL${i}`).checked
        let WednesdayClicked = document.getElementById(`WednesdayCL${i}`).checked
        let ThursdayClicked = document.getElementById(`ThursdayCL${i}`).checked
        let FridayClicked = document.getElementById(`FridayCL${i}`).checked
        let SaturdayClicked = document.getElementById(`SaturdayCL${i}`).checked
        let SundayClicked = document.getElementById(`SundayCL${i}`).checked
        let Where = document.getElementById(`whereCL${i}`).value
        let startTime = document.getElementById(`S-timeCL${i}`).value
        let endTime = document.getElementById(`E-timeCL${i}`).value
        let diff = document.getElementById(`diffCL1`).value

        if (ClassName == "") {
            document.getElementById(`class${i}Name`).style.border = '1px solid red'
        } else {
            document.getElementById(`class${i}Name`).style.border = 'none'
        }
        if (Where == "") {
            document.getElementById(`whereCL${i}`).style.border = '1px solid red'
        } else {
            document.getElementById(`whereCL${i}`).style.border = 'none'
        }
        if (startTime == "") {
            document.getElementById(`S-timeCL${i}`).style.border = '1px solid red'
        } else {
            document.getElementById(`S-timeCL${i}`).style.border = 'none'
        }
        if (endTime == "") {
            document.getElementById(`E-timeCL${i}`).style.border = '1px solid red'
        } else {
            document.getElementById(`E-timeCL${i}`).style.border = 'none'
        }
        if (!(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked)) {
            document.getElementById(`days${i}`).style.border = '1px solid red'
        } else {
            document.getElementById(`days${i}`).style.border = 'none'
        }
        if (i == 1) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class1 = false
            } else {
                crossCheck.class1 = true
            }
        } else if (i == 2) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class2 = false
            } else {
                crossCheck.class2 = true
            }
        } else if (i == 3) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class3 = false
            } else {
                crossCheck.class3 = true
            }
        } else if (i == 4) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class4 = false
            } else {
                crossCheck.class4 = true
            }
        } else if (i == 5) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class5 = false
            } else {
                crossCheck.class5 = true
            }
        } else if (i == 6) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class6 = false
            } else {
                crossCheck.class6 = true
            }
        } else if (i == 7) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class7 = false
            } else {
                crossCheck.class7 = true
            }
        } else if (i == 8) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class8 = false
            } else {
                crossCheck.class8 = true
            }
        } else if (i == 9) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class9 = false
            } else {
                crossCheck.class9 = true
            }
        } else if (i == 10) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class10 = false
            } else {
                crossCheck.class10 = true
            }
        } else if (i == 11) {
            if (endTime == "" || startTime == "" || Where == "" || !(MondayClicked || TuesdayClicked || WednesdayClicked || ThursdayClicked || FridayClicked || SaturdayClicked || SundayClicked) || ClassName == "") {
                crossCheck.class11 = false
            } else {
                crossCheck.class11 = true
            }
        }
    }
    setTimeout(() => {
        window.scrollTo(0, 1)
        document.getElementById("AllContentBox").style.filter = "none";
        document.getElementById("animationLoad").style.visibility = "hidden";
        document.body.style.overflowY = "auto"
        document.getElementById("nav").style.display.backgroundColor = "white";
        let errorBox = document.getElementById("errors")
        let hobbies = []
        for (i = 0; i < document.getElementById("HobbiesHolder").children.length; i++) {
            hobbies.push(document.getElementById("HobbiesHolder").children.item(i).innerText)
        }
        if (!crossCheck.class1 && document.getElementById("Information provided in Class 1 cannot be validated") == undefined) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 1 cannot be validated`
            errorNode.id = "Information provided in Class 1 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class1 && document.getElementById("Information provided in Class 1 cannot be validated") != undefined) {
            errorBox.removeChild(document.getElementById("Information provided in Class 1 cannot be validated"))
        }

        if (!crossCheck.class2 && document.getElementById("Information provided in Class 2 cannot be validated") == undefined && crossCheck.class2 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 2 cannot be validated`
            errorNode.id = "Information provided in Class 2 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class2 && document.getElementById("Information provided in Class 2 cannot be validated") != undefined && crossCheck.class2 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 2 cannot be validated"))
        }

        if (!crossCheck.class3 && document.getElementById("Information provided in Class 3 cannot be validated") == undefined && crossCheck.class3 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 3 cannot be validated`
            errorNode.id = "Information provided in Class 3 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class3 && document.getElementById("Information provided in Class 3 cannot be validated") != undefined && crossCheck.class3 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 3 cannot be validated"))
        }

        if (!crossCheck.class4 && document.getElementById("Information provided in Class 4 cannot be validated") == undefined && crossCheck.class4 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 4 cannot be validated`
            errorNode.id = "Information provided in Class 4 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class4 && document.getElementById("Information provided in Class 4 cannot be validated") != undefined && crossCheck.class4 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 4 cannot be validated"))
        }
        if (!crossCheck.class5 && document.getElementById("Information provided in Class 5 cannot be validated") == undefined && crossCheck.class5 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 5 cannot be validated`
            errorNode.id = "Information provided in Class 5 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class5 && document.getElementById("Information provided in Class 5 cannot be validated") != undefined && crossCheck.class5 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 5 cannot be validated"))
        }
        if (!crossCheck.class6 && document.getElementById("Information provided in Class 6 cannot be validated") == undefined && crossCheck.class6 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 6 cannot be validated`
            errorNode.id = "Information provided in Class 6 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class6 && document.getElementById("Information provided in Class 6 cannot be validated") != undefined && crossCheck.class6 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 6 cannot be validated"))
        }
        if (!crossCheck.class7 && document.getElementById("Information provided in Class 7 cannot be validated") == undefined && crossCheck.class7 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 7 cannot be validated`
            errorNode.id = "Information provided in Class 7 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class7 && document.getElementById("Information provided in Class 7 cannot be validated") != undefined && crossCheck.class7 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 7 cannot be validated"))
        }
        if (!crossCheck.class8 && document.getElementById("Information provided in Class 8 cannot be validated") == undefined && crossCheck.class8 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 8 cannot be validated`
            errorNode.id = "Information provided in Class 8 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class8 && document.getElementById("Information provided in Class 8 cannot be validated") != undefined && crossCheck.class8 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 8 cannot be validated"))
        }
        if (!crossCheck.class9 && document.getElementById("Information provided in Class 9 cannot be validated") == undefined && crossCheck.class9 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 9 cannot be validated`
            errorNode.id = "Information provided in Class 9 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class9 && document.getElementById("Information provided in Class 9 cannot be validated") != undefined && crossCheck.class9 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 9 cannot be validated"))
        }
        if (!crossCheck.class10 && document.getElementById("Information provided in Class 10 cannot be validated") == undefined && crossCheck.class10 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 10 cannot be validated`
            errorNode.id = "Information provided in Class 10 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class10 && document.getElementById("Information provided in Class 10 cannot be validated") != undefined && crossCheck.class10 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 10 cannot be validated"))
        }
        if (!crossCheck.class11 && document.getElementById("Information provided in Class 11 cannot be validated") == undefined && crossCheck.class11 == false) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Information provided in Class 11 cannot be validated`
            errorNode.id = "Information provided in Class 11 cannot be validated"
            errorBox.appendChild(errorNode)
        } else if (crossCheck.class11 && document.getElementById("Information provided in Class 11 cannot be validated") != undefined && crossCheck.class11 == true) {
            errorBox.removeChild(document.getElementById("Information provided in Class 11 cannot be validated"))
        }
        if (!document.getElementById("HobbiesHolder").children.length >= 1 && document.getElementById("You must include at least 1 hobby") == undefined) {
            let errorNode = document.createElement("p")
            errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>You must include at least 1 hobby`
            errorNode.id = "You must include at least 1 hobby"
            errorBox.appendChild(errorNode)
        } else if (document.getElementById("HobbiesHolder").children.length >= 1 && document.getElementById("You must include at least 1 hobby") != undefined) {
            errorBox.removeChild(document.getElementById("You must include at least 1 hobby"))
        }
        if (crossCheck.class1 == true && document.getElementById("classNumber").value > 1 && document.getElementById("HobbiesHolder").children.length >= 1) {
            if (document.getElementById("classNumber").value > 2 && crossCheck.class2 == true) {
                if (document.getElementById("classNumber").value > 3 && crossCheck.class3 == true) {
                    if (document.getElementById("classNumber").value > 4 && crossCheck.class4 == true) {
                        if (document.getElementById("classNumber").value > 5 && crossCheck.class5 == true) {
                            if (document.getElementById("classNumber").value > 6 && crossCheck.class6 == true) {
                                if (document.getElementById("classNumber").value > 7 && crossCheck.class7 == true) {
                                    if (document.getElementById("classNumber").value > 8 && crossCheck.class8 == true) {
                                        if (document.getElementById("classNumber").value > 9 && crossCheck.class9 == true) {
                                            if (document.getElementById("classNumber").value > 10 && crossCheck.class10 == true) {
                                                if (document.getElementById("classNumber").value == 11 && crossCheck.class11 == true) {
                                                    var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                                                    window.clearInterval()
                                                    document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                                                    setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                                                    return userRef.update({
                                                        Onboard: true,
                                                        Tasks: {
                                                            1: {
                                                                Name: document.getElementById("class1Name").value,
                                                                When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL1").value,
                                                                End: document.getElementById("E-timeCL1").value,
                                                                Difficulty: document.getElementById("diffCL1").value,
                                                            },
                                                            2: {
                                                                Name: document.getElementById("class2Name").value,
                                                                When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL2").value,
                                                                End: document.getElementById("E-timeCL2").value,
                                                                Difficulty: document.getElementById("diffCL2").value,
                                                            },
                                                            3: {
                                                                Name: document.getElementById("class3Name").value,
                                                                When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL3").value,
                                                                End: document.getElementById("E-timeCL3").value,
                                                                Difficulty: document.getElementById("diffCL3").value,
                                                            },
                                                            4: {
                                                                Name: document.getElementById("class4Name").value,
                                                                When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL4").value,
                                                                End: document.getElementById("E-timeCL4").value,
                                                                Difficulty: document.getElementById("diffCL4").value,
                                                            },
                                                            5: {
                                                                Name: document.getElementById("class5Name").value,
                                                                When: [document.getElementById("MondayCL5").checked ? "Monday" : "", document.getElementById("TuesdayCL5").checked ? "Tuesday" : "", document.getElementById("WednesdayCL5").checked ? "Wednesday" : "", document.getElementById("ThursdayCL5").checked ? "Thursday" : "", document.getElementById("FridayCL5").checked ? "Friday" : "", document.getElementById("SaturdayCL5").checked ? "Saturday" : "", document.getElementById("SundayCL5").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL5").value,
                                                                End: document.getElementById("E-timeCL5").value,
                                                                Difficulty: document.getElementById("diffCL5").value,
                                                            },
                                                            6: {
                                                                Name: document.getElementById("class6Name").value,
                                                                When: [document.getElementById("MondayCL6").checked ? "Monday" : "", document.getElementById("TuesdayCL6").checked ? "Tuesday" : "", document.getElementById("WednesdayCL6").checked ? "Wednesday" : "", document.getElementById("ThursdayCL6").checked ? "Thursday" : "", document.getElementById("FridayCL6").checked ? "Friday" : "", document.getElementById("SaturdayCL6").checked ? "Saturday" : "", document.getElementById("SundayCL6").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL6").value,
                                                                End: document.getElementById("E-timeCL6").value,
                                                                Difficulty: document.getElementById("diffCL6").value,
                                                            },
                                                            7: {
                                                                Name: document.getElementById("class7Name").value,
                                                                When: [document.getElementById("MondayCL7").checked ? "Monday" : "", document.getElementById("TuesdayCL7").checked ? "Tuesday" : "", document.getElementById("WednesdayCL7").checked ? "Wednesday" : "", document.getElementById("ThursdayCL7").checked ? "Thursday" : "", document.getElementById("FridayCL7").checked ? "Friday" : "", document.getElementById("SaturdayCL7").checked ? "Saturday" : "", document.getElementById("SundayCL7").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL7").value,
                                                                End: document.getElementById("E-timeCL7").value,
                                                                Difficulty: document.getElementById("diffCL7").value,
                                                            },
                                                            8: {
                                                                Name: document.getElementById("class8Name").value,
                                                                When: [document.getElementById("MondayCL8").checked ? "Monday" : "", document.getElementById("TuesdayCL8").checked ? "Tuesday" : "", document.getElementById("WednesdayCL8").checked ? "Wednesday" : "", document.getElementById("ThursdayCL8").checked ? "Thursday" : "", document.getElementById("FridayCL8").checked ? "Friday" : "", document.getElementById("SaturdayCL8").checked ? "Saturday" : "", document.getElementById("SundayCL8").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL8").value,
                                                                End: document.getElementById("E-timeCL8").value,
                                                                Difficulty: document.getElementById("diffCL8").value,
                                                            },
                                                            9: {
                                                                Name: document.getElementById("class9Name").value,
                                                                When: [document.getElementById("MondayCL9").checked ? "Monday" : "", document.getElementById("TuesdayCL9").checked ? "Tuesday" : "", document.getElementById("WednesdayCL9").checked ? "Wednesday" : "", document.getElementById("ThursdayCL9").checked ? "Thursday" : "", document.getElementById("FridayCL9").checked ? "Friday" : "", document.getElementById("SaturdayCL9").checked ? "Saturday" : "", document.getElementById("SundayCL9").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL9").value,
                                                                End: document.getElementById("E-timeCL9").value,
                                                                Difficulty: document.getElementById("diffCL9").value,
                                                            },
                                                            10: {
                                                                Name: document.getElementById("class10Name").value,
                                                                When: [document.getElementById("MondayCL10").checked ? "Monday" : "", document.getElementById("TuesdayCL10").checked ? "Tuesday" : "", document.getElementById("WednesdayCL10").checked ? "Wednesday" : "", document.getElementById("ThursdayCL10").checked ? "Thursday" : "", document.getElementById("FridayCL10").checked ? "Friday" : "", document.getElementById("SaturdayCL10").checked ? "Saturday" : "", document.getElementById("SundayCL10").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL10").value,
                                                                End: document.getElementById("E-timeCL10").value,
                                                                Difficulty: document.getElementById("diffCL10").value,
                                                            },
                                                            11: {
                                                                Name: document.getElementById("class11Name").value,
                                                                When: [document.getElementById("MondayCL11").checked ? "Monday" : "", document.getElementById("TuesdayCL11").checked ? "Tuesday" : "", document.getElementById("WednesdayCL11").checked ? "Wednesday" : "", document.getElementById("ThursdayCL11").checked ? "Thursday" : "", document.getElementById("FridayCL11").checked ? "Friday" : "", document.getElementById("SaturdayCL11").checked ? "Saturday" : "", document.getElementById("SundayCL11").checked ? "Sunday" : ""],
                                                                Start: document.getElementById("S-timeCL11").value,
                                                                End: document.getElementById("E-timeCL11").value,
                                                                Difficulty: document.getElementById("diffCL11").value,
                                                            },
                                                        },
                                                        Hobbies: hobbies
                                                    })
                                                        .then(() => {
                                                            userInfo.Onboard = true
                                                            let updatedUserInfo = userInfo
                                                            localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                                                        })
                                                }
                                            } else if (document.getElementById("classNumber").value == 10 && crossCheck.class10 == true) {
                                                var userRef = db.collection("users").doc(JSON.parse(userInfo).Email)
                                                window.clearInterval()
                                                document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                                                setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                                                return userRef.update({
                                                    Onboard: true,
                                                    Tasks: {
                                                        1: {
                                                            Name: document.getElementById("class1Name").value,
                                                            When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL1").value,
                                                            End: document.getElementById("E-timeCL1").value,
                                                            Difficulty: document.getElementById("diffCL1").value,
                                                        },
                                                        2: {
                                                            Name: document.getElementById("class2Name").value,
                                                            When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL2").value,
                                                            End: document.getElementById("E-timeCL2").value,
                                                            Difficulty: document.getElementById("diffCL2").value,
                                                        },
                                                        3: {
                                                            Name: document.getElementById("class3Name").value,
                                                            When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL3").value,
                                                            End: document.getElementById("E-timeCL3").value,
                                                            Difficulty: document.getElementById("diffCL3").value,
                                                        },
                                                        4: {
                                                            Name: document.getElementById("class4Name").value,
                                                            When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL4").value,
                                                            End: document.getElementById("E-timeCL4").value,
                                                            Difficulty: document.getElementById("diffCL4").value,
                                                        },
                                                        5: {
                                                            Name: document.getElementById("class5Name").value,
                                                            When: [document.getElementById("MondayCL5").checked ? "Monday" : "", document.getElementById("TuesdayCL5").checked ? "Tuesday" : "", document.getElementById("WednesdayCL5").checked ? "Wednesday" : "", document.getElementById("ThursdayCL5").checked ? "Thursday" : "", document.getElementById("FridayCL5").checked ? "Friday" : "", document.getElementById("SaturdayCL5").checked ? "Saturday" : "", document.getElementById("SundayCL5").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL5").value,
                                                            End: document.getElementById("E-timeCL5").value,
                                                            Difficulty: document.getElementById("diffCL5").value,
                                                        },
                                                        6: {
                                                            Name: document.getElementById("class6Name").value,
                                                            When: [document.getElementById("MondayCL6").checked ? "Monday" : "", document.getElementById("TuesdayCL6").checked ? "Tuesday" : "", document.getElementById("WednesdayCL6").checked ? "Wednesday" : "", document.getElementById("ThursdayCL6").checked ? "Thursday" : "", document.getElementById("FridayCL6").checked ? "Friday" : "", document.getElementById("SaturdayCL6").checked ? "Saturday" : "", document.getElementById("SundayCL6").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL6").value,
                                                            End: document.getElementById("E-timeCL6").value,
                                                            Difficulty: document.getElementById("diffCL6").value,
                                                        },
                                                        7: {
                                                            Name: document.getElementById("class7Name").value,
                                                            When: [document.getElementById("MondayCL7").checked ? "Monday" : "", document.getElementById("TuesdayCL7").checked ? "Tuesday" : "", document.getElementById("WednesdayCL7").checked ? "Wednesday" : "", document.getElementById("ThursdayCL7").checked ? "Thursday" : "", document.getElementById("FridayCL7").checked ? "Friday" : "", document.getElementById("SaturdayCL7").checked ? "Saturday" : "", document.getElementById("SundayCL7").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL7").value,
                                                            End: document.getElementById("E-timeCL7").value,
                                                            Difficulty: document.getElementById("diffCL7").value,
                                                        },
                                                        8: {
                                                            Name: document.getElementById("class8Name").value,
                                                            When: [document.getElementById("MondayCL8").checked ? "Monday" : "", document.getElementById("TuesdayCL8").checked ? "Tuesday" : "", document.getElementById("WednesdayCL8").checked ? "Wednesday" : "", document.getElementById("ThursdayCL8").checked ? "Thursday" : "", document.getElementById("FridayCL8").checked ? "Friday" : "", document.getElementById("SaturdayCL8").checked ? "Saturday" : "", document.getElementById("SundayCL8").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL8").value,
                                                            End: document.getElementById("E-timeCL8").value,
                                                            Difficulty: document.getElementById("diffCL8").value,
                                                        },
                                                        9: {
                                                            Name: document.getElementById("class9Name").value,
                                                            When: [document.getElementById("MondayCL9").checked ? "Monday" : "", document.getElementById("TuesdayCL9").checked ? "Tuesday" : "", document.getElementById("WednesdayCL9").checked ? "Wednesday" : "", document.getElementById("ThursdayCL9").checked ? "Thursday" : "", document.getElementById("FridayCL9").checked ? "Friday" : "", document.getElementById("SaturdayCL9").checked ? "Saturday" : "", document.getElementById("SundayCL9").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL9").value,
                                                            End: document.getElementById("E-timeCL9").value,
                                                            Difficulty: document.getElementById("diffCL9").value,
                                                        },
                                                        10: {
                                                            Name: document.getElementById("class10Name").value,
                                                            When: [document.getElementById("MondayCL10").checked ? "Monday" : "", document.getElementById("TuesdayCL10").checked ? "Tuesday" : "", document.getElementById("WednesdayCL10").checked ? "Wednesday" : "", document.getElementById("ThursdayCL10").checked ? "Thursday" : "", document.getElementById("FridayCL10").checked ? "Friday" : "", document.getElementById("SaturdayCL10").checked ? "Saturday" : "", document.getElementById("SundayCL10").checked ? "Sunday" : ""],
                                                            Start: document.getElementById("S-timeCL10").value,
                                                            End: document.getElementById("E-timeCL10").value,
                                                            Difficulty: document.getElementById("diffCL10").value,
                                                        },
                                                    },
                                                    Hobbies: hobbies
                                                })
                                                    .then(() => {
                                                        userInfo.Onboard = true
                                                        let updatedUserInfo = userInfo
                                                        localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                                                    })
                                            }
                                        } else if (document.getElementById("classNumber").value == 9 && crossCheck.class9 == true) {
                                            var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                                            window.clearInterval()
                                            document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                                            setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                                            return userRef.update({
                                                Onboard: true,
                                                Tasks: {
                                                    1: {
                                                        Name: document.getElementById("class1Name").value,
                                                        When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL1").value,
                                                        End: document.getElementById("E-timeCL1").value,
                                                        Difficulty: document.getElementById("diffCL1").value,
                                                    },
                                                    2: {
                                                        Name: document.getElementById("class2Name").value,
                                                        When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL2").value,
                                                        End: document.getElementById("E-timeCL2").value,
                                                        Difficulty: document.getElementById("diffCL2").value,
                                                    },
                                                    3: {
                                                        Name: document.getElementById("class3Name").value,
                                                        When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL3").value,
                                                        End: document.getElementById("E-timeCL3").value,
                                                        Difficulty: document.getElementById("diffCL3").value,
                                                    },
                                                    4: {
                                                        Name: document.getElementById("class4Name").value,
                                                        When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL4").value,
                                                        End: document.getElementById("E-timeCL4").value,
                                                        Difficulty: document.getElementById("diffCL4").value,
                                                    },
                                                    5: {
                                                        Name: document.getElementById("class5Name").value,
                                                        When: [document.getElementById("MondayCL5").checked ? "Monday" : "", document.getElementById("TuesdayCL5").checked ? "Tuesday" : "", document.getElementById("WednesdayCL5").checked ? "Wednesday" : "", document.getElementById("ThursdayCL5").checked ? "Thursday" : "", document.getElementById("FridayCL5").checked ? "Friday" : "", document.getElementById("SaturdayCL5").checked ? "Saturday" : "", document.getElementById("SundayCL5").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL5").value,
                                                        End: document.getElementById("E-timeCL5").value,
                                                        Difficulty: document.getElementById("diffCL5").value,
                                                    },
                                                    6: {
                                                        Name: document.getElementById("class6Name").value,
                                                        When: [document.getElementById("MondayCL6").checked ? "Monday" : "", document.getElementById("TuesdayCL6").checked ? "Tuesday" : "", document.getElementById("WednesdayCL6").checked ? "Wednesday" : "", document.getElementById("ThursdayCL6").checked ? "Thursday" : "", document.getElementById("FridayCL6").checked ? "Friday" : "", document.getElementById("SaturdayCL6").checked ? "Saturday" : "", document.getElementById("SundayCL6").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL6").value,
                                                        End: document.getElementById("E-timeCL6").value,
                                                        Difficulty: document.getElementById("diffCL6").value,
                                                    },
                                                    7: {
                                                        Name: document.getElementById("class7Name").value,
                                                        When: [document.getElementById("MondayCL7").checked ? "Monday" : "", document.getElementById("TuesdayCL7").checked ? "Tuesday" : "", document.getElementById("WednesdayCL7").checked ? "Wednesday" : "", document.getElementById("ThursdayCL7").checked ? "Thursday" : "", document.getElementById("FridayCL7").checked ? "Friday" : "", document.getElementById("SaturdayCL7").checked ? "Saturday" : "", document.getElementById("SundayCL7").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL7").value,
                                                        End: document.getElementById("E-timeCL7").value,
                                                        Difficulty: document.getElementById("diffCL7").value,
                                                    },
                                                    8: {
                                                        Name: document.getElementById("class8Name").value,
                                                        When: [document.getElementById("MondayCL8").checked ? "Monday" : "", document.getElementById("TuesdayCL8").checked ? "Tuesday" : "", document.getElementById("WednesdayCL8").checked ? "Wednesday" : "", document.getElementById("ThursdayCL8").checked ? "Thursday" : "", document.getElementById("FridayCL8").checked ? "Friday" : "", document.getElementById("SaturdayCL8").checked ? "Saturday" : "", document.getElementById("SundayCL8").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL8").value,
                                                        End: document.getElementById("E-timeCL8").value,
                                                        Difficulty: document.getElementById("diffCL8").value,
                                                    },
                                                    9: {
                                                        Name: document.getElementById("class9Name").value,
                                                        When: [document.getElementById("MondayCL9").checked ? "Monday" : "", document.getElementById("TuesdayCL9").checked ? "Tuesday" : "", document.getElementById("WednesdayCL9").checked ? "Wednesday" : "", document.getElementById("ThursdayCL9").checked ? "Thursday" : "", document.getElementById("FridayCL9").checked ? "Friday" : "", document.getElementById("SaturdayCL9").checked ? "Saturday" : "", document.getElementById("SundayCL9").checked ? "Sunday" : ""],
                                                        Start: document.getElementById("S-timeCL9").value,
                                                        End: document.getElementById("E-timeCL9").value,
                                                        Difficulty: document.getElementById("diffCL9").value,
                                                    },
                                                },
                                                Hobbies: hobbies
                                            })
                                                .then(() => {
                                                    userInfo.Onboard = true
                                                    let updatedUserInfo = userInfo
                                                    localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                                                })
                                        }
                                    } else if (document.getElementById("classNumber").value == 8 && crossCheck.class8 == true) {
                                        var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                                        window.clearInterval()
                                        document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                                        setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                                        return userRef.update({
                                            Onboard: true,
                                            Tasks: {
                                                1: {
                                                    Name: document.getElementById("class1Name").value,
                                                    When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL1").value,
                                                    End: document.getElementById("E-timeCL1").value,
                                                    Difficulty: document.getElementById("diffCL1").value,
                                                },
                                                2: {
                                                    Name: document.getElementById("class2Name").value,
                                                    When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL2").value,
                                                    End: document.getElementById("E-timeCL2").value,
                                                    Difficulty: document.getElementById("diffCL2").value,
                                                },
                                                3: {
                                                    Name: document.getElementById("class3Name").value,
                                                    When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL3").value,
                                                    End: document.getElementById("E-timeCL3").value,
                                                    Difficulty: document.getElementById("diffCL3").value,
                                                },
                                                4: {
                                                    Name: document.getElementById("class4Name").value,
                                                    When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL4").value,
                                                    End: document.getElementById("E-timeCL4").value,
                                                    Difficulty: document.getElementById("diffCL4").value,
                                                },
                                                5: {
                                                    Name: document.getElementById("class5Name").value,
                                                    When: [document.getElementById("MondayCL5").checked ? "Monday" : "", document.getElementById("TuesdayCL5").checked ? "Tuesday" : "", document.getElementById("WednesdayCL5").checked ? "Wednesday" : "", document.getElementById("ThursdayCL5").checked ? "Thursday" : "", document.getElementById("FridayCL5").checked ? "Friday" : "", document.getElementById("SaturdayCL5").checked ? "Saturday" : "", document.getElementById("SundayCL5").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL5").value,
                                                    End: document.getElementById("E-timeCL5").value,
                                                    Difficulty: document.getElementById("diffCL5").value,
                                                },
                                                6: {
                                                    Name: document.getElementById("class6Name").value,
                                                    When: [document.getElementById("MondayCL6").checked ? "Monday" : "", document.getElementById("TuesdayCL6").checked ? "Tuesday" : "", document.getElementById("WednesdayCL6").checked ? "Wednesday" : "", document.getElementById("ThursdayCL6").checked ? "Thursday" : "", document.getElementById("FridayCL6").checked ? "Friday" : "", document.getElementById("SaturdayCL6").checked ? "Saturday" : "", document.getElementById("SundayCL6").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL6").value,
                                                    End: document.getElementById("E-timeCL6").value,
                                                    Difficulty: document.getElementById("diffCL6").value,
                                                },
                                                7: {
                                                    Name: document.getElementById("class7Name").value,
                                                    When: [document.getElementById("MondayCL7").checked ? "Monday" : "", document.getElementById("TuesdayCL7").checked ? "Tuesday" : "", document.getElementById("WednesdayCL7").checked ? "Wednesday" : "", document.getElementById("ThursdayCL7").checked ? "Thursday" : "", document.getElementById("FridayCL7").checked ? "Friday" : "", document.getElementById("SaturdayCL7").checked ? "Saturday" : "", document.getElementById("SundayCL7").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL7").value,
                                                    End: document.getElementById("E-timeCL7").value,
                                                    Difficulty: document.getElementById("diffCL7").value,
                                                },
                                                8: {
                                                    Name: document.getElementById("class8Name").value,
                                                    When: [document.getElementById("MondayCL8").checked ? "Monday" : "", document.getElementById("TuesdayCL8").checked ? "Tuesday" : "", document.getElementById("WednesdayCL8").checked ? "Wednesday" : "", document.getElementById("ThursdayCL8").checked ? "Thursday" : "", document.getElementById("FridayCL8").checked ? "Friday" : "", document.getElementById("SaturdayCL8").checked ? "Saturday" : "", document.getElementById("SundayCL8").checked ? "Sunday" : ""],
                                                    Start: document.getElementById("S-timeCL8").value,
                                                    End: document.getElementById("E-timeCL8").value,
                                                    Difficulty: document.getElementById("diffCL8").value,
                                                },
                                            },
                                            Hobbies: hobbies
                                        })
                                            .then(() => {
                                                userInfo.Onboard = true
                                                let updatedUserInfo = userInfo
                                                localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                                            })
                                    }
                                } else if (document.getElementById("classNumber").value == 7 && crossCheck.class7 == true) {
                                    var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                                    window.clearInterval()
                                    document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                                    setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                                    return userRef.update({
                                        Onboard: true,
                                        Tasks: {
                                            1: {
                                                Name: document.getElementById("class1Name").value,
                                                When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                                Start: document.getElementById("S-timeCL1").value,
                                                End: document.getElementById("E-timeCL1").value,
                                                Difficulty: document.getElementById("diffCL1").value,
                                            },
                                            2: {
                                                Name: document.getElementById("class2Name").value,
                                                When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                                Start: document.getElementById("S-timeCL2").value,
                                                End: document.getElementById("E-timeCL2").value,
                                                Difficulty: document.getElementById("diffCL2").value,
                                            },
                                            3: {
                                                Name: document.getElementById("class3Name").value,
                                                When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                                Start: document.getElementById("S-timeCL3").value,
                                                End: document.getElementById("E-timeCL3").value,
                                                Difficulty: document.getElementById("diffCL3").value,
                                            },
                                            4: {
                                                Name: document.getElementById("class4Name").value,
                                                When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                                Start: document.getElementById("S-timeCL4").value,
                                                End: document.getElementById("E-timeCL4").value,
                                                Difficulty: document.getElementById("diffCL4").value,
                                            },
                                            5: {
                                                Name: document.getElementById("class5Name").value,
                                                When: [document.getElementById("MondayCL5").checked ? "Monday" : "", document.getElementById("TuesdayCL5").checked ? "Tuesday" : "", document.getElementById("WednesdayCL5").checked ? "Wednesday" : "", document.getElementById("ThursdayCL5").checked ? "Thursday" : "", document.getElementById("FridayCL5").checked ? "Friday" : "", document.getElementById("SaturdayCL5").checked ? "Saturday" : "", document.getElementById("SundayCL5").checked ? "Sunday" : ""],
                                                Start: document.getElementById("S-timeCL5").value,
                                                End: document.getElementById("E-timeCL5").value,
                                                Difficulty: document.getElementById("diffCL5").value,
                                            },
                                            6: {
                                                Name: document.getElementById("class6Name").value,
                                                When: [document.getElementById("MondayCL6").checked ? "Monday" : "", document.getElementById("TuesdayCL6").checked ? "Tuesday" : "", document.getElementById("WednesdayCL6").checked ? "Wednesday" : "", document.getElementById("ThursdayCL6").checked ? "Thursday" : "", document.getElementById("FridayCL6").checked ? "Friday" : "", document.getElementById("SaturdayCL6").checked ? "Saturday" : "", document.getElementById("SundayCL6").checked ? "Sunday" : ""],
                                                Start: document.getElementById("S-timeCL6").value,
                                                End: document.getElementById("E-timeCL6").value,
                                                Difficulty: document.getElementById("diffCL6").value,
                                            },
                                            7: {
                                                Name: document.getElementById("class7Name").value,
                                                When: [document.getElementById("MondayCL7").checked ? "Monday" : "", document.getElementById("TuesdayCL7").checked ? "Tuesday" : "", document.getElementById("WednesdayCL7").checked ? "Wednesday" : "", document.getElementById("ThursdayCL7").checked ? "Thursday" : "", document.getElementById("FridayCL7").checked ? "Friday" : "", document.getElementById("SaturdayCL7").checked ? "Saturday" : "", document.getElementById("SundayCL7").checked ? "Sunday" : ""],
                                                Start: document.getElementById("S-timeCL7").value,
                                                End: document.getElementById("E-timeCL7").value,
                                                Difficulty: document.getElementById("diffCL7").value,
                                            },
                                        },
                                        Hobbies: hobbies
                                    })
                                        .then(() => {
                                            userInfo.Onboard = true
                                            let updatedUserInfo = userInfo
                                            localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                                        })
                                }
                            } else if (document.getElementById("classNumber").value == 6 && crossCheck.class6 == true) {
                                var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                                window.clearInterval()
                                document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                                setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                                return userRef.update({
                                    Onboard: true,
                                    Tasks: {
                                        1: {
                                            Name: document.getElementById("class1Name").value,
                                            When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                            Start: document.getElementById("S-timeCL1").value,
                                            End: document.getElementById("E-timeCL1").value,
                                            Difficulty: document.getElementById("diffCL1").value,
                                        },
                                        2: {
                                            Name: document.getElementById("class2Name").value,
                                            When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                            Start: document.getElementById("S-timeCL2").value,
                                            End: document.getElementById("E-timeCL2").value,
                                            Difficulty: document.getElementById("diffCL2").value,
                                        },
                                        3: {
                                            Name: document.getElementById("class3Name").value,
                                            When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                            Start: document.getElementById("S-timeCL3").value,
                                            End: document.getElementById("E-timeCL3").value,
                                            Difficulty: document.getElementById("diffCL3").value,
                                        },
                                        4: {
                                            Name: document.getElementById("class4Name").value,
                                            When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                            Start: document.getElementById("S-timeCL4").value,
                                            End: document.getElementById("E-timeCL4").value,
                                            Difficulty: document.getElementById("diffCL4").value,
                                        },
                                        5: {
                                            Name: document.getElementById("class5Name").value,
                                            When: [document.getElementById("MondayCL5").checked ? "Monday" : "", document.getElementById("TuesdayCL5").checked ? "Tuesday" : "", document.getElementById("WednesdayCL5").checked ? "Wednesday" : "", document.getElementById("ThursdayCL5").checked ? "Thursday" : "", document.getElementById("FridayCL5").checked ? "Friday" : "", document.getElementById("SaturdayCL5").checked ? "Saturday" : "", document.getElementById("SundayCL5").checked ? "Sunday" : ""],
                                            Start: document.getElementById("S-timeCL5").value,
                                            End: document.getElementById("E-timeCL5").value,
                                            Difficulty: document.getElementById("diffCL5").value,
                                        },
                                        6: {
                                            Name: document.getElementById("class6Name").value,
                                            When: [document.getElementById("MondayCL6").checked ? "Monday" : "", document.getElementById("TuesdayCL6").checked ? "Tuesday" : "", document.getElementById("WednesdayCL6").checked ? "Wednesday" : "", document.getElementById("ThursdayCL6").checked ? "Thursday" : "", document.getElementById("FridayCL6").checked ? "Friday" : "", document.getElementById("SaturdayCL6").checked ? "Saturday" : "", document.getElementById("SundayCL6").checked ? "Sunday" : ""],
                                            Start: document.getElementById("S-timeCL6").value,
                                            End: document.getElementById("E-timeCL6").value,
                                            Difficulty: document.getElementById("diffCL6").value,
                                        },
                                    },
                                    Hobbies: hobbies
                                })
                                    .then(() => {
                                        userInfo.Onboard = true
                                        let updatedUserInfo = userInfo
                                        localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                                    })
                            }
                        } else if (document.getElementById("classNumber").value == 5 && crossCheck.class5 == true) {
                            var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                            window.clearInterval()
                            document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                            setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                            return userRef.update({
                                Onboard: true,
                                Tasks: {
                                    1: {
                                        Name: document.getElementById("class1Name").value,
                                        When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                        Start: document.getElementById("S-timeCL1").value,
                                        End: document.getElementById("E-timeCL1").value,
                                        Difficulty: document.getElementById("diffCL1").value,
                                    },
                                    2: {
                                        Name: document.getElementById("class2Name").value,
                                        When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                        Start: document.getElementById("S-timeCL2").value,
                                        End: document.getElementById("E-timeCL2").value,
                                        Difficulty: document.getElementById("diffCL2").value,
                                    },
                                    3: {
                                        Name: document.getElementById("class3Name").value,
                                        When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                        Start: document.getElementById("S-timeCL3").value,
                                        End: document.getElementById("E-timeCL3").value,
                                        Difficulty: document.getElementById("diffCL3").value,
                                    },
                                    4: {
                                        Name: document.getElementById("class4Name").value,
                                        When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                        Start: document.getElementById("S-timeCL4").value,
                                        End: document.getElementById("E-timeCL4").value,
                                        Difficulty: document.getElementById("diffCL4").value,
                                    },
                                    5: {
                                        Name: document.getElementById("class5Name").value,
                                        When: [document.getElementById("MondayCL5").checked ? "Monday" : "", document.getElementById("TuesdayCL5").checked ? "Tuesday" : "", document.getElementById("WednesdayCL5").checked ? "Wednesday" : "", document.getElementById("ThursdayCL5").checked ? "Thursday" : "", document.getElementById("FridayCL5").checked ? "Friday" : "", document.getElementById("SaturdayCL5").checked ? "Saturday" : "", document.getElementById("SundayCL5").checked ? "Sunday" : ""],
                                        Start: document.getElementById("S-timeCL5").value,
                                        End: document.getElementById("E-timeCL5").value,
                                        Difficulty: document.getElementById("diffCL5").value,
                                    }
                                },
                                Hobbies: hobbies
                            })
                                .then(() => {
                                    userInfo.Onboard = true
                                    let updatedUserInfo = userInfo
                                    localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                                })
                        }
                    } else if (document.getElementById("classNumber").value == 4 && crossCheck.class4 == true) {
                        var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                        window.clearInterval()
                        document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                        setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                        return userRef.update({
                            Onboard: true,
                            Tasks: {
                                1: {
                                    Name: document.getElementById("class1Name").value,
                                    When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                    Start: document.getElementById("S-timeCL1").value,
                                    End: document.getElementById("E-timeCL1").value,
                                    Difficulty: document.getElementById("diffCL1").value,
                                },
                                2: {
                                    Name: document.getElementById("class2Name").value,
                                    When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                    Start: document.getElementById("S-timeCL2").value,
                                    End: document.getElementById("E-timeCL2").value,
                                    Difficulty: document.getElementById("diffCL2").value,
                                },
                                3: {
                                    Name: document.getElementById("class3Name").value,
                                    When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                    Start: document.getElementById("S-timeCL3").value,
                                    End: document.getElementById("E-timeCL3").value,
                                    Difficulty: document.getElementById("diffCL3").value,
                                },
                                4: {
                                    Name: document.getElementById("class4Name").value,
                                    When: [document.getElementById("MondayCL4").checked ? "Monday" : "", document.getElementById("TuesdayCL4").checked ? "Tuesday" : "", document.getElementById("WednesdayCL4").checked ? "Wednesday" : "", document.getElementById("ThursdayCL4").checked ? "Thursday" : "", document.getElementById("FridayCL4").checked ? "Friday" : "", document.getElementById("SaturdayCL4").checked ? "Saturday" : "", document.getElementById("SundayCL4").checked ? "Sunday" : ""],
                                    Start: document.getElementById("S-timeCL4").value,
                                    End: document.getElementById("E-timeCL4").value,
                                    Difficulty: document.getElementById("diffCL4").value,
                                }
                            },
                            Hobbies: hobbies
                        })
                            .then(() => {
                                userInfo.Onboard = true
                                let updatedUserInfo = userInfo
                                localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                            })
                    }
                } else if (document.getElementById("classNumber").value == 3 && crossCheck.class3 == true) {
                    var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                    window.clearInterval()
                    document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                    setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                    return userRef.update({
                        Onboard: true,
                        Tasks: {
                            1: {
                                Name: document.getElementById("class1Name").value,
                                When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                                Start: document.getElementById("S-timeCL1").value,
                                End: document.getElementById("E-timeCL1").value,
                                Difficulty: document.getElementById("diffCL1").value,
                            },
                            2: {
                                Name: document.getElementById("class2Name").value,
                                When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                                Start: document.getElementById("S-timeCL2").value,
                                End: document.getElementById("E-timeCL2").value,
                                Difficulty: document.getElementById("diffCL2").value,
                            },
                            3: {
                                Name: document.getElementById("class3Name").value,
                                When: [document.getElementById("MondayCL3").checked ? "Monday" : "", document.getElementById("TuesdayCL3").checked ? "Tuesday" : "", document.getElementById("WednesdayCL3").checked ? "Wednesday" : "", document.getElementById("ThursdayCL3").checked ? "Thursday" : "", document.getElementById("FridayCL3").checked ? "Friday" : "", document.getElementById("SaturdayCL3").checked ? "Saturday" : "", document.getElementById("SundayCL3").checked ? "Sunday" : ""],
                                Start: document.getElementById("S-timeCL3").value,
                                End: document.getElementById("E-timeCL3").value,
                                Difficulty: document.getElementById("diffCL3").value,
                            }
                        },
                        Hobbies: hobbies
                    })
                        .then(() => {
                            userInfo.Onboard = true
                            let updatedUserInfo = userInfo
                            localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                        })
                }
            } else if (document.getElementById("classNumber").value == 2 && crossCheck.class2 == true) {
                var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
                window.clearInterval()
                document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
                return userRef.update({
                    Onboard: true,
                    Tasks: {
                        1: {
                            Name: document.getElementById("class1Name").value,
                            When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                            Start: document.getElementById("S-timeCL1").value,
                            End: document.getElementById("E-timeCL1").value,
                            Difficulty: document.getElementById("diffCL1").value,
                        },
                        2: {
                            Name: document.getElementById("class2Name").value,
                            When: [document.getElementById("MondayCL2").checked ? "Monday" : "", document.getElementById("TuesdayCL2").checked ? "Tuesday" : "", document.getElementById("WednesdayCL2").checked ? "Wednesday" : "", document.getElementById("ThursdayCL2").checked ? "Thursday" : "", document.getElementById("FridayCL2").checked ? "Friday" : "", document.getElementById("SaturdayCL2").checked ? "Saturday" : "", document.getElementById("SundayCL2").checked ? "Sunday" : ""],
                            Start: document.getElementById("S-timeCL2").value,
                            End: document.getElementById("E-timeCL2").value,
                            Difficulty: document.getElementById("diffCL2").value,
                        }
                    },
                    Hobbies: hobbies
                })
                    .then(() => {
                        userInfo.Onboard = true
                        let updatedUserInfo = userInfo
                        localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                    })
            }

        } else if (document.getElementById("classNumber").value == 1 && crossCheck.class1 == true && document.getElementById("HobbiesHolder").children.length >= 1) {
            window.clearInterval()
            document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
            setTimeout(() => { window.location.assign("dashboard.html") }, 2000)
            var userRef = db.collection("users").doc(JSON.parse(userInfo).Email);
            return userRef.update({
                Onboard: true,
                Tasks: {
                    1: {
                        Name: document.getElementById("class1Name").value,
                        When: [document.getElementById("MondayCL1").checked ? "Monday" : "", document.getElementById("TuesdayCL1").checked ? "Tuesday" : "", document.getElementById("WednesdayCL1").checked ? "Wednesday" : "", document.getElementById("ThursdayCL1").checked ? "Thursday" : "", document.getElementById("FridayCL1").checked ? "Friday" : "", document.getElementById("SaturdayCL1").checked ? "Saturday" : "", document.getElementById("SundayCL1").checked ? "Sunday" : ""],
                        Start: document.getElementById("S-timeCL1").value,
                        End: document.getElementById("E-timeCL1").value,
                        Difficulty: document.getElementById("diffCL1").value,
                    }
                },
                Hobbies: hobbies
            })
                .then(() => {
                    userInfo.Onboard = true
                    let updatedUserInfo = userInfo
                    localStorage.setItem("currentUserInfo", JSON.stringify(updatedUserInfo))
                })
        }
    }, 15000)

})