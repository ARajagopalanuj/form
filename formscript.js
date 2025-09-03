document.getElementById("studentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const email = document.getElementById("email").value.trim();
    const pan = document.getElementById("pan").value.trim();
    const aadhar = document.getElementById("aadhar").value.trim();
    const sslcNo = document.getElementById("sslcNo").value.trim();
    const sslcMarks = document.getElementById("sslcMarks").value.trim();
    const cgpa = document.getElementById("cgpa").value.trim();

  
    if (!name) {
        alert("Please enter your name.");
        return;
    }
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Name can only contain letters and spaces.");
        return;
    }
    if (!age || isNaN(age) || age < 10 || age > 100) {
        alert("Please enter a valid age between 10 and 100.");
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
        alert("Please enter a valid PAN number (e.g., ABCDE1234F).");
        return;
    }
    if (!aadhar || !/^[0-9]{12}$/.test(aadhar)) {
        alert("Please enter a valid 12-digit Aadhar number.");
        return;
    }
    if (!sslcNo) {
        alert("Please enter SSLC number.");
        return;
    }
    if (!sslcMarks || isNaN(sslcMarks) || sslcMarks < 0 || sslcMarks > 500) {
        alert("Please enter valid SSLC marks (0 - 500).");
        return;
    }
    if (!cgpa || isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        alert("Please enter a valid CGPA (0 - 10).");
        return;
    }

 
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

    try {
        const response = await fetch("https://0dad71dee8cb.ngrok-free.app/student/details/addData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            const msg = await response.text();
            alert(msg);
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
