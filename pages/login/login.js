let userInfo = window.localStorage.getItem("currentUserInfo")
if (userInfo != null) {
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

let loadingMessages = [
    "Be right back convincing my brain to function",
    "Polishing your procrastination excuses...",
    "Organizing tasks you'll totally do... eventually",
    "Turning chaos into checkmarks (with minimal crying)",
    "Assembling adult-level responsibility… this may take a while",
    "Installing motivation patch 2.0 - now with fewer naps",
    "Loading your 'I can do this' playlist",
    "Downloading main character energy...",
    "Applying 15 layers of 'I'll do it later'",
    "Manifesting an A+ without opening the book",
    "Reconnecting to the grindset matrix",
    "Booting up chaos.exe - please stand by"
]
let crossCheck = {
    email: false,
    emailExists: true,
    password: false,
    passwordSecurity: true,
}

let index = 0;
document.getElementById("signUpActual").addEventListener("click", () => {
    var Errors = [];
    let emailValue = document.getElementById("emailInput").value
    let passwordValue = document.getElementById("password").value
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


    let userInfo
    if (emailValue.length > 5) {
        var docRef = db.collection("users").doc(emailValue);
        docRef.get().then((doc) => {
            if (!doc.exists) {
                Errors.push("Email does not exist")
                crossCheck.emailExists = false;
                if (emailValue.length > 5 && emailValue.includes("@") && emailValue.includes(".")) {
                    Errors.splice("Invalid Email", 1)
                    crossCheck.email = true;
                } else {
                    Errors.push("Invalid Email")
                    crossCheck.email = false;
                }
            } else {
                userInfo = doc.data()
                if (passwordValue == userInfo.Password) {
                        
                        Errors.splice("Password must include a number", 1)
                        crossCheck.passwordSecurity = true
                    } else {
                        Errors.push("Password must include a number", 1)
                        crossCheck.passwordSecurity = false
                    }
                if (emailValue.length > 5 && emailValue.includes("@") && emailValue.includes(".")) {
                    Errors.splice("Invalid Email", 1)
                    Errors.splice("Email does not exist", 1)
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
                    
                } else {
                    Errors.push("Invalid Password")
                    crossCheck.password = false
                }

            }
        ).then(() => {
            setTimeout(() => {
                if (crossCheck.email && crossCheck.emailExists && crossCheck.password && crossCheck.passwordSecurity) {
                    window.localStorage.setItem("currentUserInfo", JSON.stringify({
                        Email: emailValue,
                        Name: userInfo.Name,
                        Tasks: userInfo.Tasks,
                        Streak: userInfo.Streak,
                        ProfilePicture: userInfo.ProfilePicture,
                    }))
                    window.clearInterval()
                    document.getElementById("loadingText").style.fontWeight = "bold"
                    document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${nameValue}`
                    setTimeout(() => { window.location.assign("dashboard.html") }, 2000)

                } else {
                    window.scrollTo(0, 1)
                    document.getElementById("mainBody").style.filter = "none";
                    document.getElementById("animationLoad").style.visibility = "hidden";
                    document.body.style.overflowY = "auto"
                    document.getElementById("nav").style.display.backgroundColor = "white";
                    let errorBox = document.getElementById("errors")

                    if (!crossCheck.email && document.getElementById("Invalid email") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid email`
                        errorNode.id = "Invalid email"
                        errorBox.appendChild(errorNode)
                    } else if (crossCheck.email && document.getElementById("Invalid email") != undefined) {
                        errorBox.removeChild(document.getElementById("Invalid email"))
                    }
                    if (!crossCheck.emailExists && document.getElementById("User does not exist") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>User does not exist`
                        errorNode.id = "User does not exist"
                        errorBox.appendChild(errorNode)
                    } else if (crossCheck.emailExists && document.getElementById("User does not exist") != undefined) {
                        errorBox.removeChild(document.getElementById("User does not exist"))
                    }
                    if (!crossCheck.password && document.getElementById("Invalid password") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid password`
                        errorNode.id = "Invalid password"
                        errorBox.appendChild(errorNode)
                    } else if (crossCheck.password && document.getElementById("Invalid password") != undefined) {
                        errorBox.removeChild(document.getElementById("Invalid password"))
                    }
                    if (!crossCheck.passwordSecurity && document.getElementById("Email and password do not match") == undefined) {
                        let errorNode = document.createElement("p")
                        errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Email and password do not match`
                        errorNode.id = "Email and password do not match"
                        errorBox.appendChild(errorNode)
                    } else if (crossCheck.passwordSecurity && document.getElementById("Email and password do not match") != undefined) {
                        errorBox.removeChild(document.getElementById("Email and password do not match"))
                    }
                }
            }, 15000)
        })
    } else {
        Errors.push("Invalid Email")
        crossCheck.email = false;
        if (passwordValue.length > 0) {
            Errors.splice("Invalid Password", 1)
            crossCheck.password = true
        } else {
            Errors.push("Invalid Password")
            crossCheck.password = false
        }
        setTimeout(() => {
            if (crossCheck.email && crossCheck.emailExists && crossCheck.password && crossCheck.passwordSecurity) {
                window.localStorage.setItem("currentUserInfo", JSON.stringify({
                    Email: emailValue,
                    Name: userInfo.Name,
                    Tasks: userInfo.Tasks,
                    Streak: userInfo.Streak,
                    ProfilePicture: userInfo.ProfilePicture,
                }))
                window.clearInterval()
                document.getElementById("loadingText").style.fontWeight = "bold"
                document.getElementById("loadingText").innerText = `Welcome to Stellar Ed ${userInfo.Name}`
                setTimeout(() => { window.location.assign("dashboard.html") }, 2000)

            } else {
                window.scrollTo(0, 1)
                document.getElementById("mainBody").style.filter = "none";
                document.getElementById("animationLoad").style.visibility = "hidden";
                document.body.style.overflowY = "auto"
                document.getElementById("nav").style.display.backgroundColor = "white";
                let errorBox = document.getElementById("errors")

                if (!crossCheck.email && document.getElementById("Invalid email") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid email`
                    errorNode.id = "Invalid email"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.email && document.getElementById("Invalid email") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid email"))
                }
                if (!crossCheck.emailExists && document.getElementById("User does not exist") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>User does not exist`
                    errorNode.id = "User does not exist"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.emailExists && document.getElementById("User does not exist") != undefined) {
                    errorBox.removeChild(document.getElementById("User does not exist"))
                }
                if (!crossCheck.password && document.getElementById("Invalid password") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Invalid password`
                    errorNode.id = "Invalid password"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.password && document.getElementById("Invalid password") != undefined) {
                    errorBox.removeChild(document.getElementById("Invalid password"))
                }
                if (!crossCheck.passwordSecurity && document.getElementById("Email and password do not match") == undefined) {
                    let errorNode = document.createElement("p")
                    errorNode.innerHTML = `<span class="material-icons" style="font-size: 15px;">error</span>Email and password do not match`
                    errorNode.id = "Email and password do not match"
                    errorBox.appendChild(errorNode)
                } else if (crossCheck.passwordSecurity && document.getElementById("Email and password do not match") != undefined) {
                    errorBox.removeChild(document.getElementById("Email and password do not match"))
                }
            }
        }, 15000)
    }
})