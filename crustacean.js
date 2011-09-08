(function (window, document, $) {

var formValidation, validationgroup;

formValidation = {
  groups: [],
  createValidationGroup: function (others) {
    return $.extend({
      parent: this,
      selector: undefined,
      validationCallback: undefined,
      afterValidateEach: [],
      afterValidateAll: []
    }, validationGroup, others);
  },
  validatesEach: function (selector, callback) {
    var g = this.createValidationGroup({
      selector: selector,
      validationCallback: callback
    });
    this.groups.push(g);
    return g;
  },
  execute: function (callback) {
    var allValid = true;
    $.each(this.groups, function () {
      if (this.execute() === false) {
        allValid = false;
      }
    });
    $.isFunction(callback) && callback.call(this, allValid);
  }
};

validationGroup = {
  validatesEach: function (selector, callback) {
    this.selector = selector;
    this.validationCallback = callback;
    return this;
  },
  forEach: function (callback) {
    this.afterValidateEach.push(callback);
    return this;
  },
  forAll: function (callback) {
    this.afterValidateAll.push(callback);
    return this;
  },
  execute: function () {
    var allValid = true,
      self = this,
      elements = this.parent.element.find(this.selector);

    elements
      .each(function (index, element) {
        var result = self.validationCallback.call(element);
        if (result === false) {
          allValid = false;
        }
        $.each(self.afterValidateEach, function () {
          this.call(self, result, element);
        });
      });

    $.each(self.afterValidateAll, function () {
      this.call(self, allValid, elements);
    });
    return allValid;
  }
};

window.Crustacean = {
  createForElement: function (f) {
    return $.extend({}, formValidation, {
      element: f
    });
  },
};

})(window, document, jQuery);
