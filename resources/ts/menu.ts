class Menu {
    menu: any;
    constructor() {
        $('.c-nav-toggle').on('click', this.toggle.bind(this));
        $('main').on('click', this.destroy.bind(this));
        $(window).resize(this.destroy.bind(this));

            // $(window).resize(this.height.bind(this));
            // this.height();

    }
    toggle(event){
        event.preventDefault();
        $('body').toggleClass('is-activeNav');
    }
    destroy() {
        if ($('.is-activeNav').length) {
            $('body').removeClass('is-activeNav');
        }
    }

    height() {
        if ($(window).width() >= 600) {
            this.menu = $('.c-nav').outerHeight();
            $('body').css({"padding-top": `${this.menu}px`});
        } else if ($(window).width() <= 600) {
            $('body').css({"padding-top": `0px`});
        }
    }
}
let menu = new Menu();
