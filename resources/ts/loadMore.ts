class LoadMore {
    element = $('.js-LoadMore');
    constructor() {
        let loadMoreElements;
        this.element.each((index, item) => {
            let items = $(item);
            let loadMoreElements = new LoadMoreElements(items);
        });
    }
}

export class LoadMoreElements {
    element: any;
    items: any;
    text: any;
    btn: any;
    constructor(items) {
        this.element = items;
        this.items = this.element.find('.js-item');
        this.text =  this.element.attr('data-text');
        if (this.items.length > 6) {
            this.element.append(`
                <div class="o-section-sub o-section-end u-center">
                    <button class="c-btn c-btn--secondary c-btn--more js-btn" >
                        <span>${this.text}</span>
                    </button>
                </div>
            `)
            this.items.hide();
            this.items.slice(0, 6).show();
        }
        this.items.hide();
        this.items.slice(0, 6).show();
        this.btn = this.element.find('.js-btn');
        this.btn.on('click', this.more.bind(this));
    }

    more() {
        this.items.filter(':hidden').slice(0, 6).show();
        if (this.items.length == this.items.filter(':visible').length) {
            this.btn.hide();
        }
    }
}
let loadmore = new LoadMore();
