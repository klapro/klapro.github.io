<template>
    <div class="position-relative cursor-pointer">
        <img :src="item.img" class="rounded-circle" @click="clicked" />

        <div class="position-absolute w-100 bottom-0 d-flex justify-content-center">
            
            
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import ExpModel from "@/models/ExpModel";

@Component
export default class JourneyButton extends Vue {
    @Prop() item: ExpModel | undefined;
    @Prop() index: number | undefined;

    clicked() {
        this.$emit('click', this.item);
    }
}
</script>

</script>

<style scoped>
img {
    width: 48px;
    height: 48px;
    border: 0px;
}

.no-margin {
    margin: 0!important;
}

.icon-man {
    width: 24px;
    height: 24px;
}

@keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-5px);
	}
    75% {
        box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(5px);
    }

	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}

img:hover {
    cursor: pointer;
    animation: float 1s ease-out infinite;
}
</style>