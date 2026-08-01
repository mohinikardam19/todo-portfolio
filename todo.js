document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if(form){

        form.addEventListener("submit", function(event){

            event.preventDefault();

            alert("Thank you! Your message has been submitted successfully.");

            form.reset();

        });

    }


});
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
} 
li.innerHTML = `
<span onclick="toggleTask(${index})">${task.text}</span>

<div class="actions">
    <button class="edit" onclick="editTask(${index})">Edit</button>
    <button class="delete" onclick="deleteTask(${index})">Delete</button>
</div>
`;