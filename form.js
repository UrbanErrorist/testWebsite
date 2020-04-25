



var $form = $("form"),
  $successMsg = $(".alert");

$.validator.addMethod("letters", function(value, element) {
  return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
});
$form.validate({
	
  rules: {
    name: {
      required: true,
      minlength: 3,
      letters: true
    },
    email: {
      required: true,
      email: true
    },
	  massage: {
      required: true,
	  minlength: 50,
    }
  },
	
  messages: {
    name: "Please specify your name (only letters and spaces are allowed)",
    email: "Please specify a valid email address",
	   massage: {
		   required: "Please provide a password",
        minlength: "Your password must be at least 50 characters long"
	   }
  },
  submitHandler: function() {
    $successMsg.show();
	  
	  
  }
});





$(function()
{
    function after_form_submitted(data) 
    {
		
		
        if(data.result == 'success')
        {
            
			
			
			
		
            $('#success_message').show();
            $('#error_message').hide();
			$('button[type="button"]', $form).each(function()
												   
            {
				
				
				$(this).addClass("submitsuccces");
			
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
					$(this).append('<span class="r r1"></span><span class="r r2"></span><span class="r r3"></span><span class="r r4"></span>');
					
					$(".circlesent").css("display","block");
					TweenMax.to($(".circlesent"), 0.5, {opacity:1, ease:Quart.easeInOut, onComplete: opacitymake});
					function opacitymake(){
					
					TweenMax.to($(".circleccover"), 0.5, {width:200,  height:200,ease:Quart.easeInOut, onComplete: successanim});
					}
					function successanim(){
						TweenMax.to($(".pathtick"), 0.5, {strokeDashoffset:0, ease:Quart.easeInOut, onComplete: tick});
					}
					function tick(){
						$("input").val("");
						$("textarea").val("");
						grecaptcha.reset();
						TweenMax.to($(".message-sent"), 0.5, {opacity:1, ease:Quart.easeInOut});
						setTimeout(function(){  
							
						TweenMax.to($(".circlesent"), 0.5, {opacity:0, ease:Quart.easeInOut, onComplete: none});
							TweenMax.to($(".message-sent"), 0.5, {opacity:0, ease:Quart.easeInOut});
							}, 1000);
					}
					function none(){
						
						$(".circlesent").css("display","none");
						
					}
					
                }
            });
			
        }
        else
        {
			
			$('#error_message ul').remove();
			
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
				
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
			 $('#error_message').show();
            

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
												   
            {
				
				debugger;
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
					$(this).append('<span class="r r1"></span><span class="r r2"></span><span class="r r3"></span><span class="r r4"></span>')
                }
            });
            
        }//else
    }

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();
	
 $('.alert').remove();
        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: 'handler.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });	
});
var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);
             
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}