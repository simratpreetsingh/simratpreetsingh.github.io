
$(document).ready(function(){
    $('.title').html(sessionStorage.title);      // load data into title and
    $('.content').html(sessionStorage.content);  // content fields from sessionStorage 
    $('#backToEditor').hide();                   // initially the back to editor button must be hidden
    $('#edit').hide();   
    $('#instructions').hide();   
    $('#hideInstructionButton').hide();
    $('.animate').removeClass('animate');        // remove animate class which is used to display the replaced text (from api call)
    animateContent();                            // to check if title field is populated then we display content field
    animateDone();                               // to check if content field is populated then we display the done button
    $('.title').on('keyup',animateContent);      // on writting something in title field display content field
    $('.content').on('keyup',animateDone);       // on writing something in content field display the done button
})


// animateContent runs on every keyPress in title div and if title div is not empty it displays content panel

function animateContent(){
        sessionStorage.title=document.getElementsByClassName('title')[0].innerHTML; //update the sessionStorage on every keyPress (save the data)
        document.title=$('.title').text() || "Editor";  // Dynamically change the title of page 
        // if title becomes empty hide contentPanel and done button.
        // clearQueue is used to empty the jquery function queue
        if($('.title').html()=="")  
        {
            $('.content').clearQueue().animate({'marginLeft':'120%'},400,function(){$('.content').css({'display':'none'});});
            $('#done').clearQueue().animate({'marginLeft':'120%'},400,function(){$('#done').css({'display':'none'});});
        }
        else
        {
            $('.content').css({'display':'inline-block'});
            $('.content').animate({'marginLeft':'0%'},400);
            if($('.content').html()!="")
            {
                $('#done').animate({'marginLeft':'5%'},400);
            }
        }
};

// animateDone runs on every keyPress in content div and if content div is not empty it displays done button

function animateDone(){
        sessionStorage.content=document.getElementsByClassName('content')[0].innerHTML
        if($('.content').html()=="")
        {
            $('#done').clearQueue().animate({'marginLeft':'120%'},400,function(){$('#done').css({'display':'none'});});
        }
        else
        {
             $('#done').css({'display':'inline-block'});
             $('#done').animate({'marginLeft':'5%'},400);
        }
};

function instructions()
{
     $('#instructions').slideDown(200); 
     $('#instructionButton').hide();
     $('#hideInstructionButton').show();
}

function hideInstructions()
{
    $('#instructions').slideUp(200); 
    $('#instructionButton').show();
    $('#hideInstructionButton').hide();
}