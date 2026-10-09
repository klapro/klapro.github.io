<template>
    <div>
        <img class="position-fixed" src="@/assets/me_arms.png" style="bottom: -200px; left: 96px; z-index: 100000;"/>
        <img class="position-fixed" src="@/assets/me.png" style="bottom: -200px; left: 96px; z-index: 999;"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Me extends Vue {
}
</script>