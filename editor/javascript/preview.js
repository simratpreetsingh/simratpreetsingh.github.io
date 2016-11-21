
// done() is called on clicking the done button, it shows the links
// setPreview() updates the data in preview divs i.e. sets the previewTitle and previewContent 

function done() {
    document.execCommand('formatBlock',false,'p');
    attachListener();
    setPreview(); // update preview data
    $('#displayText').slideDown(200,function(){$(window).scrollTop(displayText.offsetTop);}); // show the links div
    links = $('#previewContent').find('a'); // search for links and store them in links variable
    if(links.length==0) // if no links present 
    {
        $('#links').text('No Links Inserted');        
    }
    else
    {
        str="";
        
        for(i=0;i<links.length;i++)
        {
            color="#dc2c3e"; // red color
            if(i%2==0) // alternating logic
            {
                color = "#248de9"; // blue color
            }
            str = str+"<p><a href='"+links[i].innerHTML+"' style='color:"+color+"'>"+links[i].innerHTML+"</a></p>"; // formatting each link and appending it to str
        }
        $('#links').html(str); //set the html of links div so that it shows the divs
    }
};

// preview() is called on clicking the previewButton

function preview() {
    document.execCommand('formatBlock',false,'p');
    $(document).ready(function(){
        setPreview(); // update preview data
        // hide all other divs and buttons
        $('#clearEditor').hide(); 
        $('#previewButton').hide();
        $('#done').hide();
        $('#edit').hide();
        $('#replace').hide();
        
        // show backToEditor button
        $('#backToEditor').show();
        
        // hiding animation,first display text slides up then callbacks slideup on inputText which callbacks on preview to slideDown
        $('#displayText').slideUp(400,function(){$('#inputText').slideUp(400,function(){$('#preview').slideDown(600);});});
})};

function setPreview()
{
    $(document).ready(function(){
        title = $('.title').text();
        content = $('.content').html();
        while(content.includes('&lt;')==true)
        {
            content=content.replace('&lt;','<');
        }
        while(content.includes('&gt;')==true)
        {
            content=content.replace('&gt;','>');
        }
        $('#previewTitle').html(title);
        $('#previewContent').html(content);
        links = $('#previewContent').find('a');
        for(i=0;i<links.length;i++)
        {
            if(links[i].href=="")
            {
                links[i].href=links[i].innerHTML;        
            }
        }
    });
}