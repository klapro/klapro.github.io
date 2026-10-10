<template>
    <div>
        <img src="@/assets/pushpin-red.svg"
                    style="position: absolute; left: 210px; bottom: 225px; width: 56px; z-index: 10000001;" />
        <PeekPortrait
    class="position-absolute"
    style="left: 42px; bottom: 42px; z-index: 10000000; transform: rotate(-2.2deg);"
    :photo="require('@/assets/image.png')"
    :size="200" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import PeekPortrait from '@/components/PeekPortrait.vue';

@Component({
    components: {
        PeekPortrait
    }
}) 
export default class Me extends Vue {
}
</script>
