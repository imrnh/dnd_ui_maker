<script>
    import Cmp from "./cmp.svelte";
    let val = [];

    function cbc(e, _val, idx){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        console.log("Main callback called");
        val = _val;
        console.log("curr var",val)
        console.log("Val found: ", _val);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    }

 
</script>
<div>
    <button on:click={cbc}>Master view</button>
    <Cmp callback = {cbc} index={0} />
</div>