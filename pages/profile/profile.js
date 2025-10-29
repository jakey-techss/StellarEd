let userInfo = window.localStorage.getItem("currentUserInfo")
if (userInfo == null) {
    window.location.assign("index.html")
} else {
    if (JSON.parse(userInfo).Onboard == false) {
        window.location.assign("onboard.html")
    } else {
        document.title = `${JSON.parse(userInfo).Name.substring(0, JSON.parse(userInfo).Name.indexOf(" "))}'s Profile`
        
    }
}