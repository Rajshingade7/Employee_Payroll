function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    profile: document.querySelector('input[name="profile"]:checked').value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    departments: [],
    salary: document.getElementById('salary').value,
    startDate: {
      day: document.getElementById('day').value,
      month: document.getElementById('month').value,
      year: document.getElementById('year').value
    },
    notes: document.getElementById('notes').value
  };

  document.querySelectorAll('input[name="department"]:checked').forEach(function (checkbox) {
    formData.departments.push(checkbox.value);
  });

  console.log(formData);

  const postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  fetch('http://localhost:3000/employees', postData)
    .then(response => {
      if (response.ok) {
        console.log('Employee data stored successfully on the JSON server.');
      } else {
        console.error('Failed to store employee data on the JSON server.');
      }
    })
    .catch(error => {
      console.error('An error occurred while storing employee data on the JSON server:', error);
    });
}

document.querySelector('.submit-btn').addEventListener('click', handleFormSubmit);

function resetForm() {
  document.getElementById('name').value = '';
  document.querySelector('input[name="profile"]:checked').checked = false;
  document.querySelector('input[name="gender"]:checked').checked = false;
  document.querySelectorAll('input[name="department"]:checked').forEach(function (checkbox) {
    checkbox.checked = false;
  });
  document.getElementById('salary').selectedIndex = 0;
  document.getElementById('day').selectedIndex = 0;
  document.getElementById('month').selectedIndex = 0;
  document.getElementById('year').selectedIndex = 0;
  document.getElementById('notes').value = '';
}

document.querySelector('.reset-btn').addEventListener('click', resetForm);
