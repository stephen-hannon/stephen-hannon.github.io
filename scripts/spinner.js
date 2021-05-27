"use strict";
// https://codepen.io/stephen-hannon/pen/YzNoMoB

(function () {
  var SPOKES = 6;
  var RADIUS = 40;
  var PADDING = 5; // should be bigger than stroke width / 2

  var ARC_ANGLE_DEG = 360 / (SPOKES * 2);
  var ARC_ANGLE = (Math.PI / 180) * ARC_ANGLE_DEG;
  var arcs = Array(SPOKES * 2)
    .fill(null)
    .map(function (_, index) {
      var startAngle = index * ARC_ANGLE + (index % 2 === 1 ? Math.PI : 0);
      return [
        // Line across circle
        "L",
        RADIUS * Math.cos(startAngle),
        RADIUS * -Math.sin(startAngle), // Arc
        "A",
        RADIUS,
        RADIUS,
        ARC_ANGLE_DEG,
        0,
        0,
        RADIUS * Math.cos(startAngle + ARC_ANGLE),
        RADIUS * -Math.sin(startAngle + ARC_ANGLE)
      ].join(" ");
    });
  var pathData = ["M", -RADIUS, 0].concat(arcs).concat("Z");
  var $path = document.getElementById("spinner-path");
  var $svg = document.getElementById("spinner-svg");
  $path.setAttribute("d", pathData.join(" "));
  var aspectRatio = self.innerWidth / self.innerHeight;
  var offsetMultiplier = Math.random() * 100 + 50; // random number between 50 and 150

  var xOffset = Math.random();
  var yOffset = Math.random();
  var radiusPadded = RADIUS + PADDING;
  var width = (radiusPadded * 2 + offsetMultiplier) * Math.max(aspectRatio, 1);
  var height =
    (radiusPadded * 2 + offsetMultiplier) * Math.max(1 / aspectRatio, 1);
  var viewBox = [
    -radiusPadded - xOffset * (width - 2 * radiusPadded),
    -radiusPadded - yOffset * (height - 2 * radiusPadded),
    width,
    height
  ];
  $svg.setAttribute("viewBox", viewBox.join(" "));
})();
