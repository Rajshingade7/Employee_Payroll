$(document).ready(function() {
    function fetchAndPopulateTable() {
        $.ajax({
            url: 'http://localhost:3000/employees', 
            method: 'GET',
            success: function(data) {
                $('#employeeTable tbody').empty();
                
                data.forEach(function(employee) {
                    console.log(employee);
                    let departmentBadges = '';
                    if (Array.isArray(employee.departments)) {
                        departmentBadges = employee.departments.map(dept => `<span class="badge">${dept}</span>`).join(' ');
                    }

                    let row = `
                        <tr>
                            <td>
                            <img src="${employee.profile}" alt="Avatar">
                                ${employee.name}
                            </td>
                            <td>${employee.gender}</td>
                            <td>${departmentBadges}</td>
                            <td>₹ ${employee.salary}</td>
                            <td>${employee.startDate.day} ${employee.startDate.month} ${employee.startDate.year}</td>
                            <td>
                                <button class="delete" data-id="${employee.id}">🗑</button>
                                <button class="edit" data-id="${employee.id}">✎</button>
                            </td>
                        </tr>
                    `;
                    console.log(row);
                    $('#employeeTable tbody').append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error('Failed to fetch employee data:', error);
            }
        });
    }
    fetchAndPopulateTable();
});
