/* Add your custom JavaScript code */

    $(document).scroll(function() {
	  var y = $(this).scrollTop();
	  if (y > 800) {
	    $('.gototop-button').fadeIn();
	  } else {
	    $('.gototop-button').fadeOut();
	  }
	});

	/* Hero logo mark: tilt toward cursor */
	(function() {
		var logo = document.getElementById('dl-logo-mark');
		if (!logo) return;

		var maxTilt = 25; // degrees
		var maxDist = 400; // px at which effect fades to zero

		document.addEventListener('mousemove', function(e) {
			var rect = logo.getBoundingClientRect();
			var cx = rect.left + rect.width / 2;
			var cy = rect.top + rect.height / 2;
			var dx = e.clientX - cx;
			var dy = e.clientY - cy;
			var dist = Math.sqrt(dx * dx + dy * dy);
			var strength = Math.max(0, 1 - dist / maxDist);

			var rotateY = (dx / maxDist) * maxTilt * strength;
			var rotateX = (-dy / maxDist) * maxTilt * strength;

			logo.style.transform =
				'perspective(300px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
		});
	})();

	/* Hero logo mark + name: synced color cycle */
	(function() {
		var poly = document.querySelector('#dl-logo-mark polygon');
		var name = document.getElementById('dl-logo-name');
		if (!poly || !name) return;

		var colors = ['#ffffff', '#ff5f6d', '#ffc371', '#6dd5fa', '#a685e2', '#6dfab0'];
		var duration = 14400; // ms for a full cycle
		var stepMs = duration / colors.length;

		function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

		function hexToRgb(hex) {
			var n = parseInt(hex.slice(1), 16);
			return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
		}

		function tick(timestamp) {
			var t = (timestamp % duration) / stepMs;
			var i = Math.floor(t) % colors.length;
			var j = (i + 1) % colors.length;
			var frac = t - Math.floor(t);

			var c1 = hexToRgb(colors[i]);
			var c2 = hexToRgb(colors[j]);
			var rgb = 'rgb(' +
				lerp(c1[0], c2[0], frac) + ',' +
				lerp(c1[1], c2[1], frac) + ',' +
				lerp(c1[2], c2[2], frac) + ')';

			poly.style.fill = rgb;
			name.style.setProperty('color', rgb, 'important');

			requestAnimationFrame(tick);
		}

		requestAnimationFrame(tick);
	})();
