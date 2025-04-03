function getCertificates() {
    return JSON.parse(localStorage.getItem("certificates") || "[]");
  }

  function saveCertificates(data) {
    localStorage.setItem("certificates", JSON.stringify(data));
  }

  function addCertificate() {
    const cert = {
      tin: document.getElementById("formTin").value.trim(),
      name: document.getElementById("formName").value.trim(),
      address: document.getElementById("formAddress").value.trim(),
      certNo: document.getElementById("formCertNo").value.trim(),
      date: document.getElementById("formDate").value,
    };

    if (!cert.tin || !cert.name) return alert("TIN and Name are required");

    const data = getCertificates();
    data.push(cert);
    saveCertificates(data);
    renderTable();
  }

  function lookupTIN() {
    const tin = document.getElementById("tin").value.trim();
    const cert = getCertificates().find((item) => item.tin === tin);
    const error = document.getElementById("error");

    if (cert) {
      fillCertificate(cert);
      error.classList.add("hidden");
      document.getElementById("popup").classList.remove("hidden");
    } else {
      error.classList.remove("hidden");
      document.getElementById("popup").classList.add("hidden");
    }
  }

  function fillCertificate(cert) {
    document.getElementById("tinOut").textContent = cert.tin;
    document.getElementById("certNoOut").textContent = cert.certNo;
    document.getElementById("nameOut").textContent = cert.name;
    document.getElementById("dateOut").textContent = cert.date;
    document.getElementById("addressOut").textContent = cert.address;
    document.getElementById("tinText").textContent = cert.tin;
    document.getElementById("nameText").textContent = cert.name;
  }

  function showPreview() {
    const content = document
      .getElementById("certificateContent")
      .cloneNode(true);
    const preview = document.getElementById("previewContent");
    preview.innerHTML = "";
    preview.appendChild(content);
    document.getElementById("previewModal").classList.remove("hidden");
    document.getElementById("popup").classList.add("hidden");
  }

  function closePreview() {
    document.getElementById("previewModal").classList.add("hidden");
  }

  function downloadPDF() {
    const element = document.getElementById("certificateContent");
    html2pdf()
      .set({
        margin: 1,
        filename: "certificate.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();

    document.getElementById("popup").classList.add("hidden");
  }

  function renderTable() {
    const data = getCertificates();
    const tbody = document.getElementById("certTable");
    tbody.innerHTML = "";

    data.forEach((cert) => {
      const row = `<tr>
        <td class="p-2 border">${cert.tin}</td>
        <td class="p-2 border">${cert.name}</td>
        <td class="p-2 border">${cert.certNo}</td>
        <td class="p-2 border">${cert.date}</td>
        <td class="p-2 border">
          <button onclick='fillCertificate(${JSON.stringify(
            cert
          )});document.getElementById("popup").classList.remove("hidden")' class="bg-green-600 text-white px-3 py-1 rounded">Generate</button>
        </td>
      </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  }

  renderTable();