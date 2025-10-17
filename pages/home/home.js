
let userInfo = window.localStorage.getItem("currentUserInfo")
if (userInfo != null){
    window.location.assign("dashboard.html")
}