/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	// 取得 Cloudflare Worker 的節點資訊
	const colo = request.cf.colo || 'Unknown Colo';  // Cloudflare 的節點代碼
	const ip = request.headers.get('CF-Connecting-IP') || 'Unknown IP'; // 使用者的 IP
	const city = request.cf.city || 'Unknown City'; // 使用者所在城市
	const countryCode = request.cf.country || 'XX'; // 使用者所在國家代碼

	const html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Redbean0721 Image Service - Cloudflare ${colo} Node</title>
			<link rel="shortcut icon" href="https://api.redbean0721.com/favicon.ico" type="image/x-icon">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.5.3/css/bootstrap.min.css" crossorigin="anonymous" />
			<!-- <link rel="stylesheet" href="https://cdn.imlazy.ink:233/css/style.css"> -->
			<style>
				body {
					background: linear-gradient(45deg, black, transparent);
					font-family: "Microsoft YaHei";
				}

				/*---------------------------------------
					Typorgraphy              
				-----------------------------------------*/
				h1,h3,h4,h5,h6 {
					font-family: 'YaHei', serif;
					font-style: normal;
					font-weight: bold;
					letter-spacing: 0.5px;
				}

				h1 {
					font-size: 62px;
					padding-bottom: 14px;
					margin-bottom: 0px;
				}

				h2,h3 {
					padding-bottom: 6px;
				}

				h3 {
					font-size: 26px;
				}

				h4 {
					color: #666;
					font-size: 12px;
					font-weight: normal;
					letter-spacing: 2px;
				}

				p {
					color: #fff;
					font-size: 15px;
					font-weight: 300;
					line-height: 26px;
					letter-spacing: 0.2px;
				}

				.tlinks {
					text-indent: -9999px;
					height: 0;
					line-height: 0;
					font-size: 0;
					overflow: hidden;
				}

				.btn-success:focus {
					background-color: #000;
					border-color: transparent;
				}

				/*---------------------------------------
					General               
				-----------------------------------------*/
				html {
					-webkit-font-smoothing: antialiased;
				}

				a {
					color: #ff9a7b;
					-webkit-transition: 0.5s;
					-o-transition: 0.5s;
					transition: 0.5s;
					text-decoration: none !important;
				}

				a:hover, a:active, a:focus {
					color: #ff845e;
					outline: none;
				}

				* {
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
				}

				*:before, *:after {
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
				}

				#blog-single-post {
					padding-top: 60px;
					padding-bottom: 80px;
				}

				.main-about, .main-single-post, .main-gallery, .main-contact {
					height: 65vh;
				}

				.overlay {
					background: rgba(0,0,0,0.5 );
					width: 100%;
					height: 100vh;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}

				.parallax-section {
					background-attachment: fixed !important;
					background-size: cover !important;
					overflow: hidden;
				}

				/*---------------------------------------
					Preloader section              
				-----------------------------------------*/
				.preloader {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 99999;
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
					background: none repeat scroll 0 0 #ffffff;
				}

				.sk-spinner-wordpress.sk-spinner {
					background-color: #bfba55;
					width: 40px;
					height: 40px;
					border-radius: 40px;
					position: relative;
					-webkit-animation: sk-innerCircle 1s linear infinite;
					animation: sk-innerCircle 1s linear infinite;
				}

				.sk-spinner-wordpress .sk-inner-circle {
					display: block;
					background-color: #ffffff;
					width: 16px;
					height: 16px;
					position: absolute;
					border-radius: 8px;
					top: 5px;
					left: 5px;
				}

				@-webkit-keyframes sk-innerCircle {
					0% {
						-webkit-transform: rotate(0);
						transform: rotate(0);
					}

					100% {
						-webkit-transform: rotate(360deg);
						transform: rotate(360deg);
					}
				}

				@keyframes sk-innerCircle {
					0% {
						-webkit-transform: rotate(0);
						transform: rotate(0);
					}

					100% {
						-webkit-transform: rotate(360deg);
						transform: rotate(360deg);
					}
				}

				/*---------------------------------------
					Main Navigation             
				-----------------------------------------*/
				.navbar-default {
					background: #ffffff;
					margin: 0 !important;
					padding: 18px 0;
				}

				.navbar-default .navbar-brand {
					color: #555;
					font-family: 'Merriweather', serif;
					font-weight: bold;
					text-transform: uppercase;
					letter-spacing: 4px;
					margin: 0;
				}

				.navbar-default .navbar-nav li a {
					color: #777;
					font-size: 16px;
					letter-spacing: 1px;
					-webkit-transition: all 0.4s ease-in-out;
					transition: all 0.4s ease-in-out;
					padding-right: 22px;
					padding-left: 22px;
				}

				.navbar-default .navbar-nav > li a:hover {
					color: #bfba55 !important;
				}

				.navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {
					color: #606066;
					background-color: transparent;
				}

				.navbar-default .navbar-nav li a:hover, .navbar-default .navbar-nav .active > a {
					color: #bfba55;
				}

				.navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {
					color: #bfba55;
					background-color: transparent;
				}

				.navbar-default .navbar-toggle {
					border: none;
					padding-top: 10px;
				}

				.navbar-default .navbar-toggle .icon-bar {
					background: #bfba55;
					border-color: transparent;
				}

				.navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {
					background-color: transparent;
				}

				/*---------------------------------------
					Home section              
				-----------------------------------------*/
				#home {
					background-size: cover;
					background-position: center center;
					color: #ffffff;
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;
					position: relative;
					text-align: center;
				}

				.main-home {
					background: url('https://api.redbean0721.com/api/img') no-repeat;
					height: 100vh;
				}

				.main-about {
					background: url('../images/about-bg.jpg') no-repeat;
				}

				.main-single-post {
					background: url('../images/single-post-bg.jpg') no-repeat;
				}

				.main-gallery {
					background: url('../images/gallery-bg.jpg') no-repeat;
				}

				.main-contact {
					background: url('../images/contact-bg.jpg') no-repeat;
				}

				#particles-js {
					position: absolute;
					width: 100%;
					height: 100vh;
					top: 0;
					left: 0;
				}

				#home h4 {
					color: #bfba55;
				}

				#home .btn {
					background: #ffffff;
					border: 4px solid #ffffff;
					border-radius: 100px;
					color: #444;
					font-family: 'Merriweather', serif;
					font-size: 20px;
					font-weight: bold;
					letter-spacing: 2px;
					text-transform: uppercase;
					padding: 13px 22px;
					margin-top: 42px;
					transition: all 0.4s ease-in-out;
				}

				#home .btn:hover {
					background: transparent;
					border-color: #ffffff;
					color: #ffffff;
				}

				/*---------------------------------------
				About section              
				-----------------------------------------*/
				#about .col-md-6 {
					padding-top: 22px;
					padding-bottom: 32px;
				}

				#about .col-md-6 img {
					padding: 22px 0px 22px 22px;
				}

				#about .col-md-4 {
					padding-bottom: 32px;
				}

				#about .col-md-4 img {
					padding-top: 12px;
				}

				/*---------------------------------------
				Gallery section              
				-----------------------------------------*/
				#gallery span {
					display: block;
					padding-bottom: 32px;
				}

				#gallery .col-md-6 {
					padding-left: 0px;
					padding-right: 0px;
				}

				#gallery .gallery-thumb {
					background-color: #ffffff;
					box-shadow: 0px 1px 2px 0px rgba(90, 91, 95, 0.15);
					cursor: pointer;
					display: block;
					position: relative;
					top: 0px;
					transition: all 0.4s ease-in-out;
				}

				#gallery .gallery-thumb:hover {
					box-shadow: 0px 16px 22px 0px rgba(90, 91, 95, 0.3);
					top: -5px;
				}

				#gallery .gallery-thumb img {
					width: 100%;
				}

				#gallery .col-md-12 p {
					padding-top: 22px;
					text-align: center;
				}

				/*---------------------------------------
				Contact section              
				-----------------------------------------*/
				#contact .col-md-4 {
					padding-left: 0px;
				}

				#contact .col-md-12 {
					padding-left: 0;
				}

				#contact form {
					padding-top: 32px;
				}

				#contact .form-control {
					border: 2px solid #f0f0f0;
					box-shadow: none;
					margin-top: 10px;
					margin-bottom: 10px;
					transition: all 0.4s ease-in-out;
				}

				#contact .form-control:hover {
					border-color: #555;
				}

				#contact input {
					height: 50px;
				}

				#contact input[type="submit"] {
					background: #bfba55;
					border-radius: 100px;
					border: none;
					color: #ffffff;
					font-weight: bold;
					transition: all 0.4s ease-in-out;
				}

				#contact input[type="submit"]:hover {
					background: #333;
				}

				/*---------------------------------------
				Blog section              
				-----------------------------------------*/
				.blog-post-thumb {
					border-bottom: 1px solid #f0f0f0;
					padding-top: 32px;
					padding-bottom: 62px;
					margin-bottom: 32px;
				}

				.blog-post-thumb:last-child {
					border-bottom: 0px;
					padding-bottom: 32px;
					margin-bottom: 0px;
				}

				.blog-post-image, .blog-post-video {
					padding-top: 22px;
					padding-bottom: 22px;
					width: 100%;
				}

				#about img, .blog-post-image img {
					border-radius: 1px;
				}

				.blog-post-title a {
					color: #222;
				}

				.blog-post-title a:hover {
					color: #bfba55;
				}

				.blog-post-format {
					padding-bottom: 22px;
				}

				.blog-post-format span {
					letter-spacing: 0.5px;
					padding-right: 12px;
				}

				.blog-post-format span a {
					color: #333;
				}

				.blog-post-format span img {
					display: inline-block;
					width: 42px;
					margin-right: 4px;
				}

				.blog-post-des blockquote {
					margin: 22px;
				}

				.blog-post-des .btn {
					border-radius: 100px;
					color: #777;
					font-weight: bold;
					letter-spacing: 1px;
					padding: 14px 28px;
					margin-top: 26px;
					transition: all 0.4s ease-in-out;
				}

				.blog-post-des .btn:hover {
					background: #bfba55;
					border-color: transparent;
					color: #ffffff;
				}

				.blog-author {
					border-top: 1px solid #f0f0f0;
					border-bottom: 1px solid #f0f0f0;
					padding-top: 32px;
					padding-bottom: 32px;
					margin-top: 42px;
					margin-bottom: 42px;
				}

				.blog-author .media img {
					display: inline-block;
					width: 90px;
					margin-right: 12px;
				}

				.blog-author .media a, .blog-comment .media h3 {
					color: #444;
					font-size: 18px;
					letter-spacing: 1px;
				}

				.blog-comment {
					border-bottom: 1px solid #f0f0f0;
					padding-bottom: 32px;
					margin-bottom: 42px;
				}

				.blog-comment .media:nth-child(2) {
					padding-top: 22px;
				}

				.blog-comment .media img {
					width: 82px;
					margin-right: 12px;
				}

				.blog-comment .media h3 {
					display: inline-block;
					padding-right: 14px;
				}

				.blog-comment-form h3 {
					padding-bottom: 18px;
				}

				#about .col-md-6, #about .col-md-4, .blog-comment-form .col-md-4 {
					padding-left: 0px;
				}

				.blog-comment-form .form-control {
					box-shadow: none;
					border: 2px solid #f0f0f0;
					margin-top: 10px;
					margin-bottom: 10px;
					transition: all 0.4s ease-in-out;
				}

				.blog-comment-form .form-control:hover {
					border-color: #555;
				}

				.blog-comment-form input {
					height: 45px;
				}

				.blog-comment-form input[type="submit"] {
					background: #bfba55;
					border-radius: 100px;
					border: none;
					color: #ffffff;
					font-weight: bold;
					transition: all 0.4s ease-in-out;
				}

				.blog-comment-form input[type="submit"]:hover {
					background: #333;
					border-color: transparent;
					color: #ffffff;
				}

				/*---------------------------------------
				Blog Single Post section              
				-----------------------------------------*/
				#blog-single-post .blog-single-post-image {
					padding-top: 22px;
				}

				#blog-single-post .blog-single-post-image .col-md-4 {
					padding-left: 0px;
					padding-right: 0px;
					padding-bottom: 22px;
				}

				#blog-single-post .blog-single-post-image img {
					border-radius: 1px;
					padding-right: 12px;
				}

				#blog-single-post .blog-post-des h3 {
					padding-top: 16px;
				}

				/*---------------------------------------
				Footer section              
				-----------------------------------------*/
				footer {
					background: #000;
					color: #ffffff;
					padding: 80px 0px;
					position: relative;
				}

				footer .col-md-4 .fa {
					color: #ffffff;
					padding-right: 8px;
				}

				footer hr {
					border-color: #121212;
					margin-top: 62px;
					margin-bottom: 42px;
				}

				footer .footer-copyright {
					padding-top: 12px;
				}

				/* Back top */
				.go-top {
					background-color: #ffffff;
					box-shadow: 1px 1.732px 12px 0px rgba( 0, 0, 0, .14 ), 1px 1.732px 3px 0px rgba( 0, 0, 0, .12 );
					transition : all 1s ease;
					bottom: 2em;
					right: 2em;
					color: #333;
					font-size: 24px;
					display: none;
					position: fixed;
					text-decoration: none;
					width: 40px;
					height: 40px;
					line-height: 38px;
					text-align: center;
					border-radius: 100%;
				}

				.go-top:hover {
					background: #bfba55;
					color: #ffffff;
				}

				/*---------------------------------------
				Social icon             
				-----------------------------------------*/
				.social-icon {
					position: relative;
					padding: 0;
					margin: 0;
					text-align: center;
				}

				.social-icon li {
					display: inline-block;
					list-style: none;
				}

				.social-icon li a {
					border: 2px solid #292929;
					color: #292929;
					border-radius: 100px;
					cursor: pointer;
					font-size: 16px;
					text-decoration: none;
					transition: all 0.4s ease-in-out;
					width: 50px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					vertical-align: middle;
					position: relative;
					margin: 22px 12px 10px 12px;
				}

				.social-icon li a:hover {
					border-color: #bfba55;
					color: #bfba55;
					transform: scale(1.1);
				}

				/*---------------------------------------
				Mobile Responsive         
				-----------------------------------------*/
				@media (max-width: 980px) {
					.main-about, .main-single-post, .main-gallery, .main-contact {
						height: 35vh;
					}
				}

				@media (max-width: 768px) {
					h1 {
						font-size: 52px;
					}

					h2 {
						font-size: 26px;
					}

					#about .col-md-6 img {
						padding-left: 0px;
					}

					#blog-single-post .blog-single-post-image img {
						padding-bottom: 22px;
					}

					footer .col-md-4 {
						padding-top: 22px;
					}
				}

				@media (max-width: 650px) {
					h1 {
						font-size: 42px;
					}

					#about, #gallery, #contact, #blog, #blog-single-post {
						padding-top: 60px;
						padding-bottom: 60px;
					}
				}

			</style>
		</head>
		<body>
		<section id="home" class="main-home parallax-section">
			<div class="overlay"></div>
			<div id="particles-js"></div>
			<div class="container">
			<div class="row">
				<div class="col-md-12 col-sm-12" style="text-align: left;">
				<h2>Redbean0721 Image Service</h2>
				<p>You are accessing the Cloudflare ${colo} node of Redbean0721 Image Service in ${city} ${countryCode} (${ip})</p>
				<ol>
					<li>This page is just a static HTML file</li>
					<li>This node is stable and reliable!</li>
					<li>Does not participate in any DDOS attacks!</li>
				</ol>
				<p>Copyright © <year></year> <a href="https://www.redbean0721.com/" target="_blank">Redbean0721</a> Rights Reserved.</p>
				</div>
			</div>
			</div>
		</section>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js" crossorigin="anonymous"></script>
		<script>
			// 更新年份
			document.querySelector('year').innerHTML = new Date().getFullYear();
			
			// 粒子特效設定
			particlesJS('particles-js', {
			"particles": {
				"number": { "value": 80, "density": { "enable": true, "value_area": 800 }},
				"color": { "value": "#888" },
				"shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }},
				"opacity": { "value": 0.5, "random": false },
				"size": { "value": 5, "random": true },
				"line_linked": { "enable": true, "distance": 150, "color": "#777", "opacity": 0.4, "width": 1 },
				"move": { "enable": true, "speed": 6, "out_mode": "out" }
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
				"onhover": { "enable": true, "mode": "repulse" },
				"onclick": { "enable": true, "mode": "push" },
				"resize": true
				}
			},
			"retina_detect": true
			});
		</script>
		</body>
		</html>
	`;
	
	return new Response(html, {
		headers: { 'Content-Type': 'text/html' },
	});
}
