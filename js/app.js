document.addEventListener('DOMContentLoaded', function() {
            // Get DOM elements
            const monthSelect = document.getElementById('monthSelect');
            const daySelect = document.getElementById('daySelect');
            const yearSelect = document.getElementById('yearSelect');
            const dateDisplay = document.getElementById('dateDisplay');
            const minAgeInput = document.getElementById('minAgeInput');
            const checkButton = document.getElementById('checkButton');
            const resultDisplay = document.getElementById('resultDisplay');
            const ageNumber = document.getElementById('ageNumber');
            const resultText = document.getElementById('resultText');
            const dobError = document.getElementById('dobError');
            const ageError = document.getElementById('ageError');
            
            // Populate year dropdown (100 years back from current year)
            const currentYear = new Date().getFullYear();
            for (let year = currentYear; year >= currentYear - 100; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
            
            // Function to update days based on month and year
            function updateDays() {
                // Clear existing options
                daySelect.innerHTML = '<option value="" disabled selected>Day</option>';
                
                const month = parseInt(monthSelect.value);
                const year = parseInt(yearSelect.value);
                
                // If either month or year isn't selected, don't proceed
                if (isNaN(month) || isNaN(year)) return;
                
                // Get number of days in the selected month
                // Using 0 for the day gets the last day of the previous month
                // So we use month + 1 and day 0 to get the last day of our target month
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                
                // Add day options
                for (let day = 1; day <= daysInMonth; day++) {
                    const option = document.createElement('option');
                    option.value = day;
                    option.textContent = day;
                    daySelect.appendChild(option);
                }
            }
            
            // Update calendar visual display
            function updateCalendarVisual() {
                const month = monthSelect.selectedIndex > 0 ? monthSelect.options[monthSelect.selectedIndex].text : '';
                const day = daySelect.selectedIndex > 0 ? daySelect.value : '';
                const year = yearSelect.selectedIndex > 0 ? yearSelect.value : '';
                
                if (month && day && year) {
                    dateDisplay.textContent = `${month} ${day}, ${year}`;
                } else {
                    dateDisplay.textContent = 'Select your birth date';
                }
            }
            
            // Update days when month or year changes
            monthSelect.addEventListener('change', function() {
                updateDays();
                updateCalendarVisual();
            });
            
            yearSelect.addEventListener('change', function() {
                updateDays();
                updateCalendarVisual();
            });
            
            daySelect.addEventListener('change', updateCalendarVisual);
            
            // Click event for verification button
            checkButton.addEventListener('click', function() {
                // Reset errors and results
                dobError.style.display = 'none';
                ageError.style.display = 'none';
                resultDisplay.style.display = 'none';
                resultDisplay.className = 'result';
                
                // Validate inputs
                let isValid = true;
                
                const month = parseInt(monthSelect.value);
                const day = parseInt(daySelect.value);
                const year = parseInt(yearSelect.value);
                
                if (isNaN(month) || isNaN(day) || isNaN(year)) {
                    dobError.style.display = 'block';
                    isValid = false;
                }
                
                const minAge = parseInt(minAgeInput.value);
                if (isNaN(minAge) || minAge < 1 || minAge > 100) {
                    ageError.style.display = 'block';
                    isValid = false;
                }
                
                if (!isValid) return;
                
                // Create Date object from selections
                const birthDate = new Date(year, month, day);
                
                // Calculate age
                const age = calculateAge(birthDate);
                
                // Display result
                ageNumber.textContent = age;
                resultDisplay.style.display = 'block';
                
                if (age >= minAge) {
                    resultText.textContent = `You meet the minimum age requirement of ${minAge} years.`;
                    resultDisplay.classList.add('success');
                } else {
                    resultText.textContent = `You do not meet the minimum age requirement of ${minAge} years.`;
                    resultDisplay.classList.add('failure');
                }
            });
            
            // Function to calculate age from date of birth
            function calculateAge(birthDate) {
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();
                
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                
                return age;
            }
        });