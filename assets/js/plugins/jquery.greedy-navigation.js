/*
GreedyNav.js - https://github.com/lukejacksonn/GreedyNav
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2015 Luke Jackson http://lukejacksonn.com
*/

$(function() {

  var $btn = $("nav.greedy-nav .greedy-nav__toggle");
  var $vlinks = $("nav.greedy-nav .visible-links");
  var $hlinks = $("nav.greedy-nav .hidden-links");
  var $nav = $("nav.greedy-nav");
  var $logo = $('nav.greedy-nav .site-logo');
  var $logoImg = $('nav.greedy-nav .site-logo img');
  var $title = $("nav.greedy-nav .site-title");
  var $search = $('nav.greedy-nav button.search__toggle');

  var numOfItems, totalSpace, closingTime, breakWidths;

  // This function measures both hidden and visible links and sets the navbar breakpoints
  // This is called the first time the script runs and everytime the "check()" function detects a change of window width that reached a different CSS width breakpoint, which affects the size of navbar Items
  // Please note that "CSS width breakpoints" (which are only 4) !== "navbar breakpoints" (which are as many as the number of items on the navbar)
  function measureLinks(){
    numOfItems = 0;
    totalSpace = 0;
    closingTime = 1000;
    breakWidths = [];

    // Adds the width of a navItem in order to create breakpoints for the navbar
    function addWidth(i, w) {
      totalSpace += w;
      numOfItems += 1;
      breakWidths.push(totalSpace);
    }

    // Measures the width of hidden links by making a temporary clone of them and positioning under visible links
    function hiddenWidth(obj){
      var clone = obj.clone();
      clone.css("visibility","hidden");
      $vlinks.append(clone);
      addWidth(0, clone.outerWidth());
      clone.remove();
    }
    // Measure both visible and hidden links widths
    $vlinks.children().outerWidth(addWidth);
    $hlinks.children().each(function(){hiddenWidth($(this))});
  }
  // Get initial state
  measureLinks();

  var winWidth = $( window ).width();
  // Set the last measured CSS width breakpoint: 0: <768px, 1: <1024px, 2: < 1280px, 3: >= 1280px.
  var lastBreakpoint = winWidth < 768 ? 0 : winWidth < 1024 ? 1 : winWidth < 1280 ? 2 : 3;

  var availableSpace, numOfVisibleItems, requiredSpace, timer;

  function check() {

    winWidth = $( window ).width();
    // Set the current CSS width breakpoint: 0: <768px, 1: <1024px, 2: < 1280px, 3: >= 1280px.
    var curBreakpoint = winWidth < 768 ? 0 : winWidth < 1024 ? 1 : winWidth < 1280 ? 2 : 3;
    // If current breakpoint is different from last measured breakpoint, measureLinks again
    if(curBreakpoint !== lastBreakpoint) measureLinks();
    // Set the last measured CSS width breakpoint with the current breakpoint
    lastBreakpoint = curBreakpoint;

    // Keep the primary navigation complete. If all links do not fit, move the
    // entire set into one menu instead of leaving a different partial list at
    // each viewport width.
    numOfVisibleItems = $vlinks.children().length;
    // Decrease the width of fixed elements from the nav innerWidth to find the
    // space available for the complete set of navigation links.
    availableSpace = /* nav */ $nav.innerWidth()
                   - /* logo */ ($logo.length !== 0 ? $logo.outerWidth(true) : 0)
                   - /* title */ $title.outerWidth(true)
                   - /* search */ ($search.length !== 0 ? $search.outerWidth(true) : 0);
    requiredSpace = breakWidths[numOfItems - 1];

    if (requiredSpace > availableSpace) {
      while ($vlinks.children().length) {
        $vlinks.children().last().prependTo($hlinks);
      }
    } else {
      while ($hlinks.children().length) {
        $hlinks.children().first().appendTo($vlinks);
      }
    }

    numOfVisibleItems = $vlinks.children().length;
    // Update the button accordingly
    $btn.attr("count", numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.addClass('hidden').removeClass('close').attr('aria-expanded', 'false');
      $hlinks.addClass('hidden');
    } else $btn.removeClass('hidden');
  }

  // Window listeners
  $(window).resize(function() {
    check();
  });

  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
    $(this).toggleClass('close');
    $btn.attr("aria-expanded", !$hlinks.hasClass("hidden"));
    clearTimeout(timer);
  });

  $hlinks.on('mouseleave', function() {
    // Mouse has left, start the timer
    timer = setTimeout(function() {
      if ($hlinks.find(":focus").length) return;
      $hlinks.addClass('hidden');
      $btn.removeClass("close").attr("aria-expanded", "false");
    }, closingTime);
  }).on('mouseenter', function() {
    // Mouse is back, cancel the timer
    clearTimeout(timer);
  })

  $nav.on('keydown', function(event) {
    if (event.key === 'Escape' && !$hlinks.hasClass('hidden')) {
      $hlinks.addClass('hidden');
      $btn.removeClass('close').attr('aria-expanded', 'false').trigger('focus');
    }
  });

  // check if page has a logo
  if($logoImg.length !== 0){
    // check if logo is not loaded
    if(!($logoImg[0].complete || $logoImg[0].naturalWidth !== 0)){
      // if logo is not loaded wait for logo to load or fail to check
      $logoImg.one("load error", check);
    // if logo is already loaded just check
    } else check();
  // if page does not have a logo just check
  } else check();

});
