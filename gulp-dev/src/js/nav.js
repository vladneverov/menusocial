$(function()
{
	var btnToggle = $('.social-nav .toggle-btn');
	var btnToggleIcon = btnToggle.find('.fa');
	var mobileMenu = $('.social-nav .links');

	// Если ширина окна браузера до 462px
	$(window).resize(function() {
		if (window.matchMedia("(max-width: 462px)").matches) {
			mobileMenu.css('display', 'none');
			btnToggleIcon.removeClass('fa-times').addClass('fa-bars');
		} else {
			mobileMenu.css('display', 'flex');
			btnToggleIcon.removeClass('fa-bars').addClass('fa-times');
		}
	});

	// Mobile menu
	btnToggle.on('click', function()
	{
		mobileMenu.slideToggle({
			start: function() {
				$(this).css('display', 'flex');
			}
		});

		if (btnToggleIcon.hasClass('fa-bars'))
		{
			btnToggleIcon.removeClass('fa-bars').addClass('fa-times');
		} else {
			btnToggleIcon.removeClass('fa-times').addClass('fa-bars');
		}

	});
});