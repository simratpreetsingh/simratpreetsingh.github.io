
words=null;
paragraphs=null;
paragraphslength=0;
replaceWords=[];
wordCount=0;

function replace(callback,wordSize)
{
    $.ajax({
            type: "GET",
            url: "http://randomword.setgetgo.com/get.php",
            dataType: "jsonp",
            jsonpCallback: 'RandomWordComplete',
            success: function(result){return callback(result.Word,wordSize)},
            error: function(result){return callback(result.Word,wordSize)}
        });
}

function callback(x,wordSize)
{
    if(wordSize<=0)
    {
        updateContent();
        $('#loading').animate({'margin-top':'100%'},function(){$('#loading').css({'margin-top':'-100%'});$('#inputText').css({'opacity':'1.0'});$('nav').css({'opacity':'1.0'});$('.btn').css({'opacity':'1.0'});})
        return;
    }
    replaceWords.push(x);
    replace(callback,wordSize-1);
}

function convert() //called on pressing replace button
{
    document.execCommand('formatBlock',false,'p');

    // set up animation for loader 
    $('.animate').removeClass('animate');
    $('#inputText').css({'opacity':'0.2'});
    $('.btn').css({'opacity':'0.2'});
    $('nav').css({'opacity':'0.2'});
    $('#loading').animate({'margin-top':'20%'})
    $('#loading').animate({'margin-top':'-20%'})
    $('#loading').animate({'margin-top':'10%'})
    $('#loading').animate({'margin-top':'-10%'})
    $('#loading').animate({'margin-top':'0%'})
    
    // initialise variables
    words=null;
    paragraphs=null;
    paragraphslength=0;
    replaceWords=[];
    wordCount=0;
    paragraphs=$('p');
    paragraphslength=paragraphs.length;
    
    // add space to tags for ex <b>Editor</b> --becomes----> <b> Editor </b> so that we can break on spaces to detect words of length 4 
    addSpacesOnTags();
    
    // move over each para and each word to find the count of words with length equal to 4
    for(i=0;i<paragraphslength;i++)
    {
        words=paragraphs[i].innerHTML.split(" ");
        for(j=0;j<words.length;j++)
        {
            if(words[j].length==4&&words[j]!='</u>'&&words[j]!='<br>'&&words[j]!='</b>'&&words[j]!='</i>')
            {
                wordCount+=1;  
            }
        }
    }
    
    // call replace and provide it a callback
    replace(callback,wordCount);
}

function addSpacesOnTags()
{
    for(i=0;i<paragraphs.length;i++)
    {
         str=paragraphs[i].innerHTML;
         str=str.replace(new RegExp('<', 'g'), ' <');
         str=str.replace(new RegExp('>', 'g'), '> ');
         str=str.replace(new RegExp('&nbsp;', 'g'), ' &nbsp; ');
         paragraphs[i].innerHTML=str;
    }
}

function removeSpaceOnTags()
{
    for(i=0;i<paragraphs.length;i++)
    {
         str=paragraphs[i].innerHTML;
         str=str.replace(new RegExp(' <', 'g'), '<');
         str=str.replace(new RegExp('> ', 'g'), '>');
         str=str.replace(new RegExp(' &nbsp; ', 'g'), '');
         paragraphs[i].innerHTML=str;
    }
}

function updateContent()
{
    k=0;
    for(i=0;i<paragraphs.length;i++)
    {
        str=""
        words=paragraphs[i].innerHTML.split(" ");
        for(j=0;j<words.length;j++)
        {
            if(words[j].length==4&&words[j]!='</u>'&&words[j]!='<br>'&&words[j]!='</b>'&&words[j]!='</i>')
            {
                str+=" <span class='animate'> &nbsp "+replaceWords[k]+" &nbsp </span> ";
                k++;
            }
            else
            {
                str+=" "+words[j];   
            }
        }
        paragraphs[i].innerHTML=str;
    }
    removeSpaceOnTags();
}