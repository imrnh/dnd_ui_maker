## Process
 - Wait Wait for Svelte to update the DOM. Ensured by `await tick()`
 - Computed the original window width height.
 - Computed the size captured by the modal programmatically.
 - The size in string format. So, removed px from that and converted to integer.
 - Calculated left and top.
 - Set style to wrapper.

```
 onMount(() => {
      await tick(); 
        if ($show_modal) {
        //if we don't have this statement, getComputedStyle will get null and will return a error.
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;
        var modal_size = getComputedStyle(document.getElementById("modal"));

        var consumed_width = parseInt(modal_size.width.substring(0, modal_size.width.length - 2));
        var consumed_height = parseInt(modal_size.height.substring(0, modal_size.height.length - 2));

        wrapper.style.left = ((window_width - consumed_width) / 2).toString() + "px";
        wrapper.style.top = ((window_height - consumed_height) / 2).toString() + "px";

        console.log(consumed_width);
        console.log(consumed_height);
      }
    });
    
```


## How to show?
A query param will be used to toggle the visibility from `routes/+layout.svelte`. <br>
And svelte storage will be used to pass the children of the modal.