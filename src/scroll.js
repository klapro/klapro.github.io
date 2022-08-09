Element.prototype.scrollIntoViewPromise = function(options){
  /* eslint-disable no-this-alias */
    this.scrollIntoView(options);
    let parent = this;
    return { 
      then: function(x){
        const intersectionObserver = new IntersectionObserver((entries) => {
          let [entry] = entries;
          if (entry.isIntersecting) {
            setTimeout(() => x(), 100)
          }
        });
        intersectionObserver.observe(parent);
      }
    };
    /* eslint-disable no-this-alias */
  }
  