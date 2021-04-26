/*
@licstart
The MIT License (MIT)

Copyright © 2021 Aileas Donaghy

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the “Software”), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
@licend
*/

var doc = document.body;

window.onload = function() {
    let darkCookie = decodeURIComponent(document.cookie);
    if (darkCookie == "") {
        setDarkCookie(false);
    }
    updateDarkness();
}

function setDarkCookie(bool) {
    let cookieDate = new Date;
    cookieDate.setFullYear(cookieDate.getFullYear() + 1);
    if (bool == true) {
        document.cookie = "dark=true; expires=" + cookieDate.toUTCString() + ";";
    } else if (bool == false) {
        document.cookie = "dark=false; expires=" + cookieDate.toUTCString() + ";";
    } else {
        throw "Bad parameter for setDarkCookie(). Pass true or false";
    }
}

function updateButtonText(setting) {
    if (setting == "dark") {
        $('#darkModeButton').text("Dark mode");
    } else if (setting == "light") {
        $('#darkModeButton').text("Light mode");
    }
}

function updateDarkness() {
    let darkCookie = decodeURIComponent(document.cookie);
    if (darkCookie == "dark=true") {
        doc.classList.add("dark-mode");
        $('a').css("color", "white");
        updateButtonText("light");
        $("#darkModeButton").css("color", "white").css("background-color", "#6c757d");
        $(".card-body").addClass("dark-mode");
    } else {
        doc.classList.remove("dark-mode");
        $('a').css("color", "black");
        updateButtonText("dark");
        $("#darkModeButton").css("color", "black").css("background-color", "white");
        $(".card-body").removeClass("dark-mode");
    }
}

function toggleDarkMode(cookie) {
    if (cookie == "dark=true") {
        // Update CSS
        doc.classList.remove("dark-mode");
        $('a').css("color", "black");
        $('#darkModeButton').text("Dark mode");
        $("#darkModeButton").css("color", "black").css("background-color", "white");
        $(".card-body").removeClass("dark-mode");
        // Update cookie
        setDarkCookie(false);
    } else if (cookie == "dark=false") {
        // Update CSS
        doc.classList.add("dark-mode");
        $('a').css("color", "white");
        $('#darkModeButton').text("Light mode");
        $("#darkModeButton").css("color", "white").css("background-color", "#6c757d");
        $(".card-body").addClass("dark-mode");
        // Update cookie
        setDarkCookie(true);
    } else {
        throw "Something went wrong... Unexpected document.cookie value";
    }
}