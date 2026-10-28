let students = JSON.parse(localStorage.getItem('students')) || [];

const form = document.getElementById('student-form');
const tableBody = document.getElementById('student-table-body');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const studentIndexInput = document.getElementById('student-index');

// Render students on load
renderTable();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const marks = document.getElementById('student-marks').value;
    const editIndex = parseInt(studentIndexInput.value);

    if (editIndex === -1) {
        // Add
        students.push({ id, name, marks });
        alert('Student added successfully!');
    } else {
        // Update
        students[editIndex] = { id, name, marks };
        alert('Student updated successfully!');
        formTitle.textContent = 'Add Student';
        submitBtn.textContent = 'Add Student';
        studentIndexInput.value = -1;
    }

    saveAndRefresh();
    form.reset();
});

function renderTable(dataToRender = students) {
    tableBody.innerHTML = '';
    if (dataToRender.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No students available.</td></tr>`;
        return;
    }

    dataToRender.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.marks}</td>
            <td>
                <button class="btn edit" onclick="editStudent(${index})">Update</button>
                <button class="btn delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        saveAndRefresh();
    }
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-marks').value = student.marks;
    studentIndexInput.value = index;

    formTitle.textContent = 'Update Student';
    submitBtn.textContent = 'Update Student';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function searchStudents() {
    const query = document.getElementById('search-box').value.toLowerCase();
    const filtered = students.filter(s => 
        s.name.toLowerCase().includes(query) || s.id.toString().includes(query)
    );
    renderTable(filtered);
}

function saveAndRefresh() {
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
}