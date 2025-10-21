
let userInfo = window.localStorage.getItem("currentUserInfo")
document.getElementById("signUpActual2").addEventListener("click",()=>{
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
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            // Set Data
            const data = google.visualization.arrayToDataTable([
                ['State', 'Percent'],
                ['Completed', 100],
                ['To Do', 0],
                ['In progress', 0],
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
                pieStartAngle: 60
            };

            // Draw
            const chart = new google.visualization.PieChart(document.getElementById('myChart'));
            chart.draw(data, options);

        }
        let time = ['time','time2','time3','time','time2','time3','time','time2','time3','time','time2','time3']

        let d = new Date()
        let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let dayOfWeek2 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let monthOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        document.getElementById("profilePicture").style.backgroundImage = `url("${JSON.parse(userInfo).ProfilePicture}")`
        document.getElementById("WelcomeMessage").innerText = `Welcome ${JSON.parse(userInfo).Name.substring(0, JSON.parse(userInfo).Name.indexOf(" ") + 2)}.`
        document.getElementById("Date").innerText = `${dayOfWeek[d.getDay()]} ${monthOfYear[d.getMonth()]} ${d.getDate()}`
        document.getElementById("time").innerText = `${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}${d.getHours() > 12 ? "PM" : "AM"}`
        setInterval(() => {
            let d = new Date()
            document.getElementById("time").innerText = `${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}${d.getHours() > 12 ? "PM" : "AM"}`
        }, 10000)
        var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);
        var EventBox = document.getElementById("Events")
        docRef.get().then((doc) => {
            let j =0
            if (doc.exists) {
                for (i = 1; i <= 12; i++) {
                    if (doc.data().Tasks[i] != undefined && doc.data().Tasks[i].When.includes(dayOfWeek2[d.getDay()+1])) {
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
                console.log("Document data:",);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        document.getElementById("addNewTask1").addEventListener("click",()=>{
            window.scrollTo(0,0)
            document.body.style.padding = 0
            document.body.style.overflowY = "hidden"
            document.getElementById("floater").style.display="flex";
            document.getElementById("addTask").style.display="block";
            document.getElementById("cancel").addEventListener("click",()=>{
                document.getElementById("floater").style.display="none";
                document.getElementById("addTask").style.display="none";
                document.getElementById("date").value =""
                document.getElementById("TaskTitle").value =""
                document.body.style.overflowY = "auto"
            })
            
        })
    }
}
