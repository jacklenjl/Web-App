$(function() {

    $("#ferror_mesg").hide();
    $("#lerror_mesg").hide();
    $("#phone_error_mesg").hide();
    $("#mail_error_mesg").hide();
    $("#pass_error_mesg").hide();

    var ffname=false;
    var llname=false;
    var pphone=false;
   

    $("#ifuser").focusout(function() {
        check_fname();
    });
   
    $("#iluser").focusout(function() {
        check_lname();
    });
    $("#iphno").focusout(function()
    {
        check_phone();
    }
    )
    
    

    

   

    function check_fname()
    {
        var nlen=$("#ifuser").val().length;
        if(nlen<1)
        {
            $("#ferror_mesg").html("Should be not empty");
            $("#ferror_mesg").show();
            ffname=true;
        }
        else
        {
            $("#ferror_mesg").hide();
        }
    }
    function check_lname()
    {
        var nlen=$("#iluser").val().length;
        if(nlen<1)
        {
            $("#lerror_mesg").html("Should be not empty");
            $("#lerror_mesg").show();
            llname=true;
        }
        else
        {
            $("#lerror_mesg").hide();
        }
    }

    function check_phone()
    {
        var pattern = new RegExp(/\d\d\d\d\d\d\d\d\d\d/);
        if(pattern.test($("#iphno").val())) {
			$("#phone_error_mesg").hide();
		} else {
			$("#phone_error_mesg").html("Invalid phone number 10 digits");
			$("#phone_error_mesg").show();
			pphone = true;
		}
    }



  
    $("#regForm").submit(function() {
											
	ffname=false;
    llname=false;
    pphone=false;
    
   
											
    check_fname();
    check_lname();
    check_phone();
    
    
		
        if(ffname == false && llname == false && pphone == false ) 
        {
			return true;
        } else 
        {
			return false;	
		}

	});

});