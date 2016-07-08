define(['jquery'], function($) {
  return {
    initSubjectAccessibility: {
      init: function() {
          if($('[Id$="isSubjectNotEditable"]').length === 1)
          {
              $('div.button-round').remove();
              $('div.signature').remove();
          }
      }
    }
  };
});
