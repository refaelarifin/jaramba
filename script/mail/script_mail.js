// Function to open the mail popup
function openMailPopup(from, subject, date, body) {
    document.getElementById("popupFrom").innerHTML = "From: " + from;
    document.getElementById("popupSubject").innerHTML = "Subject: " + subject;
    document.getElementById("popupDate").innerHTML = "Date: " + date;
    document.getElementById("popupBody").innerHTML = body;
    document.getElementById("mailPopup").style.display = "flex";
}

// Function to close the mail popup
function closeMailPopup() {
    document.getElementById("mailPopup").style.display = "none";
}

// Function to open the write mail popup
function openWriteMailPopup() {
    document.getElementById("writeMailPopup").style.display = "flex";
}

// Function to close the write mail popup
function closeWriteMailPopup() {
    document.getElementById("writeMailPopup").style.display = "none";
}

// Close the mail popup if the user clicks outside of it or on the X button
window.onclick = function (event) {
    var mailPopup = document.getElementById("mailPopup");
    var writeMailPopup = document.getElementById("writeMailPopup");

    if (event.target === mailPopup) {
        closeMailPopup();
    }

    if (event.target === writeMailPopup) {
        closeWriteMailPopup();
    }
};

// Mail data for pagination
const mailData = [
    { from: 'john.doe@example.com', subject: 'Meeting Request', date: '2023-11-21 09:30 AM', body: 'This is the mail body.' },
    { from: 'gina.anderson@example.com', subject: 'Attendance Request', date: '2023-11-21 11:30 AM', body: 'This is the mail body.' },
    { from: 'tommy.dorothy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    { from: 'tommy1.dorothy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    { from: 'tommy.3dorothy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    { from: 'tommy.4dorothy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    { from: 'tommy.d65orothy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    // { from: 'tommy.do7rothy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    // { from: 'tommy.dor8othy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    // { from: 'tommy.doro9thy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    // { from: 'tommy.dorot0hy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    // { from: 'tommy.doro123thy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    // { from: 'tommy123123.dorothy@example.com', subject: 'Absent Request', date: '2023-11-20 07:30 PM', body: 'This is the mail body.' },
    // Add more mail data as needed
];

// Items per page
const itemsPerPage = 10;

// Current page
let currentPage = 1;

// Function to display mails on the current page
function displayMailsOnPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const mailTableBody = document.getElementById('mailTableBody');// Use the correct ID
    mailTableBody.innerHTML = ''; // Clear existing rows

    for (let i = startIndex; i < endIndex && i < mailData.length; i++) {
        const mail = mailData[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td onclick="openMailPopup('${mail.from}', '${mail.subject}', '${mail.date}', '${mail.body}')">${mail.from}</td>
            <td onclick="openMailPopup('${mail.from}', '${mail.subject}', '${mail.date}', '${mail.body}')">${mail.subject}</td>
            <td onclick="openMailPopup('${mail.from}', '${mail.subject}', '${mail.date}', '${mail.body}')">${mail.date}</td>
        `;

        mailTableBody.appendChild(row);
    }

    // Log the number of rows after adding them
    console.log("Number of rows in mailTableBody:", mailTableBody.rows.length);
}

// Function to submit the mail
function submitMail(){
    const recipient = document.getElementById("recipient").value;
    const subject = document.getElementById("subject").value;
    const mailBody = document.getElementById("mailBody").value;

    // Check if the recipient's email is filled in
    if (recipient.trim() === "") {
        alert("Please enter the recipient's email.");
        return;
    }

    // Check if the subject or body is empty
    if ( mailBody.trim() === "") {
        const confirmation = confirm("Mail body is empty. Do you want to submit?");
        if (!confirmation) {
            return;
        }
    }
    else if (subject.trim() === "") {
        const confirmation = confirm("Subject is empty. Do you want to submit?");
        if (!confirmation) {
            return;
        }
    }

    // Close the write mail popup
    closeWriteMailPopup();
}

// Function to go to the previous page
function prevPage() {
    console.log("Previous Page");
    if (currentPage > 1) {
        currentPage--;
        displayMailsOnPage();
    }
}

// Function to go to the next page
function nextPage() {
    console.log("Next Page");
    const totalPages = Math.ceil(mailData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayMailsOnPage();
    }
}

// Function to update the visibility of pagination buttons
function updatePaginationVisibility() {
    const mailTableBody = document.getElementById("mailTableBody");
    const paginationButtons = document.getElementById("pagination");

    // Check if the number of rows in the table body is greater than the items per page
    if (mailData.length > itemsPerPage) {
        paginationButtons.style.display = "block";
    } else {
        paginationButtons.style.display = "none";
    }
}


// Call this function when you open a mail or perform any action that may change the number of rows
function updatePagination() {
    updatePaginationVisibility();
}

// Call this function when the page loads to set the initial visibility and display mails
window.onload = function () {
    // Assuming your mail data loading process takes some time (e.g., fetching from a server)
    // Simulate a delay of 1 second before setting visibility and displaying mails
    setTimeout(function () {
        updatePaginationVisibility();
        displayMailsOnPage();
    }, 100); // Adjust the delay as needed
};
