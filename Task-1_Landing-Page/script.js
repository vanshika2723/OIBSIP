const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.innerText = "Message sent successfully!";
    msg.style.color = "green";
    form.reset();
});
