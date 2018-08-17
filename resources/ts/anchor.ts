class Anchors {
    items = [];
    public hash: any;
    nav = $('nav');
    constructor() {
        this.parse();
        $(window).on('hashchange', this.hashchange.bind(this));

    }

    public parse = () => {
        $('.js-anchor').each((index, item) => {
            let anchor;
            let anchorItem = $(item);
            if (!anchorItem.data('anchor')) {
                let anchor = new Anchor(anchorItem);
                anchorItem.data('anchor', anchor);
                this.items.push(anchor);
            }
        })
        this.hashchange(event);
    }

    public hashchange = (event) => {
        const hash = window.location.hash.replace('#', '');
        this.hash = hash;
        if (this.hash != hash || !event) {
            if (hash) {
                for (let i = 0; i < this.items.length; i++) {
                    let item = this.items[i];
                    if (item.id == hash) {
                        $(item.element.addClass('is-active'));
                        $('body, html').stop(true).animate({'scrollTop' : item.target.offset().top - this.nav.outerHeight()});
                    } else {
                        $(item.element.removeClass('is-active'));
                    }
                }
            }
        }
    }
}



class Anchor extends Anchors {
    element: any;
    id: any;
    target: any;
    constructor(element) {
        super();
        this.element = element;
        if(!this.element.length) return;
        this.element.on('click', this.click.bind(this));

        this.id = this.element.attr('href').split('#').pop();

        this.target = $('#' + this.id);
        this.target.attr('id', 'js-' + this.id);
    }

    public click = (event) => {
        if(this.id == window.location.hash.replace('#', '')) {
            console.log(Anchors)

        }
    }
}
let anchors = new Anchors();
