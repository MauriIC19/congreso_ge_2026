/**
* Template Name: TheEvent - v4.10.0
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return


      let sectionId = null
      const hash = navbarlink.hash
      if (hash.includes('?section=')) {
        const params = new URLSearchParams(hash.split('?')[1])
        sectionId = params.get('section')
      } else if (hash.startsWith('#/')) {

        const hashParts = hash.split('?')
        if (hashParts.length > 1) {
          const params = new URLSearchParams(hashParts[1])
          sectionId = params.get('section')
        }
      } else {

        sectionId = hash.substring(1)
      }

      if (!sectionId) return
      let section = select('#' + sectionId)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let sectionId = el
    if (el.includes('?section=')) {
      const params = new URLSearchParams(el.split('?')[1])
      sectionId = params.get('section')
    } else if (el.startsWith('#/')) {
      const hashParts = el.split('?')
      if (hashParts.length > 1) {
        const params = new URLSearchParams(hashParts[1])
        sectionId = params.get('section')
      }
    } else if (el.startsWith('#')) {
      sectionId = el.substring(1)
    }

    let elementPos = select('#' + sectionId).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', 'body', function (e) {
    if (e.target.closest('.mobile-nav-toggle')) {
      const navbar = select('#navbar')
      const toggle = e.target.closest('.mobile-nav-toggle')
      if (navbar) {
        navbar.classList.toggle('navbar-mobile')
        toggle.classList.toggle('bi-list')
        toggle.classList.toggle('bi-x')
      }
    }
  })

  /**
   * Mobile nav dropdowns activate
   */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.navbar .dropdown > a')) {
      const navbar = select('#navbar')
      if (navbar && navbar.classList.contains('navbar-mobile')) {
        e.preventDefault()
        e.target.nextElementSibling.classList.toggle('dropdown-active')
      }
    }
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  document.addEventListener('click', function (e) {
    const scrolltoLink = e.target.closest('.scrollto')
    if (scrolltoLink && scrolltoLink.hash) {
      // Extract section ID from hash (handles #/?section=x and #section formats)
      let sectionId = null
      const hash = scrolltoLink.hash
      if (hash.includes('?section=')) {
        const params = new URLSearchParams(hash.split('?')[1])
        sectionId = params.get('section')
      } else if (hash.startsWith('#/')) {
        const hashParts = hash.split('?')
        if (hashParts.length > 1) {
          const params = new URLSearchParams(hashParts[1])
          sectionId = params.get('section')
        }
      } else {
        sectionId = hash.substring(1)
      }

      if (sectionId && select('#' + sectionId)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar && navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          if (navbarToggle) {
            navbarToggle.classList.toggle('bi-list')
            navbarToggle.classList.toggle('bi-x')
          }
        }
        scrollto(scrolltoLink.hash)
      }
    }
  })

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      // Extract section ID from hash (handles #/?section=x and #section formats)
      let sectionId = null
      const hash = window.location.hash
      if (hash.includes('?section=')) {
        const params = new URLSearchParams(hash.split('?')[1])
        sectionId = params.get('section')
      } else if (hash.startsWith('#/')) {
        const hashParts = hash.split('?')
        if (hashParts.length > 1) {
          const params = new URLSearchParams(hashParts[1])
          sectionId = params.get('section')
        }
      } else {
        sectionId = hash.substring(1)
      }

      if (sectionId && select('#' + sectionId)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Buy tickets select the ticket type on click
   */
  on('show.bs.modal', '#buy-ticket-modal', function (event) {
    select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
  })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()