(function ($) {
  'use strict';
  // кастомный акордион для показа контента
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

  // местный акордион для показа контента
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

  // РАСПИСАНИЕ
  $(document).ready(function () {
    // Обработчик кликов на элементы фильтра
    $('.schedule-filter li').on('click', function () {
      var tsfilter = $(this).data('tsfilter'); // Получаем выбранный день (saturday или sunday)

      // Удаляем активный класс у всех кнопок фильтра и добавляем активный к текущему
      $('.schedule-filter li').removeClass('active');
      $(this).addClass('active');

      // Сбрасываем объединения ячеек и скрываем все строки
      $('.ts-item').removeClass('show').removeAttr('rowspan');

      // Показываем строки для выбранного дня
      $('.ts-item').each(function () {
        var tsmeta = $(this).data('tsmeta'); // Получаем атрибут data-tsmeta у строки

        // Если строка соответствует выбранному дню, показываем её
        if (tsmeta === tsfilter) {
          $(this).addClass('show'); // Добавляем класс show для видимости

          // Устанавливаем rowspan для Baby/tennis и Kids/pro
          if ($(this).data('rowmeta') === 'baby') {
            $(this).attr('rowspan', '2');
          } else if ($(this).data('rowmeta') === 'pro') {
            $(this).attr('rowspan', '3');
          }
        }
      });

      // Обрабатываем скрытие элементов с data-hiddenrowmeta
      if (tsfilter === 'sunday') {
        $('[data-hiddenrowmeta="babyHidden"]').addClass('shedulHidden'); // Скрываем строку
      } else if (tsfilter === 'saturday') {
        $('[data-hiddenrowmeta="babyHidden"]').removeClass('shedulHidden'); // Показываем строку
      }
    });

    // Инициализация (по умолчанию показываем субботу)
    $('.schedule-filter li[data-tsfilter="saturday"]').click();
  });

  // $('.schedule-filter li').on('click', function () {
  //   var tsfilter = $(this).data('tsfilter');
  //   $('.schedule-filter li').removeClass('active');
  //   $(this).addClass('active');
  //   if (tsfilter == 'all') {
  //     $('.schedule-table').removeClass('filtering');
  //     $('.ts-item').removeClass('show');
  //   } else {
  //     $('.schedule-table').addClass('filtering');
  //   }
  //   $('.ts-item').each(function () {
  //     $(this).removeClass('show');

  //     if ($(this).data('tsmeta') == tsfilter) {
  //       $(this).addClass('show');
  //     }

  //     if ($(this).data('rowmeta') == tsfilter) {
  //       $(this).removeAttr('rowspan'); // Убираем атрибут rowspan для остальных элементов
  //     } else {
  //       $(this).attr('rowspan', '2'); // Добавляем атрибут rowspan
  //     }
  //   });
  // });

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
