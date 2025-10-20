let userInfo = window.localStorage.getItem("currentUserInfo")
if (userInfo == null) {
    window.location.assign("index.html")
} else {
    if (JSON.parse(userInfo).Onboard == false) {
        window.location.assign("onboard.html")
    } else {
        document.title = `${JSON.parse(userInfo).Name.substring(0, JSON.parse(userInfo).Name.indexOf(" "))}'s | Dashboard`
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            // Set Data
            const data = google.visualization.arrayToDataTable([
                ['Contry', 'Mhl'],
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
                height: 400,
                enableInteractivity: false,
                pieSliceText: 'none',
                pieStartAngle: 60
            };

            // Draw
            const chart = new google.visualization.PieChart(document.getElementById('myChart'));
            chart.draw(data, options);

        }

        document.getElementById("profilePicture").style.backgroundImage = `url()`
    }
}
