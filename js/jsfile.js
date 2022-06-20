/**
 * File Name: jsfile.js
 *
 * Revision History:
 *       Baljeet Bilkhu: 06/14/2022 - code added and created
 *
 */


var errorMessages = "";


function ValidateInputs() {

    var f = $("#registrationForm");

    f.validate({
        rules: {
            firstName: {
                required: true,
                firstNameCheck: true
            },
            lastName: {
                required: true,
                lastNameCheck: true
            },
            email: {
                required: true
            },
            phone: {
                required: true,
                phoneCheck: true
            },
            startDate: {
                required: true
            },

            endDate: {
                required: true,
                DateCheck: true
            },


            make: {
                required: true
            },
            model: {
                required: true
            },
            licensePlate: {
                required: true,
                licensePlateCheck: true
            }

        },
        messages: {
            firstName: {
                required: "First name is required",
                firstNameCheck: "First name must contain more than one alphabetic characters with the first letter capitalized"
            },
            lastName: {
                required: "Last name is required",
                lastNameCheck: "Last name must contain more than one alphabetic characters with the first letter capitalized"
            },
            email: {
                required: "A valid email address is required"
            },
            startDate: {
                required: "Please select a valid start date"
            },
            endDate: {
                required: "Please select a valid end date",
                DateCheck: "The End Date must be greater than or equal to the Start Date."
            },
            make: {
                required: "Please enter a valid vehicle make"
            },
            model: {
                required: "Please enter a valid vehicle model"
            },
            licensePlate: {
                required: "License Plate is required",
                licensePlateCheck: "License Plate must be between 2 and 8 alpha-numeric characters"
            },
            phone: {
                required: "Please enter a valid phone number",
                phoneCheck: "Phone Number must follow the patterns 111-111-1111 or (111)111-1111 and cannot start with 0 or a 1"
            }

        }
    });

    return f.valid();

}

jQuery.validator.addMethod("firstNameCheck",
    function (value, element) {
        var firstNamePattern = /^[A-Z][-a-zA-Z']+$/;

        return this.optional(element) || firstNamePattern.test(value);

    },
    "First Name must only contain more than one alphabetic characters in it and the first letter must be capialized"
);

jQuery.validator.addMethod("lastNameCheck",
    function (value, element) {
        var lastNamePattern = /^[A-Z][-a-zA-Z']+$/;

        return this.optional(element) || lastNamePattern.test(value);

    },
    "Last Name must only contain more than one alphabetic characters in it and the first letter must be capialized"
);

jQuery.validator.addMethod("phoneCheck",
    function (value, element) {
        var phonePattern1 = /^[2-9]\d{2}-\d{3}-\d{4}$/;
        var phonePattern2 = /^\([2-9]\)\d{2}-\d{3}-\d{4}$/;

        return this.optional(element) || phonePattern1.test(value) || phonePattern2.test(value);

    },
    "Phone Number must follow the patterns 111-111-1111 or (111)111-1111 and cannot start with 0 or a 1"
);

jQuery.validator.addMethod("licensePlateCheck",
    function (value, element) {
        var licensePlatePattern = /^[^+_=/*?@#$%&()'"|â„;:{}.,`~<>}{][^\\]{1,7}$/;

        return this.optional(element) || licensePlatePattern.test(value);

    },
    "License Plate must be between 2 and 8 alpha-numeric characters"
);

jQuery.validator.addMethod("DateCheck",
    function (value, element) {
        var startdatevalue = new Date($('#startDate').val());
        var enddatevalue = new Date($('#endDate').val());
        return Date.parse(startdatevalue) <= Date.parse(enddatevalue);

    },
    "The End Date must be greater than or equal to the Start Date."
);



function Register() {
    if (ValidateInputs()) {

        var json = {};

        $(":input").each(function () {
            json[$(this).attr("id")] = $(this).val();
        });

        localStorage.setItem("registration", JSON.stringify(json));
        $(location).prop('href', 'viewResults.html');

    }
}

function LoadRegistrationData(id) {

    var json = JSON.parse(localStorage.getItem("registration"));

    $(":input").each(function () {
        $(this).val(json[$(this).attr("id")]);
    });

    console.log(json);

    GetPrice();

}

function GetPrice() {

    var json = JSON.parse(localStorage.getItem("registration"));

    const PRICE = 7.50;
    const SERVICEFEE = 3.50;
    var firstDate = new Date($('#startDate').val());
    var secondDate = new Date($('#endDate').val());
    var subTotal = "";
    var totalPrice = "";
    var discount = 1;

    var duration = (secondDate - firstDate) / 86400000;

    if (firstDate == secondDate) {
        duration = 1;
    }


    if (duration >= 7) {
        discount = 0.80
    }
    else {
        discount = 1
    }



    subTotal = (duration * PRICE * discount).toFixed(2);
    totalPrice = ((1.13 * subTotal) + SERVICEFEE).toFixed(2);

    discountApplied = Math.ceil((1 - discount) * 100);

    console.log(duration);
    console.log(subTotal);
    console.log(discount);
    console.log(totalPrice);

    $("#duration").val(duration + " days");
    $("#discountApplied").val(discountApplied + "%")
    $("#subTotal").val("$" + subTotal);
    $("#totalPrice").val("$" + totalPrice);



}


