const $win = $(window),
	$body = $("body"),
	$desktop = $(".desktop"),
	$mobile = $(".mobile"),
	loopUrl = "https://d125jc2jue048y.cloudfront.net/loop-",
	videoUrl = "https://d125jc2jue048y.cloudfront.net/video-",
	mvideoUrl = "https://d125jc2jue048y.cloudfront.net/mobile/video-",
	$header = $("header"),
	$logo = $(".logo"),
	$footer = $("footer"),
	$loader = $(".loader"),
	$navItem = $footer.find(".section-nav"),
	$mainNav = $(".section-nav"),
	$navBtn = $mainNav.find("li"),
	$homeBtn = $(".logo"),
	$muteBtn = $(".volume"),
	$menuBtn = $(".btn--menu"),
	$startBtn = $(".btn--start"),
	$skipBtn = $(".btn--skip"),
	$pauseBtn = $(".play-pause"),
	$textBtn = $(".btn--text"),
	$replayBtn = $(".replay"),
	$nextBtn = $(".next"),
	$restartBtn = $(".btn--restart"),
	$menu = $(".main-menu ul"),
	$overlay = $(".nav-overlay"),
	$closeOverlay = $(".close-overlay"),
	$menuItems = $(".main-menu ul").children().not(".merch-link"),
	learnTL = new TimelineMax();

let $currPlaying = $(".video--playing"),
	$navActive = $navItem.find(".nav-active"),
	$progBar = $(".progress:not(.progress--empty)"),
	$progActive = $navActive.find($progBar),
	progressTL = new TimelineMax({
		paused: true,
	}),
	storyTL = new TimelineMax({
		paused: true,
	});

let isMobile = {
	detectMobile: function () {
		return navigator.userAgent.match(/Mobi/i);
	},
};

$('[tabindex="0"]').on("keydown", function (e) {
	let $this = $(this);
	if (e.keyCode === 13) {
		$this.trigger("click");
	}
});

$muteBtn.on("click touchend", function () {
	let $this = $(this);
	if ($(".video--scene").prop("muted")) {
		setTimeout(function () {
			$(".video").prop("muted", false);
			$this.removeClass("volume--muted");
		}, 150);
	} else {
		setTimeout(function () {
			$(".video").prop("muted", true);
			$this.addClass("volume--muted");
		}, 150);
	}
});

const sections = {
	home: {
		title: "Home",
		video: "",
		loop: loopUrl + 0 + ".mp4",
		selector: $("section.home"),
		duration: 31,
	},
	who: {
		title: "Who",
		video: videoUrl + 1 + ".mp4",
		mvideo: mvideoUrl + 1 + ".mp4",
		loop: loopUrl + 1 + ".mp4",
		selector: $("section.who"),
		duration: 22,
	},
	what: {
		title: "What",
		video: videoUrl + 2 + ".mp4",
		mvideo: mvideoUrl + 2 + ".mp4",
		loop: loopUrl + 2 + ".mp4",
		selector: $("section.what"),
		duration: 31,
	},
	where: {
		title: "Where",
		video: videoUrl + 3 + ".mp4",
		mvideo: mvideoUrl + 3 + ".mp4",
		loop: loopUrl + 3 + ".mp4",
		selector: $("section.where"),
		duration: 26,
	},
	when: {
		title: "When",
		video: videoUrl + 4 + ".mp4",
		mvideo: mvideoUrl + 4 + ".mp4",
		loop: loopUrl + 4 + ".mp4",
		selector: $("section.when"),
		duration: 21,
	},
	why: {
		title: "Why",
		video: videoUrl + 5 + ".mp4",
		mvideo: mvideoUrl + 5 + ".mp4",
		loop: loopUrl + 5 + ".mp4",
		selector: $("section.why"),
		duration: 31,
	},
	how: {
		title: "How",
		video: videoUrl + 6 + ".mp4",
		mvideo: mvideoUrl + 6 + ".mp4",
		loop: loopUrl + 6 + ".mp4",
		selector: $("section.how"),
		duration: 35,
	},
};

function setVideoSrc(section) {
	if (isMobile.detectMobile()) {
	} else {
		let $selector = sections[section].selector,
			loop = sections[section].loop,
			video = sections[section].video;
		$selector.find(".video--scene").attr("src", video);
		$selector.find(".video--loop").attr("src", loop);
	}
}

function updatePageTitle(section) {
	document.title = sections[section].title + " | OneTakeDave" + "\u2120";
}

function progressBar(state) {
	let $progress = $navActive.find(".progress--active"),
		$progReset = $progBar.not(".progress--active"),
		progPar = $progress.parent().parent().data("url"),
		duration = sections[progPar].duration;
	progressTL.to($progress, duration, {
		x: 0,
	});
	if (state === "play") {
		progressTL.set($progReset, {
			x: "-100%",
		});
		progressTL.play();
	} else if (state === "replay") {
		progressTL.restart();
	} else if (state === "stop") {
		progressTL.progress(1);
	} else if (state === "pause") {
		progressTL.pause();
		storyTL.pause();
	} else if (state === "resume") {
		progressTL.resume();
		storyTL.resume();
	}
}

function learnMore(state) {
	let $learn = $(".section--active").find(".learn-more"),
		$learnWrap = $learn.find(".learn-more__wrapper"),
		$story = $(".section--active").find(".story"),
		$question = $story.find("h2"),
		$overlay = $(".section--active").find(".video-overlay"),
		$video = $(".video"),
		$videoWrap = $(".video-wrapper"),
		$learnP = $(".section--active .learn-more__wrapper .content > p"),
		$visual = $learn.find(".visual-content"),
		$next = $learn.find(".next"),
		$iframe = $visual.find("iframe"),
		$menu = $(".btn--menu");
	if (state === "open") {
		$story.fadeOut("fast");
		$learn.delay(500).fadeIn("fast");
		learnTL
			.to($footer, 0.25, {
				alpha: 0,
				visibility: "hidden",
			})
			.fromTo(
				$learnWrap,
				0.5,
				{
					x: -10,
					y: "-50%",
				},
				{
					x: 0,
					y: "-50%",
				},
				"-=.25"
			)
			.staggerTo(
				$learnP,
				0.01,
				{
					className: "+=reveal",
				},
				0.3,
				"-=.5"
			)
			.fromTo(
				$visual,
				0.35,
				{
					alpha: 0,
					y: -20,
					x: 20,
				},
				{
					alpha: 1,
					x: 0,
					y: 0,
					ease: Power1.easeOut,
				}
			)
			.fromTo(
				$next,
				0.35,
				{
					alpha: 0,
					y: 20,
					x: 20,
				},
				{
					alpha: 1,
					x: 0,
					y: 0,
					ease: Power1.easeOut,
				}
			);
		$menuBtn.removeClass("btn--light");
		$skipBtn.css({
			opacity: 0,
			visibility: "hidden",
		});
		progressBar("stop");
		$video.addClass("video--not-fs");
		$videoWrap.addClass("video-wrapper--not-fs");
		$question.removeClass("reveal");
	} else if (state === "close") {
		$learn.fadeOut("fast");
		$video.removeClass("video--not-fs");
		$videoWrap.removeClass("video-wrapper--not-fs");
		$learnP.removeClass("reveal");
		learnTL
			.to($footer, 0.25, {
				alpha: 1,
				visibility: "visible",
			})
			.to($overlay, 1, {
				backgroundColor: "rgba(18, 18, 18, 0)",
			});
		$skipBtn.css({
			opacity: 1,
			visibility: "visible",
		});
		if ($(".discover-content").hasClass("discover-content--active")) {
			$(".discover-content--active").find(".back").trigger("click");
		}
		$(".discover-content--active").removeClass("discover-content--active");
		$learn.removeClass("learn-more--fs");
		if (!$(".home").hasClass("section--active")) {
			$menuBtn.addClass("btn--light");
		} else {
			$("#quote > .block-revealer").removeClass("reveal");
			TweenMax.staggerTo(
				"#quote > .block-revealer",
				0.01,
				{
					className: "+=reveal",
				},
				0.3
			);
		}
	}
}

function defineLearnWidth() {
	let $videoWidth = $(".section--active").find(".video-wrapper").width(),
		$videoHeight = $(".section--active").find(".video-wrapper").height(),
		$learn = $(".section--active").find(".learn-more");
	if ($(window).width() > 1200) {
		$learn.width($videoWidth * 0.5);
		$learn.height($videoHeight * 0.5);
	} else {
		$learn.width($videoWidth * 0.35);
		$learn.height($videoHeight * 0.35);
	}
}

$(".discover.btn").on("click", function () {
	let $container = $(this).siblings(".discover-content"),
		$back = $container.find(".back"),
		$scroll = $container.find(".scroll-hint"),
		$learn = $(this).parents(".learn-more");
	$(this).siblings(".discover-content").addClass("discover-content--active");
	$(this)
		.siblings(".discover-transition")
		.addClass("discover-transition--active");
	setTimeout(function () {
		$learn.addClass("learn-more--fs");
		if (!$(".where").hasClass("section--active")) {
			$menuBtn.addClass("btn--light");
		} else {
			$back.addClass("back--dark");
		}
	}, 200);
	setTimeout(function () {
		$scroll.addClass("scroll-hint--active");
	}, 1500);
	setTimeout(function () {
		$back.addClass("back--active");
	}, 1750);
	$body.addClass("section-is-open");
	$back.on("click", function () {
		$(this)
			.closest(".discover-content")
			.addClass("close-discover-content")
			.removeClass("discover-content--active");
		$back.removeClass("back--active");
		$scroll.removeClass("scroll-hint--active");
		setTimeout(function () {
			$(".discover-transition--active")
				.addClass("close-discover-transition")
				.removeClass("discover-transition--active");
		}, 250);
		setTimeout(function () {
			$(".discover-transition").removeClass("close-discover-transition");
			$(".discover-content").removeClass("close-discover-content");
			$learn.removeClass("learn-more--fs");
			$menuBtn.removeClass("btn--light");
		}, 350);
		$body.removeClass("section-is-open");
	});
});

function storyText(state) {
	let $story = $(".section--active").find(".story"),
		$overlay = $story.parent(".video-overlay"),
		$titleOne = $story.find("h2");
	storyTL.to($titleOne, 0.1, {
		className: "+=reveal",
	});
	if (state === "play") {
		storyTL.play();
	} else if (state === "restart") {
		$story.show();
		storyTL.play();
	}
}

function playVideo(section) {
	let $selector = sections[section].selector,
		$video = $selector.find(".video--scene"),
		$loop = $selector.find(".video--loop"),
		$vidSection = $currPlaying.parents("section");
	setVideoSrc(section);
	updatePageTitle(section);
	$currPlaying[0].pause();
	$currPlaying.removeClass("video--playing");
	$vidSection.removeClass("section--active");
	learnMore("close");
	$currPlaying.parents("section").find("iframe").removeAttr("src");
	if (section === "home") {
		$loop.addClass("video--playing");
		$(".home > .video-wrapper").removeClass("fs");
		$menuBtn.removeClass("btn--light");
	} else {
		$video.addClass("video--playing");
		$video.parents(".video-wrapper").addClass("video-wrapper--playing");
	}
	$currPlaying = $(".video--playing");
	$vidSection = $currPlaying.parents("section");
	$vidSection.addClass("section--active");
	let lastPlayPos = 0,
		currPlayPos = 0,
		buffering = false;
	var checkBuffering = setInterval(function () {
		currPlayPos = $currPlaying[0].currentTime;
		let offset = 1 / 50;
		if (
			!buffering &&
			currPlayPos < lastPlayPos + offset &&
			!$currPlaying[0].paused &&
			$currPlaying.hasClass("video--scene")
		) {
			buffering = true;
			progressBar("pause");
			$loader.fadeIn();
		}
		if (
			buffering &&
			currPlayPos > lastPlayPos + offset &&
			!$currPlaying[0].paused &&
			$currPlaying.hasClass("video--scene")
		) {
			buffering = false;
			progressBar("resume");
			$loader.fadeOut();
		}
		if ($currPlaying.hasClass("video--loop")) {
			$loader.hide();
		}
		lastPlayPos = currPlayPos;
	}, 200);
	setTimeout(function () {
		if ($currPlaying[0].paused) {
			$currPlaying[0].pause();
			$currPlaying[0].play();
		} else {
			$currPlaying[0].play();
		}
		progressBar("play");
	}, 200);
}

function skipVideo() {
	let $loop = $currPlaying.next();
	$currPlaying[0].pause();
	$currPlaying.removeClass("video--playing");
	progressBar("stop");
	$loop[0].play();
	$loop.addClass("video--playing");
	$currPlaying = $loop;
	$pauseBtn.removeClass("play-pause--paused").addClass("play-pause--playing");
}

function replayVideo() {
	let $video = $currPlaying.prev(),
		$videoWrap = $currPlaying.parents(".video-wrapper");
	$currPlaying[0].pause();
	$currPlaying.removeClass("video--playing");
	$video[0].currentTime = 0;
	$video.addClass("video--playing");
	$videoWrap.addClass("video-wrapper--playing");
	$currPlaying = $video;
	setTimeout(function () {
		progressBar("replay");
		$video[0].play();
	}, 200);
}

function nextVideo() {
	let $nextSection = $currPlaying.parents("section").next("section"),
		sectionClass = $nextSection[0].classList[1],
		pageData = sectionClass,
		pageTitle = sectionClass + " | OneTakeDave" + "\u2120",
		pageUrl = sectionClass;
	playVideo(sectionClass);
	history.pushState(pageData, pageTitle, pageUrl);
}

let videoProgress = setInterval(function () {
	let currTime = parseInt($currPlaying[0].currentTime, 10),
		duration = parseInt($currPlaying[0].duration, 10),
		currTitle = $currPlaying.data("video");
	if (currTime > 0 && !$currPlaying[0].paused && !$currPlaying[0].ended) {
		if (
			currTime > duration / 2 &&
			!$(".section--active .video-wrapper").hasClass("video-wrapper--not-fs")
		) {
			storyText("restart");
			switch (currTitle) {
				case "who":
					setVideoSrc("what");
					break;
				case "what":
					setVideoSrc("where");
					break;
				case "where":
					setVideoSrc("when");
					break;
				case "when":
					setVideoSrc("why");
					break;
				case "Why":
					setVideoSrc("how");
					break;
			}
		}
	}
	if ($currPlaying.hasClass("video--scene") && $currPlaying[0].ended) {
		$currPlaying[0].pause();
		if (!$(".section--active").hasClass("how")) {
			$currPlaying.addClass("video--not-fs");
			$currPlaying.parents(".video-wrapper").addClass("video-wrapper--not-fs");
			$currPlaying.next(".video--loop").addClass("video--not-fs");
		}
		$currPlaying.removeClass("video--playing");
		$currPlaying
			.parents(".video-wrapper")
			.removeClass("video-wrapper--playing");
		$currPlaying.next(".video--loop").addClass("video--playing");
		$currPlaying = $(".video--playing");
		if ($currPlaying[0].paused) {
			$currPlaying[0].pause();
			$currPlaying[0].play();
		} else {
			$currPlaying[0].play();
		}
		learnMore("open");
	}
}, 850);

let OneTakeDave = {
	init: function () {
		let pageTitle = document.title,
			pageUrl = window.location.pathname,
			pageData;
		console.log(window.location.pathname);
		pageData = "home";
		$(".home").addClass("section--active");
		$(".home > .video-wrapper").removeClass("fs");

		history.replaceState(pageData, pageTitle, pageUrl);
		$header.css("opacity", 1);
		$navBtn.add($homeBtn).on("click", function (e) {
			let $target = $(e.target),
				$this = $(this),
				clickedEl = $target[0].localName;
			if (clickedEl === "span" || clickedEl === "div") {
				$target = $target.parent();
			}
			let pageUrl = $target.data("url"),
				pageData = pageUrl,
				pageTitle = sections[pageUrl].title;
			if (pageUrl !== $currPlaying.data("video")) {
				playVideo(pageData);
				learnMore("close");
				if (pageUrl === "home") {
					$footer.add($skipBtn).css({
						opacity: 0,
						visibility: "hidden",
					});
					$logo.first().css({
						opacity: 1,
						visibility: "visible",
					});
					$logo.last().css({
						opacity: 0,
						visibility: "hidden",
					});
					$navActive.removeClass("nav-active");
					$progActive.removeClass("progress--active");
					$(".home > .video-wrapper").removeClass("fs");
				}
				if ($target[0].parentElement.className === "section-nav") {
					$navActive.removeClass("nav-active");
					$progActive.removeClass("progress--active");
					$this.addClass("nav-active");
					$navActive = $navItem.find(".nav-active");
					$progActive = $navActive.find(".progress:not(.progress--empty)");
					$progActive.addClass("progress--active");
				}
				progressTL.progress(0).clear();
				progressTL = new TimelineMax({
					paused: true,
				});
				$pauseBtn
					.removeClass("play-pause--paused")
					.addClass("play-pause--playing");
				history.pushState(pageData, pageTitle, pageUrl);
			}
		});
		$startBtn.on("click", function () {
			let $firstNav = $footer.find(".section-nav li:first-of-type"),
				$progBar = $firstNav.find(".progress:not(.progress--empty)");
			nextVideo();
			$logo.first().css({
				opacity: 0,
				visibility: "hidden",
			});
			$logo.last().css({
				opacity: 1,
				visibility: "visible",
			});
			$firstNav.addClass("nav-active");
			$navActive = $navItem.find(".nav-active");
			$progActive = $navActive.find(".progress:not(.progress--empty)");
			$progBar.addClass("progress--active");
			learnMore("close");
			progressTL.progress(0).clear();
			progressTL = new TimelineMax({
				paused: true,
			});
			$footer.add($skipBtn).css({
				opacity: 1,
				visibility: "visible",
			});
		});
		$menuBtn.on("click", function () {
			let $this = $(this);

			if ($menu.hasClass("menu-open")) {
				$menu.removeClass("show-menu-items");
			}
			setTimeout(function () {
				$this.toggleClass("btn--close");
				$menu.toggleClass("menu-close");
			}, 100);
			setTimeout(function () {
				$menu.toggleClass("menu-open");
			}, 300);
			setTimeout(function () {
				if ($menu.hasClass("menu-open")) {
					$menu.addClass("show-menu-items");
				}
			}, 950);
			$menuItems.removeClass("menu-active");
			if (
				$menu.hasClass("menu-open") &&
				!$currPlaying.hasClass("video--loop")
			) {
				$currPlaying[0].pause();
				progressBar("pause");
			} else if (
				$menu.hasClass("menu-close") &&
				!$currPlaying.hasClass("video--loop")
			) {
				$(
					".menu-item-title-wrap,.menu-item-title,.menu-item-hover-container,.menu-item-hover-bg"
				).removeAttr("style");
				$("..menu-item-title").removeClass("current-menu-item");
				$(".menu-item-title-wrap").removeClass("menu-item-not-active");
				progressBar("resume");
			}
		});
		$menuItems.on("click", function (e) {
			let $target = $(e.target),
				clickedEl = $target[0].localName;
			if (clickedEl === "li") {
				$target = $target.children();
			}
			let targetUrl = $target[0].dataset.url,
				$parent = $target.parent();
			$overlay.show();
			if (targetUrl != "merch") {
				setTimeout(function () {
					$overlay.addClass("nav-overlay--open");
				}, 200);
			}
			if (!$currPlaying.hasClass("video--loop")) {
				progressBar("pause");
				$currPlaying[0].pause();
			}
			if (targetUrl === "music") {
				$parent.addClass("menu-active").siblings().removeClass("menu-active");
				$(".music").addClass("open");
				$(".shows, .contact").removeClass("open");
				var musictl = new TimelineMax();
				musictl
					.fromTo(
						".music h3",
						0.5,
						{
							alpha: 0,
							x: -100,
						},
						{
							alpha: 1,
							x: 0,
							ease: Power1.easeInOut,
						},
						"+=.35"
					)
					.fromTo(
						".music .divider",
						0.5,
						{
							x: -1000,
						},
						{
							x: 0,
							ease: Power1.easeInOut,
						}
					)
					.fromTo(
						".music span",
						0.5,
						{
							alpha: 0,
							x: -100,
						},
						{
							alpha: 1,
							x: 0,
							ease: Power1.easeInOut,
						}
					)
					.staggerFromTo(
						".music .streaming-service",
						0.35,
						{
							y: 50,
							alpha: 0,
						},
						{
							y: 0,
							alpha: 0.6,
							ease: Power1.easeInOut,
						},
						0.2
					);
			} else if (targetUrl === "shows") {
				$parent.addClass("menu-active").siblings().removeClass("menu-active");
				$(".shows").addClass("open");
				$(".music, .contact").removeClass("open");
				TweenMax.fromTo(
					".bit-nav-bar-container",
					0.5,
					{
						y: 50,
						alpha: 0,
					},
					{
						y: 0,
						alpha: 1,
						ease: Power1.easeInOut,
						delay: 1,
					}
				);
				TweenMax.staggerFromTo(
					".bit-events-container > div",
					0.35,
					{
						y: 50,
						alpha: 0,
					},
					{
						y: 0,
						alpha: 1,
						ease: Power1.easeInOut,
						delay: 1.25,
					},
					0.2
				);
			} else if (targetUrl === "contact") {
				$parent.addClass("menu-active").siblings().removeClass("menu-active");
				$(".contact").addClass("open");
				$(".music, .shows").removeClass("open");
				TweenMax.staggerFromTo(
					".animate-in",
					0.35,
					{
						y: 50,
						alpha: 0,
					},
					{
						y: 0,
						alpha: 1,
						ease: Power1.easeInOut,
						delay: 1,
					},
					0.2
				);
			} else if (targetUrl === "merch") {
				$(".music, .shows, .contact").removeClass("open");
				location.href = "https://shop.onetakedave.com";
			}
		});
		$closeOverlay.on("click", function (e) {
			$overlay.removeClass("nav-overlay--open");
		});
		$skipBtn.on("click", function () {
			skipVideo();
			learnMore("open");
		});
		$pauseBtn.on("click", function (e) {
			let $this = $(this);
			if (
				$this.hasClass("play-pause--playing") &&
				$currPlaying.hasClass("video--scene")
			) {
				$currPlaying[0].pause();
				progressBar("pause");
				$pauseBtn
					.removeClass("play-pause--playing")
					.addClass("play-pause--paused");
			} else if (
				$this.hasClass("play-pause--paused") &&
				$currPlaying.hasClass("video--scene")
			) {
				if ($currPlaying[0].paused) {
					$currPlaying[0].pause();
					$currPlaying[0].play();
				} else {
					$currPlaying[0].play();
				}
				progressBar("resume");
				$pauseBtn
					.removeClass("play-pause--paused")
					.addClass("play-pause--playing");
			} else {
				e.preventDefault();
			}
		});
		$muteBtn.on("click", function () {
			let $this = $(this);
			if ($currPlaying.prop("muted") === false) {
				$currPlaying.prop("muted", true);
				$this.addClass("volume--muted");
			} else {
				$currPlaying.prop("muted", false);
				$this.removeClass("volume--muted");
			}
		});
		$replayBtn.on("click", function () {
			replayVideo();
			learnMore("close");
		});
		$nextBtn.on("click", function () {
			nextVideo();
			learnMore("close");
			$navActive.removeClass("nav-active");
			$progActive.removeClass("progress--active");
			$navActive.next().addClass("nav-active");
			$navActive = $navItem.find(".nav-active");
			$progActive = $navActive.find(".progress:not(.progress--empty)");
			$progActive.addClass("progress--active");
			progressTL.progress(0).clear();
			progressTL = new TimelineMax({
				paused: true,
			});
		});
		$restartBtn.on("click", function () {
			let pageData = "who",
				pageTitle = "Who | OneTakeDave" + "\u2120",
				pageUrl = pageData,
				$firstNav = $footer.find(".section-nav li:first-of-type");
			playVideo(pageData);
			learnMore("close");
			$navActive.removeClass("nav-active");
			$progActive.removeClass("progress--active");
			$firstNav.addClass("nav-active");
			$navActive = $navItem.find(".nav-active");
			$progActive = $navActive.find(".progress:not(.progress--empty)");
			$progActive.addClass("progress--active");
			progressTL.progress(0).clear();
			progressTL = new TimelineMax({
				paused: true,
			});
			history.pushState(pageData, pageTitle, pageUrl);
		});
	},
};

$(function () {
	OneTakeDave.init();
});

$body.removeClass("mobile-active");
// $desktop.fadeIn(1000);

window.addEventListener(
	"load",
	function () {
		if (isMobile.detectMobile()) {
			let video1 = document.querySelector("#video-who"),
				video2 = document.querySelector("#video-what"),
				video3 = document.querySelector("#video-where"),
				video4 = document.querySelector("#video-when"),
				video5 = document.querySelector("#video-why"),
				video6 = document.querySelector("#video-how"),
				loop1 = $("#video-who").siblings(".video--loop"),
				loop2 = $("#video-what").siblings(".video--loop"),
				loop3 = $("#video-where").siblings(".video--loop"),
				loop4 = $("#video-when").siblings(".video--loop"),
				loop5 = $("#video-why").siblings(".video--loop"),
				loop6 = $("#video-how").siblings(".video--loop");

			function checkLoad1() {
				if (video1.readyState === 4) {
					$("#video-what").attr("src", mvideoUrl + 2 + ".mp4");
					loop2.attr("src", loopUrl + 2 + ".mp4");
					checkLoad2();
					console.log("video 1 loaded");
				} else {
					setTimeout(checkLoad1, 100);
				}
			}

			function checkLoad2() {
				if (video2.readyState === 4) {
					$("#video-where").attr("src", mvideoUrl + 3 + ".mp4");
					loop3.attr("src", loopUrl + 3 + ".mp4");
					checkLoad3();
					console.log("video 2 loaded");
				} else {
					setTimeout(checkLoad2, 100);
				}
			}

			function checkLoad3() {
				if (video3.readyState === 4) {
					$("#video-when").attr("src", mvideoUrl + 4 + ".mp4");
					loop4.attr("src", loopUrl + 4 + ".mp4");
					checkLoad4();
					console.log("video 3 loaded");
				} else {
					setTimeout(checkLoad3, 100);
				}
			}

			function checkLoad4() {
				if (video4.readyState === 4) {
					$("#video-why").attr("src", mvideoUrl + 5 + ".mp4");
					loop5.attr("src", loopUrl + 5 + ".mp4");
					checkLoad5();
					console.log("video 4 loaded");
				} else {
					setTimeout(checkLoad4, 100);
				}
			}

			function checkLoad5() {
				if (video5.readyState === 4) {
					$("#video-how").attr("src", mvideoUrl + 6 + ".mp4");
					loop6.attr("src", loopUrl + 6 + ".mp4");
					checkLoad6();
					console.log("video 5 loaded");
				} else {
					setTimeout(checkLoad5, 100);
				}
			}

			function checkLoad6() {
				if (video6.readyState === 4) {
					console.log("all videos loaded");
				} else {
					setTimeout(checkLoad6, 100);
				}
			}
			checkLoad1();
		} else {
			console.log("user is using desktop");
		}
		if (window.location.pathname == "/who") {
			$skipBtn.trigger("click");
		} else if (window.location.pathname == "/what") {
			$startBtn.trigger("click");
			setTimeout(function () {
				$('.section-nav li[data-url="what"]').trigger("click");
			}, 200);
		} else if (window.location.pathname == "/where") {
			$startBtn.trigger("click");
			setTimeout(function () {
				$('.section-nav li[data-url="where"]').trigger("click");
			}, 200);
		} else if (window.location.pathname == "/when") {
			$startBtn.trigger("click");
			setTimeout(function () {
				$('.section-nav li[data-url="when"]').trigger("click");
			}, 200);
		} else if (window.location.pathname == "/why") {
			$startBtn.trigger("click");
			setTimeout(function () {
				$('.section-nav li[data-url="why"]').trigger("click");
			}, 200);
		} else if (window.location.pathname == "/how") {
			$startBtn.trigger("click");
			setTimeout(function () {
				$('.section-nav li[data-url="how"]').trigger("click");
			}, 200);
		}
	},
	false
);

window.addEventListener("load", function (e) {
	console.log(window.location.pathname + " loaded");
});

History.Adapter.bind(window, "statechange", function (e) {
	playVideo(e.state);
	learnMore("close");
	if (
		window.location.pathname === "/home" ||
		window.location.pathname === "/"
	) {
		$footer.add($skipBtn).css({
			opacity: 0,
			visibility: "hidden",
		});
		$logo.first().css({
			opacity: 1,
			visibility: "visible",
		});
		$logo.last().css({
			opacity: 0,
			visibility: "hidden",
		});
	} else {
		let prevUrl = $navActive[0].baseURI.split("/")[3],
			$prevActive = $navActive.parent().find('[data-url="' + prevUrl + '"]');
		$navActive.removeClass("nav-active");
		$progActive.removeClass("progress--active");
		$prevActive.addClass("nav-active");
		$navActive = $navItem.find(".nav-active");
		$progActive = $navActive.find(".progress:not(.progress--empty)");
		$progActive.addClass("progress--active");
		setTimeout(function () {
			progressBar("play");
		}, 200);
		$footer.add($skipBtn).css({
			opacity: 1,
			visibility: "visible",
		});
		$logo.first().css({
			opacity: 0,
			visibility: "hidden",
		});
		$logo.last().css({
			opacity: 1,
			visibility: "visible",
		});
	}
	progressTL.progress(0).clear();
	progressTL = new TimelineMax({
		paused: true,
	});
});

$(".video-blurb").on("click", function (e) {
	var $link = $(this).find("p");
	$("#iframe-lightbox").addClass("yt-video-playing");

	setTimeout(function () {
		$("#ytVids")[0].src = $link.attr("data-url") + "?autoplay=1";
	}, 500);

	e.preventDefault();
});

$(".close-iframe").on("click", function (e) {
	e.preventDefault();

	$("#ytVids")[0].src = "about:blank";
	setTimeout(function () {
		$("#iframe-lightbox")
			.removeClass("yt-video-playing")
			.addClass("close-iframe-transition");
	}, 150);
	setTimeout(function () {
		$("#iframe-lightbox").removeClass("close-iframe-transition");
	}, 600);
});
