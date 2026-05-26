// Envelope open + preloader dismiss
(function () {
	var env = document.getElementById('env');
	var preloader = document.getElementById('preloader');

	function openEnv() {
		env.classList.add('open');
	}

	env.addEventListener('click', openEnv);
	env.addEventListener('keydown', function (e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openEnv();
		}
	});

	// Wait for fonts + all resources, then start animation
	Promise.all([
		document.fonts.ready,
		new Promise(function (resolve) {
			if (document.readyState === 'complete') resolve();
			else window.addEventListener('load', resolve);
		}),
	]).then(function () {
		preloader.classList.add('done');
		env.classList.add('ready');
		// Auto-open after fly-in (~1.85s + 0.18s delay) + small beat
		setTimeout(openEnv, 2400);
	});
})();

// Personalization via URL params (?guest=Name)
(function () {
	var p = new URLSearchParams(location.search);
	var g = p.get('guest') || p.get('name') || p.get('id');
	if (!g) return;
	try { g = decodeURIComponent(g); } catch (e) {}
	g = g.trim();
	if (g) {
		document.getElementById('personal-who').textContent = g;
		document.getElementById('personal').hidden = false;
	}
})();

// Countdown
(function () {
	var target = new Date('2026-07-03T11:30:00+02:00').getTime();
	var els = {
		d: document.getElementById('cd-d'),
		h: document.getElementById('cd-h'),
		m: document.getElementById('cd-m'),
		s: document.getElementById('cd-s'),
	};

	function pad(n) {
		return n < 10 ? '0' + n : '' + n;
	}

	function tick() {
		var diff = Math.max(0, target - Date.now());
		els.d.textContent = Math.floor(diff / 86400000);
		els.h.textContent = pad(Math.floor(diff / 3600000) % 24);
		els.m.textContent = pad(Math.floor(diff / 60000) % 60);
		els.s.textContent = pad(Math.floor(diff / 1000) % 60);
	}

	tick();
	setInterval(tick, 1000);
})();

// Scroll reveal
(function () {
	var io = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
	);
	document.querySelectorAll('.reveal').forEach(function (el) {
		io.observe(el);
	});
})();
