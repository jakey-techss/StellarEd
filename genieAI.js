let userInfo = window.localStorage.getItem("currentUserInfo")
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
        let messageBox = document.getElementById("messages")
        var docRef = db.collection("users").doc(JSON.parse(userInfo).Email);
        let userInfoDatabase;
        docRef.get().then((doc) => {
            if (doc.exists) {
                userInfoDatabase = doc.data()
            }
        }).then(() => {
            if (userInfoDatabase.Chat == undefined) {
                let message = document.createElement('div')
                message.classList.add("messageContainer")
                message.innerHTML = `<div class="profilePictureBot"></div>
                    <p class="message poppins-light">Chill corner for your brain. I'm your study buddy, here to help
                        with whatever's stressing you out. Homework struggles? Test anxiety? or just trying to
                        adult? Whatever's on your plate, let's break it down, find some answers, and maybe even have
                        a little fun along the way.</p>`
                messageBox.appendChild(message)
                docRef.update({
                    Chat: firebase.firestore.FieldValue.arrayUnion({
                        message: "Chill corner for your brain. I'm your study buddy, here to help with whatever's stressing you out. Homework struggles? Test anxiety? or just trying to adult? Whatever's on your plate, let's break it down, find some answers, and maybe even have a little fun along the way.",
                        sender: "Bot",
                        id: 1
                    }
                    )
                });
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        userInfoDatabase = doc.data()
                    }
                }).then(() => {
                    message = document.createElement('div')
                    message.classList.add("messageContainer")
                    message.innerHTML = `<div class="profilePictureBot"></div>
                    <p class="message poppins-light">Hey there ${userInfoDatabase.Name.substring(0, userInfoDatabase.Name.indexOf(" "))}, how can I help you today?</p>`
                    messageBox.appendChild(message)
                    docRef.update({
                        Chat: firebase.firestore.FieldValue.arrayUnion({
                            message: `Hey there ${userInfoDatabase.Name.substring(0, userInfoDatabase.Name.indexOf(" "))}, how can I help you today?`,
                            sender: "Bot",
                            id: userInfoDatabase.Chat.length + 1
                        }
                        )
                    });
                })

            } else {
                for (i = 0; i < userInfoDatabase.Chat.length; i++) {
                    if (userInfoDatabase.Chat[i].sender == "User") {
                        let prompt = userInfoDatabase.Chat[i].message
                        document.getElementById("prompt").value = ""
                        let message = document.createElement('div')
                        message.classList.add("messageContainerOpposite")
                        message.innerHTML = `<div class="profilePictureUser" style="background-image: url(${userInfoDatabase.ProfilePicture});"></div>
                    <p class="messageSender poppins-light">${prompt}</p>`
                        messageBox.appendChild(message)
                    } else {
                        let message = document.createElement('div')
                        message.classList.add("messageContainer")
                        message.innerHTML = `<div class="profilePictureBot"></div>
                    <p class="message poppins-light">${userInfoDatabase.Chat[i].message}</p>`
                        messageBox.appendChild(message)
                    }
                }
                let message = document.createElement('div')
                message.classList.add("messageContainer")
                message.innerHTML = `<div class="profilePictureBot"></div>
                    <p class="message poppins-light">Hey there ${userInfoDatabase.Name.substring(0, userInfoDatabase.Name.indexOf(" "))}, how can I help you today?</p>`
                if (userInfoDatabase.Chat[userInfoDatabase.Chat.length - 1].message != `Hey there ${userInfoDatabase.Name.substring(0, userInfoDatabase.Name.indexOf(" "))}, how can I help you today?`) {
                    messageBox.appendChild(message)
                    docRef.update({
                        Chat: firebase.firestore.FieldValue.arrayUnion({
                            message: `Hey there ${userInfoDatabase.Name.substring(0, userInfoDatabase.Name.indexOf(" "))}, how can I help you today?`,
                            sender: "Bot",
                            id: userInfoDatabase.Chat.length + 1
                        }
                        )
                    })
                }

            }

            document.getElementById("prompt").addEventListener("keypress", (e) => {
                if (e.code == "Enter" && document.getElementById("prompt").value.trim() != "") {
                    let prompt = document.getElementById("prompt").value
                    document.getElementById("prompt").value = ""
                    let message = document.createElement('div')
                    message.classList.add("messageContainerOpposite")
                    message.innerHTML = `<div class="profilePictureUser" style="background-image: url(${userInfoDatabase.ProfilePicture});"></div>
                    <p class="messageSender poppins-light">${prompt}</p>`
                    messageBox.appendChild(message)
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            userInfoDatabase = doc.data()
                        }
                    }).then(() => {
                        docRef.update({
                            Chat: firebase.firestore.FieldValue.arrayUnion({
                                message: prompt,
                                sender: "User",
                                id: userInfoDatabase.Chat.length + 1
                            }
                            )
                        });
                        callGemini(prompt)
                    })
                }
            })

            document.getElementById("button").addEventListener("click", () => {
                if (document.getElementById("prompt").value.trim() != "") {
                    let prompt = document.getElementById("prompt").value
                    document.getElementById("prompt").value = ""
                    let message = document.createElement('div')
                    message.classList.add("messageContainerOpposite")
                    message.innerHTML = `<div class="profilePictureUser" style="background-image: url(${userInfoDatabase.ProfilePicture});"></div>
                    <p class="messageSender poppins-light">${prompt}</p>`
                    messageBox.appendChild(message)
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            userInfoDatabase = doc.data()
                        }
                    }).then(() => {
                        docRef.update({
                            Chat: firebase.firestore.FieldValue.arrayUnion({
                                message: prompt,
                                sender: "User",
                                id: userInfoDatabase.Chat.length + 1
                            }
                            )
                        });
                        callGemini(prompt)
                    })
                }
            })

        })

        async function callGemini(prompt) {
            document.getElementById("prompt").readOnly =true
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyABYLRILqZ2BmBuo3mtWW8a5MvdM62ZgrE",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt +" in a moderate amount of words as possible while maintaining comprehension of complex topics with examples" }] }]
                    })
                }
            );
            function stripMarkdown(text) {
                return text
                    // Remove code blocks and inline code
                    .replace(/```[\s\S]*?```/g, '')
                    .replace(/`([^`]*)`/g, '$1')
                    // Remove bold, italic, strikethrough
                    .replace(/(\*\*|__)(.*?)\1/g, '$2')
                    .replace(/(\*|_)(.*?)\1/g, '$2')
                    .replace(/~~(.*?)~~/g, '$1')
                    // Remove headings, lists, quotes
                    .replace(/^> /gm, '')
                    .replace(/^#+\s/gm, '')
                    .replace(/^- /gm, '')
                    // Collapse multiple newlines
                    .replace(/\n{2,}/g, '<br><br>')
                    .replace(/`*`/g, '')
                    .trim();
            }


            const data = await response.json();
            const clean = stripMarkdown(data.candidates[0].content.parts[0].text);
            message = document.createElement('div')
            message.classList.add("messageContainer")
            message.innerHTML = `<div class="profilePictureBot"></div>
            <p class="message poppins-light">${clean}</p>`
            messageBox.appendChild(message)
            docRef.get().then((doc) => {
                if (doc.exists) {
                    userInfoDatabase = doc.data()
                }
            }).then(() => {
                docRef.update({
                    Chat: firebase.firestore.FieldValue.arrayUnion({
                        message: clean,
                        sender: "Bot",
                        id: userInfoDatabase.Chat.length + 1
                    }
                    )
                });
            })
            document.getElementById("prompt").readOnly =false
        }

    }
}
