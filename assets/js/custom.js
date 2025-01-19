(function ($) {
  'use strict';

  $(function () {
    $('.accordion-toggle').on('click', function (e) {
      e.preventDefault();

      const content = $(this).next('.accordion-content');

      // Скрыть другие секции
      $('.accordion-content').not(content).slideUp();
      // Переключить текущую
      content.slideToggle();
    });
  });

  $(function () {
    $('#tabs').tabs();
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $('header').addClass('background-header');

      // Скрываем первую картинку и показываем вторую
      $('.logo img:first-child').addClass('img-hidden').removeClass('img-block');
      $('.logo img:last-child').addClass('img-block').removeClass('img-hidden');
    } else {
      $('header').removeClass('background-header');

      // Показываем первую картинку и скрываем вторую
      $('.logo img:first-child').addClass('img-block').removeClass('img-hidden');
      $('.logo img:last-child').addClass('img-hidden').removeClass('img-block');
    }
  });

  $('.schedule-filter li').on('click', function () {
    var tsfilter = $(this).data('tsfilter');
    $('.schedule-filter li').removeClass('active');
    $(this).addClass('active');
    if (tsfilter == 'all') {
      $('.schedule-table').removeClass('filtering');
      $('.ts-item').removeClass('show');
    } else {
      $('.schedule-table').addClass('filtering');
    }
    $('.ts-item').each(function () {
      $(this).removeClass('show');
      if ($(this).data('tsmeta') == tsfilter) {
        $(this).addClass('show');
      }
    });
  });

  // Window Resize Mobile Menu Fix
  mobileNav();

  // Scroll animation init
  window.sr = new scrollReveal();

  // Menu Dropdown Toggle
  if ($('.menu-trigger').length) {
    $('.menu-trigger').on('click', function () {
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }

  $(document).ready(function () {
    $(document).on('scroll', onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
      e.preventDefault();

      $(document).off('scroll');

      $('a').each(function () {
        $(this).removeClass('active');
      });
      $(this).addClass('active');

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: target.offset().top + 1,
          },
          500,
          'swing',
          function () {
            window.location.hash = target.selector;
            $(document).on('scroll', onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
      var currLink = $(this);
      var href = currLink.attr('href');

      // Проверяем, является ли href якорной ссылкой
      if (href && href.startsWith('#')) {
        var refElement = $(href);
        if (
          refElement.length &&
          refElement.position().top - 5 <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos
        ) {
          $('.nav ul li a').removeClass('active');
          currLink.addClass('active');
        } else {
          currLink.removeClass('active');
        }
      }
    });
  }

  // Page loading animation
  $(window).on('load', function () {
    $('#js-preloader').addClass('loaded');
  });

  // Window Resize Mobile Menu Fix
  $(window).on('resize', function () {
    mobileNav();
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function () {
      if (width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }
})(window.jQuery);
