document.addEventListener("DOMContentLoaded", function(){
const studentForm=document.getElementById("studentForm");
if(studentForm){
studentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
     if (!name) {
        alert("Please enter your name.");
        return;
    }
      if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Name can only contain letters and spaces.");
        return;
    }
    const age = document.getElementById("age").value.trim();
    if (!age || isNaN(age) || age < 10 || age > 100) {
        alert("Please enter a valid age between 10 and 100.");
        return;
    }
   
    const email = document.getElementById("email").value.trim();
     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    const pan = document.getElementById("pan").value.trim();
     if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
        alert("Please enter a valid PAN number (e.g., ABCDE1234F).");
        return;
    }
    const aadhar = document.getElementById("aadhar").value.trim();
    
    if (!aadhar || !/^[0-9]{12}$/.test(aadhar)) {
        alert("Please enter a valid 12-digit Aadhar number.");
        return;
    }
    const sslcNo = document.getElementById("sslcNo").value.trim();
    
    if (!sslcNo) {
        alert("Please enter SSLC number.");
        return;
    }
    const sslcMarks = document.getElementById("sslcMarks").value.trim();
      if (!sslcMarks || isNaN(sslcMarks) || sslcMarks < 0 || sslcMarks > 500) {
        alert("Please enter valid SSLC marks (0 - 500).");
        return;
    }
    const cgpa = document.getElementById("cgpa").value.trim();
   
    if (!cgpa || isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        alert("Please enter a valid CGPA (0 - 10).");
        return;
    }
    const gender=document.getElementById("gender").value.trim();
    const hscMarkSheetNo=document.getElementById("hscNo").value.trim();
    const course=document.getElementById("state").value.trim();

 
    const studentData = {
        name: name,
        age: parseInt(age),
        emailid: email,
        gender: gender,
        pan_no: pan,
        aadhar_no: aadhar,
        sslc_no: sslcNo,
        sslc_marks: parseInt(sslcMarks),
        hsc_marksheet_NO: hscMarkSheetNo,
        hsc_marks: 0,
        course: course,
        CGPA: parseFloat(cgpa)
    };

    try {
        const response = await fetch(" https://d2ca95e4f98c.ngrok-free.app/student/details/addData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            const msg = await response.text();
            alert(msg);
        } else {
            const errorText = await response.text();
            alert("Error: " + errorText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Could not connect to the server.");
    }
});
}
const userForm=document.getElementById("user")

    if(userForm){
    userForm.addEventListener("submit",async function(e) {
    e.preventDefault();
  
    const user=document.getElementById("login-username").value.trim();
    const password=document.getElementById("login-password").value.trim();
  
     if (!user || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)) {
        alert("Please enter a valid email address.");
        return;
    }
    const userData={
        user: user,
        password: password
    };
    try{
        const response= await fetch("https://d2ca95e4f98c.ngrok-free.app/student/details/login",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if(response.ok){
            const message=await response.text();
            localStorage.setItem("user",user);
            localStorage.setItem("name",message);
        }else{
            const errorText=await response.text();
            alert(errorText);
        }
          window.location.href="showDetails.html";

        
    }catch (error) {
        console.error("Fetch error:", error);
        alert("Could not connect to the server.");
    }

    
});
    }
    const result=document.getElementById("result");

    if(result){
        const data=localStorage.getItem("name");
        if(data){
            try{
            const object=JSON.parse(data);
            result.innerText="Hi welcome "+(object.message)||"No message found";
              
              
            }catch(e){
               console.error("Fetch Error: ",error);
               alert("something errors");
            }
        }else{
            result.innerText="No result available.";
        }
    }   
window.getData=async function(){
        let username=localStorage.getItem("user").trim();
        console.log(username);
        const details=document.getElementById("Details");
        const userData={
            user:username
        };
        try{
            const response= await fetch("https://d2ca95e4f98c.ngrok-free.app/student/details/getData",{
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body:JSON.stringify(userData)
            });
            if(response.ok){
                const data=await response.json();
                console.log(data);
                const studentData=Array.isArray(data.message)?data.message:[];
                details.innerHtml="<h3> your Details<h3>";
                      studentData.forEach(student => {
      details.innerHTML += `
<div class="student-card">
    <table border="1" cellpadding="5" cellspacing="0" width: 100%;">
        <tr>
            <th>Name</th>
            <td>${student.name || '-'}</td>
        </tr>
        <tr>
            <th>Age</th>
            <td>${student.age || '-'}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>${student.emailid || '-'}</td>
        </tr>
        <tr>
            <th>Gender</th>
            <td>${student.gender || '-'}</td>
        </tr>
        <tr>
            <th>PAN No</th>
            <td>${student.panNo || '-'}</td>
        </tr>
        <tr>
            <th>Aadhar No</th>
            <td>${student.aadharNO || '-'}</td>
        </tr>
        <tr>
            <th>SSLC No</th>
            <td>${student.sslcNo || '-'}</td>
        </tr>
        <tr>
            <th>SSLC Marks</th>
            <td>${student.sslcMarks || '-'}</td>
        </tr>
        <tr>
            <th>HSC Marksheet No</th>
            <td>${student.hscMarkSheetNo || '-'}</td>
        </tr>
        <tr>
            <th>HSC Marks</th>
            <td>${student.hscMarks || '-'}</td>
        </tr>
        <tr>
            <th>Course</th>
            <td>${student.course || '-'}</td>
        </tr>
        <tr>
            <th>CGPA</th>
            <td>${student.cgpa || '-'}</td>
        </tr>
    </table>
    <hr>
</div>
`;


                });
            }else{
                details.innerText="Error: " +await response.text();
            }

        }catch(e){
            console.error("Fetch error:", e);
        details.innerText = "Could not fetch details from server.";

        }
        
    }



});

