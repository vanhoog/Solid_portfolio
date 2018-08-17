// -----------------------------------------------------------
// DOCUMENT ON READY
// -----------------------------------------------------------
$(function () {
    $body.addClass('js');
    Nav = new Nav();
    FadeIn = new FadeIn();
    LoadMoreItems = new LoadMoreItems();
    Lightbox = new Lightbox();

});



// -----------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------
var Nav = function () {
    $('.c-nav-toggle').on('click', this.toggle.bind(this));
    $('main').on('click', this.destroy.bind(this));
    $(window).resize(this.destroy.bind(this));
}

Nav.prototype.toggle = function (e) {
    e.preventDefault();
    $('body').toggleClass('is-activeNav');
}
Nav.prototype.open = function (e) {
    e.preventDefault();
    $('body').addClass('is-activeNav');
}
Nav.prototype.destroy = function () {
    if ($('.is-activeNav').length) {
        $('body').removeClass('is-activeNav');
    }
}


// -----------------------------------------------------------
// FADEIN
// -----------------------------------------------------------

var FadeIn = function () {
    this.selector = ".js-fadein, .js-fadein-up, .js-fadein-down, .js-fadein-left, .js-fadein-right",
        this.body = $(document.body),
        this.window = $(window),
        this.resizeBound = this.resize.bind(this),
        this.scrollBound = this.scroll.bind(this),
        this.clear(),
        this.parse()
}

FadeIn.prototype.clear = function () {
    this.window.off("resize", this.resizeBound), this.window.off("scroll", this.scrollBound), this.items = [], delete this.item
    Nav.open();
}
FadeIn.prototype.parse = function (t) {
    t || (t = this.body);
    var i = t.filter(this.selector).add(t.find(this.selector));
    if (i.removeClass("show"), i.length) {
        var e;
        i.each(function (t, i) {
            i = $(i), e = i.hasClass("js-fadein-prio"), this.items.push({
                element: i,
                hold: parseInt(i.attr("data-fadein-hold") || 0),
                prio: e,
                prioSort: e ? 1 : 2,
                top: Number.MAX_VALUE
            })
        }.bind(this)), this.item || (this.window.on("resize", this.resizeBound), this.window.on("scroll", this.scrollBound)), $("img").on("load", this.resizeBound), this.resize()
    }
}

FadeIn.prototype.set = function (t, i, e) {
    var o = '[class*="js-fadein"]',
        n = t.filter(o);
    e && (n = n.add(t.find(o))), n.toggleClass("show", i)
}

FadeIn.prototype.reverse = function (t, i) {
    var e = t.filter(this.selector).add(t.find(this.selector));
    e.addClass("fadeout"), $.isFunction(i) && setTimeout(function () {
        i()
    }, 800)
}

FadeIn.prototype.resize = function (t) {
    clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function () {
        this.windowHeight = this.window.height(), this.documentHeight = $body.outerHeight() - .3 * this.windowHeight;
        var t, i;
        for (t = 0; t < this.items.length; t++) i = this.items[t], i.top = i.element.offset().top;
        this.items.sortOn("prioSort", "top"), this.item = this.items[0], this.scroll()
    }.bind(this), t ? 100 : 0)
}

FadeIn.prototype.scroll = function (t) {
    if (t || (clearTimeout(this.timeout), delete this.timeout), this.item && !this.timeout) {
        var i = this.window.scrollTop(),
            e = i + this.windowHeight * (t ? .8 : 1);
        if (WIDESCREEN || this.item.top <= e || i + this.windowHeight >= this.documentHeight) {
            this.item.element.addClass("show"), this.items.shift();
            var o = this.items[0];
            if (o) {
                var n = this.item.top < i || this.item.top == o.top ? 0 : 200 + this.item.hold;
                this.item = o, this.timeout = setTimeout(this.scrollBound, n)
            } else this.clear()
        }
    }
}


// -----------------------------------------------------------
// LOAD MORE PARSE
// -----------------------------------------------------------

var LoadMoreItems = function() {
    this.element =  $('.js-LoadMore');
    if (!this.element.length) return
    this.parse();
}

LoadMoreItems.prototype.parse = function(){
    var MoreItems;
    this.element.each(function(index, item) {
		item = $(item);
        MoreItems = new LoadMore(item);
	}.bind(this));
}

// -----------------------------------------------------------
// LOAD MORE
// -----------------------------------------------------------

var LoadMore = function(element) {
	this.element = element;
    this.items =  this.element.find('li');

    this.text =  this.element.attr('data-text');
    if (this.items.length > 8) {
        this.element.append('<div class="o-section-sub o-section-end u-center"><button class="c-btn c-btn--reverse c-btn--reverse-secondary js-btn">'+ this.text + '</button></div>')
        this.items.hide();
        this.items.slice(0, 8).show();
    }
    this.trigger = this.element.find('.js-btn');
    this.trigger.on('click', this.more.bind(this));
};

LoadMore.prototype.more = function() {
    this.items.filter(':hidden').slice(0, 4).show();
    if (this.items.length == this.items.filter(':visible').length) {
        this.trigger.hide();
    }
};


// -----------------------------------------------------------
// LIGHTBOX
// -----------------------------------------------------------

var Lightbox = function() {
    this.element =  $('.js-lightbox');
    if (!this.element.length) return
    this.parse();
}

Lightbox.prototype.parse = function(){
    var items;
    this.element.each(function(index, item) {
		item = $(item);
        items = new LightboxItem(item);

	}.bind(this));
}

var LightboxItem = function(element){
    this.element = element;
    this.lightbox = $('.c-lightbox');
    if(!this.lightbox.length) return;
    this.element.find('.js-lightbox__inner').on('click', this.open.bind(this))
    this.src = this.element.find('.js-lightbox__inner').attr('href');
    this.type = this.element.attr('data-type');
    this.img = "<div class='c-lightbox__imgwrapper'><img class='c-lightbox__image' src='"+ this.src +"' /> <button class='c-lightbox__close'><span class='u-accessibility'>Close</span></button></div>";
    this.videoElement = "<div class='u-video c-lightbox__video'><iframe width='560' height='315' src='"+ this.src +"' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe><button class='c-lightbox__close'><span class='u-accessibility'>Close</span></button></div>";

}

LightboxItem.prototype.open = function(e) {
    e.preventDefault();
    this.lightbox.addClass('u-is-visible');
    if (this.type == 'video') {
        this.lightbox.find('.c-lightbox__inner').append(this.videoElement);
    }else if (this.type == 'image') {
        this.lightbox.find('.c-lightbox__inner').append(this.img);
    }
    this.closeBtn = this.lightbox.find('button');
    this.closeBtn.on('click', this.close.bind(this));
}


LightboxItem.prototype.close = function() {
    this.lightbox.removeClass('u-is-visible');
    $('.c-lightbox__inner').empty();
}
