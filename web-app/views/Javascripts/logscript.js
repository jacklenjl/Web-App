$(function() {

    $("#mail_error_mesg").hide();
    $("#pass_error_mesg").hide();
    var eemail=false;
    var ppass=false;

    $("#imail").focusout(function()
    {
        check_mail();
    }
    )
    $("#ipass").focusout(function()
    {
        check_password();
    }
    )
    function check_mail() {

		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	
		if(pattern.test($("#imail").val())) {
            $("#mail_error_mesg").hide();
		} else {
			$("#mail_error_mesg").html("Invalid email address");
			$("#mail_error_mesg").show();
			eemail = true;
		}
	
    }
    
    
    function check_password()
    {
        var pass=$("#ipass").val().length;
        if(pass <8)
        {
            $("#pass_error_mesg").html("password must be 8 charcters");
			$("#pass_error_mesg").show();
			ppass = true;
        }
        else
        {
            $("#pass_error_mesg").hide();
        }
    }


    $("#logf").submit(function() {
											
        
        eemail=false;
        ppass=false;
        
                                                
       
        check_mail();
        check_password();
        
            
            if( eemail == false && ppass==false) 
            {
                return true;
            } else 
            {
                return false;	
            }
    
        });

});