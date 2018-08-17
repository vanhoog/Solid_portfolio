class Lightbox {
    element = $('.js-lightbox');
    items: any;
  constructor() {
    this.items = this.element.find('.js-item');
    let openItems;
    this.items.each((index, item) => {
        let items = $(item);
        let openItems = new LightboxItems(items);
    });

  }
  next() {
      console.log('test');
  }
}


class LightboxItems {
    element: any;
    lightbox = $('.c-lightbox');
    src: any;
    type: any;
    img: any;
    videoElement: any;
    closeBtn: any;
    constructor(items) {
        this.element = items;
        if(!this.lightbox.length) return;
        this.element.find('.js-lightbox__inner').on('click', this.open.bind(this));
        this.src = this.element.find('.js-lightbox__inner').attr('href');
        this.type = this.element.attr('data-type');
        this.img = `<div class='c-lightbox__imgwrapper'>
                        <img class='c-lightbox__image' src='${this.src}' />
                        <button class='c-lightbox__close'>
                            <span class='u-accessibility'>Close</span>
                        </button>
                    </div>`;
        this.videoElement = `<div class='u-video c-lightbox__video'>
                                <iframe width='560' height='315' src='${this.src}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>
                                <button class='c-lightbox__close'>
                                    <span class='u-accessibility'>Close</span>
                                </button>
                            </div>`;
        $('.c-lightbox').on('click', this.close.bind(this));


    }
    open(event) {
        event.preventDefault();
        this.lightbox.addClass('u-is-visible');
        if (this.type == 'video') {
            this.lightbox.find('.c-lightbox__inner').append(this.videoElement);
        }else if (this.type == 'image') {
            this.lightbox.find('.c-lightbox__inner').append(this.img);
        }
        this.closeBtn = this.lightbox.find('button');
        this.closeBtn.on('click', this.close.bind(this));
    }

    close() {
        this.lightbox.removeClass('u-is-visible');
        $('.c-lightbox__inner').empty();
    }
}

let lightbox = new Lightbox();
