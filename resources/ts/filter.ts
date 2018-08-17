class Filter {
    element = $('.js-filter');
    btn = $('.js-filterBtn')
    constructor() {
        this.btn.on('click', () => {
            this.btn.removeClass('active');
        });
        this.btn.each((index, item) => {
            let items = $(item);
            let filterBtn = new FilterBtn(items);
        });
    }

}

class FilterBtn {
    element: any;
    filterable = $('.js-filter').find("[data-day]");
    active = $('.js-filterList');
    constructor(items) {
        this.element = items;
        this.element.on('click', this.hideItems.bind(this));
    }
    hideItems(event) {
        event.preventDefault();
        let day = this.element.attr('data-filter');
        if (day !== "all") {
            this.filterable.show().not("[data-day='" + day + "']").hide();
            this.active.find("[data-filter='"+ day +"']").addClass('active');            
        }else if (this.element.hasClass('active')){
            alert('test');

        } else {
            this.filterable.show();
            this.element.addClass('active')
        }
    }
}

let filter = new Filter();
