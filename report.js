const report_button = document.getElementById("post-button");
const report_form = document.getElementById("input-form");

report_button.onclick = () => {
    report_form.classList.remove("hide");
};
