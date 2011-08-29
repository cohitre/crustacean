(function () {

var formValidation, validationgroup;

formValidation = {
  groups: [],
  createValidationGroup: function () {
    return $.extend({
      _selector: undefined,
      _validationCallback: undefined,
      _afterValidateEach: [], 
      _afterValidateAll: []
    }, validationGroup);
  },
  
};

validationGroup = {
  find: function (selector, callback) {
    this._selector = selector;
    this._validationCallback = callback;
    return this;
  },
  validateEach: function (callback) {
    this._afterValidateEach.push(callback);
    return this;
  },
  validateAll: function (callback) {
    this._afterValidateAll.push(callback);
    return this;
  },
  execute: function () {
    var allValid = true,
      self = this,
      elements = $(this._selector);

    elements
      .each(function (index, element) {
        var result = self._validationCallback.call(element);
        if (result === false) {
          allValid = false;
        }
        $.each(self._afterValidateEach, function () {
          this.call(element, result);
        });
      });

    $.each(self._afterValidateAll, function () {
      this.call(elements, allValid);
    });
  }
};

window.Crustacean = {
  createForForm: function (f) {
    return $.extend({}, formValidation);
  },
};

})();



/*
model = Crustacean.createForForm(form);

comments = model.createValidationGroup();

comments.find("textarea", function () {
  return $(this).is(":empty");
});

comments.validateEach(function (isValid) {
  $(this).parents(".wrapper")
    .toggleClass("valid", isValid);
});

comments.validateAll(function (areValid) {
  $("something-else").toggleClass("valid");
});

*/
