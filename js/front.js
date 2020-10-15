$(function () {

    /* =========================================
     * tooltip
     *  =======================================*/

    $('.customer img').tooltip();


    /* =========================================
     * counters
     *  =======================================*/

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /* =================================================
     * Preventing URL update on navigation link click
     *  ==============================================*/

    $('.link-scroll').on('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });


    /* =========================================
     *  Scroll Spy
     *  =======================================*/

    $('body').scrollspy({
        target: '#navbarcollapse',
        offset: 80
    });


    /* =========================================
     * testimonial slider
     *  =======================================*/

    $(".testimonials").owlCarousel({
        nav: false,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    var owl = $('.testimonials');
    owl.owlCarousel({
        items:3,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause:true,
        autoplaySpeed:5000  
    });

  
  


    /* =========================================
     * Leflet map
     *  =======================================*/
    map();


    /* =========================================
     * parallax
     *  =======================================*/
    $(window).scroll(function () {

        var scroll = $(this).scrollTop();

        if ($(window).width() > 1250) {
            $('.parallax').css({
                'background-position': 'left -' + scroll / 8 + 'px'
            });
        } else {
            $('.parallax').css({
                'background-position': 'center center'
            });
        }
    });

    /* =========================================
     * filter
     *  =======================================*/

    $('#filter a').click(function (e) {
        e.preventDefault();

        $('#filter li').removeClass('active');
        $(this).parent('li').addClass('active');

        var categoryToFilter = $(this).attr('data-filter');

        $('.reference-item').each(function () {

            if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });


    /* =========================================
     * reference functionality
     *  =======================================*/
    $('.reference a').on('click', function (e) {

        e.preventDefault();

        var title = $(this).find('.reference-title').text(),
            description = $(this).siblings('.reference-description').html();

        $('#detail-title').text(title);
        $('#detail-content').html(description);

        var images = $(this).siblings('.reference-description').data('images').split(',');
        if (images.length > 0) {
            sliderContent = '';
            for (var i = 0; i < images.length; ++i) {
                sliderContent = sliderContent + '<div class="item"><img src=' + images[i] + ' alt="" class="img-fluid"></div>';
            }
        } else {
            sliderContent = '';
        }

        openReference(sliderContent);

    });

    function openReference(sliderContent) {
        $('#detail').slideDown();
        $('#projects-masonry').slideUp();


        if (sliderContent !== '') {

            var slider = $('#detail-slider');

            if (slider.hasClass('owl-loaded')) {
                slider.trigger('replace.owl.carousel', sliderContent);
            } else {
                slider.html(sliderContent);
                slider.owlCarousel({
                    nav: false,
                    dots: true,
                    items: 1
                });

            }
        }
    }


    function closeReference() {
        $('#projects-masonry').slideDown();
        $('#detail').slideUp();
    }

    $('#filter button, #detail .close').on('click', function () {
        closeReference();
    });


    /* =========================================
     *  animations
     *  =======================================*/

    delayTime = 0;

    $('[data-animate]').waypoint(function (direction) {
        delayTime += 250;

        var element = $(this.element);

        $(this.element).delay(delayTime).queue(function (next) {
            element.toggleClass('animated');
            element.toggleClass(element.data('animate'));
            delayTime = 0;
            next();
        });

        this.destroy();

    }, {
        offset: '90%'
    });
    
    $('[data-animate-hover]').hover(function () {
        $(this).css({
            opacity: 1
        });
        $(this).addClass('animated');
        $(this).removeClass($(this).data('animate'));
        $(this).addClass($(this).data('animate-hover'));
    }, function () {
        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-hover'));
    });

    /* =========================================
     * for demo purpose
     *  =======================================*/

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });

});



/* =========================================
 * styled Leaflet Map
 *  =======================================*/
// ------------------------------------------------------ //
// styled Leaflet  Map
// ------------------------------------------------------ //

function map() {

    var mapId = 'map',
        mapCenter = [53.14, 8.22],
        mapMarker = true;

    if ($('#' + mapId).length > 0) {

        var icon = L.icon({
            iconUrl: 'img/marker.png',
            iconSize: [25, 37.5],
            popupAnchor: [0, -18],
            tooltipAnchor: [0, 19]
        });

        var dragging = false,
            tap = false;

        if ($(window).width() > 700) {
            dragging = true;
            tap = true;
        }

        var map = L.map(mapId, {
            center: mapCenter,
            zoom: 13,
            dragging: dragging,
            tap: tap,
            scrollWheelZoom: false
        });

        var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        });

        Stamen_TonerLite.addTo(map);

        map.once('focus', function () {
            map.scrollWheelZoom.enable();
        });

        if (mapMarker) {
            var marker = L.marker(mapCenter, {
                icon: icon
            }).addTo(map);

            marker.bindPopup("<div class='p-4'><h5>Info Window Content</h5><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p></div>", {
                minwidth: 200,
                maxWidth: 600,
                className: 'map-custom-popup'
            })

        }
    }

}






/*!
 * Particleground
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    particleground(document.getElementById('particles'), {
      dotColor: '#ffffff',
      lineColor: '#ffffff'
    });
    var intro = document.getElementById('intro');
    intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
  }, false);
  
  
  
  ;(function(window, document) {
    "use strict";
    var pluginName = 'particleground';
  
    function extend(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) continue;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object')
              deepExtend(out[key], obj[key]);
            else
              out[key] = obj[key];
          }
        }
      }
      return out;
    };
  
    var $ = window.jQuery;
  
    function Plugin(element, options) {
      var canvasSupport = !!document.createElement('canvas').getContext;
      var canvas;
      var ctx;
      var particles = [];
      var raf;
      var mouseX = 0;
      var mouseY = 0;
      var winW;
      var winH;
      var desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
      var orientationSupport = !!window.DeviceOrientationEvent;
      var tiltX = 0;
      var pointerX;
      var pointerY;
      var tiltY = 0;
      var paused = false;
  
      options = extend({}, window[pluginName].defaults, options);
  
      /**
       * Init
       */
      function init() {
        if (!canvasSupport) { return; }
  
        //Create canvas
        canvas = document.createElement('canvas');
        canvas.className = 'pg-canvas';
        canvas.style.display = 'block';
        element.insertBefore(canvas, element.firstChild);
        ctx = canvas.getContext('2d');
        styleCanvas();
  
        // Create particles
        var numParticles = Math.round((canvas.width * canvas.height) / options.density);
        for (var i = 0; i < numParticles; i++) {
          var p = new Particle();
          p.setStackPos(i);
          particles.push(p);
        };
  
        window.addEventListener('resize', function() {
          resizeHandler();
        }, false);
  
        document.addEventListener('mousemove', function(e) {
          mouseX = e.pageX;
          mouseY = e.pageY;
        }, false);
  
        if (orientationSupport && !desktop) {
          window.addEventListener('deviceorientation', function () {
            // Contrain tilt range to [-30,30]
            tiltY = Math.min(Math.max(-event.beta, -30), 30);
            tiltX = Math.min(Math.max(-event.gamma, -30), 30);
          }, true);
        }
  
        draw();
        hook('onInit');
      }
  
      /**
       * Style the canvas
       */
      function styleCanvas() {
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        ctx.fillStyle = options.dotColor;
        ctx.strokeStyle = options.lineColor;
        ctx.lineWidth = options.lineWidth;
      }
  
      /**
       * Draw particles
       */
      function draw() {
        if (!canvasSupport) { return; }
  
        winW = window.innerWidth;
        winH = window.innerHeight;
  
        // Wipe canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Update particle positions
        for (var i = 0; i < particles.length; i++) {
          particles[i].updatePosition();
        };
        // Draw particles
        for (var i = 0; i < particles.length; i++) {
          particles[i].draw();
        };
  
        // Call this function next time screen is redrawn
        if (!paused) {
          raf = requestAnimationFrame(draw);
        }
      }
  
      /**
       * Add/remove particles.
       */
      function resizeHandler() {
        // Resize the canvas
        styleCanvas();
  
        var elWidth = element.offsetWidth;
        var elHeight = element.offsetHeight;
  
        // Remove particles that are outside the canvas
        for (var i = particles.length - 1; i >= 0; i--) {
          if (particles[i].position.x > elWidth || particles[i].position.y > elHeight) {
            particles.splice(i, 1);
          }
        };
  
        // Adjust particle density
        var numParticles = Math.round((canvas.width * canvas.height) / options.density);
        if (numParticles > particles.length) {
          while (numParticles > particles.length) {
            var p = new Particle();
            particles.push(p);
          }
        } else if (numParticles < particles.length) {
          particles.splice(numParticles);
        }
  
        // Re-index particles
        for (i = particles.length - 1; i >= 0; i--) {
          particles[i].setStackPos(i);
        };
      }
  
      /**
       * Pause particle system
       */
      function pause() {
        paused = true;
      }
  
      /**
       * Start particle system
       */
      function start() {
        paused = false;
        draw();
      }
  
      /**
       * Particle
       */
      function Particle() {
        this.stackPos;
        this.active = true;
        this.layer = Math.ceil(Math.random() * 3);
        this.parallaxOffsetX = 0;
        this.parallaxOffsetY = 0;
        // Initial particle position
        this.position = {
          x: Math.ceil(Math.random() * canvas.width),
          y: Math.ceil(Math.random() * canvas.height)
        }
        // Random particle speed, within min and max values
        this.speed = {}
        switch (options.directionX) {
          case 'left':
            this.speed.x = +(-options.maxSpeedX + (Math.random() * options.maxSpeedX) - options.minSpeedX).toFixed(2);
            break;
          case 'right':
            this.speed.x = +((Math.random() * options.maxSpeedX) + options.minSpeedX).toFixed(2);
            break;
          default:
            this.speed.x = +((-options.maxSpeedX / 2) + (Math.random() * options.maxSpeedX)).toFixed(2);
            this.speed.x += this.speed.x > 0 ? options.minSpeedX : -options.minSpeedX;
            break;
        }
        switch (options.directionY) {
          case 'up':
            this.speed.y = +(-options.maxSpeedY + (Math.random() * options.maxSpeedY) - options.minSpeedY).toFixed(2);
            break;
          case 'down':
            this.speed.y = +((Math.random() * options.maxSpeedY) + options.minSpeedY).toFixed(2);
            break;
          default:
            this.speed.y = +((-options.maxSpeedY / 2) + (Math.random() * options.maxSpeedY)).toFixed(2);
            this.speed.x += this.speed.y > 0 ? options.minSpeedY : -options.minSpeedY;
            break;
        }
      }
  
      /**
       * Draw particle
       */
      Particle.prototype.draw = function() {
        // Draw circle
        ctx.beginPath();
        ctx.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, options.particleRadius / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
  
        // Draw lines
        ctx.beginPath();
        // Iterate over all particles which are higher in the stack than this one
        for (var i = particles.length - 1; i > this.stackPos; i--) {
          var p2 = particles[i];
  
          // Pythagorus theorum to get distance between two points
          var a = this.position.x - p2.position.x
          var b = this.position.y - p2.position.y
          var dist = Math.sqrt((a * a) + (b * b)).toFixed(2);
  
          // If the two particles are in proximity, join them
          if (dist < options.proximity) {
            ctx.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY);
            if (options.curvedLines) {
              ctx.quadraticCurveTo(Math.max(p2.position.x, p2.position.x), Math.min(p2.position.y, p2.position.y), p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
            } else {
              ctx.lineTo(p2.position.x + p2.parallaxOffsetX, p2.position.y + p2.parallaxOffsetY);
            }
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
  
      /**
       * update particle position
       */
      Particle.prototype.updatePosition = function() {
        if (options.parallax) {
          if (orientationSupport && !desktop) {
            // Map tiltX range [-30,30] to range [0,winW]
            var ratioX = (winW - 0) / (30 - -30);
            pointerX = (tiltX - -30) * ratioX + 0;
            // Map tiltY range [-30,30] to range [0,winH]
            var ratioY = (winH - 0) / (30 - -30);
            pointerY = (tiltY - -30) * ratioY + 0;
          } else {
            pointerX = mouseX;
            pointerY = mouseY;
          }
          // Calculate parallax offsets
          this.parallaxTargX = (pointerX - (winW / 2)) / (options.parallaxMultiplier * this.layer);
          this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10; // Easing equation
          this.parallaxTargY = (pointerY - (winH / 2)) / (options.parallaxMultiplier * this.layer);
          this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10; // Easing equation
        }
  
        var elWidth = element.offsetWidth;
        var elHeight = element.offsetHeight;
  
        switch (options.directionX) {
          case 'left':
            if (this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
              this.position.x = elWidth - this.parallaxOffsetX;
            }
            break;
          case 'right':
            if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth) {
              this.position.x = 0 - this.parallaxOffsetX;
            }
            break;
          default:
            // If particle has reached edge of canvas, reverse its direction
            if (this.position.x + this.speed.x + this.parallaxOffsetX > elWidth || this.position.x + this.speed.x + this.parallaxOffsetX < 0) {
              this.speed.x = -this.speed.x;
            }
            break;
        }
  
        switch (options.directionY) {
          case 'up':
            if (this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
              this.position.y = elHeight - this.parallaxOffsetY;
            }
            break;
          case 'down':
            if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight) {
              this.position.y = 0 - this.parallaxOffsetY;
            }
            break;
          default:
            // If particle has reached edge of canvas, reverse its direction
            if (this.position.y + this.speed.y + this.parallaxOffsetY > elHeight || this.position.y + this.speed.y + this.parallaxOffsetY < 0) {
              this.speed.y = -this.speed.y;
            }
            break;
        }
  
        // Move particle
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
      }
  
      /**
       * Setter: particle stacking position
       */
      Particle.prototype.setStackPos = function(i) {
        this.stackPos = i;
      }
  
      function option (key, val) {
        if (val) {
          options[key] = val;
        } else {
          return options[key];
        }
      }
  
      function destroy() {
        console.log('destroy');
        canvas.parentNode.removeChild(canvas);
        hook('onDestroy');
        if ($) {
          $(element).removeData('plugin_' + pluginName);
        }
      }
  
      function hook(hookName) {
        if (options[hookName] !== undefined) {
          options[hookName].call(element);
        }
      }
  
      init();
  
      return {
        option: option,
        destroy: destroy,
        start: start,
        pause: pause
      };
    }
  
    window[pluginName] = function(elem, options) {
      return new Plugin(elem, options);
    };
  
    window[pluginName].defaults = {
      minSpeedX: 0.1,
      maxSpeedX: 0.7,
      minSpeedY: 0.1,
      maxSpeedY: 0.7,
      directionX: 'center', // 'center', 'left' or 'right'. 'center' = dots bounce off edges
      directionY: 'center', // 'center', 'up' or 'down'. 'center' = dots bounce off edges
      density: 10000, // How many particles will be generated: one particle every n pixels
      dotColor: '#666666',
      lineColor: '#666666',
      particleRadius: 7, // Dot size
      lineWidth: 1,
      curvedLines: false,
      proximity: 100, // How close two dots need to be before they join
      parallax: true,
      parallaxMultiplier: 5, // The lower the number, the more extreme the parallax effect
      onInit: function() {},
      onDestroy: function() {}
    };
  
    // nothing wrong with hooking into jQuery if it's there...
    if ($) {
      $.fn[pluginName] = function(options) {
        if (typeof arguments[0] === 'string') {
          var methodName = arguments[0];
          var args = Array.prototype.slice.call(arguments, 1);
          var returnVal;
          this.each(function() {
            if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
              returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
            }
          });
          if (returnVal !== undefined){
            return returnVal;
          } else {
            return this;
          }
        } else if (typeof options === "object" || !options) {
          return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
              $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
          });
        }
      };
    }
  
  })(window, document);
  
  (function() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
      }
  
      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
  
      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
  }());
/* =========================================
*      Partical Effect
*  =======================================*/

  $(function() {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 120,
          "density": {
            "enable": true,
            "value_area": 700
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 4,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
    var update;
    update = function() {
      if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {}
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });

  
/* =========================================
*      Type Effect
*  =======================================*/

var greet = new Array("Hello","Hola", "Hallo", "नमस्ते", "Hello","Привет", "Χαίρετε", "నమస్కారం","안녕하세요", "こんにちは", "你好", );

var counter= 0;
document.getElementById('typewritter').innerHTML = greet[counter];

Changetypewritter();
function Changetypewritter(){
  incrementIndex();
  document.getElementById('typewritter').innerHTML = greet[counter];
  setTimeout(Changetypewritter, 1200);
}
function incrementIndex(){
  if(counter < greet.length - 1 ){
    counter++;
  }else{
    counter = 0;
  }
}

/* =========================================
*      Light Box
*  =======================================*/


 baguetteBox.run('#projects-masonry');
/* =========================================
*      Owl carousel autoplay
*  =======================================*/

 var owl = $('.owl-carousel');
 owl.owlCarousel({
     items:3,
     loop:true,
     margin:10,
     autoplay:true,
     autoplayTimeout:1000,
     autoplayHoverPause:true
 });