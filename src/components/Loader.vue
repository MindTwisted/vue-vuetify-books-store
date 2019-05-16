<template>
    <div class="loader">
        <Loading
            :active="active"
            :is-full-page="true"
            loader="bars"
            color="#42b883"
            background-color="#000000"
            :height="90"
            :width="90"
        />
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        Loading
    },
    props: {
        active: {
            type: Boolean,
            required: true
        }
    }
};
</script>
