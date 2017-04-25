
/****************************************************************/
/*                                                              */
/*  This class acts as a reusable Bootstrap modal generator.    */
/*  It can be used to automatically create a Bootstrap-themed   */
/*  modal through a friendly interface. Parameters can be       */
/*  passed into the .show() function as an object.              */
/*                                                              */
/****************************************************************/

var BootModal =
{
    // Object holding the default settings:
    defaults: {
        animate:  true,
        buttons:  [  ],
        content:  '',
        modal:    false,
        title:    ''
    },
    
    // The HTML template:
    tpl: '<div class="modal fade" tabindex="-1" role="dialog">\
              <div class="modal-dialog" role="document">\
                  <div class="modal-content">\
                      <div class="modal-header">\
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                          <h4 class="modal-title"></h4>\
                      </div>\
                      <div class="modal-body"></div>\
                      <div class="modal-footer"></div>\
                  </div>\
              </div>\
          </div>',
    
    // Var to hold current instance:
    $modal: null,
    
    init: function()
    {
        this.$modal = $( this.tpl );
        this.$modal.appendTo( 'body' );
    },
    
    // Show the modal:
    show: function( settings )
    {
        var _self = this;
        
        // Hide any current instance:
        $('.modal.in').modal('hide');
        
        var options = $.extend(this.defaults, settings);
        
        // Set out options:
        this.setModal( options.modal );
        this.$modal.find('.modal-footer').empty();
        
        // Add the buttons:
        if( options.buttons.length )
        {   
            $.each(options.buttons, function() { _self.addButton(this); });
        }
        
        if( options.title == '' )
        {
            this.hideHeader();
        }
        else
        {
            this.setTitle( options.title );
        }
        
        if( options.modal && !options.buttons.length )
        {
            this.hideFooter();
        }
        
        if( !options.animate )
        {
            this.$modal.removeClass('fade');
        }
        else
        {
            this.$modal.addClass('fade');
        }
        
        // Set the content:
        this.setContent( options.content );
        this.$modal.modal('show');
    },
    
    // Hide the footer in the modal:
    hideFooter: function()
    {
        if ( this.$modal != null )
        {
            this.$modal.find('.modal-footer').hide();
        }
    },
    
    // Show the footer in the modal:
    showFooter: function()
    {
        if ( this.$modal != null )
        {
            this.$modal.find('.modal-footer').show();
        }
    },
    
    // Hide the header in the modal:
    hideHeader: function()
    {
        if ( this.$modal != null )
        {
            this.$modal.find('.modal-header').hide();
        }
    },
    
    // Show the header in the modal:
    showHeader: function()
    {
        if ( this.$modal != null )
        {
            this.$modal.find('.modal-header').show();
        }
    },
    
    // Set the modal's title:
    setTitle: function( title )
    {
        if( this.$modal != null )
        {
            this.$modal.find('.modal-title').html( title );
        }
    },
    
    // Set the content:
    setContent: function( content )
    {
        if( this.$modal != null )
        {
            this.$modal.find('.modal-body').html( content );
        }
    },
    
    // Change the modality:
    setModal: function( modal )
    {
        if( this.$modal )
        {
            if( !modal )
            {
                this.$modal.find('[data-dismiss="modal"]').show();
                this.$modal.modal({ backdrop: true, keyboard: true });
            }
            else
            {
                this.$modal.find('[data-dismiss="modal"]').hide();
                this.$modal.modal({ backdrop: 'static', keyboard: false });
            }
        }
    },
    
    // Remove animation:
    removeAnimation: function()
    {
        if( this.$modal != null )
        {
            this.$modal.removeClass('fade');
        }
    },
    
    addAnimation: function()
    {
        if( this.$modal != null )
        {
            this.$modal.addClass('fade');
        }
    },
    
    addButton: function( btn )
    {
        var _self = this;
        
        if( this.$modal != null )
        {
            var $footer = this.$modal.find('.modal-footer'),
            
                options = $.extend({
                              className: 'btn btn-default',
                              click:     function() {  },
                              dismiss:   true,
                              label:     'Button',
                              element:   'a',
                              title:     ''
                          }, btn);
                
            var $btn = $('<'+options.element+' href="#" class="'+options.className+'" title="'+options.title+'">'+options.label+'</'+options.element+'>');
            
            $btn.appendTo( $footer );
            $btn.data('opts', options);
            $btn.on('click', function( e ) {
                
                e.preventDefault();
                
                if( $(this).data('opts').dismiss )
                {
                    _self.hide();
                }
                
                $(this).data('opts').click.call( this );
            });
            
        }
    },
    
    // Hide the modal:
    hide: function()
    {
        this.$modal.modal('hide');
    }
}

$(function() { BootModal.init(); });
