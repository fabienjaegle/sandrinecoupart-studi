import $ from 'jquery';


	/*--
		Header Sticky
    -----------------------------------*/
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll <= 100) {
            $(".header-main").removeClass("sticky");
        } else{
            $(".header-main").addClass("sticky");
        }
	});


    /*--
		Menu Script
	-----------------------------------*/

    function menuScript() {

        $('.menu-toggle').on('click', function(){
            $('.mobile-menu').addClass('open')
            $('.overlay').addClass('open')
        });
        
        $('.menu-close').on('click', function(){
            $('.mobile-menu').removeClass('open')
            $('.overlay').removeClass('open')
        });
        
        $('.overlay').on('click', function(){
            $('.mobile-menu').removeClass('open')
            $('.overlay').removeClass('open')
        });
        
        /*Variables*/
        var $offCanvasNav = $('.mobile-menu-items'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<span class="mobile-menu-expand"></span>');

        /*Close Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.slideUp();

        /*Category Sub Menu Toggle*/
        $offCanvasNav.on('click', 'li a, li .mobile-menu-expand, li .menu-title', function(e) {
            var $this = $(this);
            if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('mobile-menu-expand'))) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active-expand');
                    $this.siblings('ul').slideUp();
                } else {
                    $this.parent('li').addClass('active-expand');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.closest('li').siblings('li').removeClass('active-expand');
                    $this.siblings('ul').slideDown();
                }
            }
        });

        $( ".sub-menu" ).parent( "li" ).addClass( "menu-item-has-children" );
    }
    menuScript();


    /*--
		Rating Script
	-----------------------------------*/

	$("#rating li").on('mouseover', function(){
        console.log('mouseover');
		var onStar = parseInt($(this).data('value'), 10);
		var siblings = $(this).parent().children('li.star');
		Array.from(siblings, function(item){
			var value = item.dataset.value;
			var child = item.firstChild;
			if(value <= onStar){
				child.classList.add('hover')
			} else {
				child.classList.remove('hover')
			}
		})
	})

	$("#rating").on('mouseleave', function(){
        console.log('mouseleave');
		var child = $(this).find('li.star i');
		Array.from(child, function(item){
			item.classList.remove('hover');
		})
	})

	
	$('#rating li').on('click', function(e) {
        console.log('mouseclick');
		var onStar = parseInt($(this).data('value'), 10);
		var siblings = $(this).parent().children('li.star');
		Array.from(siblings, function(item){
			var value = item.dataset.value;
			var child = item.firstChild;
			if(value <= onStar){
				child.classList.remove('hover', 'hover');
				child.classList.add('star')
			} else {
				child.classList.remove('star');
				child.classList.add('hover')
			}
		})
	}) 


	/*--
		Back to top Script
	-----------------------------------*/
    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });

    //Animate the scroll to top
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });