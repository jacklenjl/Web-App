$(function() {

    $("#ferror_mesg").hide();
    $("#lerror_mesg").hide();
    $("#phone_error_mesg").hide();
    $("#mail_error_mesg").hide();
    $("#pass_error_mesg").hide();

    var ffname=false;
    var llname=false;
    var pphone=false;
    var eemail=false;
    var ppass=false;
    var rpass=false;

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
    $("#icpass").focusout(function()
    {
        check_repassword();
    })

    

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

    function check_fname()
    {
        //var pattern = new RegExp(/^(?!\s*$).+/);
        var pattern= $("#ifuser").val().length;
        if($('#ifuser').val().indexOf(' ')>=0)
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
        var pattern = new RegExp(/[^-\s]/);
        
        if($('#iluser').val().indexOf(' ')>=0)
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

    function check_repassword()
    {
        var pass=$("#ipass").val().length;
        var repass=$("#icpass").val().length;
        if(pass == repass)
        $("#cpass_error_mesg").hide();
        else
        {
            $("#cpass_error_mesg").html("password did not match");
			$("#cpass_error_mesg").show();
			rpass = true;
        } 
    }
  
    $("#regForm").submit(function() {
											
	ffname=false;
    llname=false;
    pphone=false;
    eemail=false;
    ppass=false;
    rpass=false;
											
    check_fname();
    check_lname();
    check_phone();
    check_mail();
    check_password();
    check_repassword();
		
        if(ffname == false && llname == false && pphone == false && eemail == false && ppass==false && rpass==false) 
        {
			return true;
        } else 
        {
			return false;	
		}

	});

});