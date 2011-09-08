Crustacean Validation
=====================

A simple to learn and powerful to use library for form validation.

Look at it
----------

Imagine this is your markup:

  <form id='contact'>
    <div id='error-messages'>

    </div>
    <div class='input-field'>
      <label for='animal-field'>What is the best animal?</label>
      <input type='text' id='animal-field'>
    </div>
    <div class='textarea-field'>
      <label for='message-field'>Something nice</label>
      <textarea id='message-field'></textarea>
    </div>
  </form>


  var validator = Crustacean.createForElement($("form"));

  validator
    .validatesEach(".textarea-field", function () {
       return $(this).find("textarea").val().length > 0;
    })
    .forEach(function (isValid) {
       if (!isValid) {
         $(this).css("border-color", "red");
       }
    })
    .forAll(function (areValid) {
      if (!areValid) {
        $("#error-messages").append(
          $("<p/>").text("Please enter a message")
        )
      }
    });

  validator
    .validatesEach(".input-field", function () {
      return $(this).find(":input").val() === "crocodile";
    })
    .forEach(function (isValid) {
       if (!isValid) {
         $(this).css("border-color", "red");
       }
    })
    .forAll(function (areValid) {
      if (!areValid) {
        $("#error-messages").append(
          $("<p/>").text("The best animal is the crocodile")
        )
      }
    });

  $("form").submit(function () {
    return validator.execute();
  });

isn't that nice?
