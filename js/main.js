/* ---------- Animation ---------- */

new WOW().init();

/* ---------- Smooth Scroll ---------- */


/**
 *
 * @param {(number|HTMLElement)} destination - Destination to scroll to (DOM element or number)
 * @param {number} duration - Duration of scrolling animation
 * @param {string} easing - Timing function name (Allowed values: 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint')
 * @param {function} callback - Optional callback invoked after animation
 */
function scrollIt(destination, duration = 200, easing = 'linear', callback) {

  // Predefine list of available timing functions
  // If you need more, tween js is full of great examples
  // https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L421-L737
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };


  // Store initial position of a window and time
  // If performance is not available in your browser
  // It will fallback to new Date().getTime() - thanks IE < 10
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  // const startTime = typeof(window.performance['now']) == 'function' ? performance.now() : new Date().getTime();


  // Take height of window and document to sesolve max scrollable value
  // Prevent requestAnimationFrame() from scrolling below maximum scollable value
  // Resolve destination type (node or number)
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);


  // If requestAnimationFrame is not supported
  // Move window to destination position and trigger callback function
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }


  // function resolves position of a window and moves to exact amount of pixels
  // Resolved by calculating delta and timing function choosen by user
  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    // Stop requesting animation when window reached its destination
    // And run a callback function
    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    // If window still needs to scroll to reach destination
    // Request another scroll invokation
    requestAnimationFrame(scroll);
  }


  // Invoke scroll and sequential requestAnimationFrame
  scroll();
}

// Scroll to Home Section
document.querySelector('.nav-home').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.section--header'),
    1600,
    'easeOutQuad'
  );
});

// Scroll to Services section
document.querySelector('.nav-services').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.section--about'),
    1000,
    'easeOutQuad'
  );
});

// Scroll to Work Section
document.querySelector('.nav-works').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.section--work'),
    1200,
    'easeOutQuad'
  );
});

// Scroll to Team Section
document.querySelector('.nav-team').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.section--team'),
    1400,
    'easeOutQuad'
  );
});

// Scroll to Contact Section
document.querySelector('.nav-contact').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.section--contact'),
    1600,
    'easeOutQuad'
  );
});

/* ---------- Modal ---------- */

// Get the modal
const modal = document.querySelector('.modal');

function openModal() {
  modal.style.display = 'block';
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the image and insert it inside the modal - use it'alt as caption
const imageOne = document.querySelector('.section__image-1');
const imageTwo = document.querySelector('.section__image-2');
const imageThree = document.querySelector('.section__image-3');
const imageFour = document.querySelector('.section__image-4');
const imageFive = document.querySelector('.section__image-5');
const imageSix = document.querySelector('.section__image-6');
const imageSeven = document.querySelector('.section__image-7');
const imageEight = document.querySelector('.section__image-8');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');

// Get the <span> elemen t that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
  modal.style.display = 'none';
});

imageOne.addEventListener('click', openModal);
imageTwo.addEventListener('click', openModal);
imageThree.addEventListener('click', openModal);
imageFour.addEventListener('click', openModal);
imageFive.addEventListener('click', openModal);
imageSix.addEventListener('click', openModal);
imageSeven.addEventListener('click', openModal);
imageEight.addEventListener('click', openModal);
