"use strict";
// https://codepen.io/stephen-hannon/pen/GRWveXP

(function () {
  var SPOKES = 6;
  var RADIUS = 40;
  var ARC_ANGLE_DEG = 360 / (SPOKES * 2);
  var ARC_ANGLE = Math.PI / 180 * ARC_ANGLE_DEG;
  var miniRadius = RADIUS * Math.tan(ARC_ANGLE / 2);
  var PADDING = miniRadius + 5; // should be bigger than stroke width / 2

  var dashOptions = [
  /* 1/3 */
  [1 / 6],
  /* 0.5 */
  [1 / 6, 1 / 3], [0.25],
  /* 0.6 */
  [0.2, 0.4],
  /* 2/3 */
  [1 / 6, 1 / 2], [1 / 3], [1 / 2, 1 / 6],
  /* 0.75 */
  [0.125, 0.625], [0.25, 0.5], [0.375], [0.5, 0.25],
  /* 6/7 */
  [1 / 7, 5 / 7], [2 / 7, 4 / 7], [3 / 7],
  /* 1 */
  [.125, .875], [0.25, 0.75], [0.5], [0.75, 0.25],
  /* 1.2 */
  [0.2, 1], [1, 0.2],
  /* 1.5 */
  [0.5, 1], [0.75], [1, 0.5],
  /* 2 */
  [0.25, 1.75], [0.5, 1.5], [1], [1.5, 0.5],
  /* 3 */
  [1, 2], [1.5], [2, 1],
  /* 6 */
  [1, 5]];
  var $path = document.getElementById('spinner-path');
  var $svg = document.getElementById('spinner-svg');
  var length = $path.getTotalLength();

  // Random dash pattern
  $path.style.strokeDashoffset = length;
  var optionIndex = Math.floor(Math.random() * dashOptions.length); // dashOptions.length - 1;

  console.log(dashOptions[optionIndex]);
  $path.style.strokeDasharray = dashOptions[optionIndex].map(function (option) {
    return option * length / SPOKES;
  }).join(' ');

  // Random location and scale
  var aspectRatio = self.innerWidth / self.innerHeight;
  var offsetMultiplier = Math.random() * 100 + 50; // random number between 50 and 150

  var xOffset = Math.random();
  var yOffset = Math.random();
  var radiusPadded = RADIUS + PADDING;
  var width = (radiusPadded * 2 + offsetMultiplier) * Math.max(aspectRatio, 1);
  var height = (radiusPadded * 2 + offsetMultiplier) * Math.max(1 / aspectRatio, 1);
  var viewBox = [-radiusPadded - xOffset * (width - 2 * radiusPadded), -radiusPadded - yOffset * (height - 2 * radiusPadded), width, height];
  $svg.setAttribute('viewBox', viewBox.join(' '));
})();
