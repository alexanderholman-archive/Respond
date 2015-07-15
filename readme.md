#Respond (jQuery Plugin)
written to fire events when the browser hits given sizes (the bootstrap breakpoints by default)

##Getting started
**This plugin requires jQuery to function**
*jQuery can be downloaded or called from [here](https://code.jquery.com/jquery-1.11.3.min.j)*

In the head of your document add the following lines:
```
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.j"></script>
<script type="text/javascript" src="./path/to/plugin/respond.min.js"></script>
<script type="text/javascript">
    var onFunctions = {
        on: {
            is: {
                xs: function(){console.log('is xs')},
                sm: function(){console.log('is sm')},
                md: function(){console.log('is md')},
                lg: function(){console.log('is lg')}
            },
            was: {
                xs: function(){console.log('was xs')},
                sm: function(){console.log('was sm')},
                md: function(){console.log('was md')},
                lg: function(){console.log('was lg')}
            }
        }
    };
    $(document).ready(
        function() {
            $.respond({functions:onFunctions});
        }
    );
</script>
```
The above will output the "is" size and "was" size to the console when each size is hit and on first run.