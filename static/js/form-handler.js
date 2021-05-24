$("#contactForm").submit(function(e) {
    e.preventDefault();
    disableFormElements();
    setStatusProcessing();
    handleForm();
})

function disableFormElements() {
    $("#submitContactForm").prop("disabled", true).css("pointer-events", "none");

    $("#nameField, #emailField, #messageField")
        .prop("disabled", "true")
        .css("color", "gray")
        .css("pointer-events", "none");
}

function clearAndEnableFormElements() {
    $("#submitContactForm")
        .prop("disabled", false)
        .css("pointer-events", "all");

    $("#nameField, #emailField, #messageField")
        .val("")
        .prop("disabled", false)
        .css("color", "black")
        .css("pointer-events", "all");
}

function enableFormElements() {
    $("#submitContactForm")
        .prop("disabled", false)
        .css("pointer-events", "all");

    $("#nameField, #emailField, #messageField")
        .prop("disabled", false)
        .css("color", "black")
        .css("pointer-events", "all");
}

function resetStatus() {
    $("#statusMessage").removeClass("alert-info");
    $("#statusMessage").removeClass("alert-success");
    $("#statusMessage").removeClass("alert-danger");
    $("#statusMessage").css("display", "none");
}

function setStatusProcessing() {
    resetStatus();
    $("#statusMessage").addClass("alert-info");
    $("#statusMessage").css("display", "inherit");
    $("#statusMessage").html("Processing your submission...");
}

function setStatusSuccess() {
    resetStatus();
    $("#statusMessage").addClass("alert-success");
    $("#statusMessage").css("display", "inherit");
    $("#statusMessage").html("Thank you for your submission!");
    clearAndEnableFormElements();
}

function setStatusError() {
    resetStatus();
    $("#statusMessage").addClass("alert-danger");
    $("#statusMessage").css("display", "inherit");
    $("#statusMessage").html("There was an error processing your form.");
}

function handleForm() {
    let body = {
        name: $("#nameField").val(),
        email: $("#emailField").val(),
        message: $("#messageField").val()
    };
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "https://aileas-contact-form.herokuapp.com/submit",
        data: JSON.stringify(body),
        dataType: "json",
        success: function(data) {
            setStatusSuccess();
            clearAndEnableFormElements();
        },
        error: function(data) {
            setStatusError();
            enableFormElements();
        }
    });
}