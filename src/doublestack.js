(function( $ ) {
 
    $.fn.doubleStack = function(options) {
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
            }, options );
        var totalOffset = 0;
        
        return this.each(function(settings) {
          var originalElement = $(this);
          var eTop = getTopWithMargin(originalElement);
          
          // $(this).clone().appendTo( "body" );
          var floatingDiv = createFloater(this, totalOffset);
          totalOffset += floatingDiv.outerHeight();
          var myOffset = totalOffset;
          $(window).resize(function(){
              console.log(this);
              
          });
          
          $(window).scroll(function() { 
              var position = eTop - $(window).scrollTop();
              if(position <= myOffset) {
                  originalElement.hide();
                  floatingDiv.show();
              }
              else 
              {
                  originalElement.show();
                  floatingDiv.hide();
              }
          })
        });
         
        return this;
 
    };
    
    function createFloater(element, offset) {
        var offsetTop = getTopWithMargin($(element));
        var elementWidth = $(element).width();
        var elementToInsert = $('<div style="top:' + offset + ';position:fixed; width: ' + elementWidth  + ';background-color: white;"></div>').append($(element).clone());
        $('body').append(elementToInsert);
        elementToInsert.hide();
        return elementToInsert;
    }
    
    function getTopWithMargin(element) {
        var offsetTop = element.offset().top;
        offsetTop -= parseInt(element.css('margin-top').replace('px', ''));
        
        return offsetTop;
    }
        
}( jQuery ));