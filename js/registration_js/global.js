
isProfessorSelected= false;

function displayOptions(){

    var selectBox = $("#usertypes")[0];
    var selected = selectBox.options[selectBox.selectedIndex].value;
    
    var student_program = document.getElementById("study_program");
    var student_input = document.getElementById("study_programs");
   
    var subjects_taught = document.getElementById("professor_form");
    var subject_input =document.getElementById("subject-input");
    
    var office_hours =document.getElementById("office_hours_block");
    var office =document.getElementById("office_block");
    
    
    if( selected === "student"){
     
        student_program.style.display="block";
        student_input.removeAttribute("disabled");

        subjects_taught.style.display="none";
        subject_input.disabled="enabled";

        office.style.display="none";
        office_hours.style.display="none";

        isProfessorSelected=false;
        
        loadPrograms();
    }else{
        
       subjects_taught.style.display="block";
       student_program.style.display="none";
       student_input.disabled="enabled";
       subject_input.removeAttribute("disabled");
       loadSubjects();
        isProfessorSelected= true;
       office.style.display="flex";
       office_hours.style.display="flex";

   }

    //console.log(document.getElementById("email"));
    uniqueMail(document.getElementById("email"));

}

var i = 0;

function addSubjectBlock(obj){
  
    var block = document.getElementById("professor_form"); 
    var originalAppendableBlock = obj.parentNode.parentNode;
    var clnAppendableBlock = originalAppendableBlock.cloneNode(true);
    var input = findId("subject-input",clnAppendableBlock); 
    input[0].name="subject-input["+i+"]";
    input[0].value="";
   
    block.appendChild(clnAppendableBlock);
    
    var inClass=findId("deleteBtn",clnAppendableBlock);
   
    var deleteBtn=inClass[0];
    deleteBtn.style.display="block";
    i++;
   
}

function deleteSubjectBlock(obj){
   // console.log("starting function");
    var block = document.getElementById("professor_form");
    var originalAppendableBlock = obj.parentNode.parentNode;
    block.removeChild(originalAppendableBlock);
    
}


function matchesPassword(obj){

        var firstPsswd= document.getElementById("password");
        var psswdCheck= obj;
        var matching_feedback= document.getElementById("matching-feedback");
    
       
        if(obj.value !== ""){

            matching_feedback.style.display="flex";
           // console.log("input");
            if(firstPsswd.value === psswdCheck.value){
            
                matching_feedback.setAttribute("class","valid-feedback");
                matching_feedback.innerText='Matching ✔';
                return true;
        
            }else{

                matching_feedback.setAttribute("class","invalid-feedback");
                matching_feedback.innerText='Not Matching ✘';
                return false;
            
            }
           
        }else{
            matching_feedback.style.display="none";
          //  console.log("no input");
            return false;
            
        }
          
}


function validPswd(obj){

    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var message = "Password must be at least 6 charachters long, contain an uppercase letter (A-Z), a lowercase letter (a-z) and a digit (1-9).";
    var pswd=obj.value;
  
    var pswdFeedback=document.getElementById("pswd-feedback");
    if (obj.value !== ""){
       return validityCheck(regex,message,pswd,pswdFeedback);
    }else{
        pswdFeedback.style.display="none";
        return false;
    }
  
    
}


function validityCheck(regex, message, valueToTest,messageDiv){

    if(valueToTest.match(regex)){
        messageDiv.setAttribute("class","valid-feedback");
        messageDiv.innerText="Valid ✔";
        messageDiv.style.display="flex";
        return true;
    }else{
        messageDiv.setAttribute("class","invalid-feedback");
        messageDiv.innerText=message;
        messageDiv.style.display="flex";
        return false;

    }


}

function phoneCheck(obj){

    var regex = /^\d{4}\s?\d{6}$/;
    var message = "Phone number must be 10 digits long";
 
    var number=obj.value;
    var phoneFeedback=document.getElementById("phone-feedback");
    if (obj.value !== ""){
        validityCheck(regex,message,number,phoneFeedback);
    }else{
        phoneFeedback.style.display="none";
    }

}

function prefixCheck(obj){

    var regex = /^(\+)?(?:[0-9]?){1,4}$/;

    var message = "+ or 00 (prefix)";
 
    var number=obj.value;
    var prefixFeedback=document.getElementById("prefix-feedback");
    if (obj.value !== ""){

        validityCheck(regex,message,number,prefixFeedback);
    }
    else{
        prefixFeedback.style.display="none";
    }

}

function loadPrograms() {
    var programList = document.getElementById("programs");
     $.post(
         {
            url:  "php/registration_php/loadPrograms.php",
            success: function(response){
                var result = JSON.parse(response);
                for(var i = 0 ; i < result.length; i++){
                    var option= document.createElement("option");
                    var line = result[i];
                    option.value= line["name"];
                    programList.appendChild(option);
                    
                }
            }
        }
     );
 
}

function loadSubjects() {
    $.post(
        {
           url:  "php/registration_php/loadSubjects.php",
           success: function(response){
            var displayedSubjects = JSON.parse(response);
            for(var i = 0 ; i < displayedSubjects.length; i++){
                            var lines = displayedSubjects[i];
                            var option= document.createElement("option");
                            option.value=lines["name"];
                            $("#subjects").append(option);
                       //     console.log(option);
                         
                        }
            }
        } 
    );

}

function findId(id,obj){
    var inClass = [];
    
    
    function findClass(element){
        
            if(element.id === id){
            inClass.push(element);
        }
    }
    
    function testNodes(node,test){
        test(node);
        node = node.firstChild;
        while(node){
            testNodes(node,test);
            node=node.nextSibling;
        }
    }
    
    testNodes(obj,findClass);
    return inClass;
}


function showPswd() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 

   function uniqueMail(obj){
       $.ajax({
           url: "php/registration_php/getMail.php?mail="+obj.value,
           success: function(response){
                var email_alert = document.getElementById("mail-feedback");

             //   console.log(response);
    
                if(obj.value === ""){
                    email_alert.style.display="none";
                
                }else if (!obj.value.match(/^(.+)@(.+)$/)){
                   // console.log("invalid mail");
                    email_alert.className = "invalid-feedback";
                    email_alert.innerText ='Invalid mail';
                    
                    email_alert.style.display="flex";
    
                }else{
    
                    if (Number(response) != 0 && !isProfessorSelected){
                        
                            // console.log("invalid");
                            email_alert.className = "invalid-feedback";
                            email_alert.innerText ='The mail inserted belongs to a registered user';
                    
                    }else{
                        email_alert.className = "valid-feedback";
                        email_alert.innerText ="Valid ✔";
                        // console.log("valid");
    
                    }
    
                    email_alert.style.display="flex";
                }
           }
       });

  }

