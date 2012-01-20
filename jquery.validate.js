if (typeof Shopify === 'undefined') var Shopify = {};

Shopify.CartFormValidate = function ($) {

  var elementSupportsAttribute = function(element, attribute) {
    if (attribute === 'required') {
      var agent = navigator.userAgent.toLowerCase();
      if (agent.indexOf('chrome') !== -1) return true;
      if (agent.indexOf('safari') !== -1) return false;
    }
    var test = document.createElement(element);
    if (attribute in test) {
      return true;
    } 
    else {
      return false;
    }     
  };

  var isRequired = function(formField) { 
    return (formField.attr('required') || formField.is('.required'))
  };

  var setError = function(formField) {
    if (elementSupportsAttribute('input', 'required')) {
      // Just in case.
      formField.attr('required', 'required');
    }
    else {
      if (!(formField.parent().is('.error'))) {
        var errorMessage = formField.attr('data-error');
        if (!errorMessage) {
          if (formField.is(':checkbox')) {
            errorMessage = 'This checkbox is required';
          }
          else if (formField.is('select')) {
            errorMessage = 'Please select an option';
          }
          else {
            errorMessage = 'This field is required';
          }
        }
        formField.wrap('<span class="error"></span>');
        formField.after('<span>' + errorMessage + '</span>');
        formField.blur(function() {
          var value = formField.val();
          if (value) {
            formField.parent().find('span').remove();
            formField.unwrap();
            $(this).unbind('blur');
          }
        });
      }
    }
  };
  
  $(function() {
    
    // If the checkout button has been pressed.
    $('input[name="checkout"], input[name="goto_pp"], input[name="goto_gc"]').click(function() {

      var formIsValid = true;

      $('form[action="/cart"]').find('[name^="attributes"]').each(function() {

        if ($(this).is(':checkbox')) {
          if (!$(this).is(':checked') && isRequired($(this))) {
            formIsValid = false;
            setError($(this));
          }
          return;
        }
        else if ($(this).is(':radio')) {
          return;                 
        }
        else {
          value = $(this).val();
          if (value === '' || value === undefined) {
            if (isRequired($(this))) {
              formIsValid = false;
              setError($(this));
            }
            return;                
          }
        }

      });

      if (formIsValid) {
        $(this).submit();   
      } 
      else {
        $('span.error :input:eq(0)').trigger('focus');
        if (elementSupportsAttribute('input', 'required')) {
          return true;
        }
        else {
          return false;
        }
      }

    });
    
  });

}( jQuery );