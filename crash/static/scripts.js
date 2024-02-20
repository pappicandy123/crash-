
// Function to fetch numbers and their colors from the backend
function fetchNumbers() {
    fetch('http://localhost:8000/numbers/')
    .then(response => response.json())
    .then(numbers => {
        const numberListDiv = document.getElementById("numberList");
        numberListDiv.innerHTML = ""; // Clear previous content

        numbers.forEach(number => {
            const numberDiv = document.createElement("div");
            numberDiv.innerText = `Number: ${number.value}, Color: ${number.color}`;
            numberListDiv.appendChild(numberDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("numberList").innerText = 'An error occurred while fetching numbers.';
    });
}

// function getNextNumber() {
//     var numberInput = document.getElementById("numberInput").value;

//     fetch(`http://localhost:8000/numbers/next-number/?value=${encodeURIComponent(numberInput)}`)
//     .then(response => response.json())
//     .then(data => {
//         const nextNumberDiv = document.getElementById("nextNumber");
//         if (data.success) {
//             nextNumberDiv.innerText = `Next Number: ${data.next_number}, Color: ${data.next_color}`;
//         } else {
//             nextNumberDiv.innerText = 'No next number found.';
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         document.getElementById("nextNumber").innerText = 'An error occurred while fetching the next number.';
//     });
// }


function getNextNumber() {
    var numberInput = document.getElementById("numberInput").value;

    fetch(`http://localhost:8000/numbers/next-number/?value=${encodeURIComponent(numberInput)}`)
    .then(response => response.json())
    .then(data => {
        const nextNumberDiv = document.getElementById("nextNumber");
        if (data.success) {
            // Get the color received from the backend
            const color = data.next_color.toLowerCase();

            

            
            // Set the color of the icon based on the received color
            const icon = `<i class="fa-solid fa-plane-departure  move-up-and-right" style="color: ${color};"></i>`; // Add move-up class here

             // Update the HTML with the received data and colored icon
             document.getElementById("nextNumberValue").innerText = data.next_number;
             document.getElementById("nextNumberIcon").innerHTML = icon;
              

             // Show the hidden elements
            document.querySelectorAll('.data, .icon').forEach(el => {
                el.style.display = 'block';
            }); 
            document.getElementById("nextNumberValue").style.color = color; 
            // Update the HTML with the received data and colored icon
            nextNumberDiv.innerHTML = `
                <p>Next Number: ${data.next_number}</p>
                ${icon}
            `;
            // Add class to start animation
            nextNumberDiv.classList.add('move-up-and-right');
        } else {
            // Display "Prediction not available" message
            nextNumberDiv.innerHTML = '<p>Prediction not available</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("nextNumber").innerText = 'PLEASE RELOAD';
    });
}

