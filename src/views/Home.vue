<template>
  <div class="container mt-4">
    <b-card bg-variant="light">
    <img style="height: 100px" src="@/assets/skynet-logo.svg"/>
    <h1 class="display-3 mt-3">Skynet Substrate Demo</h1>
    <p>An off chain worker that averages the height using Skynet</p>
    <div class="my-2">
        <!-- #region Form -->
        <div v-if="!result">
            <b-input-group prepend="Skylink: " class="mt-3">
                <b-form-input v-model="skylink"></b-form-input>
                <b-input-group-append>
                <b-button variant="outline-primary" @click="download">Get Average</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
        <!-- #endregion -->
        <!-- #region Result Display -->         
        <div v-else>
            <b-badge variant="info">Result: {{result}} </b-badge>
            <br>
            <br>
            <b-button @click="reset">Reset</b-button>
        </div>
        <!-- #endregion -->
    </div>

    </b-card>
    <br>
    <a href="https://github.com/SkynetLabs/skynet-substrate">Skynet Substrate Source</a> | 
    <a href="https://github.com/SkynetLabs/skynet-substrate-offchain-worker-node/">Skynet Substrate Offchain Worker Node</a>
  </div>
</template>
<script>
export default {
    data(){
        return {
            skylink: "https://siasky.net/AQATV21hMvgeZ-6eEtcX90wlHK1o_7M6D8jyVlTSuhD8vw",
            result: ""
        }
    },
    methods: {
        /**
         * decodes a Uint8Array
         */
        decode(encoded_num){
            let decoded = 0;
            for (let encoded_byte of encoded_num.reverse()){
                decoded <<= 8;
                decoded |= encoded_byte;
            }
            return decoded;
        },
        /**
         * Download the skylink, convert it to text, and save the result to this.result
         */
        async download(){
            try{
                let response = (await fetch(this.skylink));
                let data = new Uint8Array(await response.arrayBuffer());
                this.result = this.decode(data).toString()
                console.log("Result: ", this.result)
            }
            catch(err) {
                // this.$bvToast.toast(err["message"], {
                //     title: 'Error',
                // })
                alert(err["message"])
            }
        },
        /**
         * Resets the form by setting `this.result` to empty
         */
        reset(){
            this.result = "";
        }
    }
}
</script>