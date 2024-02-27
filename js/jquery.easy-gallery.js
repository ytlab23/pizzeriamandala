var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*Copyright Antic Marjan*/
jQuery.fn.easyGallery = function() {

  if ($(this).length > 1) {
    $.each($(this), function(key, val) {
      new sliderObject($('.' + val.className + ':eq( ' + key + ')'));
    });
  } else {
    new sliderObject($(this));
  }
  function sliderObject(instance) {
    var children = instance.find('img'),
            imageText = '',
            countImages = children.length,
            sliderBackground = $('<div class="ligthbox_background"></div>'),
            sliderWrap = $('<div class="ligthbox_wrap"></div>'),
            sliderImageSrc = '',
            sliderImage = $('<img></img>'),
            btnForward = $('<div class="ligthbox_weiter"></div>'),
            btnBack = $('<div class="ligthbox_zurueck"></div>'),
            btnCollaction = [],
            activeItemOrder = 0,
            activeText = '',
            lightboxText = $('<p id="ligthbox_text"></p>'),
            sliderActive = 0,
            animationSpeed = 50,
            callBlock = 0;

    var getImageDescription = function (imageObject) {
      var textObject = [];
      $.each(imageObject, function(index, val) {
        if ($(this).siblings('p').length > 0) {
          textObject[index] = $(this).siblings('p');
        } else {
          textObject[index] = '';
        }
      });
      return textObject;
    }

    var handleBtnCollaction = function(order) {
      btnForward.remove();
      btnBack.remove();
      if (activeItemOrder === 0) {
        btnCollaction = [btnForward];
      }
      else if (activeItemOrder === countImages - 1) {
        btnCollaction = [btnBack];
      } else {
        btnCollaction = [btnForward, btnBack];
      }
    };

    var generateArrows = function() {
      $.each(btnCollaction, function(key, val) {
        sliderWrap.append(val);
      });
    };

    var generateSilderHtml = function() {
      sliderBackground.append(sliderWrap);
      sliderWrap.append(sliderImage.attr('src', sliderImageSrc), lightboxText.html(activeText));

      slideAnimation(animationSpeed);
    };

    var changeSldierText = function() {
      activeText = imageText[activeItemOrder].length > 0 ? imageText[activeItemOrder].text() : '';

      lightboxText.html(activeText);
    }

    var nextImage = function() {
      if (activeItemOrder > 0) {
        activeItemOrder--;
        changeSldierText();
        handleBtnCollaction();
        sliderImageSrc = $(children[activeItemOrder]).attr('data-big-src');

        sliderImage.one("load", function() {
          slideAnimation();
        }).attr("src", sliderImageSrc);
      }
    };

    var prevImage = function() {
      if (activeItemOrder < (countImages - 1)) {
        activeItemOrder++;
        changeSldierText();
        handleBtnCollaction();
        sliderImageSrc = $(children[activeItemOrder]).attr('data-big-src');

        sliderImage.one("load", function() {
          slideAnimation();
        }).attr("src", sliderImageSrc);

      }
    };

    var slideAnimation = function(speed) {
      generateArrows();
      var tempo = tempo ? tempo : 500;
      if (sliderImage.width() > 0) {
        sliderWrap.animate({
          width: sliderImage.width() + 160,
        }, speed, function() {
          sliderImage.css("opacity", "1");
          callBlock = 0;
        });
      } else {
        window.setTimeout(slideAnimation, tempo, 500);
      }
    };

    $.each(children, function(key, child) {
      children[key].itemOrder = key;
    });

    var slider = {
      init: function() {

        if (!sliderActive) {
          $(children).click(function() {
            sliderImageSrc = $(this).attr('data-big-src');
            activeItemOrder = this.itemOrder;
            
            imageText = getImageDescription(children);
            activeText = imageText[activeItemOrder].length > 0 ? imageText[activeItemOrder].text() : '';

            handleBtnCollaction();
            generateSilderHtml();
            slider.startSlider();
          });

          sliderActive = 1;
        } else {
          console.error('slider error');
          clearSlider();
        }
      },
      startSlider: function() {
        $('body').append(sliderBackground);

        var initEvents = function() {

          sliderBackground.on('click', '.ligthbox_zurueck', function() {
            if (!callBlock) {
              callBlock = 1;
              sliderImage.css('opacity', '0');
              nextImage();
            }
          });

          sliderBackground.on('click', '.ligthbox_weiter', function() {
            if (!callBlock) {
              callBlock = 1;
              sliderImage.css('opacity', '0');
              prevImage();
            }
          });

          $('.ligthbox_background').click(function(ev) {
            if (ev.target.className === sliderBackground.attr('class')) {
              clearSlider();
            }
          });

          $(document).bind("keypress.esc", function(ev) {
            if (ev.keyCode == 27) {
              clearSlider();
            }
          });

        };

        var clearSlider = function() {
          sliderBackground.off(); //unbind all slider-events
          $(document).unbind("keypress.esc"); //unbind keypress-event for namespace esc
          sliderBackground.animate({height: 0, width: 0}, 700, function() {
            $(this).removeAttr("style");
            sliderImage.remove();
            lightboxText.remove();
            sliderWrap.remove();
            sliderBackground.remove();
            sliderImageSrc = 0;
            btnCollaction = [];
            sliderActive = 0;
          });
        }
        sliderBackground.animate({width: "100%"}, 300, function() {
          initEvents();
        });
      }
    };
    
    slider.init();
  }
};

}
/*
     FILE ARCHIVED ON 23:25:39 Jul 04, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:49:48 Feb 26, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.08
  exclusion.robots.policy: 0.071
  cdx.remote: 0.089
  esindex: 0.01
  LoadShardBlock: 293.594 (6)
  PetaboxLoader3.datanode: 204.936 (7)
  PetaboxLoader3.resolve: 1154.547 (2)
  load_resource: 1145.571
*/