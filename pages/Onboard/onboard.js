let userInfo = window.localStorage.getItem("currentUserInfo")
if (userInfo == null) {
    window.location.assign("index.html")
}
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
                        <input name="hobbies" type="text" placeholder="AP Language and Composition">
                    </div>
                    <div class="input">
                        <label>When</label>
                        <div id="days">
                            <div class="day">
                                <input type="checkbox" name="Monday">Monday
                            </div>
                            <div class="day">
                                <input type="checkbox" name="Tuesday">Tuesday
                            </div>
                            <div class="day">
                                <input type="checkbox" name="Wednesday">Wednesday
                            </div>
                            <div class="day">
                                <input type="checkbox" name="Thursday">Thursday
                            </div>
                            <div class="day">
                                <input type="checkbox" name="Friday">Friday
                            </div>
                            <div class="day">
                                <input type="checkbox" name="Saturday">Saturday
                            </div>
                            <div class="day">
                                <input type="checkbox" name="Sunday">Sunday
                            </div>
                        </div>
                    </div>
                    <div class="input">
                        <label for="time">Class #${classNumber} Start Time</label>
                        <div>
                            <input type="time" name="time" style="width: 80%;">
                        </div>
                    </div>
                    <div class="input">
                        <label for="time">Class #${classNumber} End Time</label>
                        <div>
                            <input type="time" name="time" style="width: 80%;">
                        </div>
                    </div>
                    <div class="input" style="width: 80%;">
                        <label for="time">Class #${classNumber} Difficulty</label>
                        <select>
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

document.getElementById("hobbies").addEventListener("keypress",(e)=>{
    let container = document.getElementById("HobbiesHolder")
    if(e.code == "Enter"){
        //<div class="tag">Coding<span class="material-icons">close</span></div>
        if (document.getElementById("hobbies").value.trim().length > 0 && document.getElementById("HobbiesHolder").children.namedItem(document.getElementById("hobbies").value.trim().toLowerCase())==null){
        let hobby = document.createElement("div");
        hobby.classList.add("tag")
        hobby.id = document.getElementById("hobbies").value.trim().toLowerCase()
        hobby.innerHTML = `${document.getElementById("hobbies").value}<span class="material-icons" id="${document.getElementById("hobbies").value.trim().toUpperCase()}">close</span>`
        container.appendChild(hobby)
        document.getElementById(document.getElementById("hobbies").value.trim().toUpperCase()).addEventListener("click",()=>{remove(hobby.id)})
        document.getElementById("hobbies").value = ""
    }
    }
    function remove(id){
        document.getElementById("HobbiesHolder").removeChild(document.getElementById(id))
    }
})