function loadPhoto(e) {
    const img = document.getElementById("resumePhoto");
    img.src = URL.createObjectURL(e.target.files[0]);
}

function addEducation() {
    const d = document.createElement("div");
    d.innerHTML = `
        <input placeholder="Degree">
        <input placeholder="College">
        <input placeholder="Year">
        <button onclick="this.parentElement.remove()">Remove</button>
    `;
    document.getElementById("extraEducation").appendChild(d);
}

function setTemplate(t) {
    document.getElementById("resume").className = "resume-page " + t;
}

function generateResume() {
    rName.innerText = name.value;
    rContact.innerText = [phone.value, email.value, location.value].filter(Boolean).join(" | ");
    rAbout.innerText = about.value;

    rEducation.innerHTML = `
        ${tenthSchool.value ? `<div>10th: ${tenthSchool.value}</div>` : ""}
        ${twelfthSchool.value ? `<div>12th: ${twelfthSchool.value}</div>` : ""}
    `;

    rSkills.innerHTML = skills.value.split(",").map(s => `<li>${s}</li>`).join("");
    rLanguages.innerHTML = languages.value.split(",").map(l => `<li>${l}</li>`).join("");

    rProjects.innerHTML = "";
    projects.value.split("\n").forEach(p => {
        const x = p.split("|");
        rProjects.innerHTML += `<div><b>${x[0]}</b><br>${x[1] || ""}</div>`;
    });
}

function openDownloadOptions() {
    downloadModal.style.display = "flex";
}

function closeDownloadOptions() {
    downloadModal.style.display = "none";
}

async function downloadResume(format) {

    const resume = document.getElementById("resume");

    // Capture resume
    const canvas = await html2canvas(resume, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true
    });

    /* ================= IMAGE (PNG / JPG) ================= */
    if (format === "png" || format === "jpg") {
        const link = document.createElement("a");
        link.href = canvas.toDataURL(`image/${format}`);
        link.download = `Resume_${Date.now()}.${format}`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Redirect AFTER download
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);

        return;
    }

    /* ================= PDF ================= */
    if (format === "pdf") {
        const { jsPDF } = window.jspdf;

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.save(`Resume_${Date.now()}.pdf`);

        // Redirect AFTER save
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }
}




