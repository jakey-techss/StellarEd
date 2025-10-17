let userInfo = window.localStorage.getItem("currentUserInfo")
console.log(userInfo)
if (userInfo == null) {
    window.location.assign("index.html")
} else {
    if (JSON.parse(userInfo).Onboard == false) {
        window.location.assign("onboard.html")
    }
}