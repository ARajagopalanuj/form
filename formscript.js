document.getElementById("studentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const pan = document.getElementById("pan").value;
    const aadhar = document.getElementById("aadhar").value;
    const sslcNo = document.getElementById("sslcNo").value;
    const sslcMarks = document.getElementById("sslcMarks").value;
    const cgpa = document.getElementById("cgpa").value;

    try {
        const studentData = {
            name: name,
            age: parseInt(age),
            emailid: email,
            gender: "N/A",
            pan_no: pan,
            aadhar_no: aadhar,
            sslc_no: sslcNo,
            sslc_marks: parseInt(sslcMarks),
            hsc_marksheet_NO: "N/A",
            hsc_marks: 0,
            course: "N/A",
            CGPA: parseFloat(cgpa)
        };

        const response = await fetch(" https://04804069ea6c.ngrok-free.app/student/details/addData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            const err=await response.text();
            alert(err);
            window.location.href = "uploadfile.html";
        } else {
            const errorText = await response.text();
            alert("Error: " + errorText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Could not connect to the server.");
    }
});
