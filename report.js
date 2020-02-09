const report_button = document.getElementById("post-button");
const report_form = document.getElementById("input-form");
const close_button = document.getElementById("close-button");

report_button.onclick = () => {
    report_form.classList.remove("hide");
};

close_button.onclick = () => {
    report_form.classList.add("hide");
};
