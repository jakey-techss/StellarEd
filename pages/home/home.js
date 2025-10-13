let userInfo = window.localStorage.getItem("currentUserInfo")
console.log(userInfo)
if (userInfo != null){
    window.location.assign("dashboard.html")
}