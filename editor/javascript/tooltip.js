inputText=document.getElementById('inputText');

tooltip = document.getElementById('tooltip');

// adding listeners to show the tooltip when some text is selected
inputText.addEventListener('mousemove',checkToolTip);
inputText.addEventListener('keyup',checkToolTip);

inputText.addEventListener('keypress', function(ev){
    if(ev.keyCode == '13')
    {
        if(ev.target.className=='title')  // block enter key in title div and shift the focus to content div 
        {
            ev.preventDefault();
            $('.content').focus();
            
        }
        else
        {
            document.execCommand('formatBlock', false, 'p'); // each enter creates a paragraph
            addHoverProperty();
        }
    }
});

inputText.addEventListener('paste',function(ev){ // to avoid creating spans on pasting
        ev.preventDefault();
        text = ev.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
})

addHoverProperty();

function addHoverProperty()
{
    $(document).ready(function(){
        $('p').on('mouseover',function(){
                    this.style="background:#f2e0d3";
                })
        $('p').on('mouseout',function(){
                    this.style="background:white";
                })
    });
}

function updateParagraphPositions()  // position of paragraphs in array of objects
{
    paragraphPositions=[{}]
    paragraphs = document.getElementsByTagName('p');
    for(i=0;i<paragraphs.length;i++)
    {
        paraTop = paragraphs[i].offsetTop;
        paraHeight = paragraphs[i].offsetHeight;
        paraObj={'top':paraTop,'height':paraHeight,'para':paragraphs[i]};
        paragraphPositions.push(paraObj);
        
    }
}

function attachListener()           // once done is pressed we call attachListener() which makes the tile and content divs uneditable and     
{                                   // paragraphs draggable
    inputText.setAttribute("onselectstart","return false");
    updateParagraphPositions();
    $(document).ready(function(){
        $('.title').attr('contenteditable','false');
        $('.content').attr('contenteditable','false');
        $('#done').hide();
        $('#edit').show();
        drag=-1;
        source=null;
        flag=-1;
        $('p').on('mousedown',function(){
            drag=1;
        })
        $(document).on('mouseup',function(){  
            x=null;
            source=null;
            flag=-1;
            drag=-1;
        })
        $('p').on('mousemove',function(ev){
            if(drag==1) 
            {
                if(source==null||flag==1)
                {
                    source=ev.target;
                    flag=-1;
                }
                for(i=1;i<paragraphPositions.length-1;i++) // loop over every paragraph to find if it overlaps
                {
                    if(ev.pageY>=paragraphPositions[i].top&&ev.pageY<=paragraphPositions[i].top+paragraphPositions[i].height)
                    {
                        target=paragraphPositions[i].para;
                        str=source.innerHTML;
                        source.innerHTML=target.innerHTML;
                        target.innerHTML=str;
                        source=target;
                        flag=-1;
                        updateParagraphPositions();
                    }
                }
            }
    })
    });
}


// apply is a generic function to which arguments are passed based on the operation to be performed viz. Bold,underline,italics or Text Color  

function apply(action,argument) {
    document.execCommand(action,false,argument);
}

/* checkToolTip runs every time mouse moves or a key presses in the inputText div, it checks if some 
   text is selected and if it results to true it displays and positions the tooltip */

function checkToolTip() {
    selectedText = window.getSelection().toString(); // get selected text
    // on applying some style like bold,underline we have to update our sessionStorage else the styles will not apply to them
    sessionStorage.title=document.getElementsByClassName('title')[0].innerHTML;  
    sessionStorage.content=document.getElementsByClassName('content')[0].innerHTML;
    if(selectedText != "")  // if some text is selected
    {
        
        // show tool tip to appropriate location
        tooltip.style="display:inline-block;"
        textPosition=window.getSelection().getRangeAt(0).getBoundingClientRect(); 
        posX = (textPosition.left+textPosition.right-tooltip.offsetWidth)/2;
        posY = (textPosition.top-60);
        tooltip.style="display:inline-block;top:"+posY+"px;left:"+posX+"px";
    }
    else
    {
        tooltip.style="display:none;"; // hide tooltip if no text is selected
    }
}


