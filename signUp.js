let userInfo = window.localStorage.getItem("currentUserInfo")
if (userInfo != null){
    window.location.assign("dashboard.html")
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
let profilePictures = [
    "Anime.png",
    "Anime6.jpeg",
    "Anime7.jpeg",
    "Anime8.jpeg",
    "Anime9.jpeg",
    "Anime10.jpeg",
    "Anime11.jpeg",
    "Anime12.jpeg",
    "Anime13.jpeg",
    "Anime14.jpeg",
    "Anime15.jpeg",
    "Anime16.jpeg",
    "Anime17.jpeg",
    "Anime18.jpg",
    "Anime19.jpeg",
    "Anime20.jpeg",
    "Anime21.jpeg",
    "Anime22.jpeg",
    "Anime23.jpeg",
    "Minecraft4.jpeg",
    "Minecraft5.jpeg",
    "Minecraft6.jpeg",
    "Minecraft7.jpeg",
    "Minecraft8.jpeg",
    "Minecraft9.jpeg",
    "Minecraft10.jpeg",
    "Others3.jpg",
    "Others4.jpg",
    "Person3.jpeg",
    "Person5.jpg",
    "Person6.jpg",
    "Person7.jpg",
    "Person8.jpg",
    "Person9.jpg",
    "Person10.jpg",
    "Person11.jpg",
    "Space1.jpeg",
    "Space2.jpeg",
    "Space3.jpeg",
    "Space4.jpeg",
    "Space5.jpeg",
    "Space8.jpeg",
    "Space9.jpeg",
    "Space10.jpeg",
    "Space11.jpeg",
    "Space12.jpeg",
    "Space13.jpeg",
    "Space14.jpeg",
    "Space15.jpeg",
    "Space16.jpeg",
    "Mario3.jpeg",
    "Person1.jpeg",
    "Mario3.jpg",
    "Person1.jpg",
    "Anime.jpeg",
    "Mario4.jpeg",
    "Person2.jpeg",
    "Anime.jpg",
    "Minecraft.jpeg",
    "Person2.jpg",
    "Anime.webp",
    "Minecraft.jpg",
    "Person3.jpg",
    "Anime1.jpeg ",
    "Minecraft.png ",
    "Person4.jpg",
    "Anime2.jpeg ",
    "Minecraft1.jpeg ",
    "Space.jpeg",
    "Anime3.jpeg",
    "Minecraft1.jpg",
    "Space.jpg",
    "Anime4.jpeg",
    "Minecraft2.jpeg",
    "Space1.jpg",
    "Anime5.jpeg",
    "Minecraft2.jpg",
    "Space1.webp",
    "Book.jpeg",
    "Minecraft3.jpg",
    "Space2.jpg",
    "Book1.jpeg",
    "Others.jpeg",
    "Space3.jpg",
    "Others.jpg",
    "Space4.jpg",
    "Mario.jpeg",
    "Others1.jpg",
    "Mario.jpg",
    "Others2.jpg",
    "Mario1.jpeg",
    "Person.jpeg",
    "Mario1.jpg",
    "Person.jpg",
    "Mario2.jpeg",
    "Person.png",
    "Mario2.jpg",
    "Person.webp",
]
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
let selectedPP = "assets/Anime.jpeg"
profilePictures.forEach((pp) => {
    let picture = document.createElement("div");
    picture.classList.add("pp");
    picture.id = pp;
    picture.style.backgroundImage = `url(assets/${pp}`;
    if (pp.substring(0, 4) != "Book") {
        document.getElementById(pp.substring(0, 5)).appendChild(picture);
    } else {
        document.getElementById("Books").appendChild(picture);
    }
    document.getElementById(pp).addEventListener("click", () => { updateMainPP(pp) })
})
let crossCheck = {
    name: false,
    email: false,
    emailExists: true,
    password: false,
    passwordLength: false,
    specialCharacter: false,
    numberCharacter: false,
    passwordSecurity: false,
    confirmPassword: false,
    cPasswordMatch: true,
    schoolName: false,
    address: false,
    state: false,
    city: false,
    terms: false
}
function updateMainPP(pp) {
    document.getElementById("mainPP").style.backgroundImage = `url(assets/${pp})`;
    selectedPP = `assets/${pp}`
}
let index = 0;
document.getElementById("signUpActual").addEventListener("click", () => {
    var Errors = [];
    let nameValue = document.getElementById("name").value
    let emailValue = document.getElementById("emailInput").value
    let passwordValue = document.getElementById("password").value
    let cPasswordValue = document.getElementById("cPassword").value
    let addressValue = document.getElementById("address").value
    let glValue = document.getElementById("gl").value
    let SchoolnameValue = document.getElementById("school").value
    let stateValue = document.getElementById("state").value
    let cityValue = document.getElementById("city").value
    document.getElementById("mainBody").style.filter = "blur(20px)";
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

    if (nameValue.includes(" ") && nameValue.length > 3) {
        Errors.splice("Full name must consist of first and last name", 1)
        crossCheck.name = true;
    } else {
        Errors.push("Full name must consist of first and last name")
        crossCheck.name = false;
    }


    if (emailValue.length > 5) {
        var docRef = db.collection("users").doc(emailValue);
        docRef.get().then((doc) => {
            if (doc.exists) {
                Errors.push("Email already in use")
                crossCheck.emailExists = false;
                if (emailValue.length > 5 && emailValue.includes("@") && emailValue.includes(".")) {
                    Errors.splice("Invalid Email", 1)
                    crossCheck.email = true;
                } else {
                    Errors.push("Invalid Email")
                    crossCheck.email = false;
                }
            } else {
                if (emailValue.length > 5 && emailValue.includes("@") && emailValue.includes(".")) {
                    Errors.splice("Invalid Email", 1)
                    Errors.splice("Email already in use", 1)
                    crossCheck.emailExists = true;
                    crossCheck.email = true;
                } else {
                    Errors.push("Invalid Email")
                    crossCheck.email = false;
                }
            }
        }).then(
            () => {
                if (passwordValue.length > 0) {
                    Errors.splice("Invalid Password", 1)
                    crossCheck.password = true
                    if (passwordValue.length > 8) {
                        Errors.splice("Password must be more than 8 characters", 1)
                        crossCheck.passwordLength = true
                    } else {
                        Errors.push("Password must be more than 8 characters")
                        crossCheck.passwordLength = false

                    }
                    if (passwordValue.includes("@") || passwordValue.includes("`") || passwordValue.includes("&") || passwordValue.includes("<") || passwordValue.includes(">") || passwordValue.includes("*") || passwordValue.includes("/") || passwordValue.includes("{") || passwordValue.includes("}")) {
                        Errors.splice("Password must include a special character", 1)
                        crossCheck.specialCharacter = true
                    } else {
                        Errors.push("Password must include a special character '@,&,<,/'", 1)
                        crossCheck.specialCharacter = false
                    }
                    if (passwordValue.includes(0) || passwordValue.includes(1) || passwordValue.includes(2) || passwordValue.includes(3) || passwordValue.includes(4) || passwordValue.includes(5) || passwordValue.includes(6) || passwordValue.includes(7) || passwordValue.includes(8) || passwordValue.includes(9)) {
                        Errors.splice("Password must include a number", 1)
                        crossCheck.passwordSecurity = true
                    } else {
                        Errors.push("Password must include a number", 1)
                        crossCheck.passwordSecurity = false
                    }
                } else {
                    Errors.push("Invalid Password")
                    crossCheck.password = false
                }
                if (cPasswordValue.length > 0) {
                    Errors.splice("Confirm password must be more than 1 character", 1)
                    crossCheck.confirmPassword = true
                } else {
                    Errors.push("Confirm password must be more than 1 character")
                    crossCheck.confirmPassword = false
                }
                if (cPasswordValue == passwordValue) {
                    Errors.splice("Password do not match", 1)
                    crossCheck.cPasswordMatch = true
                } else {
                    Errors.push("Password do not match")
                    crossCheck.cPasswordMatch = false
                }
                if (SchoolnameValue.length > 1) {
                    crossCheck.schoolName = true
                    Errors.splice("Invalid school name", 1)
                } else {
                    Errors.push("Invalid school name")
                    crossCheck.schoolName = false
                }
                if (addressValue.length > 4) {
                    crossCheck.address = true
                    Errors.splice("Invalid address", 1)
                } else {
                    Errors.push("Invalid address")
                    crossCheck.address = false
                }
                if (cityValue.length > 3) {
                    crossCheck.city = true
                    Errors.splice("Invalid city", 1)
                } else {
                    Errors.push("Invalid city")
                    crossCheck.city = false
                }
                if (stateValue != "") {
                    crossCheck.state = true
                    Errors.splice("Invalid state", 1)
                } else {
                    Errors.push("Invalid state")
                    crossCheck.state = false
                }
                if (document.getElementById("tandcinput").checked) {
                    crossCheck.terms = true
                } else {
                    Errors.push("Agree to terms and conditions")
                    crossCheck.terms = false
                }

            }
        ).then(() => {
            setTimeout(() => {
            if (crossCheck.address && crossCheck.cPasswordMatch && crossCheck.city && crossCheck.confirmPassword && crossCheck.email && crossCheck.emailExists && crossCheck.name && crossCheck.password && crossCheck.passwordLength && crossCheck.passwordSecurity && crossCheck.schoolName && crossCheck.specialCharacter && crossCheck.state && crossCheck.terms) {
                db.collection("users").doc(emailValue).set({
                    Name: nameValue,
                    Password: passwordValue,
                    SchoolAddress: addressValue,
                    GradeLevel: glValue,
                    SchoolName: SchoolnameValue,
                    State: stateValue,
                    City:cityValue,
                    Onboard:false,
                    Tasks: {},
                    Friends: [],
                    Streak: 0,
                    ProfilePicture: selectedPP,
                }).then(() => {
                    window.localStorage.setItem("currentUserInfo", JSON.stringify({
                    Email: emailValue,
                    Name: nameValue,
                    Onboard:false,
                    Tasks: {},
                    Streak: 0,
                    ProfilePicture: selectedPP,
                }))
                window.clearInterval()
                document.getElementById("loadingText").style.fontWeight = "bold"
                document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${nameValue}`
                setTimeout(()=>{window.location.assign("onboard.html")},2000)
                })
                
            } else {
                window.scrollTo(0, 1)
                document.getElementById("mainBody").style.filter = "none";
                document.getElementById("animationLoad").style.visibility = "hidden";
                document.body.style.overflowY = "auto"
                document.getElementById("nav").style.display.backgroundColor = "white";
                let errorBox = document.getElementById("errors")
                if (!crossCheck.address && document.getElementById("Invalid address") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid address`
                    errorNode.id = "Invalid address"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.address && document.getElementById("Invalid address") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid address"))
                }
                if (!crossCheck.cPasswordMatch && document.getElementById("Passwords do not match") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Passwords do not match`
                    errorNode.id = "Passwords do not match"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.cPasswordMatch && document.getElementById("Passwords do not match") != undefined) {
                    errorBox.removeChild(document.getElementById("Passwords do not match"))
                }
                if (!crossCheck.city && document.getElementById("Invalid city") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid city`
                    errorNode.id = "Invalid city"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.city && document.getElementById("Invalid city") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid city"))
                }
                if (!crossCheck.confirmPassword && document.getElementById("Confirm password must be more than 1 character") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Confirm password must be more than 1 character`
                    errorNode.id = "Confirm password must be more than 1 character"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.confirmPassword && document.getElementById("Confirm password must be more than 1 character") != undefined) {
                    errorBox.removeChild(document.getElementById("Confirm password must be more than 1 character"))
                }
                if (!crossCheck.email && document.getElementById("Invalid email") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid email`
                    errorNode.id = "Invalid email"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.email && document.getElementById("Invalid email") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid email"))
                }
                if (!crossCheck.emailExists && document.getElementById("Email already in use") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Email already in use`
                    errorNode.id = "Email already in use"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.emailExists && document.getElementById("Email already in use") != undefined) {
                    errorBox.removeChild(document.getElementById("Email already in use"))
                }
                if (!crossCheck.name && document.getElementById("Name must include last and first name") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Name must include last and first name`
                    errorNode.id = "Name must include last and first name"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.name && document.getElementById("Name must include last and first name") != undefined) {
                    errorBox.removeChild(document.getElementById("Name must include last and first name"))
                }
                if (!crossCheck.password && document.getElementById("Invalid password") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid password`
                    errorNode.id = "Invalid password"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.password && document.getElementById("Invalid password") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid password"))
                }
                if (!crossCheck.passwordLength && document.getElementById("Password must be more than 8 characters") != undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Password must be more than 8 characters`
                    errorNode.id = "Password must be more than 8 characters"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.passwordLength && document.getElementById("Password must be more than 8 characters") != undefined) {
                    errorBox.removeChild(document.getElementById("Password must be more than 8 characters"))
                }
                if (!crossCheck.passwordSecurity && document.getElementById("Password must include a number") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Password must include a number`
                    errorNode.id = "Password must include a number"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.passwordSecurity && document.getElementById("Password must include a number") != undefined) {
                    errorBox.removeChild(document.getElementById("Password must include a number"))
                }
                if (!crossCheck.schoolName && document.getElementById("Invalid school name") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid school name`
                    errorNode.id = "Invalid school name"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.schoolName && document.getElementById("Invalid school name") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid school name"))
                }
                if (!crossCheck.specialCharacter && document.getElementById("Password must include a special character '@,&,<,/'") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Password must include a special character '@,&,<,/'`
                    errorNode.id = "Password must include a special character '@,&,<,/'"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.specialCharacter && document.getElementById("Password must include a special character '@,&,<,/'") != undefined) {
                    errorBox.removeChild(document.getElementById("Password must include a special character '@,&,<,/'"))
                }
                if (!crossCheck.state && document.getElementById("Invalid state") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid state`
                    errorNode.id = "Invalid state"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.state && document.getElementById("Invalid state") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid state"))
                }
                if (!crossCheck.terms && document.getElementById("Agree to terms and conditions") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Agree to terms and conditions`
                    errorNode.id = "Agree to terms and conditions"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.terms && document.getElementById("Agree to terms and conditions") != undefined) {
                    errorBox.removeChild(document.getElementById("Agree to terms and conditions"))
                }
            }
        }, 15000)
        })
    } else {
        Errors.push("Invalid Email")
        crossCheck.email = false;
        if (nameValue.includes(" ") && nameValue.length > 3) {
            Errors.splice("Full name must consist of first and last name", 1)
            crossCheck.name = true;
        } else {
            Errors.push("Full name must consist of first and last name")
            crossCheck.name = false;
        }
        if (passwordValue.length > 0) {
            Errors.splice("Invalid Password", 1)
            crossCheck.password = true
            if (passwordValue.length > 8) {
                Errors.splice("Password must be more than 8 characters", 1)
                crossCheck.passwordLength = true
            } else {
                Errors.push("Password must be more than 8 characters")
                crossCheck.passwordLength = false

            }
            if (passwordValue.includes("@") || passwordValue.includes("`") || passwordValue.includes("&") || passwordValue.includes("<") || passwordValue.includes(">") || passwordValue.includes("*") || passwordValue.includes("/") || passwordValue.includes("{") || passwordValue.includes("}")) {
                Errors.splice("Password must include a special character", 1)
                crossCheck.specialCharacter = true
            } else {
                Errors.push("Password must include a special character '@,&,<,/'", 1)
                crossCheck.specialCharacter = false
            }
            if (passwordValue.includes(0) || passwordValue.includes(1) || passwordValue.includes(2) || passwordValue.includes(3) || passwordValue.includes(4) || passwordValue.includes(5) || passwordValue.includes(6) || passwordValue.includes(7) || passwordValue.includes(8) || passwordValue.includes(9)) {
                Errors.splice("Password must include a number", 1)
                crossCheck.passwordSecurity = true
            } else {
                Errors.push("Password must include a number", 1)
                crossCheck.passwordSecurity = false
            }
        } else {
            Errors.push("Invalid Password")
            crossCheck.password = false
        }
        if (cPasswordValue.length > 0) {
            Errors.splice("Confirm password must be more than 1 character", 1)
            crossCheck.confirmPassword = true
        } else {
            Errors.push("Confirm password must be more than 1 character")
            crossCheck.confirmPassword = false
        }
        if (cPasswordValue == passwordValue) {
            Errors.splice("Password do not match", 1)
            crossCheck.cPasswordMatch = true
        } else {
            Errors.push("Password do not match")
            crossCheck.cPasswordMatch = false
        }
        if (SchoolnameValue.length > 1) {
            crossCheck.schoolName = true
            Errors.splice("Invalid school name", 1)
        } else {
            Errors.push("Invalid school name")
            crossCheck.schoolName = false
        }
        if (addressValue.length > 4) {
            crossCheck.address = true
            Errors.splice("Invalid address", 1)
        } else {
            Errors.push("Invalid address")
            crossCheck.address = false
        }
        if (cityValue.length > 3) {
            crossCheck.city = true
            Errors.splice("Invalid city", 1)
        } else {
            Errors.push("Invalid city")
            crossCheck.city = false
        }
        if (stateValue != "") {
            crossCheck.state = true
            Errors.splice("Invalid state", 1)
        } else {
            Errors.push("Invalid state")
            crossCheck.state = false
        }
        if (document.getElementById("tandcinput").checked) {
            crossCheck.terms = true
        } else {
            Errors.push("Agree to terms and conditions")
            crossCheck.terms = false
        }
        setTimeout(() => {
            if (crossCheck.address && crossCheck.cPasswordMatch && crossCheck.city && crossCheck.confirmPassword && crossCheck.email && crossCheck.emailExists && crossCheck.name && crossCheck.password && crossCheck.passwordLength && crossCheck.passwordSecurity && crossCheck.schoolName && crossCheck.specialCharacter && crossCheck.state && crossCheck.terms) {
                db.collection("users").doc(emailValue).set({
                    Name: nameValue,
                    Password: passwordValue,
                    SchoolAddress: addressValue,
                    GradeLevel: glValue,
                    SchoolName: SchoolnameValue,
                    State: stateValue,
                    City:cityValue,
                    Tasks: {},
                    Friends: [],
                    Streak: 0,
                    Onboard: false,
                    ProfilePicture: selectedPP,
                }).then(() => {
                    window.localStorage.setItem("currentUserInfo", JSON.stringify({
                    Email: emailValue,
                    Name: nameValue,
                    Tasks: {},
                    Streak: 0,
                    Onboard: false,
                    ProfilePicture: selectedPP,
                }))
                window.clearInterval()
                document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${nameValue}`
                setTimeout(()=>{window.location.assign("onboard.html")},2000)
                })
                
            } else {
                window.scrollTo(0, 1)
                document.getElementById("mainBody").style.filter = "none";
                document.getElementById("animationLoad").style.visibility = "hidden";
                document.body.style.overflowY = "auto"
                document.getElementById("nav").style.display.backgroundColor = "white";
                let errorBox = document.getElementById("errors")
                if (!crossCheck.address && document.getElementById("Invalid address") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid address`
                    errorNode.id = "Invalid address"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.address && document.getElementById("Invalid address") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid address"))
                }
                if (!crossCheck.cPasswordMatch && document.getElementById("Passwords do not match") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Passwords do not match`
                    errorNode.id = "Passwords do not match"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.cPasswordMatch && document.getElementById("Passwords do not match") != undefined) {
                    errorBox.removeChild(document.getElementById("Passwords do not match"))
                }
                if (!crossCheck.city && document.getElementById("Invalid city") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid city`
                    errorNode.id = "Invalid city"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.city && document.getElementById("Invalid city") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid city"))
                }
                if (!crossCheck.confirmPassword && document.getElementById("Confirm password must be more than 1 character") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Confirm password must be more than 1 character`
                    errorNode.id = "Confirm password must be more than 1 character"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.confirmPassword && document.getElementById("Confirm password must be more than 1 character") != undefined) {
                    errorBox.removeChild(document.getElementById("Confirm password must be more than 1 character"))
                }
                if (!crossCheck.email && document.getElementById("Invalid email") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid email`
                    errorNode.id = "Invalid email"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.email && document.getElementById("Invalid email") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid email"))
                }
                if (!crossCheck.emailExists && document.getElementById("Email already in use") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Email already in use`
                    errorNode.id = "Email already in use"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.emailExists && document.getElementById("Email already in use") != undefined) {
                    errorBox.removeChild(document.getElementById("Email already in use"))
                }
                if (!crossCheck.name && document.getElementById("Name must include last and first name") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Name must include last and first name`
                    errorNode.id = "Name must include last and first name"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.name && document.getElementById("Name must include last and first name") != undefined) {
                    errorBox.removeChild(document.getElementById("Name must include last and first name"))
                }
                if (!crossCheck.password && document.getElementById("Invalid password") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid password`
                    errorNode.id = "Invalid password"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.password && document.getElementById("Invalid password") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid password"))
                }
                if (!crossCheck.passwordLength && document.getElementById("Password must be more than 8 characters") != undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Password must be more than 8 characters`
                    errorNode.id = "Password must be more than 8 characters"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.passwordLength && document.getElementById("Password must be more than 8 characters") != undefined) {
                    errorBox.removeChild(document.getElementById("Password must be more than 8 characters"))
                }
                if (!crossCheck.passwordSecurity && document.getElementById("Password must include a number") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Password must include a number`
                    errorNode.id = "Password must include a number"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.passwordSecurity && document.getElementById("Password must include a number") != undefined) {
                    errorBox.removeChild(document.getElementById("Password must include a number"))
                }
                if (!crossCheck.schoolName && document.getElementById("Invalid school name") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid school name`
                    errorNode.id = "Invalid school name"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.schoolName && document.getElementById("Invalid school name") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid school name"))
                }
                if (!crossCheck.specialCharacter && document.getElementById("Password must include a special character '@,&,<,/'") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Password must include a special character '@,&,<,/'`
                    errorNode.id = "Password must include a special character '@,&,<,/'"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.specialCharacter && document.getElementById("Password must include a special character '@,&,<,/'") != undefined) {
                    errorBox.removeChild(document.getElementById("Password must include a special character '@,&,<,/'"))
                }
                if (!crossCheck.state && document.getElementById("Invalid state") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid state`
                    errorNode.id = "Invalid state"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.state && document.getElementById("Invalid state") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid state"))
                }
                if (!crossCheck.terms && document.getElementById("Agree to terms and conditions") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Agree to terms and conditions`
                    errorNode.id = "Agree to terms and conditions"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.terms && document.getElementById("Agree to terms and conditions") != undefined) {
                    errorBox.removeChild(document.getElementById("Agree to terms and conditions"))
                }
            }
        }, 15000)
    }
})
