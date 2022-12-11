const addbutton = document.getElementById("add");
const uploadForm = document.getElementById("video-upload");
const deleteall = document.querySelector(".deleteall");

// here click event is given to show the form and close the form
addbutton.addEventListener("click",(e) => {

    if (e.target.innerText === "Add Video") {
        uploadForm.style.display = "flex";
        addbutton.style.backgroundColor = "crimson";
        addbutton.innerText = "Close"
    } else {
        uploadForm.style.display = "none";
        addbutton.style.backgroundColor = "lightblue";
        addbutton.innerText = "Add Video"
    }
});
//___________________________________ VIDEO UPLOAD _______________________________________
const title = document.getElementById("title");
const date = document.getElementById("date");
const description = document.getElementById("description");
const videoFile = document.getElementById("video-file");

uploadForm.addEventListener("submit",(e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title",title.value);
    formData.append("date",date.value);
    formData.append("description",description.value);
    formData.append("video-file",videoFile.files[0]);

    fetch("http://localhost:3000/api/create",{
        method: "POST",
        body: formData
    }).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.success) {
            console.log("File is uploaded");
            console.log(data);
            window.location.reload(); 
        } else {
            console.log("error occured");
            console.log(data);
        }
    })

})

// __________________________________ VIDEO READ __________________________________________
const videoContainer = document.getElementById("video-container");

window.onload = () => {
    fetch("http://localhost:3000/api/show"
    ).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.success) {
            // success then render the html here
            if (data.output.length <= 0) {
                videoContainer.innerHTML = "<h3>No Videos Found</h3>"
                videoContainer.style.height = "50px";
                videoContainer.style.textAlign = "center";

                deleteall.style.display = "none";
            } else {
                // foreach list videos
                let videos = data.output;
                videos.forEach((vid) => {
                    let div = document.createElement("div");
                    div.className = "video-box";
                    div.innerHTML = `
                            <video controls>
                                <source src="./uploads/${vid.video_source}" type="${vid.video_mimetype}" />
                            </video>
                            <h4>
                                ${vid.title}
                            </h4>
                            <h5>
                                ${vid.date}
                            </h5>
                            <p>
                                ${vid.description}
                            </p>
                            <div class="btn-group">
                                <button class="update" value=${vid._id}>Update</button>
                                <button class="delete" value=${vid._id}>Delete</button>
                            </div>
                    `;
                    videoContainer.appendChild(div);
                });
                deleteall.style.display = "flex";

                // ___________________ VIDEO DELETE ___________________
                const deleteBtns = document.querySelectorAll(".delete");

                deleteBtns.forEach((deleteBtn) => {
                    deleteBtn.addEventListener("click",(e) => {
                        e.preventDefault();

                        // fetch to delete video
                        fetch(`http://localhost:3000/api/delete/${e.target.value}`,{
                            method: "DELETE"
                        }).then((res1) => {
                            return res1.json();
                        }).then((data2) => {
                            if (data2.success) {
                                alert("Your video is deleted");
                                window.location.reload();
                            } else {
                                alert("Some error occured");
                                console.log(data2.output);
                            }
                        })
                    })
                });

                //___________________________ VIDEOS DELTEALL ___________________
                deleteall.addEventListener("click",(e) => {
                    e.preventDefault();

                    // fetch to delete all videos
                    fetch("http://localhost:3000/api/delete/deleteall",{
                        method: "DELETE"
                    }).then((res2) => {
                        return res2.json();
                    }).then((data2) => {
                        if (data2.success) {
                            alert(data2.output.message);
                            window.location.reload();
                            
                        } else {
                            console.log(data2);
                        }
                    })
                })

                // __________________________ VIDEOS UPDATE _____________________
                const updateForm = document.getElementById("video-update");
                const closeUpdateForm = document.querySelector(".close");

                const updateBtns = document.querySelectorAll(".update");

                updateBtns.forEach((update) => {
                    update.addEventListener("click",(e) => {
                        e.preventDefault();

                        // id value of specific video file
                        let id = e.target.value;

                        updateForm.style.display = "flex";
                        updateForm.scrollIntoView();
                        // here update videos

                        let title1 = document.getElementById("title1");
                        let date1 = document.getElementById("date1");
                        let description1 = document.getElementById("description1");
                        let videoFile1 = document.getElementById("video-file1");

                        // update form submit event
                        updateForm.addEventListener("submit",(e) => {
                            e.preventDefault();

                            if (videoFile1.files[0]) {
                                let formData1 = new FormData();

                                formData1.append("video-file1",videoFile1.files[0]);
                                if (title1.value !== "") {
                                    formData1.append("title",title1.value);
                                }
                                if (date1.value !== "") {
                                    formData1.append("date",date1.value);
                                }
                                if (description1.value !== "") {
                                    formData1.append("description",description1.value);
                                }

                                // fetch to update the video files
                                console.log("file");
                                fetch(`http://localhost:3000/api/update/${id}`,{
                                    method: "PATCH",
                                    body: formData1
                                }).then((res3) => {
                                    return res3.json();
                                }).then((data3) => {
                                    if (data3.success) {
                                        alert("Your video file is updated");
                                        window.location.reload();
                                    } else {
                                        alert("Some Error occured");
                                    }
                                })
                            } else {
                                let resObj = {};

                                if (title1.value !== "") {
                                    resObj.title = title1.value;
                                }
                                if (date1.value !== "") {
                                    resObj.date = date1.value;
                                }
                                if (description1.value !== "") {
                                    resObj.description = description1.value;
                                }

                                // fetch to update the video files
                                fetch(`http://localhost:3000/api/update/${id}`,{
                                    method: "PATCH",
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(resObj)
                                }).then((res3) => {
                                    return res3.json();
                                }).then((data3) => {
                                    if (data3.success) {
                                        alert("Your video file is updated");
                                        window.location.reload();
                                    } else {
                                        alert("Some error occured");
                                    }
                                })
                            }
                        })
                        
                    })
                });

                // to close the update Form
                closeUpdateForm.addEventListener("click",(e) => {
                    e.preventDefault();

                    updateForm.style.display = "none";
                })
            }
        }
    })
}
